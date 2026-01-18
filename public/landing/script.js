// Character Customization System
const modal = document.getElementById('characterModal');
const connectWalletBtn = document.querySelector('.connect-wallet-btn');
const createCharacterBtn = document.getElementById('createCharacterBtn');

// Character state
const character = {
    skin: 'light',
    hairStyle: 'short',
    hairColor: 'black',
    armor: 'light',
    weapon: 'sword',
    name: ''
};

// Skin tone colors
const skinColors = {
    light: '#F5D7B1',
    medium: '#D4A574',
    tan: '#C19A6B',
    dark: '#8B6F47'
};

// Hair colors
const hairColors = {
    black: '#2C1810',
    brown: '#654321',
    blonde: '#DAA520',
    red: '#8B4513'
};

// Wallet connection state
let isWalletConnected = false;

// Check if wallet is already connected (from localStorage or session)
function checkWalletConnection() {
    // Check if user has previously connected
    const walletAddress = localStorage.getItem('walletAddress');
    if (walletAddress) {
        isWalletConnected = true;
        updateWalletButton(walletAddress);
    }
}

// Update wallet button display
function updateWalletButton(address) {
    if (address) {
        const shortAddress = `${address.slice(0, 6)}...${address.slice(-4)}`;
        connectWalletBtn.innerHTML = `
            <svg class="wallet-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
            </svg>
            <span>${shortAddress}</span>
            <span style="margin-left: 8px; font-size: 0.8em; opacity: 0.7;">(Right-click to disconnect)</span>
        `;

        // Add right-click to disconnect
        connectWalletBtn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            disconnectWallet();
        });
    }
}

// Disconnect wallet function
function disconnectWallet() {
    if (confirm('Disconnect wallet?')) {
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('gladiatorCharacter');
        isWalletConnected = false;

        // Reset button
        connectWalletBtn.innerHTML = `
            <svg class="wallet-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
            </svg>
            <span>Connect Wallet</span>
        `;

        // Remove event listener
        connectWalletBtn.removeEventListener('contextmenu', disconnectWallet);

        alert('Wallet disconnected successfully!');
    }
}

// Connect wallet function
async function connectWallet() {
    try {
        // Check if ethereum provider exists (MetaMask, etc.)
        if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const address = accounts[0];

            // Store wallet address
            localStorage.setItem('walletAddress', address);
            isWalletConnected = true;
            updateWalletButton(address);

            // Now show character creator
            modal.classList.add('active');
        } else {
            alert('Please install MetaMask or another Web3 wallet to continue!');
        }
    } catch (error) {
        console.error('Wallet connection failed:', error);
        alert('Failed to connect wallet. Please try again.');
    }
}

// Open modal when Connect Wallet is clicked
connectWalletBtn.addEventListener('click', async () => {
    if (!isWalletConnected) {
        // First connect wallet
        await connectWallet();
    } else {
        // Already connected, just show character creator
        modal.classList.add('active');
    }
});

// Check wallet connection on page load
checkWalletConnection();

// Skin tone selection
document.querySelectorAll('.skin-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.skin-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        character.skin = this.dataset.skin;
        updateCharacter();
    });
});

// Hair style selection
document.querySelectorAll('.hair-style-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.hair-style-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        character.hairStyle = this.dataset.hair;
        updateCharacter();
    });
});

// Hair color selection
document.querySelectorAll('.hair-color-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.hair-color-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        character.hairColor = this.dataset.color;
        updateCharacter();
    });
});

// Armor selection
document.querySelectorAll('.armor-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.armor-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        character.armor = this.dataset.armor;
        updateCharacter();
    });
});

// Weapon selection
document.querySelectorAll('.weapon-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.weapon-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        character.weapon = this.dataset.weapon;
        updateCharacter();
    });
});

// Update character preview
function updateCharacter() {
    const head = document.getElementById('gladiatorHead');
    const hair = document.getElementById('gladiatorHair');
    const armor = document.getElementById('gladiatorArmor');
    const weapon = document.getElementById('gladiatorWeapon');
    const hands = document.querySelectorAll('.gladiator-hand');
    const feet = document.querySelectorAll('.gladiator-foot');

    // Update skin color
    const skinColor = skinColors[character.skin];
    head.style.background = skinColor;

    // Update hands color to match skin
    hands.forEach(hand => {
        hand.style.background = skinColor;
        // Update all fingers and thumbs within this hand
        const fingers = hand.querySelectorAll('.finger, .thumb');
        fingers.forEach(finger => {
            finger.style.background = skinColor;
        });
    });

    // Update feet/legs color to match skin
    feet.forEach(foot => {
        foot.style.setProperty('--skin-color', skinColor);
    });

    // Update hair
    hair.className = 'gladiator-hair';
    hair.classList.add(`hair-${character.hairStyle}`);
    hair.style.background = hairColors[character.hairColor];

    // Update armor
    armor.className = 'gladiator-armor';
    armor.classList.add(`armor-${character.armor}`);

    // Update weapon
    weapon.className = 'gladiator-weapon';
    weapon.classList.add(`weapon-${character.weapon}`);
}

