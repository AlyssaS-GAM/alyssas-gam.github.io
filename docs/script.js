
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

let passiveUpgrades = {
  flour: { level: 0, baseCost: 20, currentCost: 20 },
  milk: { level: 0, baseCost: 40, currentCost: 40 },
  eggs: { level: 0, baseCost: 60, currentCost: 60 },
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

const flourIncomeSpan = document.getElementById('flourIncome');
const milkIncomeSpan  = document.getElementById('milkIncome');
const eggIncomeSpan   = document.getElementById('eggIncome');
const incomeDisplay   = document.getElementById('incomeDisplay'); // total


function flourClickUpgradeCost() {
  return flourUpgradeBaseCost * Math.pow(2, flourUpgradeLevel);
}
function milkClickUpgradeCost() {
  return milkClickBaseCost * Math.pow(2, milkClickUpgradeLevel);
}
function eggClickUpgradeCost() {
  return eggClickBaseCost * Math.pow(2, eggClickUpgradeLevel);
}


function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

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

  flourUpgradeCostSpan.textContent = flourClickUpgradeCost();
  milkClickUpgradeCostSpan.textContent = milkClickUpgradeCost();
  eggClickUpgradeCostSpan.textContent = eggClickUpgradeCost();


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

  // Per-resource income/sec + total
  const flourIncome = passiveUpgrades.flour.level; // 1 per level per second
  const milkIncome  = passiveUpgrades.milk.level;
  const eggIncome   = passiveUpgrades.eggs.level;
  const totalIncome = flourIncome + milkIncome + eggIncome;

  if (flourIncomeSpan) flourIncomeSpan.textContent = flourIncome;
  if (milkIncomeSpan)  milkIncomeSpan.textContent  = milkIncome;
  if (eggIncomeSpan)   eggIncomeSpan.textContent   = eggIncome;
  if (incomeDisplay)   incomeDisplay.textContent   = totalIncome;

}

const milkClickUpgradeButton = document.getElementById('milkClickUpgrade');
const milkClickUpgradeCostSpan = document.getElementById('milkClickUpgradeCost');
const eggClickUpgradeButton = document.getElementById('eggClickUpgrade');
const eggClickUpgradeCostSpan = document.getElementById('eggClickUpgradeCost');

if (flourButton) {
  flourButton.addEventListener('click', () => {
    flour += flourPerClick;
    updateDisplay();
  });
}

if (flourUpgradeButton) {
  flourUpgradeButton.addEventListener('click', () => {
    const cost = flourClickUpgradeCost();
    if (flour >= cost) {
      flour -= cost;
      flourUpgradeLevel++;
      flourPerClick += 1;
      updateDisplay();
    }
  });
}

if (milkButton) {
  milkButton.addEventListener('click', () => {
    milk += milkClickPower;
    updateDisplay();
  });
}

if (milkClickUpgradeButton) {
  milkClickUpgradeButton.addEventListener('click', () => {
    const cost = milkClickUpgradeCost();
    if (milk >= cost) {
      milk -= cost;
      milkClickUpgradeLevel++;
      milkClickPower++;
      updateDisplay();
    }
  });
}

if (eggButton) {
  eggButton.addEventListener('click', () => {
    eggs += eggClickPower;
    updateDisplay();
  });
}

if (eggClickUpgradeButton) {
  eggClickUpgradeButton.addEventListener('click', () => {
    const cost = eggClickUpgradeCost();
    if (eggs >= cost) {
      eggs -= cost;
      eggClickUpgradeLevel++;
      eggClickPower++;
      updateDisplay();
    }
  });
}

if (flourPassiveUpgradeButton) {
  flourPassiveUpgradeButton.addEventListener('click', () => {
    const cost = passiveUpgrades.flour.currentCost;
    if (flour >= cost) {
      flour -= cost;
      passiveUpgrades.flour.level++;
      passiveUpgrades.flour.currentCost = passiveUpgrades.flour.baseCost * Math.pow(2, passiveUpgrades.flour.level);
      updateDisplay();
    }
  });
}

if (milkPassiveUpgradeButton) {
  milkPassiveUpgradeButton.addEventListener('click', () => {
    const cost = passiveUpgrades.milk.currentCost;
    if (milk >= cost) {
      milk -= cost;
      passiveUpgrades.milk.level++;
      passiveUpgrades.milk.currentCost = passiveUpgrades.milk.baseCost * Math.pow(2, passiveUpgrades.milk.level);
      updateDisplay();
    }
  });
}

if (eggsPassiveUpgradeButton) {
  eggsPassiveUpgradeButton.addEventListener('click', () => {
    const cost = passiveUpgrades.eggs.currentCost;
    if (eggs >= cost) {
      eggs -= cost;
      passiveUpgrades.eggs.level++;
      passiveUpgrades.eggs.currentCost = passiveUpgrades.eggs.baseCost * Math.pow(2, passiveUpgrades.eggs.level);
      updateDisplay();
    }
  });
}

