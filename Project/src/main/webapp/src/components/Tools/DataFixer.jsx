class DateFixer{
    static format(input){
        let someDate=new Date(input);
        let yyyy=someDate.getFullYear();
        let mm=(someDate.getMonth()+1);
        let dd=someDate.getDate();
        return `${mm}/${dd}/${yyyy}`;
    }
}

export default DateFixer;