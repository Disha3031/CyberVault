// Native Audio Synthesis Engine Framework (No local file paths needed)
const audioCtx = new(window.AudioContext || window.webkitAudioContext)();

function playSystemTick(frequency, duration, type = "sine", customVolume = 0.04) {
    try {
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        gainNode.gain.setValueAtTime(customVolume, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + duration);
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {}
}

// DOM Nodes Cache
const mainVault = document.getElementById("main-vault");
const passwordDisplay = document.getElementById("password-display");
const generateBtn = document.getElementById("generate-btn");
const copyBtn = document.getElementById("copy-btn");
const toggleVisibilityBtn = document.getElementById("toggle-visibility-btn");
const lengthSlider = document.getElementById("length-slider");
const lengthVal = document.getElementById("length-val");
const dropZone = document.getElementById("cloud-drop-zone");
const themeToggle = document.getElementById("theme-toggle");

const chkUpper = document.getElementById("chk-uppercase");
const chkLower = document.getElementById("chk-lowercase");
const chkNum = document.getElementById("chk-numbers");
const chkSym = document.getElementById("chk-symbols");

const scoreNum = document.getElementById("score-num");
const bossTier = document.getElementById("boss-tier");
const bossDesc = document.getElementById("boss-desc");
const progressFill = document.getElementById("progress-fill");
const scoreCard = document.getElementById("rpg-card");
const toast = document.getElementById("achievement-toast");

const entropyDisplay = document.getElementById("entropy-display");
const crackTimeDisplay = document.getElementById("crack-time-display");
const historyContainer = document.getElementById("history-container");

// Local Session Memory State
let sessionHistory = [];

// Theme Controller Pipeline
themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    themeToggle.innerText = newTheme === "dark" ? "☀️ Mode" : "🌙 Mode";
    playSystemTick(520, 0.05, "sine");
});

[lengthSlider, chkUpper, chkLower, chkNum, chkSym].forEach(element => {
    element.addEventListener("input", () => {
        playSystemTick(440, 0.04, "triangle");
        if (element === lengthSlider) lengthVal.innerText = lengthSlider.value;
    });
});

generateBtn.addEventListener("click", (e) => {
    initGenerateProcess();
    triggerButtonShockwaveParticles(e);
});
copyBtn.addEventListener("click", () => handleClipboardCopyAction(passwordDisplay.value));
toggleVisibilityBtn.addEventListener("click", handleVisibilityToggleAction);

function handleVisibilityToggleAction() {
    playSystemTick(350, 0.06, "sine");
    const isHidden = passwordDisplay.type === "password";
    passwordDisplay.type = isHidden ? "text" : "password";
    toggleVisibilityBtn.innerText = isHidden ? "🙈" : "👁️";
}

/**
 * Secondary Interactive Button Micro-Burst Particle Simulation
 */
function triggerButtonShockwaveParticles(event) {
    const rect = generateBtn.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = rect.top / window.innerHeight;

    confetti({
        particleCount: 20,
        spread: 35,
        origin: { x: x, y: y },
        colors: ['#00f2fe', '#9333ea'],
        disableForReducedMotion: true
    });
}

/**
 * CSPRNG Engine Cryptographic Assembly
 */
function secureRandomInt(max) {
    const array = new Uint32Array(1);
    window.crypto.getRandomValues(array);
    return array[0] % max;
}

function generateRawPassword(length, pools) {
    let combinedPool = pools.join("");
    let generated = "";
    pools.forEach(pool => { generated += pool[secureRandomInt(pool.length)]; });
    for (let i = generated.length; i < length; i++) {
        generated += combinedPool[secureRandomInt(combinedPool.length)];
    }
    return generated.split('').sort(() => 0.5 - Math.random()).join('');
}

