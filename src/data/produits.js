const produits = [
  // Vinaigres de Grenade 100ml
  {
    id: 'vinaigre-nature',
    nom: 'Vinaigre de Grenade - Nature',
    description: "Vinaigre de grenade pur, vieilli naturellement pour une saveur fruitée et équilibrée.",
    categorie: 'vinaigre-grenade',
    prix: 8.50,
    image: '/images/vinaigre-nature.jpg'
  },
  {
    id: 'vinaigre-poivre-tasmani',
    nom: 'Vinaigre de Grenade - Poivre Tasmani',
    description: "Alliance unique de grenade et de poivre rare de Tasmanie pour une touche épicée.",
    categorie: 'vinaigre-grenade',
    prix: 9.90,
    image: '/images/vinaigre-poivre-tasmani.jpg'
  },
  {
    id: 'vinaigre-menthe',
    nom: 'Vinaigre de Grenade - Menthe',
    description: "Rafraîchissant avec des notes vives de menthe, parfait pour les salades d'été.",
    categorie: 'vinaigre-grenade',
    prix: 9.90,
    image: '/images/vinaigre-menthe.jpg'
  },
  {
    id: 'vinaigre-cerise-griotte',
    nom: 'Vinaigre de Grenade - Cerise Griotte',
    description: "Harmonie sucrée-acidulée de grenade et de cerises griottes.",
    categorie: 'vinaigre-grenade',
    prix: 12.50,
    image: '/images/vinaigre-cerise-griotte.jpg'
  },
  {
    id: 'vinaigre-fraise',
    nom: 'Vinaigre de Grenade - Fraise',
    description: "Doux et fruité, avec l'équilibre parfait entre grenade et fraise.",
    categorie: 'vinaigre-grenade',
    prix: 12.50,
    image: '/images/vinaigre-fraise.jpg'
  },
  {
    id: 'vinaigre-miel',
    nom: 'Vinaigre de Grenade - Miel',
    description: "Onctuosité du miel mariée à l'acidité de la grenade.",
    categorie: 'vinaigre-grenade',
    prix: 12.50,
    image: '/images/vinaigre-miel.jpg'
  },
  {
    id: 'vinaigre-framboise',
    nom: 'Vinaigre de Grenade - Framboise',
    description: "Éclat acidulé de framboise dans un vinaigre de grenade velouté.",
    categorie: 'vinaigre-grenade',
    prix: 12.50,
    image: '/images/vinaigre-framboise.jpg'
  },
  {
    id: 'vinaigre-reglisse',
    nom: 'Vinaigre de Grenade - Réglisse',
    description: "Notes douces et chaudes de réglisse pour une touche originale.",
    categorie: 'vinaigre-grenade',
    prix: 12.50,
    image: '/images/vinaigre-reglisse.jpg'
  },
  {
    id: 'vinaigre-citron-menton',
    nom: 'Vinaigre de Grenade - Citron de Menton',
    description: "Zestes de citron de Menton pour une explosion de fraîcheur.",
    categorie: 'vinaigre-grenade',
    prix: 14.50,
    image: '/images/vinaigre-citron-menton.jpg'
  },
  {
    id: 'vinaigre-timut',
    nom: 'Vinaigre de Grenade - Timut',
    description: "Poivre Timut du Népal pour des notes d'agrumes et d'épices.",
    categorie: 'vinaigre-grenade',
    prix: 9.90,
    image: '/images/vinaigre-timut.jpg'
  },
  {
    id: 'vinaigre-vanille',
    nom: 'Vinaigre de Grenade - Vanille',
    description: "Gourmandise avec des arômes doux et chauds de vanille.",
    categorie: 'vinaigre-grenade',
    prix: 9.90,
    image: '/images/vinaigre-vanille.jpg'
  },
  {
    id: 'vinaigre-tonka',
    nom: 'Vinaigre de Grenade - Tonka',
    description: "Saveurs chaudes et gourmandes de fève Tonka.",
    categorie: 'vinaigre-grenade',
    prix: 9.90,
    image: '/images/vinaigre-tonka.jpg'
  },
  {
    id: 'vinaigre-basilic',
    nom: 'Vinaigre de Grenade - Basilic',
    description: "Fraîcheur du basilic dans un vinaigre de grenade équilibré.",
    categorie: 'vinaigre-grenade',
    prix: 9.90,
    image: '/images/vinaigre-basilic.jpg'
  },

  // Vinaigres Balsamiques
  {
    id: 'balsamique-reglisse',
    nom: 'Vinaigre Balsamique - Réglisse',
    description: "Balsamique vieilli avec des notes douces de réglisse.",
    categorie: 'vinaigre-balsamique',
    prix: 12.50,
    image: '/images/balsamique-reglisse.jpg'
  },
  {
    id: 'balsamique-timut',
    nom: 'Vinaigre Balsamique - Timut',
    description: "Balsamique aux notes épicées et fruitées du poivre Timut.",
    categorie: 'vinaigre-balsamique',
    prix: 9.90,
    image: '/images/balsamique-timut.jpg'
  },
  {
    id: 'balsamique-fraise',
    nom: 'Vinaigre Balsamique - Fraise',
    description: "Balsamique doux aux arômes de fraise mûre.",
    categorie: 'vinaigre-balsamique',
    prix: 12.50,
    image: '/images/balsamique-fraise.jpg'
  },
  {
    id: 'balsamique-menthe',
    nom: 'Vinaigre Balsamique - Menthe',
    description: "Fraîcheur mentholée dans un balsamique onctueux.",
    categorie: 'vinaigre-balsamique',
    prix: 9.90,
    image: '/images/balsamique-menthe.jpg'
  },
  {
    id: 'balsamique-myrtille',
    nom: 'Vinaigre Balsamique - Myrtille',
    description: "Balsamique aux notes boisées et fruitées de myrtille.",
    categorie: 'vinaigre-balsamique',
    prix: 12.50,
    image: '/images/balsamique-myrtille.jpg'
  },
  {
    id: 'balsamique-cerise-griotte',
    nom: 'Vinaigre Balsamique - Cerise Griotte',
    description: "Équilibre parfait entre acidité et douceur fruitée.",
    categorie: 'vinaigre-balsamique',
    prix: 12.50,
    image: '/images/balsamique-cerise-griotte.jpg'
  },
  {
    id: 'balsamique-framboise',
    nom: 'Vinaigre Balsamique - Framboise',
    description: "Balsamique aux arômes intenses de framboise.",
    categorie: 'vinaigre-balsamique',
    prix: 12.50,
    image: '/images/balsamique-framboise.jpg'
  },
  {
    id: 'balsamique-cafe',
    nom: 'Vinaigre Balsamique - Café',
    description: "Notes torréfiées de café dans un balsamique velouté.",
    categorie: 'vinaigre-balsamique',
    prix: 9.90,
    image: '/images/balsamique-cafe.jpg'
  },
  {
    id: 'balsamique-cacao',
    nom: 'Vinaigre Balsamique - Cacao',
    description: "Balsamique aux arômes riches et chocolatés de cacao.",
    categorie: 'vinaigre-balsamique',
    prix: 12.50,
    image: '/images/balsamique-cacao.jpg'
  },
  {
    id: 'balsamique-armagnac',
    nom: 'Vinaigre Balsamique - Armagnac',
    description: "Balsamique vieilli avec des notes chaudes d'Armagnac.",
    categorie: 'vinaigre-balsamique',
    prix: 14.50,
    image: '/images/balsamique-armagnac.jpg'
  },
  {
    id: 'balsamique-feve-tonka',
    nom: 'Vinaigre Balsamique - Fève Tonka',
    description: "Gourmandise avec des arômes vanillés et amandés.",
    categorie: 'vinaigre-balsamique',
    prix: 9.90,
    image: '/images/balsamique-feve-tonka.jpg'
  },
  {
    id: 'balsamique-basilic',
    nom: 'Vinaigre Balsamique - Basilic',
    description: "Fraîcheur du basilic dans un balsamique équilibré.",
    categorie: 'vinaigre-balsamique',
    prix: 9.90,
    image: '/images/balsamique-basilic.jpg'
  },

  // Huiles d'olive 250ml
  {
    id: 'huile-nature',
    nom: 'Huile d\'olive - Nature',
    description: "Huile d'olive extra vierge pressée à froid, fruitée et équilibrée.",
    categorie: 'huile-olive',
    prix: 7.50,
    image: '/images/huile-nature.jpg'
  },
  {
    id: 'huile-truffe',
    nom: 'Huile d\'olive - Truffe',
    description: "Huile d'olive parfumée à la truffe noire, intense et aromatique.",
    categorie: 'huile-olive',
    prix: 9.50,
    image: '/images/huile-truffe.jpg'
  },

  // Épicerie fine
  {
    id: 'jus-grenade',
    nom: 'Jus de Grenade 750 ml',
    description: "Jus de grenade 100% pur, riche en antioxydants, sans additifs.",
    categorie: 'epicerie',
    prix: 8.50,
    image: '/images/jus-grenade.jpg'
  },
  {
    id: 'vinaigre-grenade-250ml',
    nom: 'Vinaigre de Grenade Nature 250 ml',
    description: "Vinaigre de grenade pur en format familial, idéal pour les amateurs.",
    categorie: 'epicerie',
    prix: 12.00,
    image: '/images/vinaigre-grenade-250ml.jpg'
  },
  {
    id: 'cafe-monde',
    nom: 'Café du Monde 250 g',
    description: "Mélange de café torréfié avec des notes de chicorée, tradition Nouvelle-Orléans.",
    categorie: 'epicerie',
    prix: 7.90,
    image: '/images/cafe-monde.jpg'
  }
];

export default produits;