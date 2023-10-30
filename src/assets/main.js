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

let sliceString = function(str, n_symbols) {
    // Обрізає строку
    return String(str).length > n_symbols ?
        String(str).slice(0, Number(n_symbols)) + "..." :
        str;
};

export { monthData, sliceString };