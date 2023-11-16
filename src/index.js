// V A R I A B L E S
let state = {
    mode: '',
    users: []
};
const fields = ['', '', '', '', '', '', '', '', ''];
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
const startPage = document.querySelector('.start-mode');
const form = document.getElementsByTagName('form');
const buttonGroupDiv = document.querySelector('.button-group');
const buttons = buttonGroupDiv.querySelectorAll('button');
const zone = document.createElement('div');
const buttonArray = [...buttons];
const submitButton = document.createElement('button');
const header = document.createElement('header');
const main = document.createElement('main');
const footer = document.createElement('footer');
const gamepad = document.querySelector('.gamepad')


// F U N C T I O N S
const hideStartPage = () => {
    setTimeout(() => {
        startPage.style.opacity = '0';
    }, 600);
}
const createForm = () => {
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
const setDisable = () => {
    const { mode, users, selectedtype } = state;
    const images = Array.from(document.querySelectorAll('.images-container img'));
    images.map(el => el.style.border = '')
    if (selectedtype) {
        document.querySelector(`#${selectedtype}`).style.transform = 'scale(1.35)'
    }
    if (mode === 'multiplayer' && state.users.length === 2 && selectedtype || mode != 'multiplayer' && state.users.length === 1 && selectedtype) {
        submitButton.disabled = false
    } else {
        submitButton.disabled = true
    }

}
const startGame = () => {
    const [formElement] = form;
    formElement.style.display = 'none';
    zone.classList.add('game-zone');
    const loader = document.createElement('h2');
    // loader.innerHTML = 'Loading...';
    zone.append(loader)
    createHeader();
    createMain();
    createFooter();
    [...main.children].map(child => {
        child.addEventListener('click', function () {
            const drawX = () => {
                state = { ...state, selectedtype: 'zero' }
                context.beginPath();
                context.moveTo(15, 10);
                context.lineTo(x, y);
                context.lineWidth = 10;
                context.lineCap = 'round';
                context.strokeStyle = '#48D2FE';
                context.stroke();
                draw2();

            }
            const draw2 = () => {
                ctx.beginPath();
                ctx.moveTo(70, 10);
                ctx.lineTo(10, 65);
                ctx.lineWidth = 10;
                ctx.lineCap = 'round';
                ctx.strokeStyle = '#48D2FE';
                ctx.stroke();
            }
            const update = () => {
                context.clearRect(0, 0, canvas.width, canvas.height);
                x = x + animationSpeed;
                y = y + animationSpeed;
                drawX();
                if (x < 65) {
                    requestAnimationFrame(update);
                }
            }
            const drawZero = () => {
                state = { ...state, selectedtype: 'x' }
                context.beginPath();
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.arc(45, 35, 28, 0, Math.PI * 2);
                context.lineWidth = 8;
                context.strokeStyle = '#E2BE00';
                context.stroke();
            }
            fields[child.id] = state.selectedtype;
            child.disabled = true;
            const canvas = document.createElement('canvas');
            // canvas.id = child.id;
            canvas.width = 90;
            canvas.height = 70;
            const context = canvas.getContext('2d')
            const ctx = canvas.getContext('2d')
            let x = 0;
            let y = 0;
            const animationSpeed = 5;
            if (state.selectedtype === 'x') {
                drawX();
                update();
                child.append(canvas);
                isWin();
            }
            else {
                drawZero();
                child.append(canvas);
                isWin();
            }
        })
    })
    gamepad.append(zone)
}
const createHeader = () => {
    const score1 = document.createElement('div');
    const status = document.createElement('div');
    const score2 = document.createElement('div');
    [score1, status, score2].map(el => el.classList.add('header__item'));
    score1.style.backgroundColor = '#48D2FE';
    status.style.backgroundColor = '#BCDBF9';
    score2.style.backgroundColor = '#E2BE00';
    const [player1, player2] = state.users;
    score1.innerHTML = player1.name;
    score2.innerHTML = player2?.name ?? ' PC';
    header.append(score1);
    header.append(status);
    header.append(score2);
    zone.append(header)
}
const createMain = () => {
    fields.map((line, idx) => {
        const field = document.createElement('button');
        field.id = `${idx}`
        field.classList.add('main__item');
        field.style.backgroundColor = '#43115B'
        main.append(field)
        zone.append(main);
    })
}
const createFooter = () => {
    const [player1, player2] = state.users;
    const current = document.createElement('h2');
    current.innerHTML = `Next step: player ${player1.name}!`
    footer.append(current);
    zone.append(footer);
}
const drawHorizontalLine = (second, canvas) => {
    const line = Math.round(second/3) + 1;
                const cuttingArea = {
                    1:40,
                    2:140,
                    3:240,
                }
                const ctx = canvas.getContext('2d');
                ctx.beginPath();
                ctx.moveTo(10, cuttingArea[line]);
                ctx.lineTo(350, cuttingArea[line]);
                ctx.lineWidth = 20;
                ctx.lineCap = 'round';
                ctx.strokeStyle = 'red';
                ctx.stroke();
}
const drawHDiagonalLine = (first, canvas) => {
    console.log(first)
                const x1 = first > 0 ? 360 : 20
                const y1 = 20;
                const x2 = first > 0 ? 20 : 360;
                const y2 = 260;
                const ctx = canvas.getContext('2d');
                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineWidth = 20;
                ctx.lineCap = 'round';
                ctx.strokeStyle = 'red';
                ctx.stroke();
}
const isWin = () => {
    let hasWinner = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winPatterns[i];
        let a = fields[winCondition[0]];
        let b = fields[winCondition[1]];
        let c = fields[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            hasWinner = true;
            let first = winCondition[0];
            let second = winCondition[1];
            let last = winCondition[2];
            const main = document.querySelector('main')
            const canvas = document.createElement('canvas');
            canvas.classList.add('line');
            canvas.width = 380;
            canvas.height =280;
            main.append(canvas);
            if (second + 1 == last){
                drawHorizontalLine(second,canvas);
            } else if (second + 3 == last) {
            //    drawHDiagonalLine(first, canvas)
            } else {
                drawHDiagonalLine(first, canvas)
            }
            [...main.children].map(child=>child.disabled = true)
            break
        }
    }
}
// E V E N T   H A N D L E R S
buttonArray.forEach((button) => button.addEventListener('click', function () {
    buttonArray.map(button => button.disabled = true)
    state.mode = this.id;
    hideStartPage();
    setTimeout(() => {
        createForm();
    }, 1200);
}))
submitButton.addEventListener('click', function (e) {
    e.preventDefault()
    startGame();
})

