const data = {
    es: {
      pairs: [
        ["the bank", "el banco"],
        ["the restaurant", "el restaurante"],
        ["a potato", "una papa"],
        ["cow", "vaca"],
        ["chair", "silla"],
        ["I'm beautiful", "soy hermoso"],
      ],
      langA: { code: "en", name: "English" },
      langB: { code: "es", name: "Spanish" },
    },
    de: {
      pairs: [
        ["a car", "wagen"],
        ["the glass", "das Glas"],
        ["the station", "der Banhof"],
        ["we are", "wir sind"],
        ["egg", "Ei"],
        ["goodbye", "Auf Wiedersehen"],
        ["Unfortunately", "leider"],
        ["to work", "arbeiten"],
      ],
      langA: { code: "en", name: "English" },
      langB: { code: "de", name: "Deutsch" },
    },
  };
  
  export default (req, res) => {
    const { lang } = req.query;
    res.json(data[lang]);
  };