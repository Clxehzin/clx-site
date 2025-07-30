const texts = {
  "pt-BR": {
    selectGamePlaceholder: "Selecione um jogo",
    popularGamesTitle: "Jogos Populares no Seu País",
    setupTitle: "Setup Ideal para seu Jogo",
    countryDetected: "País detectado",
    contactText: "Fale Conosco: +55 41 98510-8901",
    gamesByCountry: {
      "Brasil": ["Free Fire", "League of Legends", "GTA V"],
      "Estados Unidos": ["Call of Duty", "Fortnite", "Minecraft"],
      "Japão": ["Genshin Impact", "Apex Legends", "Monster Hunter"]
    }
  },
  "en-US": {
    selectGamePlaceholder: "Select a game",
    popularGamesTitle: "Popular Games in Your Country",
    setupTitle: "Ideal Setup for Your Game",
    countryDetected: "Country detected",
    contactText: "Contact Us: +55 41 98510-8901",
    gamesByCountry: {
      "Brazil": ["Free Fire", "League of Legends", "GTA V"],
      "United States": ["Call of Duty", "Fortnite", "Minecraft"],
      "Japan": ["Genshin Impact", "Apex Legends", "Monster Hunter"]
    }
  }
};

// Função para pegar o país pelo IP
async function getUserCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    const data = await res.json();
    return data.country_name || "Brasil"; // fallback Brasil
  } catch (e) {
    return "Brasil";
  }
}

// Função que atualiza o texto do site conforme idioma
async function updateLanguage(lang) {
  const popularTitle = document.getElementById("popular-games-title");
  const setupTitle = document.getElementById("setup-title");
  const gameSelect = document.getElementById("game-select");
  const contactLink = document.querySelector("#top-bar .contact a");

  // Atualiza títulos
  popularTitle.textContent = texts[lang].popularGamesTitle;
  setupTitle.textContent = texts[lang].setupTitle;
  contactLink.textContent = texts[lang].contactText;

  // Atualiza placeholder do select de jogos
  gameSelect.options[0].text = texts[lang].selectGamePlaceholder;

  // Atualiza jogos populares
  const country = await getUserCountry();

  // Ajusta nome país para idioma inglês
  const countryName = (lang === "en-US") ?
    (country === "Brasil" ? "Brazil" :
    country === "Estados Unidos" ? "United States" :
    country === "Japão" ? "Japan" : country)
    : country;

  const gamesByCountry = texts[lang].gamesByCountry;
  const games = gamesByCountry[countryName] || ["Valorant", "Fortnite", "CS2"];

  const gamesDiv = document.getElementById("games-list");
  gamesDiv.innerHTML = `
    <p>${texts[lang].countryDetected}: <strong>${countryName}</strong></p>
    <ul>${games.map(game => `<li>${game}</li>`).join("")}</ul>
  `;
}

// Setup recomendados por jogo
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
    minimo: "CPU: Dual Core de 2.5 GHz, 4 GB de RAM e uma placa de vídeo NVIDIA GeForce 760 ou AMD Radeon R7 270X",
    recomendado: "CPU: Quad Core de 3.0 GHz, 8 GB de RAM e uma placa de vídeo NVIDIA GeForce GTX 1060 ou AMD Radeon RX 470"
  },
  "league of legends": {
    minimo: "CPU: Processador Intel Core i3-530, 2 GB de RAM, placa de vídeo compatível com DirectX 10 e 16 GB ",
    recomendado: "CPU:Intel Core i5-3300 ou equivalente, 4 GB de RAM, placa de vídeo GeForce 560 ou equivalente (com 1 GB de VRAM) e 16 GB de espaço em SSD."
  },
  fc: {
    minimo: "CPU: processador Intel Core i5-6600K ou AMD Ryzen 5 1600, 8GB de RAM e uma placa de vídeo NVIDIA GTX 1050 Ti ou AMD Radeon RX 570",
    recomendado: "CPU: i7-6700 ou AMD Ryzen 7 2700X, 12GB de RAM e uma placa de vídeo NVIDIA GTX 1660 ou AMD RX 5600 XT"
  },
  "gta v": {
    minimo: "CPU: Intel Core 2 Quad Q6600 ou AMD Phenom 9850, 4 GB de RAM placa de vídeo NVIDIA 9800 GT ou AMD HD 4870, e 65 GB de espaço livre no disco",
    recomendado: "CPU: Intel Core i5 3470 ou AMD X8 FX-8350, 8 GB de RAM, placa de vídeo NVIDIA GTX 660 ou AMD HD 7870, e 65 GB de espaço livre"
  }
};

// Atualiza o setup ideal quando o jogo é escolhido
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

// Detecta mudança de idioma pelo select e atualiza textos e jogos
document.getElementById("lang-select").addEventListener("change", async (e) => {
  const lang = e.target.value;
  await updateLanguage(lang);
  // limpa info do setup para evitar confusão ao trocar idioma
  document.getElementById("setup-info").innerHTML = "";
  // também reseta o select de jogo para vazio
  document.getElementById("game-select").value = "";
});

// Carrega idioma padrão e jogos ao abrir a página
window.addEventListener("DOMContentLoaded", async () => {
  const defaultLang = "pt-BR";
  document.getElementById("lang-select").value = defaultLang;
  await updateLanguage(defaultLang);
});

