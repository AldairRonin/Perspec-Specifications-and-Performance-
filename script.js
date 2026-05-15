const hardwareScores = {
  cpu: {
    "Intel Core i5-10400F": 70,
    "Intel Core i5-12400F": 86,
    "Intel Core i7-12700K": 97,
    "AMD Ryzen 5 3600": 72,
    "AMD Ryzen 5 5600": 84,
    "AMD Ryzen 7 5800X3D": 99
  },
  gpu: {
    "NVIDIA GTX 1660 Super": 52,
    "NVIDIA RTX 3060": 70,
    "NVIDIA RTX 4060": 82,
    "NVIDIA RTX 4070": 100,
    "AMD RX 6600": 68,
    "AMD RX 7800 XT": 106
  }
};

const gameProfiles = {
  "Counter-Strike 2": { baseFps: 260, weightCpu: 0.65, weightGpu: 0.35 },
  "Fortnite": { baseFps: 180, weightCpu: 0.5, weightGpu: 0.5 },
  "GTA V": { baseFps: 165, weightCpu: 0.45, weightGpu: 0.55 },
  "Cyberpunk 2077": { baseFps: 110, weightCpu: 0.3, weightGpu: 0.7 },
  "Apex Legends": { baseFps: 170, weightCpu: 0.45, weightGpu: 0.55 }
};

const qualityModifiers = { low: 1.22, medium: 1, high: 0.81, ultra: 0.66 };
const resolutionModifiers = { "1080p": 1, "1440p": 0.74, "4k": 0.45 };

const gameSelect = document.getElementById("game");
const cpuSelect = document.getElementById("cpu");
const gpuSelect = document.getElementById("gpu");
const form = document.getElementById("fps-form");
const resultBox = document.getElementById("result");
const fpsOutput = document.getElementById("fps-output");
const details = document.getElementById("details");

function fillSelect(select, values) {
  Object.keys(values).forEach((name) => {
    const option = document.createElement("option");
    option.value = name;
    option.textContent = name;
    select.appendChild(option);
  });
}

fillSelect(gameSelect, gameProfiles);
fillSelect(cpuSelect, hardwareScores.cpu);
fillSelect(gpuSelect, hardwareScores.gpu);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const game = gameSelect.value;
  const cpu = cpuSelect.value;
  const gpu = gpuSelect.value;
  const ram = Number(document.getElementById("ram").value);
  const quality = document.getElementById("quality").value;
  const resolution = document.getElementById("resolution").value;

  const gameProfile = gameProfiles[game];
  const cpuScore = hardwareScores.cpu[cpu];
  const gpuScore = hardwareScores.gpu[gpu];

  const combinedScore =
    cpuScore * gameProfile.weightCpu + gpuScore * gameProfile.weightGpu;

  const ramModifier = ram >= 32 ? 1.05 : ram >= 16 ? 1 : 0.9;

  const predicted =
    gameProfile.baseFps *
    (combinedScore / 85) *
    qualityModifiers[quality] *
    resolutionModifiers[resolution] *
    ramModifier;

  const fps = Math.max(20, Math.round(predicted));
  const low1 = Math.round(fps * 0.8);

  fpsOutput.textContent = `Примерный средний FPS: ${fps}`;
  details.textContent = `Ожидаемый 1% Low: ~${low1} FPS. Это примерный расчёт на основе усреднённых профилей железа.`;

  resultBox.classList.remove("hidden");
});
