
const firebase = require("firebase/app");
require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDItgBwSpPeXNYXAVO3tZKESMUDss4bhyw",
  authDomain: "final-app-bbc96.firebaseapp.com",
  projectId: "final-app-bbc96",
  storageBucket: "final-app-bbc96.appspot.com",
  messagingSenderId: "258915394954",
  appId: "1:258915394954:web:c8c8d34fc65a6f0f181473"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Recipes and categories data
const categories = [
  {
    nom: "Omnivore",
    recettes: [
      {
        nom: "Saumon Rôti aux Asperges Rôties",
        description: "Un plat délicieux et nutritif, facile à préparer",
        ingredients: [
          { nom: "Filets de saumon", quantité: 450, unité: "g" },
          { nom: "Asperges vertes", quantité: 250, unité: "g" },
          { nom: "Huile d'olive", quantité: "2 cuillères à soupe", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" },
          { nom: "Citron, en jus", quantité: "1/2", unité: "unité" },
        ],
        instructions: [
          "Préchauffer le four à 200°C.",
          "Sécher les filets de saumon avec du papier absorbant et les assaisonner de sel, de poivre et d'herbes fraîches (facultatif).",
          "Disposer les filets de saumon sur une plaque de cuisson tapissée de papier sulfurisé.",
          "Laver et sécher les asperges vertes.",
          "Couper les extrémités dures des asperges et les enrober d'huile d'olive.",
          "Disposer les asperges autour des filets de saumon.",
          "Enfourner pendant 15-20 minutes, ou jusqu'à ce que le saumon soit cuit et que les asperges soient tendres.",
          "Servir immédiatement avec un jus de citron pressé.",
        ],
        temps_preparation: 10,
        temps_cuisson: 20,
        regime: "Omnivore",
        portions: 2,
        tags: ["facile", "rapide", "santé", "poisson"],
        image: "https://example.com/baked_salmon_asparagus.jpg",
      },
      {
        nom: "Poulet au Curry et Riz Basmati",
        description: "Un plat savoureux et parfumé, parfait pour un repas familial",
        ingredients: [
          { nom: "Cuisses de poulet désossées et sans peau", quantité: 600, unité: "g" },
          { nom: "Oignon rouge", quantité: "1", unité: "" },
          { nom: "Gousse d'ail", quantité:" 2", unité: "" },
          { nom: "Poudre de curry", quantité: "2 cuillères à soupe", unité: "" },
          { nom: "Lait de coco", quantité: "400 ml", unité: "" },
          { nom: "Riz basmati", quantité: "200 g", unité: "" },
          { nom: "Coriandre fraîche", quantité: "1 poignée", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" },
        ],
        instructions: [
          "Couper le poulet en morceaux et les faire revenir dans une poêle avec un peu d'huile d'olive.",
          "Hacher l'oignon et l'ail et les ajouter à la poêle.",
          "Saupoudrer de poudre de curry et cuire pendant quelques minutes.",
          "Verser le lait de coco et porter à ébullition.",
          "Réduire le feu, couvrir et laisser mijoter pendant 20 minutes, ou jusqu'à ce que le poulet soit cuit.",
          "Cuire le riz basmati selon les instructions sur l'emballage.",
          "Servir le poulet au curry avec le riz basmati et garnir de coriandre fraîche.",
        ],
        temps_preparation: 15,
        temps_cuisson: 25,
        regime: "Omnivore",
        portions: 4,
        tags: ["facile", "familial", "curry", "riz"],
        image: "https://example.com/chicken_curry_basmati_rice.jpg",
      },
    ],
  },
  {
    nom: "Végétarien",
    recettes: [
      {
        nom: "Lasagne aux Légumes et Fromage de Chèvre",
        description: "Un plat végétarien réconfortant et savoureux",
        ingredients: [
          { nom: "Lasagnes sèches", quantité: 250, unité: "g" },
          { nom: "Courgettes", quantité: 2, unité: "" },
          { nom: "Aubergines", quantité: 1, unité: "" },
          { nom: "Poivrons rouges", quantité: 1, unité: "" },
          { nom: "Tomates pelées en conserve", quantité: 400, unité: "g" },
          { nom: "Huile d'olive", quantité: "3 cuillères à soupe", unité: "" },
          { nom: "Basilic frais", quantité: "1 poignée", unité: "" },
          { nom: "Sel et poivre", quantité: "au goût", unité: "" },
          { nom: "Fromage de chèvre", quantité: 200, unité: "g" }
        ],
        instructions: [
          "Préchauffer le four à 180°C.",
          "Faire revenir les courgettes, aubergines et poivrons coupés en dés dans une poêle avec un peu d'huile d'olive.",
          "Ajouter les tomates pelées en conserve et le basilic frais, et laisser mijoter pendant 15 minutes.",
          "Assaisonner de sel et de poivre.",
          "Dans un plat à gratin, alterner des couches de lasagnes sèches, de sauce tomate aux légumes et de fromage de chèvre.",
          "Terminer par une couche de fromage de chèvre et enfourner pendant 30-35 minutes, ou jusqu'à ce que les lasagnes soient dorées et le fromage fondu.",
          "Laisser reposer quelques minutes avant de servir."
        ],
        temps_preparation: 20,
        temps_cuisson: 40,
        regime: "Végétarien",
        portions: 4,
        tags: ["facile", "familial", "légumes", "fromage"],
        image: "https://example.com/vegetarian_lasagna.jpg"
      },
      {
        nom: "Burger aux Pois Chiches et Légumes Grillés",
        description: "Un burger végétarien savoureux et nourrissant",
        ingredients: [
          { nom: "Pois chiches secs", quantité: 200, unité: "g" },
          { nom: "Oignon rouge", quantité: 1, unité: "" },
          { nom: "Gousse d'ail", quantité: 2, unité: "" },
          { nom: "Persil frais", quantité: "1 poignée", unité: "" },
          { nom: "Cumin en poudre", quantité: "1 cuillère à café", unité: "" },
          { nom: "Chapelure", quantité: "3 cuillères à soupe", unité: "" },
          { nom: "Aubergine", quantité: 1, unité: "" },
          { nom: "Poivron rouge", quantité: 1, unité: "" },
          { nom: "Pain à burger", quantité: 4, unité: "" },
          { nom: "Salade verte", quantité: "pour garnir", unité: "" },
          { nom: "Tomate", quantité: 1, unité: "" },
          { nom: "Oignon", quantité: 1, unité: "" },
          { nom: "Sauce au yaourt", quantité: "pour servir", unité: "" }
        ],
        instructions: [
          "Faire tremper les pois chiches dans l'eau pendant la nuit.",
          "Le lendemain, rincer les pois chiches et les cuire dans une casserole d'eau bouillante pendant 30 minutes.",
          "Égoutter les pois chiches et les écraser dans un bol.",
          "Hacher l'oignon et l'ail et les ajouter aux pois chiches.",
          "Hacher le persil et l'ajouter aux pois chiches.",
          "Ajouter le cumin en poudre, la chapelure, le sel et le poivre.",
          "Mélanger le tout jusqu'à obtenir une pâte homogène.",
          "Former des burgers avec la pâte de pois chiches.",
          "Faire chauffer un peu d'huile d'olive dans une poêle et faire cuire les burgers de pois chiches pendant 5 minutes de chaque côté, ou jusqu'à ce qu'ils soient dorés et croustillants.",
          "Couper l'aubergine et le poivron en tranches.",
          "Faire griller les tranches d'aubergine et de poivron dans la même poêle que les burgers, pendant 2-3 minutes de chaque côté.",
          "Couper la tomate et l'oignon en rondelles.",
          "Garnir les pains à burger de salade verte, de tomate, d'oignon, de burgers de pois chiches et de tranches d'aubergine et de poivron.",
          "Servir avec de la sauce au yaourt."
        ],
        temps_preparation: 30,
        temps_cuisson: 35,
        regime: "Végétarien",
        portions: 4,
        tags: ["facile", "familial", "végétarien", "burger", "légumes"],
        image: "https://example.com/vegetarian_burger.jpg"
      }
    ]
  }
];

// Collection commentaires
const commentaires = [
  {
    recipeID: "recipeID_1",
    userID: "userID_2",
    comment: "J'adore cette recette ! Facile à préparer et tellement délicieuse.",
    timestamp: "2024-06-05T12:00:00Z"
  },
  {
    recipeID: "recipeID_2",
    userID: "userID_1",
    comment: "Cette salade est devenue un incontournable à la maison. Merci pour la recette !",
    timestamp: "2024-06-05T13:30:00Z"
  }
];

// Function to add data to Firestore
const addCategoriesToFirestore = async () => {
  try {
    // Loop through each category and its recipes
    for (const category of categories) {
      // Add category document
      const categoryRef = db.collection("categories").doc();
      await categoryRef.set({ nom: category.nom });

      // Add each recipe in the category
      for (const recipe of category.recettes) {
        const recipeRef = db.collection("recipes").doc();
        await recipeRef.set({ ...recipe, categoryID: categoryRef.id });
      }
    }
    console.log("Categories and recipes added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding categories and recipes to Firestore: ", error);
  }
};

// Call the function to add categories and recipes to Firestore
addCategoriesToFirestore();

const addCommentsToFirestore = async () => {
  try {
    for (const comment of commentaires) {
      const commentRef = db.collection("comments").doc();
      await commentRef.set(comment);
    }
    console.log("Comments added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding comments to Firestore: ", error);
  }
};

// Call the function to add comments to Firestore
addCommentsToFirestore();
