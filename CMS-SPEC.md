# Spesifikasi API untuk intikepri-cms — Galeri & Direktori Bisnis

Frontend (`intikepri-static`) sudah siap. Yang dibutuhkan dari CMS: **2 endpoint baru** dengan pola yang sama persis seperti `GET /api/news` yang sudah ada.

## Prinsip (sama seperti berita)

- CI frontend mengambil data saat build: `curl <endpoint> | jq '.data.items' > src/data/<file>.json`
- Website sepenuhnya statis — tidak ada panggilan API dari browser pengunjung
- Konten berubah → rebuild (sama seperti flow berita sekarang)
- Gambar tetap di-hosting di `s3.intikepri.com` dan dikirim sebagai **URL absolut**

---

## 1. `GET https://api.intikepri.com/api/gallery?limit=1000`

Dokumentasi foto kegiatan. Satu item = satu foto.

### Response envelope (wajib sama seperti /api/news)

```json
{
  "success": true,
  "data": {
    "items": [ ... ],
    "total": 24,
    "page": 1,
    "limit": 1000
  },
  "message": null
}
```

### Bentuk item

| Field | Tipe | Wajib? | Keterangan |
|---|---|---|---|
| `title` | string | ✅ | Caption foto, mis. "Pembagian sembako di Karimun" |
| `image` | string | ✅ | URL absolut (https://s3.intikepri.com/...) |
| `category` | string | ✅ | Nama kegiatan / sumber upload. **Otomatis jadi tombol filter** di website, jadi pakai penamaan konsisten, mis. "Baksos Karimun 2026" |
| `date` | string | ✅ | ISO `YYYY-MM-DD` |
| `location` | string | opsional | Batam / Karimun / TPI & Bintan / Lingga / Anambas / Natuna / Kepri |
| `organization` | string | opsional | INTI / PINTI / GEMA |

### Contoh item

```json
{
  "title": "Pembagian 500 paket sembako",
  "image": "https://s3.intikepri.com/assets/gallery/<uuid>/baksos-karimun-01.jpg",
  "category": "Baksos Karimun 2026",
  "date": "2026-08-04",
  "location": "Karimun",
  "organization": "INTI"
}
```

---

## 2. `GET https://api.intikepri.com/api/businesses?limit=1000`

Profil bisnis anggota/komunitas (diinput admin setelah pemilik bisnis menghubungi admin via email).

### Bentuk item

| Field | Tipe | Wajib? | Keterangan |
|---|---|---|---|
| `name` | string | ✅ | Nama usaha |
| `category` | string | ✅ | Bebas tapi konsisten (otomatis jadi filter). Saran: Kuliner, Fashion, Jasa, Retail, Otomotif, Kecantikan, Properti, Teknologi, Lainnya |
| `description` | string | ✅ | Deskripsi singkat (2–4 kalimat) |
| `location` | string | ✅ | Kota/Kabupaten (otomatis jadi filter) |
| `owner` | string | opsional | Nama pemilik |
| `address` | string | opsional | Alamat lengkap |
| `phone` | string | opsional | Mis. `+62 778 456789` |
| `whatsapp` | string | opsional | **Angka saja, format internasional tanpa `+`**, mis. `6281277001122` |
| `email` | string | opsional | |
| `website` | string | opsional | URL lengkap dengan `https://` |
| `instagram` | string | opsional | Username **tanpa `@`**, mis. `sarirasa.batam` |
| `image` | string | opsional | Logo/foto usaha, URL absolut |
| `banner` | string | opsional | Foto wide usaha, URL absolut. Dipakai sebagai foto utama kartu row dan hero pop-up detail |
| `photos` | string[] | opsional | Foto tambahan (URL absolut), tampil sebagai strip galeri di pop-up detail |
| `featured` | boolean | opsional | `true` = tampil paling atas dengan lencana "Unggulan". Dipakai admin untuk menyorot bisnis tertentu |
| `since` | string | opsional | Tahun berdiri, mis. `2015` |

> Tombol kontak di website (WhatsApp/Telepon/Email/Website/Instagram) **hanya muncul untuk field yang diisi** — jadi field kontak boleh kosong sebagian.

### Contoh item

```json
{
  "name": "Restoran Sari Rasa Nusantara",
  "category": "Kuliner",
  "description": "Restoran keluarga dengan menu masakan Padang, seafood, dan Chinese food. Menerima catering hingga 500 pax.",
  "owner": "Linda Wijaya",
  "location": "Batam",
  "address": "Komplek Nagoya Business Centre Blok V No. 12, Batam",
  "phone": "+62 778 456789",
  "whatsapp": "6281277001122",
  "instagram": "sarirasa.batam",
  "image": "https://s3.intikepri.com/assets/businesses/<uuid>/sari-rasa.jpg",
  "since": "2010"
}
```

---

## Aturan umum

1. **Urutan**: `items` diurutkan dari yang terbaru (website mengambil N teratas untuk homepage sesuai urutan array).
2. **Kosong itu OK**: kalau belum ada konten, kembalikan `"items": []` — website menampilkan empty state yang sopan dan menyembunyikan section homepage.
3. **Tanggal ISO**: `YYYY-MM-DD` (dipakai untuk tampilan dan structured data).
4. **CORS tidak perlu diatur** — fetch dilakukan dari CI (server-side), bukan browser.
5. Endpoint harus bisa diakses **tanpa autentikasi** (read-only publik), sama seperti `/api/news`.

## Pertanyaan balik untuk tim CMS/infra

Bagaimana perubahan konten di CMS memicu rebuild website hari ini — pipeline Woodpecker dijalankan manual, cron, atau webhook dari CMS? Mekanisme yang sama akan otomatis berlaku untuk galeri & direktori, tapi kalau belum ada otomatisasi untuk berita, sekalian saja disiapkan untuk ketiganya.

---

## 3. `GET https://api.intikepri.com/api/events?limit=1000`

Agenda kegiatan (yang akan datang maupun yang sudah berlangsung). Satu item = satu agenda.

### Bentuk item

| Field | Tipe | Wajib? | Keterangan |
|---|---|---|---|
| `title` | string | ✅ | Nama agenda |
| `slug` | string | ✅ | URL unik, mis. `baksos-pengobatan-gratis-2026` (dipakai untuk halaman detail `/agenda/<slug>`) |
| `description` | string | ✅ | Deskripsi lengkap (paragraf dipisah baris kosong) |
| `date` | string | ✅ | Tanggal mulai, ISO `YYYY-MM-DD` |
| `endDate` | string | opsional | Tanggal selesai untuk agenda multi-hari, ISO |
| `time` | string | opsional | Mis. `08:00 - 13:00 WIB` |
| `location` | string | ✅ | Kota/Kabupaten |
| `venue` | string | opsional | Nama tempat + alamat, mis. `Aula Sekolah Cahaya Batam` |
| `organization` | string | opsional | INTI / PINTI / GEMA |
| `category` | string | opsional | Mis. Bakti Sosial, Rapat, Perayaan, Pelatihan (otomatis jadi filter) |
| `image` | string | opsional | Foto/poster agenda, URL absolut |
| `ctaLabel` | string | opsional | Teks tombol partisipasi, mis. `Daftar via Google Form` (default: "Daftar / Partisipasi") |
| `ctaType` | string | opsional | `link` = URL bebas (Google Form dsb) · `whatsapp` = nomor tujuan · `email` = alamat email tujuan |
| `ctaUrl` | string | opsional | Isinya mengikuti `ctaType`: URL lengkap / nomor `628xxx` / alamat email |

> **CTA sepenuhnya dikustomisasi admin per agenda** — tidak perlu ubah kode frontend. Kalau `ctaType`/`ctaUrl` kosong, tombol partisipasi tidak ditampilkan.
> Status "Akan Datang / Sudah Berlangsung" **otomatis** dari tanggal — CMS tidak perlu mengirim status.

### Contoh item

```json
{
  "title": "Bakti Sosial & Pengobatan Gratis INTI Kepri 2026",
  "slug": "baksos-pengobatan-gratis-2026",
  "description": "INTI Kepri kembali menggelar bakti sosial...",
  "date": "2026-09-12",
  "time": "08:00 - 13:00 WIB",
  "location": "Batam",
  "venue": "Aula Sekolah Cahaya Batam, Batam Centre",
  "organization": "INTI",
  "category": "Bakti Sosial",
  "image": "https://s3.intikepri.com/assets/events/<uuid>/poster.jpg",
  "ctaLabel": "Daftar via Google Form",
  "ctaType": "link",
  "ctaUrl": "https://forms.google.com/..."
}
```

---

## 4. `GET /api/videos` — Pustaka (video YouTube)

Query: `?limit`, `?page` — envelope sama persis dengan `/api/news`.

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `title` | string | ✅ | Judul video |
| `youtubeId` | string | ✅ | ID video YouTube saja (bagian setelah `watch?v=`), mis. `aqz-KE-bpKQ`. BUKAN URL penuh |
| `description` | string | opsional | Deskripsi singkat |
| `date` | string | ✅ | ISO `YYYY-MM-DD`, tanggal publikasi |
| `duration` | string | opsional | Format `m:ss`, mis. `"10:24"` |
| `category` | string | opsional | mis. Kegiatan, Sosial, Budaya |

Thumbnail TIDAK perlu dikirim — frontend mengambil otomatis dari `img.youtube.com/vi/<youtubeId>/`.
Video diputar dalam modal di situs (iframe YouTube baru dimuat saat user klik).

## 5. `GET /api/documents` — Pustaka (dokumen PDF)

| Field | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `title` | string | ✅ | Judul dokumen |
| `author` | string | ✅ | Penulis/penerbit, mis. "Sekretariat INTI Kepri" |
| `date` | string | ✅ | ISO `YYYY-MM-DD` |
| `fileUrl` | string | ✅ | URL PDF absolut (https://s3.intikepri.com/...). Dibuka di tab baru |
| `description` | string | opsional | Ringkasan 1-2 kalimat |
| `thumbnail` | string | opsional | Cover dokumen (URL absolut). **Idealnya CMS auto-generate dari halaman pertama PDF** (mis. pdftoppm/Imagick) bila admin tidak upload cover sendiri; bila kosong pun frontend menampilkan placeholder rapi |
| `pages` | number | opsional | Jumlah halaman |
| `size` | string | opsional | Ukuran ramah baca, mis. `"2,4 MB"` |
| `category` | string | opsional | mis. Resmi, Laporan, Makalah |

File JSON lokal: `src/data/video.json` dan `src/data/dokumen.json` (pola identik dengan news/galeri/direktori/agenda).
