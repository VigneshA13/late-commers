export default function formateDate(dateString) {
  const firstDate = new Date(dateString);
  const date = new Date(firstDate);

  // Extract day, month, and year components
  const day = date.getDate(); // Get the day (1-31)
  const month = date.getMonth() + 1; // Get the month (0-11); add 1 to make it 1-12
  const year = date.getFullYear(); // Get the year (e.g., 2023)

  // Create the formatted date string in "DD.MM.YYYY" format
  const formattedDate = `${String(day).padStart(2, '0')}.${String(
    month,
  ).padStart(2, '0')}.${year}`;

  return formattedDate;
}
