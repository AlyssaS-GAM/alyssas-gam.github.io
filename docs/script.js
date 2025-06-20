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

function updateDisplay() {
  flourCountSpan.textContent = flour;
  flourUpgradeCostSpan.textContent = getFlourUpgradeCost();
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

updateDisplay();