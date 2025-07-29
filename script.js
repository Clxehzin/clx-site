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
 { valorant: {
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
  rocket league: {
    minimo: "CPU: Dual Core de 2.5 GHz, 4 GB de RAM e uma placa de vídeo NVIDIA GeForce 760 ou AMD Radeon R7 270X",
    recomendado: "CPU: Quad Core de 3.0 GHz, 8 GB de RAM e uma placa de vídeo NVIDIA GeForce GTX 1060 ou AMD Radeon RX 470"
  }
  league of legends: {
    minimo: "CPU: Processador Intel Core i3-530, 2 GB de RAM, placa de vídeo compatível com DirectX 10 e 16 GB ",
    recomendado: "CPU:Intel Core i5-3300 ou equivalente, 4 GB de RAM, placa de vídeo GeForce 560 ou equivalente (com 1 GB de VRAM) e 16 GB de espaço em SSD.  "
  }
  FC: {
    minimo: "CPU: processador Intel Core i5-6600K ou AMD Ryzen 5 1600, 8GB de RAM e uma placa de vídeo NVIDIA GTX 1050 Ti ou AMD Radeon RX 570",
    recomendado: "CPU: i7-6700 ou AMD Ryzen 7 2700X, 12GB de RAM e uma placa de vídeo NVIDIA GTX 1660 ou AMD RX 5600 XT"
  }
  GTA V: {
    minimo: "CPU: Intel Core 2 Quad Q6600 ou AMD Phenom 9850, 4 GB de RAM placa de vídeo NVIDIA 9800 GT ou AMD HD 4870, e 65 GB de espaço livre no disco",
    recomendado: "CPU: Intel Core i5 3470 ou AMD X8 FX-8350, 8 GB de RAM, placa de vídeo NVIDIA GTX 660 ou AMD HD 7870, e 65 GB de espaço livre"
  }s
  }
}

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