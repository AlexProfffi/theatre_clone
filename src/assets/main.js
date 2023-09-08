let monthData = function() {
    // Приймає число і виводить місяць
    let monthList = [
        "Січень",
        "Лютий",
        "Березень",
        "Квітень",
        "Травень",
        "Червень",
        "Липень",
        "Серпень",
        "Вересень",
        "Жовтень",
        "Листопад",
        "Грудень",
    ];
    let dataMonth = [];
    for (let x = 0; x < monthList.length; x++) {
        dataMonth.push({ value: x, text: monthList[x] });
    }
    return dataMonth;
};

export { monthData };