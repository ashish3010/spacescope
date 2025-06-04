export function getTodayDate(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDateBefore7Days(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() - 7);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDateAfter7Days(dateStr: string): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + 7);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function handleDateInputChange(
  value: string,
  setValue: (value: string) => void
) {
  const digits = value.replace(/\D/g, "");

  let formatted = digits;
  if (digits.length >= 5) {
    formatted = `${digits.slice(0, 4)}-${digits.slice(4, 6)}`;
  }
  if (digits.length >= 7) {
    formatted += `-${digits.slice(6, 8)}`;
  }

  setValue(formatted);
}
