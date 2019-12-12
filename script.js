let inputs = document.getElementsByTagName("input");
const initialState = [{ text: 'Вставай завтра пораньше', time: -1 }]

function addElem() {
    let text = document.getElementById('text').value.trim()
    let inputTime = document.getElementById('dattim').value
    let id = ID()
    if ((text === '') || (inputTime == '')) {
        alert("Вставай быстрее, ты проспал!");
    } else {
        let time = new Date(inputTime).getTime()
        state.push({ text, id, time })
        newElement({ text, id, time })
        document.getElementById('text').value = ''
    }
}

const newElement = (info) => {
    let element = document.createElement("div");
    let text = document.createElement("div");
    let time = document.createElement('span')
    time.innerHTML = getTimer(info.time)
    text.className = 'text'
    text.innerHTML = `<p>${info.text}</p>`
    let del = document.createElement("button");
    del.className = "del";
    del.onclick = deleteElement
    del.id = info.id
    element.appendChild(text)
    element.appendChild(del)
    text.appendChild(time)
    document.getElementById('list').appendChild(element)
}

function deleteElement() {
    for (let i = 0; i < state.length; i++) {
        if (state[i].id === this.id) {
            state.splice(i, 1)
        }
    }
    document.getElementById('list').innerHTML = ''
    createList(state)
}

function createList(arr) {
    for (let i = 0; i < arr.length; i++) {
        newElement(arr[i])
    }
}

function getCountdowns() {
    let elems = document.getElementsByTagName('span')
    for (let i = 0; i < state.length; i++) {
        elems[i].innerHTML = getTimer(state[i].time)
    }
}

function loadState() {
    if (localStorage.getItem('todoList')) {
        state = JSON.parse(localStorage.getItem('todoList'));
    } else {
        state = initialState
    }
}

function getTimer(target_date) {
    let days, hours, minutes, seconds;
    let current_date = new Date().getTime();
    let seconds_left = (target_date - current_date) / 1000;
    if (seconds_left < 0) {
        return `Вставай, ты опаздываешь!`
    } else {
        days = parseInt(seconds_left / 86400);
        seconds_left = seconds_left % 86400;
        hours = pad(parseInt(seconds_left / 3600));
        seconds_left = seconds_left % 3600;
        minutes = pad(parseInt(seconds_left / 60));
        seconds = pad(parseInt(seconds_left % 60));
        return `${days} дней ${hours} час ${minutes} мин ${seconds} сек`
    }
}

function ID() {
    return '_' + Math.random().toString(36).substr(2, 9);
};

function pad(n) {
    return (n < 10 ? '0' : '') + n;
}

function saveAll() {
    localStorage.setItem('todoList', JSON.stringify(state));
}

loadState();
setInterval(getCountdowns, 1000);
createList(state)

inputs[0].addEventListener("keypress", (keyPressed) => {
    if (keyPressed.which === 13) {
        addElem()
    }
})
inputs[1].addEventListener("keypress", (keyPressed) => {
    if (keyPressed.which === 13) {
        addElem()
    }
})