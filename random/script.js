const board = document.getElementById('board');
const rollBtn = document.getElementById('rollBtn');
const truthModal = document.getElementById('truthModal');
const truthQuestion = document.getElementById('truthQuestion');

let positions = [1, 1]; // [Pemain 1, Pemain 2]
let currentPlayer = 0; // 0 untuk P1, 1 untuk P2

const snakesLadders = { 3: 22, 5: 8, 11: 26, 20: 29, 27: 1, 21: 9, 17: 4, 19: 7 };

const truthList = [
    "Apa ketakutan terbesarmu?",
    "Siapa orang yang terakhir kamu kepoin di media sosial?",
    "Apa kebohongan terakhir yang kamu ucapkan?",
    "Pernahkah kamu pura-pura sakit untuk menghindari acara?",
    "Apa hal paling memalukan yang pernah kamu lakukan?",
    "Jika kamu bisa bertukar nasib dengan seseorang di ruangan ini, siapa itu?",
    "Apa rahasia yang belum pernah kamu ceritakan ke orang tua?"
];

function createBoard() {
    board.innerHTML = '';
    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = `cell-${i}`;
        cell.innerText = i;
        board.appendChild(cell);
    }
    updateDisplay();
}

function updateDisplay() {
    document.querySelectorAll('.cell').forEach(c => {
        c.classList.remove('p1', 'p2');
        c.innerHTML = c.id.replace('cell-', ''); 
    });

    // Taruh Pemain 1
    const cell1 = document.getElementById(`cell-${positions[0]}`);
    cell1.classList.add('p1');
    
    // Taruh Pemain 2
    const cell2 = document.getElementById(`cell-${positions[1]}`);
    cell2.classList.add('p2');

    document.getElementById('p1-pos').innerText = positions[0];
    document.getElementById('p2-pos').innerText = positions[1];
    document.getElementById('currentPlayerName').innerText = `Pemain ${currentPlayer + 1}`;
    document.getElementById('currentPlayerName').style.color = currentPlayer === 0 ? 'red' : 'blue';
}

rollBtn.addEventListener('click', () => {
    const dice = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').innerText = `Dadu: ${dice}`;

    let nextPos = positions[currentPlayer] + dice;

    if (nextPos <= 100) {
        // Cek Ular/Tangga
        if (snakesLadders[nextPos]) {
            nextPos = snakesLadders[nextPos];
        }
        positions[currentPlayer] = nextPos;
        updateDisplay();

        // Munculkan Truth jika bukan di kotak 100
        if (nextPos < 100) {
            showTruth();
        }
    }

    if (positions[currentPlayer] === 100) {
        alert(`Selamat! Pemain ${currentPlayer + 1} Menang!`);
        positions = [1, 1];
        updateDisplay();
    } else {
        // Ganti giliran
        currentPlayer = currentPlayer === 0 ? 1 : 0;
    }
});

function showTruth() {
    const randomIdx = Math.floor(Math.random() * truthList.length);
    truthQuestion.innerText = truthList[randomIdx];
    truthModal.style.display = 'flex';
    rollBtn.disabled = true; // Kunci tombol dadu sampai pertanyaan dijawab
}

function closeModal() {
    truthModal.style.display = 'none';
    rollBtn.disabled = false;
}

createBoard();