export const utilService = {
    makeId,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomAddedTime,
    saveToStorage,
    loadFromStorage,
    shuffleArray,
    createIndexArray,
    shuffleArray,
    generateBgColor,
}

function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomAddedTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createIndexArray(n) {
    return Array.from({ length: n }, (_, i) => i);
}


function generateBgColor(index) {
    const colors = ['#ff4d6d', '#ffcc00', '#00b359', '#cc33ff', '#ff66b2', '#33ccff', '#ff5050', '#ff9900', '#6699ff', '#ff33cc', '#00cc99', '#ff9966', '#6666cc', '#ccff33', '#ff6699', '#66cccc', '#cc66ff', '#ff6666', '#3366ff', '#6600cc', '#33cc33', '#ffcc99', '#3399ff', '#ff9933', '#666699', '#ff3333', '#009999', '#996633',
        '#ff66ff', '#336600', '#ff5050', '#339966', '#9933ff', '#ffccff',
        '#33cccc', '#ff9966', '#99cc33', '#cc99ff', '#ffcc66', '#3333ff',
    ]

    const backgroundColor = colors[index % colors.length]
    return backgroundColor
}
