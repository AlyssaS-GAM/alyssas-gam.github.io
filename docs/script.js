let flour = 0;
let flourPerClick = 1;
let flourUpgradeLevel = 0;
let flourUpgradeBaseCost = 10;

let milk = 0;
let milkUnlocked = false;

let eggs = 0;
let eggsUnlocked = false;

const flourCountSpan = document.getElementById('flourCount');
const flourButton = document.getElementById('flourButton');
const flourUpgradeButton = document.getElementById('flourUpgrade');
const flourUpgradeCostSpan = document.getElementById('flourUpgradeCost');

const milkCountSpan = document.getElementById('milkCount');
const milkButton = document.getElementById('milkButton');
const milkSection = document.getElementById('milkSection');

const eggCountSpan = document.getElementById('eggCount');
const eggButton = document.getElementById('eggButton');
const eggSection = document.getElementById('eggSection');

function updateDisplay() {
  flourCountSpan.textContent = flour;
  flourUpgradeCostSpan.textContent = getFlourUpgradeCost();

  // Unlock Milk
  if (!milkUnlocked && flour >= 50) {
    milkUnlocked = true;
    milkSection.style.display = 'block';
    milkButton.style.display = 'inline-block';
  }

  // Unlock Eggs
  if (!eggsUnlocked && milk >= 50 && flour >= 100) {
    eggsUnlocked = true;
    eggSection.style.display = 'block';
    eggButton.style.display = 'inline-block';
  }

  // Update count
  milkCountSpan.textContent = milk;
  eggCountSpan.textContent = eggs;
}

function getFlourUpgradeCost() {
  return flourUpgradeBaseCost * Math.pow(2, flourUpgradeLevel);
}

flourButton.addEventListener('click', () => {
  flour += flourPerClick;
  updateDisplay();
});

flourUpgradeButton.addEventListener('click', () => {
  const cost = getFlourUpgradeCost();
  if (flour >= cost) {
    flour -= cost;
    flourUpgradeLevel++;
    flourPerClick += 1;
    updateDisplay();
  }
});

milkButton.addEventListener('click', () => {
  milk++;
  updateDisplay();
});

eggButton.addEventListener('click', () => {
  eggs++;
  updateDisplay();
});

updateDisplay();