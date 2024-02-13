
function currentDate(date) {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Adding 1 to get the month in the range 1-12
  const currentDay = currentDate.getDate();
  const currentYear = currentDate.getFullYear();

  const formattedDate = (`Todays date is: ${currentMonth}/${currentDay}/${currentYear}`);  
  return formattedDate;
};


export default {
  currentDate: currentDate
};

