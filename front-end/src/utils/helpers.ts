/* Getter */
export const formattedCurrency = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
};

export const generateArray = (length: number): number[] => {
  const arr: any[] = [];

  for (let i = 1; i <= length; i++) {
    arr.push(i);
  }

  return arr;
};

export const formattedDateInput = (date: Date): string => {
  let result = new Date(date)
    .toLocaleDateString("id-ID", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\//g, "-");

  return result.replace(/(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
};

export const errorHandler = (error: any): string => {
  let errorMessage;
  if (error.response) {
    errorMessage = error.response?.data.payload.errorMessage;
  } else {
    errorMessage = error.message;
  }

  return errorMessage;
};
