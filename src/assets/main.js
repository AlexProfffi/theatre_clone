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

let transcription = function(word) {
    // Транскрипція з кирилиці на латиницю
    let transcription_alpha = [
        { value: ["а", "a"] },
        { value: ["б", "b"] },
        { value: ["в", "v"] },
        { value: ["г", "g"] },
        { value: ["ґ", "g"] },
        { value: ["д", "d"] },
        { value: ["е", "e"] },
        { value: ["є", "ye"] },
        { value: ["ж", "zh"] },
        { value: ["з", "z"] },
        { value: ["и", "y"] },
        { value: ["і", "i"] },
        { value: ["ї", "i"] },
        { value: ["й", "y"] },
        { value: ["к", "k"] },
        { value: ["л", "l"] },
        { value: ["м", "m"] },
        { value: ["н", "n"] },
        { value: ["о", "o"] },
        { value: ["п", "p"] },
        { value: ["р", "r"] },
        { value: ["с", "s"] },
        { value: ["т", "t"] },
        { value: ["у", "u"] },
        { value: ["ф", "f"] },
        { value: ["х", "kh"] },
        { value: ["ц", "ts"] },
        { value: ["ч", "ch"] },
        { value: ["ш", "sh"] },
        { value: ["щ", "shch"] },
        { value: ["ь", ""] },
        { value: ["ю", "yu"] },
        { value: ["я", "ya"] },
        { value: ["0", "0"] },
        { value: ["1", "1"] },
        { value: ["2", "2"] },
        { value: ["3", "3"] },
        { value: ["4", "4"] },
        { value: ["5", "5"] },
        { value: ["6", "6"] },
        { value: ["7", "7"] },
        { value: ["8", "8"] },
        { value: ["9", "9"] },
        { value: [" ", "_"] },
        { value: ["a", "a"] },
        { value: ["b", "b"] },
        { value: ["c", "c"] },
        { value: ["d", "d"] },
        { value: ["e", "e"] },
        { value: ["f", "f"] },
        { value: ["g", "g"] },
        { value: ["h", "h"] },
        { value: ["i", "i"] },
        { value: ["j", "j"] },
        { value: ["k", "k"] },
        { value: ["l", "l"] },
        { value: ["m", "m"] },
        { value: ["n", "n"] },
        { value: ["o", "o"] },
        { value: ["p", "p"] },
        { value: ["q", "q"] },
        { value: ["r", "r"] },
        { value: ["s", "s"] },
        { value: ["t", "t"] },
        { value: ["u", "u"] },
        { value: ["v", "v"] },
        { value: ["w", "w"] },
        { value: ["x", "x"] },
        { value: ["y", "y"] },
        { value: ["z", "z"] },
    ];
    let list_new_word = [];
    for (let x = 0; x < word.length - 1; x++) {
        for (let y = 0; y < transcription_alpha.length; y++) {
            if (transcription_alpha[y].value[0] == word[x].toLowerCase()) {
                list_new_word.push(transcription_alpha[y].value[1]);
            }
        }
    }
    return list_new_word.join("");
};

let scrollToTop = function(top) {
    // Scroll
    window.scroll({
        top: top,
        left: 0,
        behavior: "smooth",
    });
};

let concat = function(first, last) {
    // Конкатенує ім'я
    return `${first} ${last}`;
};

let setBrakeDate = function(dt) {
    // Ділить дату на добу та години
    let newDate = String(dt).split("T");
    let objDate = [
        { when: newDate[0], value: 0 },
        {
            when: newDate[1].split("+")[0].split(":").slice(0, 2).join(":"),
            value: 1,
        },
    ];
    let correctDate = `${objDate[0].when} о ${objDate[1].when}`;
    return correctDate;
};

let slugGet = function(slug) {
    let dd = [
        { slugUrl: "/archive-news", goToUrl: "news/" },
        { slugUrl: "/archive-plays", goToUrl: "plays/" },
        { slugUrl: "/archive-all", goToUrl: "" },
    ];
    for (let x = 0; x < dd.length; x++) {
        if (slug == dd[x].slugUrl) {
            return dd[x].goToUrl;
        }
    }
};

let getBeginCoordElement = function(idElement) {
    let el = document.querySelector(idElement);
    let beginElement = el.getBoundingClientRect();
    return beginElement;
};

export {
    monthData,
    sliceString,
    transcription,
    scrollToTop,
    concat,
    setBrakeDate,
    slugGet,
    getBeginCoordElement,
};