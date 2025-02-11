export const languages = [
  { value: "french", label: "Français" },
  { value: "lingala", label: "Lingala" },
  { value: "kituba", label: "Kituba" },
];

export const limit = 50;
export const creatorTag = ["vérone mankou", "verone mankou"];
export const errors = {
  system:
    "La traduction est temporairement indisponible. Veuillez réessayer ultérieurement.",
  language:
    "Nous n'avons pas pu identifier la langue utilisée. Veuillez vérifier votre saisie ou réessayer.",

  creatorMessage:
    "Avé mon créateur ! 👋 Tu m'as trouvé... Je suis impressionné ! Mais trêve de compliments, que puis-je faire pour toi aujourd'hui ? 😎",
  length: `Le texte dépasse la limite autorisée (${limit} mots). Merci de le raccourcir et de réessayer.`,
};
