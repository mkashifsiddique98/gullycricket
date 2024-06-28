class MathUtil {
  static getRandomNo() {
    const min = 100;
    const max = 999;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

export default MathUtil;

export const dateFormate = (dateString) => {
  const date = new Date(dateString);

  // Extract year, month, and day
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Month is zero-based, so add 1
  const day = date.getUTCDate();

  // Format the date as "1/2/2023"
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
};
