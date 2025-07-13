let flour = 0;
let flourPerClick = 1;
let flourUpgradeLevel = 0;
let flourUpgradeBaseCost = 10;

let milk = 0;
let milkUnlocked = false;
let milkClickPower = 1;
let milkClickUpgradeLevel = 0;
let milkClickBaseCost = 20;

let eggs = 0;
let eggsUnlocked = false;
let eggClickPower = 1;
let eggClickUpgradeLevel = 0;
let eggClickBaseCost = 30;

let waffles = 0;
let waffleCost = {
  flour: 1,
  milk: 1,
  eggs: 1
};

const flourCountSpan = document.getElementById('flourCount');
const flourButton = document.getElementById('flourButton');
const flourUpgradeButton = document.getElementById('flourUpgrade');
const flourPassiveUpgradeButton = document.getElementById('flourPassiveUpgrade');
const flourUpgradeCostSpan = document.getElementById('flourUpgradeCost');

const milkCountSpan = document.getElementById('milkCount');
const milkButton = document.getElementById('milkButton');
const milkPassiveUpgradeButton = document.getElementById('milkPassiveUpgrade');
const milkSection = document.getElementById('milkSection');

const eggCountSpan = document.getElementById('eggCount');
const eggButton = document.getElementById('eggButton');
const eggsPassiveUpgradeButton = document.getElementById('eggsPassiveUpgrade');
const eggSection = document.getElementById('eggSection');

const waffleCountSpan = document.getElementById('waffleCount');
const waffleButton = document.getElementById('waffleButton');


function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

let passiveUpgrades = {
  flour: { level: 0, baseCost: 20, currentCost: 20 },
  milk: { level: 0, baseCost: 40, currentCost: 40 },
  eggs: { level: 0, baseCost: 60, currentCost: 60 },
};

let resources = {
  flour: () => flour,
  milk: () => milk,
  eggs: () => eggs
};

let addResource = {
  flour: val => flour += val,
  milk: val => milk += val,
  eggs: val => eggs += val
};

let subtractResource = {
  flour: val => flour -= val,
  milk: val => milk -= val,
  eggs: val => eggs -= val
};

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
  // Unlock Waffles
  if (flour >= 1 && milk >= 1 && eggs >= 1) {
    waffleButton.disabled = false;
  } else {
    waffleButton.disabled = true;
  }

  waffleButton.textContent = `Make Waffle (${waffleCost.flour}F / ${waffleCost.milk}M / ${waffleCost.eggs}E)`;

  // Update count
  milkCountSpan.textContent = milk;
  eggCountSpan.textContent = eggs;
  waffleCountSpan.textContent = waffles;

  milkClickUpgradeCostSpan.textContent = milkClickBaseCost * Math.pow(2, milkClickUpgradeLevel);
  eggClickUpgradeCostSpan.textContent = eggClickBaseCost * Math.pow(2, eggClickUpgradeLevel);

  // Unlock upgrade buttons when the resource is unlocked
  if (milkUnlocked) milkClickUpgradeButton.style.display = 'inline-block';
  if (eggsUnlocked) eggClickUpgradeButton.style.display = 'inline-block';

  if (milkUnlocked) {
    document.getElementById('flourPassiveUpgrade').style.display = 'inline-block';
    document.getElementById('milkPassiveUpgrade').style.display = 'inline-block';
  }
  if (eggsUnlocked) {
    document.getElementById('eggsPassiveUpgrade').style.display = 'inline-block';
  }

  // Update passive upgrade button text
  flourPassiveUpgradeButton.textContent = `Upgrade Flour (+${passiveUpgrades.flour.level}/sec) – Cost: ${passiveUpgrades.flour.currentCost}`;
  milkPassiveUpgradeButton.textContent = `Upgrade Milk (+${passiveUpgrades.milk.level}/sec) – Cost: ${passiveUpgrades.milk.currentCost}`;
  eggsPassiveUpgradeButton.textContent = `Upgrade Eggs (+${passiveUpgrades.eggs.level}/sec) – Cost: ${passiveUpgrades.eggs.currentCost}`;

  // Enable buttons when unlocked
  flourPassiveUpgradeButton.disabled = false;
  milkPassiveUpgradeButton.disabled = !milkUnlocked;
  eggsPassiveUpgradeButton.disabled = !eggsUnlocked;

  document.getElementById("incomeDisplay").textContent =
  passiveUpgrades.flour.level +
  passiveUpgrades.milk.level +
  passiveUpgrades.eggs.level;
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
  milk += milkClickPower;
  updateDisplay();
});

const milkClickUpgradeButton = document.getElementById('milkClickUpgrade');
const milkClickUpgradeCostSpan = document.getElementById('milkClickUpgradeCost');

milkClickUpgradeButton.addEventListener('click', () => {
  const cost = milkClickBaseCost * Math.pow(2, milkClickUpgradeLevel);
  if (milk >= cost) {
    milk -= cost;
    milkClickUpgradeLevel++;
    milkClickPower++;
    updateDisplay();
  }
});

eggButton.addEventListener('click', () => {
  eggs += eggClickPower;
  updateDisplay();
});

const eggClickUpgradeButton = document.getElementById('eggClickUpgrade');
const eggClickUpgradeCostSpan = document.getElementById('eggClickUpgradeCost');

eggClickUpgradeButton.addEventListener('click', () => {
  const cost = eggClickBaseCost * Math.pow(2, eggClickUpgradeLevel);
  if (eggs >= cost) {
    eggs -= cost;
    eggClickUpgradeLevel++;
    eggClickPower++;
    updateDisplay();
  }
});

flourPassiveUpgradeButton.addEventListener('click', () => {
  const cost = passiveUpgrades.flour.currentCost;
  if (flour >= cost) {
    flour -= cost;
    passiveUpgrades.flour.level++;
    passiveUpgrades.flour.currentCost = passiveUpgrades.flour.baseCost * Math.pow(2, passiveUpgrades.flour.level);
    updateDisplay();
  }
});

milkPassiveUpgradeButton.addEventListener('click', () => {
  const cost = passiveUpgrades.milk.currentCost;
  if (milk >= cost) {
    milk -= cost;
    passiveUpgrades.milk.level++;
    passiveUpgrades.milk.currentCost = passiveUpgrades.milk.baseCost * Math.pow(2, passiveUpgrades.milk.level);
    updateDisplay();
  }
});

eggsPassiveUpgradeButton.addEventListener('click', () => {
  const cost = passiveUpgrades.eggs.currentCost;
  if (eggs >= cost) {
    eggs -= cost;
    passiveUpgrades.eggs.level++;
    passiveUpgrades.eggs.currentCost = passiveUpgrades.eggs.baseCost * Math.pow(2, passiveUpgrades.eggs.level);
    updateDisplay();
  }
});

waffleButton.addEventListener('click', () => {
  if (
    flour >= waffleCost.flour &&
    milk >= waffleCost.milk &&
    eggs >= waffleCost.eggs
  ) {
    flour -= waffleCost.flour;
    milk -= waffleCost.milk;
    eggs -= waffleCost.eggs;
    waffles++;

    // Increase future waffle costs
    waffleCost.flour++;
    waffleCost.milk++;
    waffleCost.eggs++;

    updateDisplay();
  }
});

setInterval(() => {
  flour += passiveUpgrades.flour.level;
  milk += passiveUpgrades.milk.level;
  eggs += passiveUpgrades.eggs.level;
  updateDisplay();
}, 1000);

updateDisplay();