function initGenerateProcess() {
    const length = parseInt(lengthSlider.value);
    let activePools = [];
    let poolSize = 0;

    if (chkUpper.checked) {
        activePools.push("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        poolSize += 26;
    }
    if (chkLower.checked) {
        activePools.push("abcdefghijklmnopqrstuvwxyz");
        poolSize += 26;
    }
    if (chkNum.checked) {
        activePools.push("0123456789");
        poolSize += 10;
    }
    if (chkSym.checked) {
        activePools.push("!@#$%^&*()_+-=[]{}|;:,.<>?");
        poolSize += 26;
    }

    if (activePools.length === 0) {
        passwordDisplay.value = "";
        passwordDisplay.placeholder = "Select Options!";
        return;
    }

    const secureTargetStr = generateRawPassword(length, activePools);
    runCloudDropEffect(secureTargetStr, length, activePools.length, poolSize);
}

/**
 * Visual Effect Engine: Cloud Drop Cascade Animation
 */
function runCloudDropEffect(finalPassword, length, activePoolCount, poolSize) {
    dropZone.innerHTML = "";
    passwordDisplay.value = "";
    passwordDisplay.placeholder = "";
    generateBtn.disabled = true;

    scoreNum.innerText = "0";
    progressFill.style.width = "0%";

    const isMaskedMode = (passwordDisplay.type === "password");
    const characters = finalPassword.split("");

    characters.forEach((char, index) => {
        const span = document.createElement("span");
        span.innerText = isMaskedMode ? "•" : char;
        span.className = "falling-letter";
        dropZone.appendChild(span);

        setTimeout(() => {
            span.classList.add("landed");
            playSystemTick(520 + (index * 40), 0.04, "sine", 0.06);

            if (index === characters.length - 1) {
                setTimeout(() => {
                    passwordDisplay.value = finalPassword;
                    dropZone.innerHTML = "";
                    passwordDisplay.placeholder = "Click Generate...";
                    generateBtn.disabled = false;

                    const entropyBits = Math.floor(length * Math.log2(poolSize));
                    runSpeedometerRollup(finalPassword, length, activePoolCount, entropyBits);
                    appendHistoryRecord(finalPassword);
                }, 260);
            }
        }, index * 60);
    });
}

function runSpeedometerRollup(pwd, len, categoryCount, entropyBits) {
    let baseScore = Math.floor((entropyBits / 128) * 100);
    let finalScore = Math.min(Math.max(baseScore, len * 3), 100);

    let targetCount = 0;
    mainVault.classList.remove("cyber-pulse-active");

    const scoreInterval = setInterval(() => {
        if (targetCount >= finalScore) {
            scoreNum.innerText = finalScore;
            progressFill.style.width = `${finalScore}%`;
            clearInterval(scoreInterval);
            lockFinalTierState(finalScore, entropyBits);
        } else {
            targetCount += 2;
            let currentInstantScore = Math.min(targetCount, finalScore);
            scoreNum.innerText = currentInstantScore;
            progressFill.style.width = `${currentInstantScore}%`;
            playSystemTick(300 + (currentInstantScore * 4), 0.02, "triangle", 0.02);
        }
    }, 12);
}

/**
 * Four-Tier Color Coded State Transitions Mapper (Red -> Orange -> Yellow -> Green)
 */
function lockFinalTierState(finalScore, entropy) {
    entropyDisplay.innerText = `${entropy} bits`;

    let structuralTimeStr = "Instantaneous";
    if (entropy > 30 && entropy <= 55) structuralTimeStr = "A few hours";
    else if (entropy > 55 && entropy <= 75) structuralTimeStr = "Several Months";
    else if (entropy > 75) structuralTimeStr = "Millions of Years";
    crackTimeDisplay.innerText = structuralTimeStr;

    if (finalScore < 35) {
        // Red State Profile
        document.documentElement.style.setProperty('--dynamic-tier-color', 'var(--tier-red)');
        document.documentElement.style.setProperty('--tier-glow', 'rgba(239, 68, 68, 0.3)');
        bossTier.innerText = "Fragile Slime";
        bossDesc.innerText = "Threat Class: F. Critical structural design vulnerability.";

        mainVault.classList.add("shake-triggered");
        playSystemTick(110, 0.25, "sawtooth", 0.05);
        setTimeout(() => mainVault.classList.remove("shake-triggered"), 400);

    } else if (finalScore >= 35 && finalScore < 60) {
        // Orange State Profile
        document.documentElement.style.setProperty('--dynamic-tier-color', 'var(--tier-orange)');
        document.documentElement.style.setProperty('--tier-glow', 'rgba(249, 115, 22, 0.3)');
        bossTier.innerText = "Dungeon Guard";
        bossDesc.innerText = "Threat Class: D. Standard baseline protection.";
    } else if (finalScore >= 60 && finalScore < 85) {
        // Yellow State Profile
        document.documentElement.style.setProperty('--dynamic-tier-color', 'var(--tier-yellow)');
        document.documentElement.style.setProperty('--tier-glow', 'rgba(234, 179, 8, 0.3)');
        bossTier.innerText = "Elite Commander";
        bossDesc.innerText = "Threat Class: B. Multi-layered structural matrix layout.";
    } else {
        // Green State Profile
        document.documentElement.style.setProperty('--dynamic-tier-color', 'var(--tier-green)');
        document.documentElement.style.setProperty('--tier-glow', 'rgba(34, 197, 148, 0.3)');
        bossTier.innerText = "Cyber Dragon Defeated";
        bossDesc.innerText = "Threat Class: S-Rank. Unbreakable secure system profile.";
        mainVault.classList.add("cyber-pulse-active");

        if (finalScore === 100 && !localStorage.getItem("ach_perfect")) {
            triggerNotificationToast("🏆 ACHIEVEMENT UNLOCKED", "Paranoid Android");
            localStorage.setItem("ach_perfect", "true");
        }
    }
}

/**
 * Telemetry Panel: Interactive History Recording Pipeline
 */
function appendHistoryRecord(pwd) {
    sessionHistory.unshift({
        text: pwd,
        hidden: true
    });
    if (sessionHistory.length > 5) sessionHistory.pop();
    renderHistoryContainer();
}

function renderHistoryContainer() {
    historyContainer.innerHTML = "";

    if (sessionHistory.length === 0) {
        historyContainer.innerHTML = `<p class="empty-history-msg">No active historic generations recorded.</p>`;
        return;
    }

    sessionHistory.forEach((item) => {
        const div = document.createElement("div");
        div.className = "history-item";

        const displayText = item.hidden ? "•".repeat(Math.min(item.text.length, 14)) : item.text;
        const eyeIcon = item.hidden ? "👁️" : "🙈";

        div.innerHTML = `
            <span>${displayText}</span>
            <div class="history-actions">
                <button class="history-toggle-btn" title="Toggle Secret Visibility">${eyeIcon}</button>
                <button class="history-copy-btn" title="Copy Secret">📋</button>
            </div>
        `;

        // Individualized Mask Toggle Listener Event
        div.querySelector(".history-toggle-btn").addEventListener("click", () => {
            playSystemTick(350, 0.05, "sine");
            item.hidden = !item.hidden;
            renderHistoryContainer();
        });

        div.querySelector(".history-copy-btn").addEventListener("click", () => {
            handleClipboardCopyAction(item.text);
        });

        historyContainer.appendChild(div);
    });
}

function handleClipboardCopyAction(textVal) {
    if (!textVal || textVal.includes("Select Options!")) return;

    navigator.clipboard.writeText(textVal);
    playSystemTick(700, 0.08, "sine", 0.05);

    confetti({ particleCount: 45, spread: 40, origin: { y: 0.85 }, colors: ['#00f2fe', '#22c55e'] });
    triggerNotificationToast("⚡ SYSTEM COPY TOAST", "Secret moved into runtime cache!");
}

function triggerNotificationToast(title, desc) {
    document.getElementById("toast-title").innerText = title;
    document.getElementById("toast-desc-text").innerText = desc;
    document.getElementById("toast-icon").innerText = title.includes("ACHIEVEMENT") ? "🏆" : "⚡";

    toast.classList.add("active");
    setTimeout(() => toast.classList.remove("active"), 3500);
}