
let state = {
    mode: '',
    users: []
};
const store = window.localStorage;
const startPage = document.querySelector('.start-mode');
const buttonGroupDiv = document.querySelector('.button-group');
const buttons = buttonGroupDiv.querySelectorAll('button');
const buttonArray = [...buttons];
const submitButton = document.createElement('button');
const gamepad = document.querySelector('.gamepad')
const tic = {
    x1: 20,
    y1: 20,
    x2: 80,
    y2: 80
}
let circle = {
    x: 20,
    y: 55,
    size: 40,
    lineWidth: 10,
    color: '#E2BE00',
    angle: 0
}
const x = document.createElement('canvas');
x.width = 120;
x.height = 120;
x.addEventListener('mouseenter', () => animateX())
x.addEventListener('mouseleave', () => {
    cancelAnimationFrame(animationId);
    ctx.clearRect(0, 0, x.width, x.height);
    tic.x1 = 20;
    tic.x2 = 80;
    drawX()
})

const ctx = x.getContext('2d');
const zero = document.createElement('canvas');
const ctx_zero = zero.getContext('2d');
zero.width = 120;
zero.height = 120;
// zero.addEventListener('mouseenter', () => animateZero())
// zero.addEventListener('mouseleave', () => {
//     cancelAnimationFrame(animationId2);
//     drawZero();
// })
function hideStartPage() {
    setTimeout(() => {
        startPage.style.opacity = '0';
    }, 600);
}

function createForm() {
    store.clear()
    startPage.style.display = 'none';
    const form = document.createElement('form');
    const input = document.createElement('input');
    const label = document.createElement('label');
    const label2 = document.createElement('label');
    const images = document.createElement('div');
    images.classList.add('images-container');
    submitButton.innerHTML = 'Start game'
    submitButton.setAttribute('disabled', 'disabled');
    const image_x = document.createElement('img')
    const image_zero = document.createElement('img')
    image_x.src = 'assets/x.png'
    image_x.id = 'x';
    image_zero.src = 'assets/zero.png'
    image_zero.id = 'zero';
    images.append(image_x);
    images.append(image_zero);
    label.innerHTML = 'Please enter Player1 name'
    label2.innerHTML = 'Player1 make choice';
    input.setAttribute('type', 'text');
    input.setAttribute('name', 'playerName1')
    form.append(label)
    form.append(input)

    if (state.mode != 'single-player') {
        const input2 = document.createElement('input');
        const label3 = document.createElement('label');
        label3.innerHTML = 'Please enter Player2 name';
        input2.setAttribute('type', 'text');
        input2.setAttribute('name', 'playerName2')
        form.append(label3)
        form.append(input2)
        input2.addEventListener('keyup', function (e) {
            if (e.target.value != '') {
                state.users = [...state.users.filter(el => el.id != input2.name)]
                state.users.push({ name: e.target.value, id: input2.name })
            } else {
                state.users = [...state.users.filter(el => el.id != input2.name)]
            }
            setDisable()
        })
    }
    form.append(label2)
    form.append(images);
    form.append(submitButton);
    gamepad.append(form)
    const input1 = document.querySelector('input[name="playerName1"]');
    input1.addEventListener('keyup', function (e) {
        if (e.target.value != '') {
            state.users = [...state.users.filter(el => el.id != input1.name)]
            state.users.push({ name: e.target.value, id: input1.name })
        } else {
            state.users = [...state.users.filter(el => el.id != input1.name)]
        }
        setDisable()
    })
    const [x, zero] = document.querySelectorAll('.images-container img');
    x.addEventListener('click', () => {
        zero.style.transform = 'scale(1)'
        state.selectedtype = x.id;
        setDisable()
    })
    zero.addEventListener('click', () => {
        x.style.transform = 'scale(1)'
        state.selectedtype = zero.id;
        setDisable()
    })
}

function setDisable() {
    const { mode, users, selectedtype } = state;
    const images = Array.from(document.querySelectorAll('.images-container img'));
    images.map(el => el.style.border = '')
    if (selectedtype) {
        document.querySelector(`#${selectedtype}`).style.transform = 'scale(1.3)'
    }
    if (mode === 'multiplayer' && state.users.length ===2 && selectedtype || mode != 'multiplayer' && state.users.length === 1 && selectedtype) {
        submitButton.disabled = false
    } else {
        submitButton.disabled = true
    }

}
let animationId;
let animationId2;
function drawX() {
    ctx.beginPath();
    ctx.moveTo(tic.x1, tic.y1);
    ctx.lineTo(tic.x2, tic.y2);
    ctx.moveTo(tic.x2, tic.y1);
    ctx.lineTo(tic.x1, tic.y2);
    ctx.lineWidth = 15;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#48D2FE';
    ctx.stroke();
}
function drawZero() {
    const { x, y, size, color, lineWidth, angle } = circle
    ctx_zero.beginPath(20, 20);
    ctx_zero.arc(x + Math.cos(angle) * size, y + Math.sin(angle) * size, size, 0, Math.PI * 2, true)
    ctx_zero.strokeStyle = color;
    ctx_zero.lineWidth = lineWidth
    ctx_zero.stroke();
}
let value = 0;
function animateX() {
    ctx.clearRect(0, 0, x.width, x.height);
    drawX();
    tic.x1 += 3;
    tic.x2 -= 3;
    if (tic.x1 > 80) {
        tic.x1 = 20;
        tic.x2 = 80;
    }
    animationId = requestAnimationFrame(animateX);
}

function animateZero() {
    ctx_zero.clearRect(0, 0, zero.width, zero.height)
    drawZero();
    let y = circle.y;
    y += 0.1
    animationId2 = requestAnimationFrame(animateZero);
}
function setState(value) {
    state.mode = value;
}

buttonArray.forEach((button) => button.addEventListener('click', function () {
    buttonArray.map(button=>button.disabled = true)
    setState(this.id);
    hideStartPage();
    setTimeout(() => {
        createForm();
    }, 1200);
}))
