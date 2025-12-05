document.addEventListener('DOMContentLoaded', () => {
    const surpriseBtn = document.getElementById('surprise-me-btn');
    const modal = document.getElementById('hangman-modal');
    const closeBtn = document.querySelector('.close-modal');
    const wordDisplay = document.getElementById('word-display');
    const keyboardDiv = document.getElementById('keyboard');
    const messageDiv = document.getElementById('game-message');
    const guessesLeftDiv = document.getElementById('guesses-left');
    const restartBtn = document.getElementById('restart-btn');

    const targetPhrase = surpriseBtn ? (surpriseBtn.getAttribute('data-target-phrase') || "Welcome, Nguyen Thi Minh Khai") : "Welcome, Nguyen Thi Minh Khai";
    const maxGuesses = 5;
    let guessesLeft = maxGuesses;
    let guessedLetters = new Set();
    let gameActive = false;

    // Initialize Game
    function initGame() {
        guessesLeft = maxGuesses;
        guessedLetters.clear();
        gameActive = true;
        messageDiv.textContent = "";
        restartBtn.style.display = "none";
        updateDisplay();
        createKeyboard();
    }

    // Create Keyboard
    function createKeyboard() {
        keyboardDiv.innerHTML = '';
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        alphabet.split('').forEach(letter => {
            const btn = document.createElement('button');
            btn.textContent = letter;
            btn.classList.add('key-btn');
            btn.addEventListener('click', () => handleGuess(letter));
            keyboardDiv.appendChild(btn);
        });
    }

    // Handle Guess
    function handleGuess(letter) {
        if (!gameActive || guessedLetters.has(letter)) return;

        guessedLetters.add(letter);

        // Disable the button
        const buttons = document.querySelectorAll('.key-btn');
        buttons.forEach(btn => {
            if (btn.textContent === letter) {
                btn.disabled = true;
                btn.classList.add('used');
            }
        });

        const upperPhrase = targetPhrase.toUpperCase();
        if (!upperPhrase.includes(letter)) {
            guessesLeft--;
        }

        updateDisplay();
        checkGameOver();
    }

    // Update Display
    function updateDisplay() {
        guessesLeftDiv.textContent = `Guesses Left: ${guessesLeft}`;

        let displayHTML = '';
        for (let char of targetPhrase) {
            if (/[a-zA-Z]/.test(char)) {
                if (guessedLetters.has(char.toUpperCase())) {
                    displayHTML += `<span class="letter">${char}</span>`;
                } else {
                    displayHTML += `<span class="letter">_</span>`;
                }
            } else {
                displayHTML += `<span class="letter spacer">${char}</span>`;
            }
        }
        wordDisplay.innerHTML = displayHTML;
    }

    // Check Game Over
    function checkGameOver() {
        const upperPhrase = targetPhrase.toUpperCase();
        const isWon = [...upperPhrase].every(char => {
            return !/[A-Z]/.test(char) || guessedLetters.has(char);
        });

        if (isWon) {
            gameActive = false;
            messageDiv.textContent = "🎉 You Won! Welcome to RMIT! 🎉";
            messageDiv.style.color = "#48ff00";
            restartBtn.style.display = "block";
            restartBtn.style.display = "block";
            disableAllKeys();
            triggerFireworks();
        } else if (guessesLeft <= 0) {
            gameActive = false;
            messageDiv.textContent = "Game Over! Try Again.";
            messageDiv.style.color = "#ff0000";
            restartBtn.style.display = "block";
            disableAllKeys();
        }
    }

    function disableAllKeys() {
        const buttons = document.querySelectorAll('.key-btn');
        buttons.forEach(btn => btn.disabled = true);
    }

    function triggerFireworks() {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 2000 };

        const random = (min, max) => Math.random() * (max - min) + min;

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.1, 0.3), y: Math.random() - 0.2 } }));
            confetti(Object.assign({}, defaults, { particleCount, origin: { x: random(0.7, 0.9), y: Math.random() - 0.2 } }));
        }, 250);
    }

    // Event Listeners
    if (surpriseBtn) {
        surpriseBtn.addEventListener('click', () => {
            modal.style.display = "flex";
            initGame();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', initGame);
    }

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // Keyboard Support
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === "flex" && gameActive) {
            const key = e.key.toUpperCase();
            if (/^[A-Z]$/.test(key)) {
                handleGuess(key);
            }
        }
    });
});
