async function getUserCountry() {
  const res = await fetch("https://ipapi.co/json/");
  const data = await res.json();
  return data.country_name;
}

// 🎮 Função para mostrar jogos populares
async function showPopularGames() {
  const country = await getUserCountry();
  const gamesDiv = document.getElementById("games-list");

  // Simulação de lista de jogos por país
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
  }
};

// 💻 Atualiza o setup ideal quando o jogo é escolhido
document.getElementById("game-select").addEventListener("change", (e) => {
  const game = e.target.value;
  const info = setups[game];
  const div = document.getElementById("setup-info");

  if (!info) {
    div.innerHTML = "";
    return;
  }

  div.innerHTML = `
    <p><strong>Configuração Mínima:</strong> ${info.minimo}</p>
    <p><strong>Configuração Recomendada:</strong> ${info.recomendado}</p>
  `;
});