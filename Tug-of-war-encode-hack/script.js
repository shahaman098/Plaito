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

// Open modal when Connect Wallet is clicked
connectWalletBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

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

    // Trigger Animation
    playerChar.classList.remove('hidden');
    playerChar.classList.add('walking');

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
