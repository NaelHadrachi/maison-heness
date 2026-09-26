# Pattern de Réponse API - Pages Dynamiques

## Structure Générale d'une Page

```json
{
  "id": "unique_id",
  "title": "Titre de la page",
  "slug": "titre-de-la-page",
  "published": true,
  "showInNavbar": true,
  "navbarLabel": "Label personnalisé",
  "navbarOrder": 1,
  "sections": [],
  "seoTitle": "Titre SEO",
  "seoDescription": "Description SEO",
  "createdAt": "2026-09-10T14:27:59.195Z",
  "updatedAt": "2026-09-10T14:27:59.195Z"
}
```

---

## Types de Sections Supportées

### 1. **Hero** (Section d'en-tête)
Idéal pour: Page d'accueil d'une page, titre principal

```json
{
  "type": "hero",
  "content": {
    "heading": "Titre Principal",
    "subheading": "Sous-titre ou description"
  }
}
```

---

### 2. **Heading** (Titre de section)
Idéal pour: Titres intermédiaires, séparation de contenu

```json
{
  "type": "heading",
  "content": {
    "text": "Titre de Section"
  }
}
```

---

### 3. **Text** (Texte simple)
Idéal pour: Paragraphes simples, contenu basique

```json
{
  "type": "text",
  "content": {
    "text": "Contenu textuel simple.\nSupporte les sauts de ligne."
  }
}
```

---

### 4. **RichText** (Texte enrichi HTML)
Idéal pour: Contenu complexe avec formatage, listes, citations

```json
{
  "type": "richText",
  "content": {
    "html": "<h3>Sous-titre</h3><p>Paragraphe avec <strong>gras</strong> et <em>italique</em></p><ul><li>Élément 1</li><li>Élément 2</li></ul><blockquote>Citation importante</blockquote>"
  }
}
```

---

### 5. **Image** (Image unique)
Idéal pour: Images isolées avec légende optionnelle

```json
{
  "type": "image",
  "content": {
    "url": "https://example.com/image.jpg",
    "alt": "Texte alternatif pour l'accessibilité",
    "caption": "Légende optionnelle de l'image"
  }
}
```

---

### 6. **Gallery** (Galerie d'images)
Idéal pour: Portfolio, galeries photos, vitrines de produits

```json
{
  "type": "gallery",
  "content": {
    "title": "Titre de la Galerie",
    "images": [
      {
        "url": "https://example.com/image1.jpg",
        "alt": "Description image 1"
      },
      {
        "url": "https://example.com/image2.jpg",
        "alt": "Description image 2"
      }
    ]
  }
}
```

---

### 7. **Video** (Vidéo embarquée)
Idéal pour: Vidéos YouTube, Vimeo, ou autres formats

```json
{
  "type": "video",
  "content": {
    "title": "Titre de la Vidéo",
    "url": "https://www.youtube.com/embed/VIDEO_ID"
  }
}
```

---

### 8. **CTA** (Appel à l'Action)
Idéal pour: Sections de conversion, boutons d'action

```json
{
  "type": "cta",
  "content": {
    "heading": "Prêt à commencer?",
    "description": "Rejoignez nos clients satisfaits",
    "buttonText": "Commander maintenant",
    "buttonUrl": "/boutique"
  }
}
```

---

### 9. **Features** (Liste de fonctionnalités)
Idéal pour: Avantages, points clés, caractéristiques

```json
{
  "type": "features",
  "content": {
    "title": "Pourquoi nous choisir?",
    "items": [
      {
        "title": "Qualité Premium",
        "description": "Produits artisanaux de haute qualité"
      },
      {
        "title": "Livraison Rapide",
        "description": "Expédition dans les 48h"
      },
      {
        "title": "Support 24/7",
        "description": "Équipe disponible pour vous aider"
      }
    ]
  }
}
```

---

### 10. **Divider** (Séparateur)
Idéal pour: Séparation visuelle entre sections

```json
{
  "type": "divider",
  "content": {}
}
```

