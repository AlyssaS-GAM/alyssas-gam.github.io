let flour = 0;
let flourPerClick = 1;
let flourUpgradeLevel = 0;
let flourUpgradeBaseCost = 10;
let milk = 0;
let milkUnlocked = false;
let eggs = 0;
let eggsUnlocked = false;
let waffles = 0;

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

function createPassiveUpgrade(resourceName) {
  const container = document.getElementById('passiveUpgrades');

  const button = document.createElement('button');
  button.id = `${resourceName}PassiveUpgrade`;
  button.textContent = `Upgrade ${capitalize(resourceName)} (+1/sec) – Cost: ${passiveUpgrades[resourceName].currentCost}`;
  button.style.margin = '5px';
  button.disabled = true;

  button.addEventListener('click', () => {
    const cost = passiveUpgrades[resourceName].currentCost;
    
    if (resources[resourceName]() >= cost) {
      subtractResource[resourceName](cost);

      passiveUpgrades[resourceName].level++;
      passiveUpgrades[resourceName].currentCost = passiveUpgrades[resourceName].baseCost * Math.pow(2, passiveUpgrades[resourceName].level);

      button.textContent = `Upgrade ${capitalize(resourceName)} (+${passiveUpgrades[resourceName].level}/sec) – Cost: ${passiveUpgrades[resourceName].currentCost}`;
      
      updateDisplay();
    }
  });

  container.appendChild(button);
}



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

  // Update count
  milkCountSpan.textContent = milk;
  eggCountSpan.textContent = eggs;
  waffleCountSpan.textContent = waffles;

  // Enable passive upgrades when resources are unlocked
document.getElementById('flourPassiveUpgrade').disabled = !milkUnlocked; // flour starts first
document.getElementById('milkPassiveUpgrade').disabled = !milkUnlocked;
document.getElementById('eggsPassiveUpgrade').disabled = !eggsUnlocked;
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

waffleButton.addEventListener('click', () => {
  if (flour >= 1 && milk >= 1 && eggs >= 1) {
    flour--;
    milk--;
    eggs--;
    waffles++;
    updateDisplay();
  }
});

createPassiveUpgrade('flour');
createPassiveUpgrade('milk');
createPassiveUpgrade('eggs');

setInterval(() => {
  flour += passiveUpgrades.flour.level;
  milk += passiveUpgrades.milk.level;
  eggs += passiveUpgrades.eggs.level;
  updateDisplay();
}, 1000);

updateDisplay();
