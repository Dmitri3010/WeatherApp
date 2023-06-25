class DateUtils {
  
   getDayOfWeek(dateStr, locale)
   {
        const dateToConvert = new Date(dateStr);
        return dateToConvert.toLocaleDateString(locale, { weekday: 'long' });        
   }

   getTodayDateWithTime()
   {
        const date = new Date();
        const dateString = this.getDayOfWeek(date, "en-en");
        return `${dateString} : ${date.toLocaleTimeString()}`;
   }

   getArrayOfDaysOfWeek()
   {
    const daysArray = [];
    const date = new Date();
    for(let i =0; i<7; i++) {
        const day = this.getDayOfWeek(this.addDays(date, i), 'en-en')
        daysArray.push(day);
    }
    return daysArray;
   }

   addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}