---

## Exemple Complet de Page

```json
{
  "id": "cmtvmgokb00013h65m9vklwkr",
  "title": "Notre Processus de Production",
  "slug": "notre-processus",
  "published": true,
  "showInNavbar": true,
  "navbarLabel": "Processus",
  "navbarOrder": 2,
  "sections": [
    {
      "type": "hero",
      "content": {
        "heading": "Notre Processus de Production",
        "subheading": "Découvrez comment nous créons nos produits artisanaux"
      }
    },
    {
      "type": "text",
      "content": {
        "text": "Depuis plus de 20 ans, Maison Heness fabrique ses produits avec passion et respect des traditions."
      }
    },
    {
      "type": "heading",
      "content": {
        "text": "Étape 1: Sélection des Ingrédients"
      }
    },
    {
      "type": "richText",
      "content": {
        "html": "<p>Nous sélectionnons rigoureusement nos ingrédients auprès de <strong>producteurs locaux</strong> et durables.</p><ul><li>Fruits frais de saison</li><li>Épices de qualité premium</li><li>Vinaigres vieillis</li></ul>"
      }
    },
    {
      "type": "image",
      "content": {
        "url": "/images/ingredient-selection.jpg",
        "alt": "Sélection des ingrédients",
        "caption": "Nos ingrédients sélectionnés avec soin"
      }
    },
    {
      "type": "divider",
      "content": {}
    },
    {
      "type": "heading",
      "content": {
        "text": "Étape 2: Fabrication"
      }
    },
    {
      "type": "gallery",
      "content": {
        "title": "Nos Ateliers",
        "images": [
          {
            "url": "/images/workshop-1.jpg",
            "alt": "Atelier principal"
          },
          {
            "url": "/images/workshop-2.jpg",
            "alt": "Zone de production"
          }
        ]
      }
    },
    {
      "type": "video",
      "content": {
        "title": "Visite de Nos Ateliers",
        "url": "https://www.youtube.com/embed/dQw4w9WgXcQ"
      }
    },
    {
      "type": "features",
      "content": {
        "title": "Nos Méthodes",
        "items": [
          {
            "title": "Fermentation Naturelle",
            "description": "Process naturel sans additifs"
          },
          {
            "title": "Embouteillage Manuel",
            "description": "Attention particulière à chaque produit"
          }
        ]
      }
    },
    {
      "type": "divider",
      "content": {}
    },
    {
      "type": "cta",
      "content": {
        "heading": "Goûtez la Différence",
        "description": "Découvrez nos produits artisanaux",
        "buttonText": "Voir la Boutique",
        "buttonUrl": "/boutique"
      }
    }
  ],
  "seoTitle": "Notre Processus de Production - Maison Heness",
  "seoDescription": "Découvrez comment Maison Heness fabrique ses produits artisanaux depuis plus de 20 ans.",
  "createdAt": "2026-09-10T14:27:59.195Z",
  "updatedAt": "2026-09-10T14:27:59.195Z"
}
```

---

## Points Importants

- ✅ Chaque section a un type unique
- ✅ Le champ `content` s'adapte au type de section
- ✅ Les images doivent avoir des URLs valides (http/https)
- ✅ Le HTML dans `richText` doit être sécurisé et valide
- ✅ Les URLs doivent commencer par `/` pour les routes internes
- ✅ `navbarOrder` détermine l'ordre d'affichage (croissant)
- ✅ Les pages avec `published: false` ne s'affichent nulle part
- ✅ Les pages avec `showInNavbar: false` n'apparaissent que directement via URL

---

## Bonnes Pratiques

1. **Toujours commencer par un Hero** pour le contexte
2. **Utiliser des dividers** pour séparer les sections logiques
3. **Ajouter des images** pour améliorer la lisibilité
4. **Terminer avec un CTA** pour l'engagement
5. **Utiliser des rubriques pertinentes** pour la structure
6. **Valider le HTML** dans les sections richText
7. **Optimiser les images** (compression, taille appropriée)
