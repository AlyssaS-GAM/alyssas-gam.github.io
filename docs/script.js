// Commit 1: Make sure the page is loaded before our code runs
document.addEventListener("DOMContentLoaded", function () {
  // --- Game variables ---
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
  let waffleCost = { flour: 1, milk: 1, eggs: 1 };

  let passiveUpgrades = {
    flour: { level: 0, baseCost: 20, currentCost: 20 },
    milk:  { level: 0, baseCost: 40, currentCost: 40 },
    eggs:  { level: 0, baseCost: 60, currentCost: 60 },
  };

  // --- Buttons and text areas from HTML ---
  const flourCountSpan = document.getElementById('flourCount');
  const flourButton = document.getElementById('flourButton');
  const flourUpgradeButton = document.getElementById('flourUpgrade');
  const flourPassiveUpgradeButton = document.getElementById('flourPassiveUpgrade');
  const flourUpgradeCostSpan = document.getElementById('flourUpgradeCost');

  const milkCountSpan = document.getElementById('milkCount');
  const milkButton = document.getElementById('milkButton');
  const milkPassiveUpgradeButton = document.getElementById('milkPassiveUpgrade');
  const milkSection = document.getElementById('milkSection');
  const milkClickUpgradeButton = document.getElementById('milkClickUpgrade');
  const milkClickUpgradeCostSpan = document.getElementById('milkClickUpgradeCost');

  const eggCountSpan = document.getElementById('eggCount');
  const eggButton = document.getElementById('eggButton');
  const eggsPassiveUpgradeButton = document.getElementById('eggsPassiveUpgrade');
  const eggSection = document.getElementById('eggSection');
  const eggClickUpgradeButton = document.getElementById('eggClickUpgrade');
  const eggClickUpgradeCostSpan = document.getElementById('eggClickUpgradeCost');

  const waffleCountSpan = document.getElementById('waffleCount');
  const waffleButton = document.getElementById('waffleButton');

  const incomeDisplay = document.getElementById('incomeDisplay');

  // --- Helper functions ---
  function getFlourUpgradeCost() {
    return flourUpgradeBaseCost * Math.pow(2, flourUpgradeLevel);
  }
  function getMilkClickUpgradeCost() {
    return milkClickBaseCost * Math.pow(2, milkClickUpgradeLevel);
  }
  function getEggClickUpgradeCost() {
    return eggClickBaseCost * Math.pow(2, eggClickUpgradeLevel);
  }

  // --- Update what the player sees ---
  function updateDisplay() {
    flourCountSpan.textContent = flour;
    flourUpgradeCostSpan.textContent = getFlourUpgradeCost();

    // Unlock milk section
    if (!milkUnlocked && flour >= 50) {
      milkUnlocked = true;
      milkSection.style.display = 'block';
      milkButton.style.display = 'inline-block';
    }

    // Unlock eggs section
    if (!eggsUnlocked && milk >= 50 && flour >= 100) {
      eggsUnlocked = true;
      eggSection.style.display = 'block';
      eggButton.style.display = 'inline-block';
    }

    // Enable waffle button if player has enough
    if (flour >= waffleCost.flour && milk >= waffleCost.milk && eggs >= waffleCost.eggs) {
      waffleButton.disabled = false;
    } else {
      waffleButton.disabled = true;
    }
    waffleButton.textContent = `Make Waffle (${waffleCost.flour}F / ${waffleCost.milk}M / ${waffleCost.eggs}E)`;

    milkCountSpan.textContent = milk;
    eggCountSpan.textContent = eggs;
    waffleCountSpan.textContent = waffles;

    milkClickUpgradeCostSpan.textContent = getMilkClickUpgradeCost();
    eggClickUpgradeCostSpan.textContent = getEggClickUpgradeCost();

    flourPassiveUpgradeButton.textContent =
      `Upgrade Flour (+${passiveUpgrades.flour.level}/sec) – Cost: ${passiveUpgrades.flour.currentCost}`;
    milkPassiveUpgradeButton.textContent =
      `Upgrade Milk (+${passiveUpgrades.milk.level}/sec) – Cost: ${passiveUpgrades.milk.currentCost}`;
    eggsPassiveUpgradeButton.textContent =
      `Upgrade Eggs (+${passiveUpgrades.eggs.level}/sec) – Cost: ${passiveUpgrades.eggs.currentCost}`;

    incomeDisplay.textContent =
      passiveUpgrades.flour.level + passiveUpgrades.milk.level + passiveUpgrades.eggs.level;
  }

  // --- Flour button ---
  flourButton.addEventListener('click', () => {
    flour += flourPerClick;
    updateDisplay();
  });

  // (rest of code will be added in later commits)
  updateDisplay();
});
