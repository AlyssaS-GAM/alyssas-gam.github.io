
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
    milk: { level: 0, baseCost: 40, currentCost: 40 },
    eggs: { level: 0, baseCost: 60, currentCost: 60 },
  };

  // --- Buttons and text areas from HTML ---
  const flourCountSpan = document.getElementById("flourCount");
  const flourButton = document.getElementById("flourButton");
  const flourUpgradeButton = document.getElementById("flourUpgrade");
  const flourUpgradeCostSpan = document.getElementById("flourUpgradeCost");
  const flourPassiveUpgradeButton = document.getElementById("flourPassiveUpgrade");

  const milkSection = document.getElementById("milkSection");
  const milkCountSpan = document.getElementById("milkCount");
  const milkButton = document.getElementById("milkButton");
  const milkClickUpgradeButton = document.getElementById("milkClickUpgrade");
  const milkClickUpgradeCostSpan = document.getElementById("milkClickUpgradeCost");
  const milkPassiveUpgradeButton = document.getElementById("milkPassiveUpgrade");

  const eggSection = document.getElementById("eggSection");
  const eggCountSpan = document.getElementById("eggCount");
  const eggButton = document.getElementById("eggButton");
  const eggClickUpgradeButton = document.getElementById("eggClickUpgrade");
  const eggClickUpgradeCostSpan = document.getElementById("eggClickUpgradeCost");
  const eggsPassiveUpgradeButton = document.getElementById("eggsPassiveUpgrade");

  const waffleCountSpan = document.getElementById("waffleCount");
  const waffleButton = document.getElementById("waffleButton");

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

  // --- Update the screen ---
  function updateDisplay() {
    // Show counts
    flourCountSpan.textContent = flour;
    milkCountSpan.textContent = milk;
    eggCountSpan.textContent = eggs;
    waffleCountSpan.textContent = waffles;

    // Upgrade costs
    flourUpgradeCostSpan.textContent = getFlourUpgradeCost();
    milkClickUpgradeCostSpan.textContent = getMilkClickUpgradeCost();
    eggClickUpgradeCostSpan.textContent = getEggClickUpgradeCost();

    // Unlock milk
    if (!milkUnlocked && flour >= 50) {
      milkUnlocked = true;
      milkSection.style.display = "block";
      milkButton.style.display = "inline-block";
      milkClickUpgradeButton.style.display = "inline-block";
      milkPassiveUpgradeButton.style.display = "inline-block";
    }

    // Unlock eggs
    if (!eggsUnlocked && milk >= 50 && flour >= 100) {
      eggsUnlocked = true;
      eggSection.style.display = "block";
      eggButton.style.display = "inline-block";
      eggClickUpgradeButton.style.display = "inline-block";
      eggsPassiveUpgradeButton.style.display = "inline-block";
    }

    // Unlock waffle button
    if (flour >= waffleCost.flour && milk >= waffleCost.milk && eggs >= waffleCost.eggs) {
      waffleButton.disabled = false;
    } else {
      waffleButton.disabled = true;
    }
    waffleButton.textContent = `Make Waffle (${waffleCost.flour}F / ${waffleCost.milk}M / ${waffleCost.eggs}E)`;

    // Passive upgrade button text
    flourPassiveUpgradeButton.textContent =
      `Upgrade Flour (+${passiveUpgrades.flour.level}/sec) – Cost: ${passiveUpgrades.flour.currentCost}`;
    milkPassiveUpgradeButton.textContent =
      `Upgrade Milk (+${passiveUpgrades.milk.level}/sec) – Cost: ${passiveUpgrades.milk.currentCost}`;
    eggsPassiveUpgradeButton.textContent =
      `Upgrade Eggs (+${passiveUpgrades.eggs.level}/sec) – Cost: ${passiveUpgrades.eggs.currentCost}`;
  }

  // --- Button clicks ---
  flourButton.addEventListener("click", () => {
    flour += flourPerClick;
    updateDisplay();
  });

  flourUpgradeButton.addEventListener("click", () => {
    const cost = getFlourUpgradeCost();
    if (flour >= cost) {
      flour -= cost;
      flourUpgradeLevel++;
      flourPerClick++;
      updateDisplay();
    }
  });

  milkButton.addEventListener("click", () => {
    milk += milkClickPower;
    updateDisplay();
  });

  milkClickUpgradeButton.addEventListener("click", () => {
    const cost = getMilkClickUpgradeCost();
    if (milk >= cost) {
      milk -= cost;
      milkClickUpgradeLevel++;
      milkClickPower++;
      updateDisplay();
    }
  });

  eggButton.addEventListener("click", () => {
    eggs += eggClickPower;
    updateDisplay();
  });

  eggClickUpgradeButton.addEventListener("click", () => {
    const cost = getEggClickUpgradeCost();
    if (eggs >= cost) {
      eggs -= cost;
      eggClickUpgradeLevel++;
      eggClickPower++;
      updateDisplay();
    }
  });

  flourPassiveUpgradeButton.addEventListener("click", () => {
    const cost = passiveUpgrades.flour.currentCost;
    if (flour >= cost) {
      flour -= cost;
      passiveUpgrades.flour.level++;
      passiveUpgrades.flour.currentCost =
        passiveUpgrades.flour.baseCost * Math.pow(2, passiveUpgrades.flour.level);
      updateDisplay();
    }
  });

  milkPassiveUpgradeButton.addEventListener("click", () => {
    const cost = passiveUpgrades.milk.currentCost;
    if (milk >= cost) {
      milk -= cost;
      passiveUpgrades.milk.level++;
      passiveUpgrades.milk.currentCost =
        passiveUpgrades.milk.baseCost * Math.pow(2, passiveUpgrades.milk.level);
      updateDisplay();
    }
  });

  eggsPassiveUpgradeButton.addEventListener("click", () => {
    const cost = passiveUpgrades.eggs.currentCost;
    if (eggs >= cost) {
      eggs -= cost;
      passiveUpgrades.eggs.level++;
      passiveUpgrades.eggs.currentCost =
        passiveUpgrades.eggs.baseCost * Math.pow(2, passiveUpgrades.eggs.level);
      updateDisplay();
    }
  });

  waffleButton.addEventListener("click", () => {
    if (flour >= waffleCost.flour && milk >= waffleCost.milk && eggs >= waffleCost.eggs) {
      flour -= waffleCost.flour;
      milk -= waffleCost.milk;
      eggs -= waffleCost.eggs;
      waffles++;

      // Increase costs for next waffle
      waffleCost.flour++;
      waffleCost.milk++;
      waffleCost.eggs++;

      updateDisplay();
    }
  });

  // --- Save / Load ---
  function saveGame() {
    const saveData = {
      flour,
      flourPerClick,
      flourUpgradeLevel,
      milk,
      milkUnlocked,
      milkClickPower,
      milkClickUpgradeLevel,
      eggs,
      eggsUnlocked,
      eggClickPower,
      eggClickUpgradeLevel,
      waffles,
      waffleCost,
      passiveUpgrades,
    };
    localStorage.setItem("waffleClickerSave", JSON.stringify(saveData));
  }

  function loadGame() {
    const saved = localStorage.getItem("waffleClickerSave");
    if (!saved) return;
    const data = JSON.parse(saved);

    flour = data.flour ?? 0;
    flourPerClick = data.flourPerClick ?? 1;
    flourUpgradeLevel = data.flourUpgradeLevel ?? 0;

    milk = data.milk ?? 0;
    milkUnlocked = data.milkUnlocked ?? false;
    milkClickPower = data.milkClickPower ?? 1;
    milkClickUpgradeLevel = data.milkClickUpgradeLevel ?? 0;

    eggs = data.eggs ?? 0;
    eggsUnlocked = data.eggsUnlocked ?? false;
    eggClickPower = data.eggClickPower ?? 1;
    eggClickUpgradeLevel = data.eggClickUpgradeLevel ?? 0;

    waffles = data.waffles ?? 0;
    waffleCost = data.waffleCost ?? { flour: 1, milk: 1, eggs: 1 };

    passiveUpgrades = data.passiveUpgrades ?? {
      flour: { level: 0, baseCost: 20, currentCost: 20 },
      milk: { level: 0, baseCost: 40, currentCost: 40 },
      eggs: { level: 0, baseCost: 60, currentCost: 60 },
    };
  }

  // --- Passive income loop ---
  setInterval(() => {
    flour += passiveUpgrades.flour.level;
    milk += passiveUpgrades.milk.level;
    eggs += passiveUpgrades.eggs.level;
    updateDisplay();
  }, 1000);

  // --- Auto save loop ---
  setInterval(saveGame, 10000);

  // --- Start game ---
  loadGame();
  updateDisplay();
});
