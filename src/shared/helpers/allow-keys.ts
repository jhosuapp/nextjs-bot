interface AllowOnlyNumbersOptions {
  separateThousands?: boolean;
}

const allowOnlyNumbers = (
  event:
    | React.ChangeEvent<HTMLInputElement>
    | React.KeyboardEvent<HTMLInputElement>,
  options: AllowOnlyNumbersOptions = {},
) => {
  const { separateThousands = false } = options;

  if ("key" in event) {
    const key = event.key;

    if (
      key === "Backspace" ||
      key === "Delete" ||
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "Tab"
    ) {
      return;
    }

    if (!/^\d$/.test(key)) {
      event.preventDefault();
      return;
    }
  }
};

const formatNumberInput = (value: string): string => {
  const cleanValue = value.replace(/\./g, "");
  const digitsOnly = cleanValue.replace(/\D/g, "");
  const formatted = digitsOnly.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formatted;
};

export { allowOnlyNumbers, formatNumberInput };
