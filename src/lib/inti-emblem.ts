import type * as THREE_NS from "three";

type Three = typeof THREE_NS;

export interface IntiEmblem {
  destroy: () => void;
}

/**
 * Renders the INTI emblem (red tile, raised fan rays, gold frame) into
 * `canvas`. It follows the pointer, can be dragged to spin, and the rays lift
 * while hovered. With `reduceMotion` it draws one still frame.
 * Returns null when WebGL is unavailable.
 */
export function createIntiEmblem(
  T: Three,
  canvas: HTMLCanvasElement,
  opts: { reduceMotion?: boolean } = {},
): IntiEmblem | null {
  const reduce = !!opts.reduceMotion;
  let renderer: THREE_NS.WebGLRenderer;
  try {
    renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = T.SRGBColorSpace;
  renderer.toneMapping = T.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 7.4);

  scene.add(new T.HemisphereLight(0xfff1e0, 0x2a0806, 1.1));
  const key = new T.DirectionalLight(0xffe6cc, 2.4);
  key.position.set(3, 4, 6);
  scene.add(key);
  const rim = new T.DirectionalLight(0xff4d3d, 2.2);
  rim.position.set(-5, -1, -4);
  scene.add(rim);
  const warm = new T.PointLight(0xe0a46a, 30, 14);
  warm.position.set(-2.6, 2.2, 3.4);
  scene.add(warm);

  function roundedSquare<P extends THREE_NS.Path>(
    p: P,
    w: number,
    r: number,
  ): P {
    const h = w / 2;
    p.moveTo(-h + r, -h);
    p.lineTo(h - r, -h);
    p.quadraticCurveTo(h, -h, h, -h + r);
    p.lineTo(h, h - r);
    p.quadraticCurveTo(h, h, h - r, h);
    p.lineTo(-h + r, h);
    p.quadraticCurveTo(-h, h, -h, h - r);
    p.lineTo(-h, -h + r);
    p.quadraticCurveTo(-h, -h, -h + r, -h);
    return p;
  }

  const emblem = new T.Group();
  scene.add(emblem);

  const S = 1.7;
  const DEPTH = 0.3;
  const BEVEL = 0.06;

  const tileGeo = new T.ExtrudeGeometry(roundedSquare(new T.Shape(), S, 0.16), {
    depth: DEPTH,
    bevelEnabled: true,
    bevelThickness: BEVEL,
    bevelSize: 0.05,
    bevelSegments: 6,
    curveSegments: 12,
  });
  tileGeo.center();
  const red = new T.MeshStandardMaterial({
    color: 0xd3222a,
    roughness: 0.42,
    metalness: 0.04,
  });
  emblem.add(new T.Mesh(tileGeo, red));

  const frameShape = roundedSquare(new T.Shape(), S + 0.26, 0.24);
  frameShape.holes.push(roundedSquare(new T.Path(), S + 0.12, 0.2));
  const frameGeo = new T.ExtrudeGeometry(frameShape, {
    depth: DEPTH * 0.7,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 4,
    curveSegments: 12,
  });
  frameGeo.center();
  const gold = new T.MeshStandardMaterial({
    color: 0xd9a56f,
    roughness: 0.28,
    metalness: 0.75,
    emissive: 0x3a1f08,
    emissiveIntensity: 0.35,
  });
  emblem.add(new T.Mesh(frameGeo, gold));

  const white = new T.MeshStandardMaterial({
    color: 0xfff8ee,
    roughness: 0.3,
    metalness: 0,
  });
  const front = DEPTH / 2 + BEVEL;
  const cy = -0.04 * S;
  const rays: THREE_NS.Mesh[] = [];

  function addRay(
    angleDeg: number,
    r1: number,
    r2: number,
    w1: number,
    w2: number,
    depth: number,
  ) {
    const s = new T.Shape();
    s.moveTo(r1, -w1);
    s.lineTo(r2, -w2);
    s.absarc(r2, 0, w2, -Math.PI / 2, Math.PI / 2, false);
    s.lineTo(r1, w1);
    s.lineTo(r1, -w1);
    const g = new T.ExtrudeGeometry(s, {
      depth,
      bevelEnabled: true,
      bevelThickness: 0.012,
      bevelSize: 0.008,
      bevelSegments: 2,
      curveSegments: 10,
    });
    const m = new T.Mesh(g, white);
    m.rotation.z = (angleDeg * Math.PI) / 180;
    m.position.set(0, cy, front - 0.01);
    m.userData = { z0: front - 0.01, dir: angleDeg };
    emblem.add(m);
    rays.push(m);
  }

  const half = S / 2;
  for (let i = 0; i < 9; i++) {
    addRay(
      162 - i * 18,
      0.26 * half,
      0.86 * half,
      0.03 * half,
      0.085 * half,
      0.07,
    );
  }
  for (let i = 0; i < 9; i++) {
    addRay(
      198 + i * 18,
      0.17 * half,
      0.38 * half,
      0.012 * half,
      0.034 * half,
      0.05,
    );
  }

  const textCanvas = document.createElement("canvas");
  textCanvas.width = 512;
  textCanvas.height = 160;
  const textMat = new T.MeshStandardMaterial({
    transparent: true,
    roughness: 0.35,
    color: 0xffffff,
  });
  const textMesh = new T.Mesh(new T.PlaneGeometry(0.82, 0.256), textMat);
  textMesh.position.set(0, -0.6 * half, front + 0.004);
  emblem.add(textMesh);

  function drawText() {
    const c = textCanvas.getContext("2d");
    if (!c) return;
    c.clearRect(0, 0, 512, 160);
    c.fillStyle = "#ffffff";
    c.textAlign = "center";
    c.textBaseline = "middle";
    const family =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--font-playfair")
        .trim() || "Georgia";
    c.font = `900 132px ${family}, Georgia, "Times New Roman", serif`;
    c.fillText("INTI", 256, 88);
    const tex = new T.CanvasTexture(textCanvas);
    tex.colorSpace = T.SRGBColorSpace;
    tex.anisotropy = 4;
    textMat.map?.dispose();
    textMat.map = tex;
    textMat.needsUpdate = true;
  }
  drawText();
  document.fonts?.ready.then(drawText).catch(() => {});

  const N = 320;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const rad = 1.9 + Math.random() * 1.9;
    const th = Math.random() * Math.PI * 2;
    const ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = rad * Math.sin(ph) * Math.cos(th);
    pos[i * 3 + 1] = rad * Math.sin(ph) * Math.sin(th) * 0.8;
    pos[i * 3 + 2] = rad * Math.cos(ph) - 0.6;
  }
  const dustGeo = new T.BufferGeometry();
  dustGeo.setAttribute("position", new T.BufferAttribute(pos, 3));
  const dust = new T.Points(
    dustGeo,
    new T.PointsMaterial({
      color: 0xe8b37c,
      size: 0.028,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    }),
  );
  scene.add(dust);

  let tX = 0;
  let tY = 0;
  let spin = 0;
  let vel = 0;
  let dragging = false;
  let lastX = 0;
  let open = 0;
  let openAmt = 0;
  let raf = 0;
  let visible = true;
  const t0 = performance.now();

  const clamp = (v: number) => Math.max(-1, Math.min(1, v));

  function onMove(e: PointerEvent) {
    const r = canvas.getBoundingClientRect();
    const nx =
      (e.clientX - (r.left + r.width / 2)) / Math.max(window.innerWidth, 1);
    const ny =
      (e.clientY - (r.top + r.height / 2)) / Math.max(window.innerHeight, 1);
    tY = clamp(nx * 2) * 0.5;
    tX = clamp(ny * 2) * 0.32;
    if (dragging) {
      const dx = e.clientX - lastX;
      lastX = e.clientX;
      spin += dx * 0.012;
      vel = dx * 0.012;
    }
  }
  function onDown(e: PointerEvent) {
    dragging = true;
    lastX = e.clientX;
    try {
      canvas.setPointerCapture(e.pointerId);
    } catch {
      /* not supported */
    }
  }
  const onUp = () => {
    dragging = false;
  };
  const onEnter = () => {
    open = 1;
  };
  const onLeave = () => {
    open = 0;
    dragging = false;
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerup", onUp);
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("pointerenter", onEnter);
  canvas.addEventListener("pointerleave", onLeave);

  function resize() {
    const p = canvas.parentElement;
    if (!p) return;
    const w = Math.max(1, p.clientWidth);
    const h = Math.max(1, p.clientHeight);
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.position.z = w / h < 1 ? 7.4 / Math.max(w / h, 0.6) : 7.4;
    camera.updateProjectionMatrix();
    if (reduce) renderer.render(scene, camera);
  }
  const ro = new ResizeObserver(resize);
  if (canvas.parentElement) ro.observe(canvas.parentElement);
  resize();

  const io = new IntersectionObserver((entries) => {
    visible = entries[0]?.isIntersecting ?? true;
  });
  io.observe(canvas);

  function frame(now: number) {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const t = (now - t0) / 1000;
    if (!dragging) {
      spin += vel;
      vel *= 0.94;
      spin *= 0.985;
    }
    const sway = Math.sin(t * 0.55) * 0.14;
    emblem.rotation.y += (tY + spin + sway - emblem.rotation.y) * 0.06;
    emblem.rotation.x +=
      (tX + Math.sin(t * 0.43) * 0.05 - emblem.rotation.x) * 0.06;
    emblem.position.y = Math.sin(t * 1.05) * 0.07;
    openAmt += (open - openAmt) * 0.07;
    rays.forEach((m, k) => {
      const lift = openAmt * (0.16 + 0.08 * Math.sin(t * 2.2 + k * 0.55));
      m.position.z = m.userData.z0 + lift;
      const a = (m.userData.dir * Math.PI) / 180;
      const out = openAmt * 0.04;
      m.position.x = Math.cos(a) * out;
      m.position.y = cy + Math.sin(a) * out;
    });
    dust.rotation.y = t * 0.04;
    dust.rotation.x = Math.sin(t * 0.2) * 0.05;
    const sc = Math.min(
      1,
      Math.max(0, window.scrollY / Math.max(window.innerHeight, 1)),
    );
    emblem.rotation.z = sc * 0.25;
    renderer.render(scene, camera);
  }

  if (reduce) {
    emblem.rotation.set(-0.08, 0.32, 0);
    renderer.render(scene, camera);
  } else {
    raf = requestAnimationFrame(frame);
  }

  return {
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerenter", onEnter);
      canvas.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        const mesh = o as THREE_NS.Mesh;
        mesh.geometry?.dispose();
        const mat = mesh.material as THREE_NS.MeshStandardMaterial | undefined;
        if (mat) {
          mat.map?.dispose();
          mat.dispose();
        }
      });
      renderer.dispose();
    },
  };
}
