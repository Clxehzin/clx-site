async function getUserCountry() {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  return data.country_name;
}

// 🎮 Mostra jogos populares conforme o país
async function showPopularGames() {
  const country = await getUserCountry();
  const gamesDiv = document.getElementById("games-list");

  const gamesByCountry = {
    "Brasil": ["Free Fire", "League of Legends", "GTA V"],
    "Estados Unidos": ["Call of Duty", "Fortnite", "Minecraft"],
    "Japão": ["Genshin Impact", "Apex Legends", "Monster Hunter"]
  };

  const games = gamesByCountry[country] || ["Valorant", "Fortnite", "CS2"];
  gamesDiv.innerHTML = `
    <p>País detectado: <strong>${country}</strong></p>
    <ul>${games.map(game => `<li>${game}</li>`).join("")}</ul>
  `;
}

showPopularGames();

// 🧠 Setups recomendados por jogo
const setups = {
  valorant: {
    minimo: "CPU: i3-4150, GPU: GT 730, RAM: 4GB",
    recomendado: "CPU: i5-9400F, GPU: GTX 1050 Ti, RAM: 8GB"
  },
  cs2: {
    minimo: "CPU: i5-2500K, GPU: GTX 660, RAM: 8GB",
    recomendado: "CPU: i5-12400F, GPU: RTX 3060, RAM: 16GB"
  },
  fortnite: {
    minimo: "CPU: i3-3225, GPU: Intel HD 4000, RAM: 4GB",
    recomendado: "CPU: i5-11400, GPU: GTX 1650, RAM: 8GB"
  },
  "rocket league": {
    minimo: "CPU: Dual Core de 2.5 GHz, 4 GB de RAM, GPU NVIDIA GeForce 760 ou AMD Radeon R7 270X",
    recomendado: "CPU: Quad Core de 3.0 GHz, 8 GB de RAM, GPU NVIDIA GeForce GTX 1060 ou AMD Radeon RX 470"
  },
  "league of legends": {
    minimo: "CPU: Intel Core i3-530, 2 GB de RAM, GPU compatível com DirectX 10",
    recomendado: "CPU: Intel Core i5-3300 ou equivalente, 4 GB de RAM, GPU GeForce 560 ou equivalente"
  },
  fc: {
    minimo: "CPU: Intel Core i5-6600K ou AMD Ryzen 5 1600, 8GB de RAM, GPU GTX 1050 Ti ou RX 570",
    recomendado: "CPU: i7-6700 ou Ryzen 7 2700X, 12GB de RAM, GPU GTX 1660 ou RX 5600 XT"
  },
  "gta v": {
    minimo: "CPU: Intel Core 2 Quad Q6600 ou AMD Phenom 9850, 4 GB de RAM, GPU NVIDIA 9800 GT ou AMD HD 4870",
    recomendado: "CPU: Intel Core i5 3470 ou AMD FX-8350, 8 GB de RAM, GPU GTX 660 ou HD 7870"
  }
};

// 💻 Atualiza o setup ideal ao selecionar jogo
document.getElementById("game-select").addEventListener("change", (e) => {
  const game = e.target.value.toLowerCase();
  const info = setups[game];
  const div = document.getElementById("setup-info");

  if (!info) {
    div.innerHTML = "<p>Informações não disponíveis para este jogo.</p>";
    return;
  }

  div.innerHTML = `
    <p><strong>Configuração Mínima:</strong> ${info.minimo}</p>
    <p><strong>Configuração Recomendada:</strong> ${info.recomendado}</p>
  `;
});