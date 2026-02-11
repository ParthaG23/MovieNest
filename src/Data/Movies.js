// src/data.js

const movies = [
  // ======================
  // 🎥 BOLLYWOOD
  // ======================
  {
    imdbId: "tt15354916",
    tmdbId: 872906,
    category: "bollywood",
    type: "movie",
    downloads: {
      "480p":
        "https://hubcdn.fans/dl/?link=https://video-downloads.googleusercontent.com/ADGPM2nKhyfddddE1Pu0VQW-_hl33gs2pQ7GxwUDmJMT5q4mKNdADMUxmAtSa0ktt2z8bs14wrbWB41VLQHEsjfHp_w82dlK4InGWNC_YPASB0wQWUTqzS5Hul2CnU_0kc93FjuhCRo5K95d2-TkfLMrg2y5RDGTMwaMk5DMTX0ziwZTHt9hB3KkE0mW9Xdq_RMv7eS4fUGtdY7RruAMepOAR5ttf88m3uHGPceL1f3H-FxCmQrF09A",
      "720p": "https://hubdrive.space/file/1698915031",
      "1080p": "https://hubdrive.space/file/1698881400",
      zip: "",
    },
  },
  {
    imdbId: "tt8178634",
    tmdbId: 534780,
    category: "bollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Andhadhun
  {
    imdbId: "tt5074352",
    tmdbId: 360814,
    category: "bollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Dangal
  {
    imdbId: "tt9248940",
    tmdbId: 619329,
    category: "bollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Article 15
  {
    imdbId: "tt10295212",
    tmdbId: 660942,
    category: "bollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Shershaah
  {
    imdbId: "tt1396484",
    tmdbId: 20453,
    category: "bollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // 3 Idiots

  // ======================
  // 🎥 HOLLYWOOD
  // ======================
  {
    imdbId: "tt7286456",
    tmdbId: 475557,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Joker

  {
    imdbId: "tt0848228",
    tmdbId: 24428,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Avengers

  {
    imdbId: "tt9362722",
    tmdbId: 634649,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Spider-Man No Way Home

  {
    imdbId: "tt0137523",
    tmdbId: 550,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Fight Club

  {
    imdbId: "tt1375666",
    tmdbId: 27205,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Inception
  {
    imdbId: "tt0816692",
    tmdbId: 157336,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Interstellar
  {
    imdbId: "tt0468569",
    tmdbId: 155,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // The Dark Knight
  {
    imdbId: "tt4154796",
    tmdbId: 299534,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Avengers Endgame
  {
    imdbId: "tt0111161",
    tmdbId: 278,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Shawshank Redemption
  {
    imdbId: "tt6146586",
    tmdbId: 458156,
    category: "hollywood",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // john wick3
  // ======================
  // 🌏 SOUTH DUB (HINDI)
  // ======================
  {
    imdbId: "tt7019842",
    tmdbId: 256040,
    category: "southdub",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Baahubali 2

  {
    imdbId: "tt5959980",
    tmdbId: 441701,
    category: "southdub",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Vikram Vedha

  {
    imdbId: "tt15097216",
    tmdbId: 848326,
    category: "southdub",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Leo

  {
    imdbId: "tt8948790",
    tmdbId: 626392,
    category: "southdub",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Master

  {
    imdbId: "tt7838252",
    tmdbId: 428078,
    category: "southdub",
    type: "movie",
    downloads: {
      "480p": "https://your-link/kgf-480p.mp4",
      "720p": "https://your-link/kgf-720p.mp4",
      "1080p": "https://your-link/kgf-1080p.mp4",
      zip: "https://your-link/kgf.zip",
    },
  }, // KGF Chapter 1
  {
    imdbId: "tt10698680",
    tmdbId: 598896,
    category: "southdub",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // KGF Chapter 2
  {
    imdbId: "tt8176054",
    tmdbId: 579974,
    category: "southdub",
    type: "movie",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // RRR

  // ======================
  // 🎭 TELUGU
  // ======================
 

  // ======================
  // 🎌 ANIME (TV ONLY)
  // ======================
  {
    imdbId: "tt4508902",
    tmdbId: 63926,
    category: "anime",
    type: "tv",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // One Punch Man

  {
    imdbId: "tt5626028",
    tmdbId: 65930,
    category: "anime",
    type: "tv",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // My Hero Academia

  {
    imdbId: "tt2861424",
    tmdbId: 62715,
    category: "anime",
    type: "tv",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Dragon Ball Super

  {
    imdbId: "tt6082926",
    tmdbId: 73223,
    category: "anime",
    type: "tv",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Black Clover

  {
    imdbId: "tt0409591",
    tmdbId: 46260,
    category: "anime",
    type: "tv",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Naruto
  {
    imdbId: "tt2560140",
    tmdbId: 1429,
    category: "anime",
    type: "tv",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Attack on Titan
  {
    imdbId: "tt0388629",
    tmdbId: 13916,
    category: "anime",
    type: "tv",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // Death Note
  {
    imdbId: "tt0877057",
    tmdbId: 37854,
    category: "anime",
    type: "tv",
    downloads: { "480p": "", "720p": "", "1080p": "", zip: "" },
  }, // One Piece
  {
    imdbId: "tt12343534",
    tmdbId: 95479,
    category: "anime",
    type: "tv",
    downloads: {
      "480p": "",
      "720p": "",
      "1080p": "",
      zip: "",
    },
  }, //jjk
];

export default movies;
