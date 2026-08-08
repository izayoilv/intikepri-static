# Update Galeri + Direktori Bisnis — intikepri-static

> **V5 (Pustaka & Media)**: tambahan di atas v4 —
> - Halaman baru `/pustaka`: tab **Video** (thumbnail YouTube facade + modal player, iframe baru dimuat saat klik)
>   dan tab **Dokumen** (row dengan cover ber-border tipis, "Baca PDF" buka tab baru).
> - Data: `src/data/video.json` + `dokumen.json` (di-commit sebagai sample live, pola sama seperti galeri/direktori/agenda);
>   endpoint CMS baru `/api/videos` + `/api/documents` (spek di CMS-SPEC.md, thumbnail PDF idealnya auto-generate oleh backend).
> - Dummy PDF ada di `public/dokumen/*.pdf` — file contoh bertanda "DOKUMEN CONTOH", hapus setelah CMS live.
>
> **V4 (row direktori + fix mobile + agenda live)**: tambahan di atas v3 —
> - Direktori jadi **row penuh per bisnis** dengan foto besar + shade gradient (halaman direktori & homepage);
>   pop-up detail kini hero foto + overlay identitas + strip galeri foto (`photos`).
> - Tentang Kami: komposisi foto kini tampil benar di mobile (sebelumnya cuma 1 foto polos).
> - `agenda.json` ikut di-commit supaya Agenda langsung tampil di live; gelar ketua dikoreksi (S.E.).
> - Tombol share berita berwarna brand (WA hijau, FB biru, X hitam, Email merah).
>
> **V3 (agenda + polish)**: tambahan di atas v2 —
> **Fitur baru Agenda Kegiatan**: `src/app/agenda/` (page + list + detail), `src/components/AgendaSection.tsx`,
> navbar/footer/sitemap/build.yml/Dockerfile/types/data.ts ikut berubah (timpa semua).
> **IntroSection** dirombak (kotak angka diganti komposisi foto + kartu motto + fakta satu baris) — `StatsSection.tsx` DIHAPUS, hapus juga dari repo.
> **Galeri**: filter kegiatan sekarang dropdown ber-grup per tahun (aman sampai ratusan kegiatan).
> **Direktori**: field baru `featured` (lencana Unggulan + urutan teratas) dan `banner` (gambar lebar di pop-up detail).
> Sample data bertambah: `news.json` dan `agenda.json` di folder `sample-data`.
>
> **V2 (redesain)**: file tambahan/berubah dibanding v1 —
> `src/components/StatsSection.tsx` (**BARU**), `NewsSection.tsx`, `GaleriSection.tsx`,
> `DirektoriSection.tsx`, `BeritaListClient.tsx`, `GaleriListClient.tsx`,
> `DirektoriListClient.tsx`, `src/app/page.tsx`, `src/app/globals.css` (timpa semua).
> **QuoteSection sudah tidak dipakai** — file `src/components/QuoteSection.tsx` boleh dihapus dari repo.
> Perubahan v2: homepage jadi Hero → Intro → Stats → Berita (editorial) → Galeri (marquee)
> → Direktori (kartu modern) → Struktur → Footer; filter chips diganti toolbar dropdown.

Paket ini berisi semua file baru dan file yang dimodifikasi. Struktur foldernya **sama persis dengan repo** — tinggal timpa.

## 1. Pasang file

Ekstrak isi zip ke root repo `intikepri-static` (bukan folder `sample-data` — itu untuk langkah 2). Windows: klik kanan zip → Extract All → pilih folder repo → centang "timpa file".

### File BARU
| File | Fungsi |
|---|---|
| `src/app/galeri/page.tsx` + `GaleriListClient.tsx` | Halaman `/galeri`: grid foto, filter kategori otomatis, lightbox |
| `src/app/direktori/page.tsx` + `DirektoriListClient.tsx` | Halaman `/direktori`: kartu bisnis, filter, modal detail, tombol daftar via email |
| `src/components/GaleriSection.tsx` | Preview strip foto di homepage (sembunyi otomatis kalau data kosong) |
| `src/components/DirektoriSection.tsx` | Preview 3 bisnis di homepage (sembunyi otomatis kalau data kosong) |

### File DIMODIFIKASI (timpa yang lama)
| File | Perubahan |
|---|---|
| `src/types/index.ts` | Tambah interface `GalleryPhoto` + `Business` |
| `src/lib/data.ts` | Tambah `fallbackGallery` + `fallbackBusinesses` |
| `src/components/Breadcrumb.tsx` | **Upgrade: JSON-LD BreadcrumbList otomatis** di semua halaman + teks terpotong rapi di layar kecil |
| `src/components/Navbar.tsx` | Tambah link Galeri + Direktori |
| `src/components/Footer.tsx` | Tambah link Galeri + Direktori Bisnis (+ fix karakter â€” rusak) |
| `src/app/page.tsx` | Baca 3 file JSON, render 2 section baru |
| `src/app/sitemap.ts` | Tambah `/galeri/` + `/direktori/` |
| `src/app/berita/page.tsx` | Hapus JSON-LD breadcrumb manual (sudah otomatis dari komponen) |
| `src/app/berita/[slug]/page.tsx` | Sama (+ fix karakter â€” rusak di title) |
| `.woodpecker/build.yml` | Tambah step `fetch-gallery` + `fetch-businesses` (aman: fallback `[]` kalau endpoint CMS belum ada) |
| `.gitignore` | Abaikan `src/data/galeri.json` + `src/data/direktori.json` |
| `Dockerfile` | Fallback `[]` untuk 2 file data baru |

## 2. Tes lokal (opsional tapi disarankan)

Folder `sample-data` berisi contoh data (pakai URL gambar S3 asli). Copy **isi** `sample-data/src/data/` ke `src/data/` di repo:

```powershell
New-Item -ItemType Directory -Force src\data
Copy-Item sample-data\src\data\*.json src\data\
```

> `news.json` di-ignore git — aman untuk tes lokal, tidak ikut ter-commit.
> `galeri.json`, `direktori.json`, `agenda.json` SENGAJA di-commit sebagai sample live (lihat .gitignore) sampai endpoint CMS live.

> Kedua file ini sudah masuk `.gitignore` — tidak akan ikut ter-commit.

Lalu:

```powershell
pnpm dev
```

Cek: `http://localhost:3000/galeri`, `http://localhost:3000/direktori`, homepage (scroll ke bawah), navbar mobile.

## 3. Verifikasi sebelum commit

```powershell
pnpm typecheck
pnpm build
```

Kalau keduanya lolos → commit & push seperti biasa. CI otomatis: fetch news + galeri + direktori → build → push image → Flux deploy.

**Build CI tidak akan gagal** meskipun endpoint CMS belum siap (step fetch pakai fallback array kosong, dan section homepage menyembunyikan diri kalau data kosong).

## 4. Teruskan ke tim intikepri-cms

File `CMS-SPEC.md` — berisi 2 endpoint yang harus mereka buat + format JSON persis + contoh. Selama mereka mengikuti format itu, semuanya langsung jalan tanpa ubah kode frontend lagi.
