const board = document.getElementById('board');
const diceDisplay = document.getElementById('dice-visual');
const rollBtn = document.getElementById('roll-btn');

let pos = [1, 1];
let turn = 0; // 0 = P1, 1 = P2

// Konfigurasi Ular & Tangga
const mapping = {
    3: 22, 5: 8, 11: 26, 20: 29, 36: 55, 50: 67, // Tangga
    27: 1, 21: 9, 17: 4, 19: 7, 56: 35, 98: 78  // Ular
};

// Pertanyaan Truth bertema LDR
const ldrTruths = [
    "Apa hal yang paling kamu kangenin saat kita nggak ketemu?",
    "Pernah nggak kamu ngerasa insecure gara-gara jarak?",
    "Apa lagu yang paling ngingetin kamu sama aku?",
    "Kalau kita ketemu besok, hal pertama apa yang mau kamu lakuin?",
    "Seberapa sering kamu ngecek chat dari aku tiap hari?",
    "Apa hal paling berat menurutmu dalam hubungan LDR ini?",
    "Pernah nggak kepikiran buat nyerah karena jarak?"
];

// Buat Papan
function initBoard() {
    for (let i = 100; i >= 1; i--) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.id = 'cell-' + i;
        cell.innerText = i;
        if (mapping[i]) {
            cell.classList.add(mapping[i] > i ? 'is-ladder' : 'is-snake');
        }
        board.appendChild(cell);
    }
    // Buat Bidak
    const p1 = document.createElement('div'); p1.id = 't1'; p1.className = 'token token-p1';
    const p2 = document.createElement('div'); p2.id = 't2'; p2.className = 'token token-p2';
    board.appendChild(p1); board.appendChild(p2);
    updateTokens();
}

function updateTokens() {
    pos.forEach((p, i) => {
        const target = document.getElementById('cell-' + p);
        const token = document.getElementById('t' + (i + 1));
        token.style.left = target.offsetLeft + (i * 10) + 'px';
        token.style.top = target.offsetTop + (i * 10) + 'px';
        document.getElementById(`p${i+1}-pos`).innerText = p;
    });
}

rollBtn.onclick = () => {
    rollBtn.disabled = true;
    const dice = Math.floor(Math.random() * 6) + 1;
    diceDisplay.innerText = dice;

    if (pos[turn] + dice <= 100) {
        pos[turn] += dice;
        updateTokens();

        // Cek Ular/Tangga
        setTimeout(() => {
            if (mapping[pos[turn]]) {
                pos[turn] = mapping[pos[turn]];
                updateTokens();
            }
            
            if (pos[turn] === 100) {
                alert("Pemain " + (turn + 1) + " Menang!");
                location.reload();
            } else {
                showTruth();
            }
        }, 600);
    } else {
        switchTurn();
    }
};

function showTruth() {
    const q = ldrTruths[Math.floor(Math.random() * ldrTruths.length)];
    document.getElementById('question-text').innerText = q;
    document.getElementById('truth-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('truth-modal').style.display = 'none';
    switchTurn();
}

function switchTurn() {
    turn = turn === 0 ? 1 : 0;
    document.getElementById('active-player-name').innerText = "Pemain " + (turn + 1);
    document.getElementById('active-player-name').style.color = turn === 0 ? '#ff4757' : '#2e86de';
    rollBtn.disabled = false;
}

window.onload = initBoard;