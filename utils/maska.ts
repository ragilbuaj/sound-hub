export const formatRupiah = (angka: number | null) => {
  let rupiah = "";
  if (angka) {
    rupiah = angka.toString().replace(/[^,\d]/g, "");
  }
  const split = rupiah.split(",");
  const sisa = split[0].length % 3;
  let rupiahFormat = split[0].slice(0, sisa);
  const ribuan = split[0].slice(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiahFormat += separator + ribuan.join(".");
  }

  if (angka! < 0) {
    return `-${rupiahFormat}`;
  }

  if (angka! === 0) {
    return "0";
  }

  return rupiahFormat;
};

export const removeNonDigits = (value: string | number | null | undefined) => {
  let result = "";
  switch (typeof value) {
    case "string":
      result = (value as string).replace(/[^0-9]/g, "");
      break;
    case "number":
      result = value!.toString().replace(/[^0-9]/g, "");
      break;
    case "undefined":
    case null:
      result = "";
      break;
  }
  return result;
};

export const vmaskaRupiah = {
  preProcess: (val: string) => val.replace(/[$.]/g, ""),
  postProcess: (val: string) => formatRupiah(Number(val)),
};
