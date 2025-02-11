export const languages = [
  { value: "french", label: "Français" },
  { value: "lingala", label: "Lingala" },
];

export const limit = 50;
export const minimum = 2;
export const creatorTag = ["vérone mankou", "verone mankou"];
export const errors = {
  system:
    "La traduction est temporairement indisponible. Veuillez réessayer ultérieurement.",
  language:
    "Nous n'avons pas pu identifier la langue utilisée. Veuillez vérifier votre saisie ou réessayer.",
  creatorMessage:
    "Avé mon créateur ! 👋 Tu m'as trouvé... Je suis impressionné ! Mais trêve de compliments, que puis-je faire pour toi aujourd'hui ? 😎",
  length: `Le texte dépasse la limite autorisée (${limit} mots). Merci de le raccourcir et de réessayer.`,
  mini: "Le texte est un peu trop court. Merci d'ajouter quelques détails supplémentaires pour continuer.",
  notext:
    "Il semble que vous n'ayez rien saisi. Merci d'ajouter du texte et de réessayer.",
  empty: "Le champ de texte est vide. Merci de le remplir pour continuer.",
  nolang:
    "Il semble que vous n'ayez pas sélectionné de langue. Merci d'en choisir une pour continuer.",
  badlang:
    "La langue sélectionnée n'est pas disponible pour le moment. Merci de choisir une autre langue dans la liste.",
  active:
    "L'application est temporairement hors service. Veuillez réessayer ultérieurement.",
  error:
    "La traduction a rencontré un petit problème. Merci de réessayer ou de nous contacter si cela se reproduit.",
  same: " Il semble que la langue d'origine et la langue finale soient les mêmes. Essayez avec une autre combinaison de langues !",
};