// Create character and enter arena
createCharacterBtn.addEventListener('click', () => {
    const nameInput = document.getElementById('gladiatorName');
    character.name = nameInput.value.trim() || 'Unnamed Gladiator';

    // Save character to localStorage
    localStorage.setItem('gladiatorCharacter', JSON.stringify(character));

    // Close modal
    modal.classList.remove('active');

    // Update connect wallet button
    connectWalletBtn.innerHTML = `
        <svg class="wallet-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
        </svg>
        <span>${character.name}</span>
    `;

    // Render Player Character in Arena
    const playerChar = document.getElementById('playerCharacter');
    const playerHead = playerChar.querySelector('.player-head');
    const playerHair = playerChar.querySelector('.player-hair');
    const playerArmor = playerChar.querySelector('.player-armor');
    const playerHands = playerChar.querySelectorAll('.player-hand');
    const playerFeet = playerChar.querySelectorAll('.player-foot');
    const playerWeaponContainer = playerChar.querySelector('.player-weapon');

    // color variables
    const skinColor = skinColors[character.skin];

    // Apply Skin Color
    playerHead.style.background = skinColor;
    playerHands.forEach(hand => {
        hand.style.background = skinColor;
        // Update fingers
        const fingers = hand.querySelectorAll('.finger, .thumb');
        fingers.forEach(f => f.style.background = skinColor);
    });
    playerFeet.forEach(foot => foot.style.setProperty('--skin-color', skinColor));

    // Apply Hair
    playerHair.className = 'player-hair';
    playerHair.classList.add(`hair-${character.hairStyle}`);
    playerHair.style.background = hairColors[character.hairColor];

    // Apply Armor
    playerArmor.className = 'player-armor'; // Reset base class
    playerArmor.classList.add(`armor-${character.armor}`);

    // Apply Weapon
    playerWeaponContainer.innerHTML = ''; // Clear previous
    const weaponEl = document.createElement('div');
    weaponEl.className = `weapon-${character.weapon}`; // Uses modal CSS classes
    playerWeaponContainer.appendChild(weaponEl);

    // Create dust cloud effect
    function createDustCloud() {
        const dustContainer = document.createElement('div');
        dustContainer.className = 'landing-dust';
        dustContainer.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 200px;
            height: 100px;
            pointer-events: none;
            z-index: 100;
        `;

        // Create multiple dust particles
        for (let i = 0; i < 12; i++) {
            const dust = document.createElement('div');
            const angle = (i / 12) * 360;
            const distance = 30 + Math.random() * 40;
            const size = 10 + Math.random() * 20;

            dust.style.cssText = `
                position: absolute;
                bottom: 0;
                left: 50%;
                width: ${size}px;
                height: ${size}px;
                background: radial-gradient(circle, rgba(212, 196, 168, 0.8), rgba(212, 196, 168, 0));
                border-radius: 50%;
                animation: dustExpand ${0.6 + Math.random() * 0.4}s ease-out forwards;
                animation-delay: ${i * 0.02}s;
                transform-origin: center;
            `;

            dust.style.setProperty('--angle', `${angle}deg`);
            dust.style.setProperty('--distance', `${distance}px`);
            dustContainer.appendChild(dust);
        }

        return dustContainer;
    }

    // Play thud sound (using Web Audio API)
    function playThudSound() {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const duration = 0.3;
        const now = audioContext.currentTime;

        // Create oscillator for low thud
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        // Deep bass thud
        oscillator.frequency.setValueAtTime(80, now);
        oscillator.frequency.exponentialRampToValueAtTime(40, now + duration);

        // Volume envelope
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);

        oscillator.start(now);
        oscillator.stop(now + duration);

        // Add noise for impact
        const bufferSize = audioContext.sampleRate * duration;
        const noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.1));
        }

        const noise = audioContext.createBufferSource();
        const noiseGain = audioContext.createGain();
        const noiseFilter = audioContext.createBiquadFilter();

        noise.buffer = noiseBuffer;
        noise.connect(noiseFilter);
        noiseFilter.connect(noiseGain);
        noiseGain.connect(audioContext.destination);

        noiseFilter.type = 'lowpass';
        noiseFilter.frequency.value = 200;

        noiseGain.gain.setValueAtTime(0.3, now);
        noiseGain.gain.exponentialRampToValueAtTime(0.01, now + duration);

        noise.start(now);
        noise.stop(now + duration);
    }

    // Trigger Animation with landing effect
    playerChar.classList.remove('hidden');

    // Add landing animation
    setTimeout(() => {
        playerChar.classList.add('landing');

        // Create dust cloud
        const dust = createDustCloud();
        playerChar.appendChild(dust);

        // Play thud sound
        try {
            playThudSound();
        } catch (e) {
            console.log('Audio not available:', e);
        }

        // Remove dust after animation
        setTimeout(() => {
            dust.remove();
            playerChar.classList.remove('landing');
            playerChar.classList.add('walking');
        }, 800);
    }, 100);

    console.log('Character entering arena:', character);
});

// Initialize character on page load
window.addEventListener('load', () => {
    const savedCharacter = localStorage.getItem('gladiatorCharacter');
    if (savedCharacter) {
        const saved = JSON.parse(savedCharacter);
        Object.assign(character, saved);

        // Update button to show character name
        connectWalletBtn.innerHTML = `
            <svg class="wallet-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 18V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V5C3 3.9 3.89 3 5 3H19C20.1 3 21 3.9 21 5V6H12C10.89 6 10 6.9 10 8V16C10 17.1 10.89 18 12 18H21ZM12 16H22V8H12V16ZM16 13.5C15.17 13.5 14.5 12.83 14.5 12C14.5 11.17 15.17 10.5 16 10.5C16.83 10.5 17.5 11.17 17.5 12C17.5 12.83 16.83 13.5 16 13.5Z" fill="currentColor"/>
            </svg>
            <span>${character.name}</span>
        `;
    }

    updateCharacter();
});

// ===== CROWD SYSTEM =====
// Create a separate container for crowd (not inside arena-floor to avoid perspective)
let crowdContainer = document.querySelector('.crowd-container');
if (!crowdContainer) {
    crowdContainer = document.createElement('div');
    crowdContainer.className = 'crowd-container';
    crowdContainer.style.cssText = `
        position: absolute;
        bottom: 180px;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        height: 50%;
        pointer-events: none;
        z-index: 4;
    `;
    document.querySelector('.scene-container').appendChild(crowdContainer);
}

const crowd = [];
const CROWD_SIZE = 12;

// Randomize character attributes
function randomCharacter() {
    const skins = ['light', 'medium', 'tan', 'dark'];
    const hairStyles = ['short', 'mohawk', 'long', 'bald'];
    const hairColors = ['black', 'brown', 'blonde', 'red'];
    const armors = ['light', 'medium', 'heavy', 'champion'];
    const weapons = ['sword', 'spear', 'axe', 'trident'];

    return {
        skin: skins[Math.floor(Math.random() * skins.length)],
        hairStyle: hairStyles[Math.floor(Math.random() * hairStyles.length)],
        hairColor: hairColors[Math.floor(Math.random() * hairColors.length)],
        armor: armors[Math.floor(Math.random() * armors.length)],
        weapon: weapons[Math.floor(Math.random() * weapons.length)]
    };
}

// Create a full gladiator character
function createCrowdMember() {
    const char = randomCharacter();

    const member = document.createElement('div');
    member.className = 'crowd-member player-character standing walking';
    member.style.cssText = `
        position: absolute;
        transform: scale(0.4);
        transform-origin: bottom center;
        transition: all 0.5s ease-out;
        z-index: 10;
    `;

    // Use the same structure as player character
    member.innerHTML = `
        <div class="player-body">
            <div class="player-head">
                <div class="head-shadow"></div>
                <div class="player-hair hair-${char.hairStyle}" style="background: ${hairColors[char.hairColor]};"></div>
                <div class="face-cross">
                    <div class="cross-vertical"></div>
                    <div class="cross-horizontal"></div>
                </div>
            </div>
            <div class="player-armor armor-${char.armor}">
                <div class="body-shadow"></div>
                <div class="player-hand hand-left">
                    <div class="fingers">
                        <div class="hand-shadow"></div>
                        <div class="finger finger-1"></div>
                        <div class="finger finger-2"></div>
                        <div class="finger finger-3"></div>
                        <div class="finger thumb"></div>
                    </div>
                </div>
                <div class="player-hand hand-right">
                    <div class="player-weapon">
                        <div class="weapon-${char.weapon}"></div>
                    </div>
                    <div class="fingers">
                        <div class="hand-shadow"></div>
                        <div class="finger finger-1"></div>
                        <div class="finger finger-2"></div>
                        <div class="finger finger-3"></div>
                        <div class="finger thumb"></div>
                    </div>
                </div>
            </div>
            <div class="player-legs">
                <div class="player-foot foot-left">
                    <div class="foot-shadow"></div>
                </div>
                <div class="player-foot foot-right">
                    <div class="foot-shadow"></div>
                </div>
            </div>
        </div>
    `;

    // Apply skin tone
    const head = member.querySelector('.player-head');
    const hands = member.querySelectorAll('.player-hand');
    const feet = member.querySelectorAll('.player-foot');

    head.style.background = skinColors[char.skin];
    hands.forEach(hand => hand.style.background = skinColors[char.skin]);
    feet.forEach(foot => foot.style.background = skinColors[char.skin]);

    // Random starting position on arena floor (spread out more)
    const x = 25 + Math.random() * 50; // 25-75% of width
    const y = 35 + Math.random() * 35; // 35-70% of height

    member.style.left = `${x}%`;
    member.style.top = `${y}%`;

    member.dataset.baseX = x;
    member.dataset.baseY = y;
    member.dataset.velocityX = (Math.random() - 0.5) * 0.5;
    member.dataset.velocityY = (Math.random() - 0.5) * 0.5;
    member.dataset.scattered = 'false';

    crowdContainer.appendChild(member);
    return member;
}

// Initialize crowd
for (let i = 0; i < CROWD_SIZE; i++) {
    crowd.push(createCrowdMember());
}

// Continuous walking animation
function animateCrowd() {
    crowd.forEach(member => {
        if (member.dataset.scattered === 'true') return;

        let x = parseFloat(member.style.left);
        let y = parseFloat(member.style.top);
        let vx = parseFloat(member.dataset.velocityX);
        let vy = parseFloat(member.dataset.velocityY);

        // Update position
        x += vx;
        y += vy;

        // Bounce off boundaries (wider area)
        if (x < 25 || x > 75) {
            vx *= -1;
            member.dataset.velocityX = vx;
        }
        if (y < 35 || y > 70) {
            vy *= -1;
            member.dataset.velocityY = vy;
        }

        // Clamp to boundaries (wider area)
        x = Math.max(25, Math.min(75, x));
        y = Math.max(35, Math.min(70, y));

        member.style.left = `${x}%`;
        member.style.top = `${y}%`;

        // Randomly change direction occasionally
        if (Math.random() < 0.02) {
            member.dataset.velocityX = (Math.random() - 0.5) * 0.5;
            member.dataset.velocityY = (Math.random() - 0.5) * 0.5;
        }
    });
}

// Start continuous walking
setInterval(animateCrowd, 50);

// Scatter crowd when player lands
function scatterCrowd() {
    crowd.forEach(member => {
        member.dataset.scattered = 'true';
        member.classList.remove('walking');

        const currentX = parseFloat(member.style.left);
        const currentY = parseFloat(member.style.top);

        // Calculate direction away from center (50%, 50%)
        const dx = currentX - 50;
        const dy = currentY - 50;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Normalize and scatter outward fast
        const scatterX = currentX + (dx / distance) * 80;
        const scatterY = currentY + (dy / distance) * 80;

        member.style.left = `${scatterX}%`;
        member.style.top = `${scatterY}%`;
        member.style.opacity = '0';
        member.style.transform = 'scale(0.2)';

        // Remove after animation
        setTimeout(() => {
            member.remove();
        }, 600);
    });
}

// Hook into player landing
const originalCreateCharacter = createCharacterBtn.onclick;
createCharacterBtn.addEventListener('click', function (e) {
    // Trigger scatter when character is created
    setTimeout(() => {
        scatterCrowd();
    }, 100); // Match player drop timing
});

// BATTLE button redirect
const battleButton = document.querySelector('.battle-button');
if (battleButton) {
    battleButton.addEventListener('click', () => {
        // Redirect to the main Pear Terminal app
        window.location.href = '/battle';
    });
}
