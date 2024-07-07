function formatUang(nilai: number): string {
  // Mengubah nilai menjadi string dengan pemisah ribuan dan dua digit desimal
  let formatUang = nilai.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  // Mengganti koma menjadi titik dan titik menjadi koma sesuai format Indonesia
  formatUang = formatUang
    .replace(/,/g, "X")
    .replace(/\./g, ",")
    .replace(/X/g, ".");
  return `${formatUang}`;
}

export default formatUang;
