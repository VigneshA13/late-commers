export default function timeFormate(timeString) {
  const timeParts = timeString.split(':');
  if (timeParts.length === 3) {
    let hours = parseInt(timeParts[0], 10);
    const minutes = timeParts[1];

    let ampm = 'AM';

    if (hours >= 12) {
      if (hours > 12) {
        hours -= 12;
      }
      ampm = 'PM';
    }

    // Handle midnight (12:00 AM)
    if (hours === 0) {
      hours = 12;
    }

    return `${hours}:${minutes} ${ampm}`;
  } else {
    // Handle invalid input
    return 'Invalid Time';
  }
}