if (waffleButton) {
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
}
// Candy-Box style SAVE SYSTEM 

const SAVE_KEY_V2 = "waffleClickerSaveV2";

function cost(base, level) {
  return base * Math.pow(2, level);
}

function n0(x, def = 0) {
  return Number.isFinite(x) ? Math.max(0, x) : def;
}

function storageAvailable() {
  try {
    const t = "__waffle_test__";
    localStorage.setItem(t, t);
    localStorage.removeItem(t);
    return true;
  } catch {
    return false;
  }
}

function getState() {
  return {
    v: 1,
    ts: Date.now(),
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
    passiveUpgrades
  };
}

function setState(d) {
  // Core stats 
  flour              = n0(d.flour, 0);
  flourPerClick      = n0(d.flourPerClick, 1);
  flourUpgradeLevel  = Math.max(0, Math.floor(d.flourUpgradeLevel || 0));

  milk               = n0(d.milk, 0);
  milkUnlocked       = !!d.milkUnlocked;
  milkClickPower     = n0(d.milkClickPower, 1);
  milkClickUpgradeLevel = Math.max(0, Math.floor(d.milkClickUpgradeLevel || 0));

  eggs               = n0(d.eggs, 0);
  eggsUnlocked       = !!d.eggsUnlocked;
  eggClickPower      = n0(d.eggClickPower, 1);
  eggClickUpgradeLevel = Math.max(0, Math.floor(d.eggClickUpgradeLevel || 0));

  waffles            = n0(d.waffles, 0);

  // Waffle cost 
  const wc = d.waffleCost || {};
  waffleCost = {
    flour: n0(wc.flour, 1),
    milk:  n0(wc.milk, 1),
    eggs:  n0(wc.eggs, 1)
  };

  // Passive upgrades: trust only level; derive currentCost
  const pu = d.passiveUpgrades || {};
  const fLvl = Math.max(0, Math.floor((pu.flour?.level) ?? 0));
  const mLvl = Math.max(0, Math.floor((pu.milk?.level)  ?? 0));
  const eLvl = Math.max(0, Math.floor((pu.eggs?.level)  ?? 0));

  passiveUpgrades = {
    flour: { level: fLvl, baseCost: 20, currentCost: cost(20, fLvl) },
    milk:  { level: mLvl, baseCost: 40, currentCost: cost(40, mLvl) },
    eggs:  { level: eLvl, baseCost: 60, currentCost: cost(60, eLvl) },
  };
}

function simpleHash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

function encodeSave(obj) {
  const json = JSON.stringify(obj);
  const pkg = JSON.stringify({ d: obj, c: simpleHash(json) });
  return btoa(pkg);
}

function decodeSave(code) {
  const pkg = JSON.parse(atob(code));
  const json = JSON.stringify(pkg.d);
  if (pkg.c !== simpleHash(json)) throw new Error("Save code checksum mismatch");
  return pkg.d;
}

function saveToLocal() {
  if (!storageAvailable()) return;
  const code = encodeSave(getState());
  localStorage.setItem(SAVE_KEY_V2, code);
}

function loadFromLocal() {
  if (!storageAvailable()) return false;

  // Prefer v2 (encoded)
  const v2 = localStorage.getItem(SAVE_KEY_V2);
  if (v2) {
    try {
      const data = decodeSave(v2);
      setState(data);
      return true;
    } catch (e) {
      console.warn("[Save] Failed to decode v2 save:", e);
    }
  }

  // Migrate old JSON save
  const old = localStorage.getItem("waffleClickerSave");
  if (old) {
    try {
      const data = JSON.parse(old);
      setState(data);
      saveToLocal(); // write as v2
      return true;
    } catch (e) {
      console.warn("[Save] Failed to parse old save:", e);
    }
  }
  return false;
}

// Public (for HTML buttons)
function saveGame() {
  saveToLocal();
  alert("Game saved!");
}
function exportSave() {
  const code = localStorage.getItem(SAVE_KEY_V2) || encodeSave(getState());
  prompt("Copy your save code:", code);
}
function importSave() {
  const code = prompt("Paste your save code:");
  if (!code) return;
  try {
    const data = decodeSave(code.trim());
    setState(data);
    saveToLocal();
    updateDisplay();
    alert("Save imported!");
  } catch (e) {
    alert("That code didn't look right. Try again.");
  }
}

// Expose for inline onclick
window.saveGame = saveGame;
window.exportSave = exportSave;
window.importSave = importSave;

// Save on tab close (reduces chance of losing last few seconds)
window.addEventListener('beforeunload', saveToLocal);
// End SAVE SYSTEM 


setInterval(() => {
  flour += passiveUpgrades.flour.level;
  milk += passiveUpgrades.milk.level;
  eggs += passiveUpgrades.eggs.level;
  updateDisplay();
}, 1000);

// Autosave every 10 seconds
setInterval(saveToLocal, 10000);

loadFromLocal();
updateDisplay();
