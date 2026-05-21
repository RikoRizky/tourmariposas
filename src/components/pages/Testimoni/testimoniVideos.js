const rawVideos = [
  { id: "1u641CqRyZsekLYnrVEMUQrpI-gUnjG46", title: "Bimbingan Manasik Umroh", desc: "Persiapan Matang Sebelum Berangkat", category: "dokumen" },
  { id: "1MXRteJlUiZpYbw3qCZe_kCGLMjQZe9Nl", title: "Ziarah Kota Makkah", desc: "Dokumentasi Jabal Nur & Thabrani", category: "dokumen" },
  { id: "1ONx1Mxrvrqh13--FofUHrYmmlf_WQlwk", title: "City Tour Madinah", desc: "Kunjungan Kebun Kurma & Masjid Quba", category: "dokumen" },
  { id: "17UpLmK42_Zc2ht8VR0G1ddoiZiOKgfYR", title: "Pelepasan Jamaah Jabar", desc: "Bandara Internasional CGK", category: "dokumen" },
  { id: "16XrDL-TOty24i7zhc62Pxezv1YXgkBtP", title: "Kedatangan di Madinah", desc: "Hotel Bintang 5 Transit", category: "dokumen" },
  { id: "1COdgOMzixvq40M0YTk4BlR8UvatzNWAZ", title: "Ziarah Raudhah Syarifah", desc: "Momen Khusyuk Jemaah UMH", category: "dokumen" },
  { id: "19em1RKKo56xfWob1mLzDfu34ONmO0Q-F", title: "City Tour Kota Madinah", desc: "Kebun Kurma & Masjid Quba", category: "dokumen" },
  { id: "14DlTFgnAFe38MdGc-4cwvNDhnK_Ivkr0", title: "Dokumentasi Kegiatan 8", desc: "Pelayanan Amanah Sepenuh Hati", category: "dokumen" },
  { id: "18mVl9nUghmtpnRGoCyfbmBhLQWg4Oh0N", title: "Dokumentasi Kegiatan 9", desc: "Keluarga Besar Utama Mulya Haramain", category: "dokumen" },
  { id: "1jZy3IEy9phnjttXjwaz9u0sR1GOhfg5B", title: "Dokumentasi Kegiatan 10", desc: "Ibadah Nyaman dan Fleksibel", category: "dokumen" },
  { id: "1ia1OQ-yNII1pHWzJQOaLSM4BSrBUPmAk", title: "Dokumentasi Kegiatan 11", desc: "Perjalanan Penuh Berkah Jemaah", category: "dokumen" },
  { id: "1wibGwBZtYk3ha5eYEjh8k5z5A7G-_f9h", title: "Dokumentasi Kegiatan 12", desc: "Rombongan Umroh Syawal", category: "dokumen" },
  { id: "15MsdAXv1siOg2srjK02FoNJXKKD36wmt", title: "Dokumentasi Kegiatan 14", desc: "Manasik Eksklusif di Hotel", category: "dokumen" },
  { id: "1vcHKQUWbJ3tNjHjMobABhLd9XTQA0FXA", title: "Dokumentasi Kegiatan 15", desc: "Fasilitas Hotel Dekat Masjidil Haram", category: "dokumen" },
  { id: "1yXu2N605wksqzvDnungp9SeqtDkUWnG-", title: "Dokumentasi Kegiatan 16", desc: "Thawaf Wada Jemaah UMH", category: "dokumen" },
  { id: "1K1B-x63Xgg_U5UBbHstVgOoAsef2l1WL", title: "Dokumentasi Kegiatan 17", desc: "Pelayanan Lansia Ramah", category: "dokumen" },
  { id: "1TJ8qF9Ll6QrBl6eMHjYVe68TjRrZ6Aty", title: "Dokumentasi Kegiatan 18", desc: "Konsumsi Hidangan Nusantara", category: "dokumen" },
  { id: "1PEc7zLhe1XFLv0f2BHc49ghelTc_hCHd", title: "Dokumentasi Kegiatan 19", desc: "Ziarah Jabal Uhud Madinah", category: "dokumen" },
  { id: "1LlyKESfzbUfcoUcys7WwnwFZBXdbk0ld", title: "Dokumentasi Kegiatan 20", desc: "Kloter Umroh Akhir Tahun", category: "dokumen" },
  { id: "1nvTxMvoyE8FDWpwsKT_y3pIvJ5JfKrR2", title: "Dokumentasi Kegiatan 21", desc: "Kebersamaan Jemaah di Bandara", category: "dokumen" },
  { id: "1vvttV4clzLAKcOn_URbPK0M46aBihSBb", title: "Dokumentasi Kegiatan 22", desc: "Pemberian Atribut & Seragam UMH", category: "dokumen" },
  { id: "10PM5IUV4teO0FFe9EPuud-Dt2bKh2TfH", title: "Dokumentasi Kegiatan 23", desc: "Ziarah Bersejarah Kota Suci", category: "dokumen" },
  { id: "1Un83xwWhvOpEjpnqFzvb4SdFy5jTjTWW", title: "Dokumentasi Kegiatan 24", desc: "Pendampingan Mutawwif Berpengalaman", category: "dokumen" },
  { id: "1_xXPoznf-QwKe6pjsOnvYa0yv223uUme", title: "Dokumentasi Kegiatan 25", desc: "Perjalanan Menggunakan Bus Eksekutif", category: "dokumen" },
  { id: "1gMSyEsWtjUb57MS5BI0ub4epwpnc_zRd", title: "Dokumentasi Kegiatan 26", desc: "Mengambil Miqat di Dzulhulaifah", category: "dokumen" },
  { id: "1aISrd8KqUNdz1PBG0-44IjN4mgOtzP_R", title: "Dokumentasi Kegiatan 27", desc: "Suasana Menjelang Shalat Berjamaah", category: "dokumen" },
  { id: "1elXUjpYQvRBKncDzgSe6XmiB_0gfqZFx", title: "Dokumentasi Kegiatan 28", desc: "Kepulangan Jemaah ke Indonesia", category: "dokumen" },
  { id: "1n5e20YPLgwb6-ihRsqeQqNxp2OouEI-I", title: "Dokumentasi Kegiatan 29", desc: "Testimoni Kepuasan Pelayanan", category: "dokumen" },
  { id: "1FIGO_-CfIVKumaUBPwd8aKstOi0qx4ls", title: "Dokumentasi Kegiatan 30", desc: "Dokumentasi Penutupan Kegiatan", category: "dokumen" },
  { id: "1g57-0TEUnWuY2ApuTZbDI6uJCJJoWvBW", title: "Dokumentasi Kegiatan 31", desc: "Kilas Balik Perjalanan Spiritual", category: "dokumen" },
  { id: "1u0fbVLwtbF-o-_AogT3Cg_PYBB9Ny6H_", title: "Testimoni Jemaah 1", desc: "Pengalaman Ibadah Bersama UMH", category: "testi" },
  { id: "1gOYYlgfC2ug_0i0xyT0-4zU5ZOEKGbfk", title: "Testimoni Jemaah 2", desc: "Pelayanan Ramah dan Profesional", category: "testi" },
  { id: "1gv7sG7FYRbsDltZkKXrFy7TupniwFk5L", title: "Testimoni Jemaah 3", desc: "Perjalanan Umroh Penuh Berkah", category: "testi" },
  { id: "11dfx_O0aJoK-V1tv4dP646WEgL1pObDS", title: "Testimoni Jemaah 4", desc: "Fasilitas dan Pendampingan Terbaik", category: "testi" },
  { id: "1KVCdW0oX5uKkGp5kdHCEHzGQwh_TT95m", title: "Testimoni Jemaah 5", desc: "Ibadah Nyaman dan Aman", category: "testi" },
  { id: "146oEIAZaryAnSzRpEHjphaH1uxv-CXe7", title: "Testimoni Jemaah 6", desc: "Kesan Mendalam di Tanah Suci", category: "testi" },
  { id: "104F0qi5JjFhNKQluCmM33LzkAhvloifl", title: "Testimoni Jemaah 7", desc: "Pelayanan Sepenuh Hati", category: "testi" },
  { id: "1n1Ek_ivRdtsZ73_dg4MhSUYAiZdofykt", title: "Testimoni Jemaah 8", desc: "Momen Spiritual Tak Terlupakan", category: "testi" },
  { id: "12-0uBrD1ulXZGkvnURkJv839Hh5RtMzn", title: "Testimoni Jemaah 9", desc: "Perjalanan Bersama Keluarga UMH", category: "testi" },
  { id: "1RaQGQmgrQQmrXJRw8RCzYmsS0cDLX1OQ", title: "Testimoni Jemaah 10", desc: "Pendampingan Mutawwif Berpengalaman", category: "testi" },
  { id: "1fnnAcqZzquzUlMvs1e4UwiJkjBJM1azo", title: "Testimoni Jemaah 11", desc: "Perjalanan Umroh yang Berkesan", category: "testi" },
  { id: "1bT2T_VAFIRlJwYKCVhgGbnUR2W9pm1pv", title: "Testimoni Jemaah 12", desc: "Kepuasan Pelayanan Jamaah", category: "testi" },
  { id: "13TRXDIOIlOJTz7_pbBWf99FdBNa2qj0b", title: "Testimoni Jemaah 13", desc: "Hotel Nyaman dan Strategis", category: "testi" },
  { id: "1IXP1t3alQ0APNlRgZdSw7VAWHRZpIVjE", title: "Testimoni Jemaah 14", desc: "Ibadah Lebih Tenang dan Khusyuk", category: "testi" },
  { id: "1L1KJqvSKd_QCUWK1oI8Aj1Z5Rb_LY-xO", title: "Testimoni Jemaah Bandung", desc: "Perjalanan Penuh Kekeluargaan", category: "testi" },
  { id: "1A_rYpEhfDD5PviOZVHoBnfGf92M0JnVU", title: "Testimoni Keluarga Bpk. Ahmad", desc: "Paket Umroh Reguler Batch 3", category: "testi" },
  { id: "1_DSVwwL9RzboezGDsvmucKUS6Y7iZ3N4", title: "Testimoni Ibu Rahma", desc: "Kloter Syawal Premium", category: "testi" },
];

export const testimoniVideos = rawVideos.filter(
  (video, index, self) =>
    index === self.findIndex((v) => v.id === video.id)
);

export const FALLBACK_THUMBNAIL =
  "https://images.unsplash.com/photo-1704104501136-8f35402af395?q=80&w=1649&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export function getDriveThumbnail(driveId) {
  return `https://lh3.googleusercontent.com/u/0/d/${driveId}=w600-h800-p`;
}

export function getDrivePreviewUrl(driveId, { autoplay = false } = {}) {
  const url = `https://drive.google.com/file/d/${driveId}/preview`;
  if (!autoplay) return url;
  return `${url}?autoplay=1`;
}
