# Guides des Styles de Pages Dynamiques - Tailwind CSS

## 🎯 Système de Templates Automatiques

Le système détecte automatiquement le type de page selon le **pattern du slug** et applique des styles correspondants.

---

## 📋 Types de Templates

### 1. **ARTICLE** (blogs, articles)
**Patterns détectés:** `article`, `blog`

```json
{
  "slug": "mon-article-blog",
  "title": "Mon Article de Blog"
}
```

**Caractéristiques:**
- 🎨 Fond sombre (slate) avec texte blanc
- 📖 Typographie magazine/blog
- 📏 Contenu centré (max 768px)
- ✨ Design épuré et lisible

**Exemple de réponse API:**
```json
{
  "slug": "guide-complet-vinaigre",
  "title": "Guide Complet du Vinaigre",
  "sections": [
    {
      "type": "hero",
      "content": {
        "heading": "Guide Complet du Vinaigre",
        "subheading": "Tout ce que vous devez savoir sur nos vinaigres artisanaux"
      }
    },
    {
      "type": "text",
      "content": {
        "text": "Le vinaigre artisanal est bien plus qu'un simple ingrédient..."
      }
    },
    {
      "type": "heading",
      "content": {
        "text": "Histoire et Origines"
      }
    },
    {
      "type": "richText",
      "content": {
        "html": "<p>Depuis l'Antiquité, le vinaigre...</p><ul><li>Point 1</li><li>Point 2</li></ul>"
      }
    }
  ]
}
```

---

### 2. **LEGAL** (CGU, politique, mentions légales)
**Patterns détectés:** `cgu`, `conditions`, `legal`, `mentions`

```json
{
  "slug": "mentions-legales",
  "title": "Mentions Légales"
}
```

**Caractéristiques:**
- ⚖️ Design formel et professionnel
- 📑 Typographie claire et structurée
- 🎯 Hiérarchie visuelle distincte
- 📄 Format document officiel

**Exemple de réponse API:**
```json
{
  "slug": "conditions-generales",
  "title": "Conditions Générales d'Utilisation",
  "sections": [
    {
      "type": "hero",
      "content": {
        "heading": "Conditions Générales d'Utilisation",
        "subheading": "En vigueur à partir du 10 septembre 2026"
      }
    },
    {
      "type": "heading",
      "content": {
        "text": "1. Définitions"
      }
    },
    {
      "type": "richText",
      "content": {
        "html": "<p>Les termes suivants sont définis comme suit:</p><ul><li><strong>Client:</strong> Personne physique ou morale...</li><li><strong>Service:</strong> La plateforme de Maison Heness...</li></ul>"
      }
    },
    {
      "type": "heading",
      "content": {
        "text": "2. Conditions d'Accès"
      }
    },
    {
      "type": "richText",
      "content": {
        "html": "<p>L'accès au Service est réservé...</p>"
      }
    }
  ]
}
```

---

### 3. **SHOP** (pages boutique, produits)
**Patterns détectés:** `boutique`, `produit`

```json
{
  "slug": "boutique-vinaigres",
  "title": "Boutique - Vinaigres"
}
```

**Caractéristiques:**
- 🏪 Ambiance e-commerce premium
- 🎨 Couleurs ambrées/dorées (thème Maison Heness)
- 📸 Mise en avant des images
- 🛍️ Design de vente

**Exemple de réponse API:**
```json
{
  "slug": "boutique-vinaigres",
  "title": "Notre Sélection de Vinaigres",
  "sections": [
    {
      "type": "hero",
      "content": {
        "heading": "Notre Sélection de Vinaigres",
        "subheading": "Découvrez nos créations artisanales"
      }
    },
    {
      "type": "text",
      "content": {
        "text": "Nos vinaigres sont produits selon des méthodes traditionnelles..."
      }
    },
    {
      "type": "gallery",
      "content": {
        "title": "Nos Vinaigres",
        "images": [
          {
            "url": "/images/Boutique/vinaigre1.jpg",
            "alt": "Vinaigre Grenade"
          }
        ]
      }
    },
    {
      "type": "features",
      "content": {
        "title": "Pourquoi nos Vinaigres?",
        "items": [
          {
            "title": "100% Artisanal",
            "description": "Fabriqué selon des recettes traditionnelles"
          }
        ]
      }
    },
    {
      "type": "cta",
      "content": {
        "heading": "Prêt à goûter?",
        "description": "Commandez nos vinaigres directement",
        "buttonText": "Voir les Produits",
        "buttonUrl": "/boutique"
      }
    }
  ]
}
```

---

### 4. **FEATURED** (mise en avant, spécial)
**Patterns détectés:** `highlight`, `featured`, `special`

```json
{
  "slug": "produit-en-avant-cuvee-speciale",
  "title": "Cuvée Spéciale - Édition Limitée"
}
```

**Caractéristiques:**
- ⭐ Design spectaculaire avec gradients
- 🌟 Couleurs rose/rose-doré
- 🎯 Forte focus sur l'appel à l'action
- 💎 Aspect premium et exclusif

**Exemple de réponse API:**
```json
{
  "slug": "special-edition-2026",
  "title": "Édition Limitée 2026",
  "sections": [
    {
      "type": "hero",
      "content": {
        "heading": "Édition Limitée 2026",
        "subheading": "Un vinaigre unique et exclusif"
      }
    },
    {
      "type": "image",
      "content": {
        "url": "/images/special-edition.jpg",
        "alt": "Édition Limitée",
        "caption": "Une bouteille d'exception"
      }
    },
    {
      "type": "richText",
      "content": {
        "html": "<h2>L'Histoire de Cette Cuvée</h2><p>Créée à partir de raisins sélectionnés...</p>"
      }
    },
    {
      "type": "features",
      "content": {
        "title": "Caractéristiques",
        "items": [
          {
            "title": "Vieillie 12 mois",
            "description": "Maturation en fûts de chêne français"
          },
          {
            "title": "Édition Limitée",
            "description": "500 bouteilles numérotées seulement"
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
        "heading": "Réservez Votre Bouteille",
        "description": "Une édition limitée à ne pas manquer",
        "buttonText": "Réserver Maintenant",
        "buttonUrl": "/boutique/special-edition-2026"
      }
    }
  ]
}
```

---

### 5. **DEFAULT** (pages standards)
**Patterns détectés:** Tous les autres slugs

```json
{
  "slug": "notre-philosophie",
  "title": "Notre Philosophie"
}
```

**Caractéristiques:**
- 🎯 Design neutre et professionnel
- 📘 Style corporate/information
- 📏 Bon équilibre visuel
- ✨ Polyvalent pour tous contenus

---

## 🎨 Système de Couleurs par Template

### Article (Blog)
```
Hero: slate-800 → slate-900
Texte: slate-700
Accents: slate-300, blue-200
Lien: blue-600
```

### Legal (CGU/Mentions)
```
Hero: slate-700 → slate-800
Texte: slate-700
Accents: slate-300
Bordures: slate-400
```

### Shop (Boutique)
```
Hero: amber-900 → amber-900
Texte: slate-700
Accents: amber-300, amber-200
Lien: amber-600
```

### Featured (Spécial)
```
Hero: rose-700 → amber-600
Texte: slate-700
Accents: rose-100, rose-300
Lien: rose-600
```

---

## 📐 Breakpoints Responsifs

Tous les templates utilisent Tailwind CSS breakpoints:

```
- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1536px
```

---

## 🚀 Ajouter un Nouveau Template

Pour ajouter un nouveau template, modifiez le fichier `DynamicPage.jsx`:

```javascript
// 1. Ajouter le pattern dans getTemplateType()
const getTemplateType = (slug) => {
  const lowerSlug = slug.toLowerCase();
  
  // ... patterns existants ...
  
  if (lowerSlug.includes('nouveau-pattern')) return 'newTemplate';
  
  return 'default';
};

// 2. Ajouter la configuration dans themeConfig
const themeConfig = {
  newTemplate: {
    hero: 'bg-gradient-to-r from-[color] to-[color] text-white py-16 md:py-20',
    heroHeading: 'text-3xl md:text-5xl font-serif font-bold text-white mb-4',
    // ... autres propriétés ...
  },
  // ... autres templates ...
};
```

---

## 💡 Bonnes Pratiques

### ✅ DO's
- ✅ Utiliser les gradients pour les heros
- ✅ Ajouter des animations sur les images
- ✅ Utiliser les espacements Tailwind (py-6, mb-8, etc.)
- ✅ Adapter les tailles de police avec clamp() via Tailwind
- ✅ Tester sur mobile (responsive)

### ❌ DON'Ts
- ❌ Ajouter du CSS personnalisé (utiliser Tailwind)
- ❌ Oublier les classes hover:
- ❌ Ignorer les breakpoints responsive
- ❌ Utiliser des couleurs custom en dur (utiliser palette Tailwind)

---

## 📱 Exemple Complet - Article

```json
{
  "slug": "blog-methodes-production",
  "title": "Nos Méthodes de Production",
  "published": true,
  "showInNavbar": true,
  "navbarLabel": "Production",
  "navbarOrder": 3,
  "sections": [
    {
      "type": "hero",
      "content": {
        "heading": "Nos Méthodes de Production",
        "subheading": "Découvrez comment nous créons nos produits avec passion"
      }
    },
    {
      "type": "text",
      "content": {
        "text": "Depuis 20 ans, Maison Heness perpétue les traditions artisanales..."
      }
    },
    {
      "type": "heading",
      "content": {
        "text": "Étape 1: Sélection des Ingrédients"
      }
    },
    {
      "type": "image",
      "content": {
        "url": "/images/production-step1.jpg",
        "alt": "Sélection des ingrédients",
        "caption": "Nos ingrédients sélectionnés avec soin"
      }
    },
    {
      "type": "richText",
      "content": {
        "html": "<p>Nous collaborons avec les meilleurs producteurs locaux...</p>"
      }
    },
    {
      "type": "divider",
      "content": {}
    },
    {
      "type": "heading",
      "content": {
        "text": "Étape 2: Fermentation Naturelle"
      }
    },
    {
      "type": "gallery",
      "content": {
        "title": "Nos Ateliers de Production",
        "images": [
          {
            "url": "/images/atelier1.jpg",
            "alt": "Atelier principal"
          },
          {
            "url": "/images/atelier2.jpg",
            "alt": "Zone de fermentation"
          }
        ]
      }
    },
    {
      "type": "features",
      "content": {
        "title": "Nos Avantages",
        "items": [
          {
            "title": "100% Naturel",
            "description": "Sans additifs ni conservateurs"
          },
          {
            "title": "Traditionnel",
            "description": "Recettes transmises depuis des générations"
          }
        ]
      }
    },
    {
      "type": "cta",
      "content": {
        "heading": "Goûtez Nos Produits",
        "description": "Découvrez le résultat de notre savoir-faire",
        "buttonText": "Voir la Boutique",
        "buttonUrl": "/boutique"
      }
    }
  ],
  "seoTitle": "Nos Méthodes de Production - Maison Heness",
  "seoDescription": "Découvrez comment Maison Heness fabrique ses produits artisanaux"
}
```

---

## 🎯 Résumé

| Template | Slugs | Utilisation | Style |
|----------|-------|-------------|-------|
| **article** | article, blog | Articles de blog | Magazine noir/gris |
| **legal** | cgu, conditions, legal, mentions | Documents officiels | Professionnel gris |
| **shop** | boutique, produit | Pages produits | Premium ambré |
| **featured** | highlight, featured, special | Mises en avant | Spectaculaire rose |
| **default** | autres | Pages générales | Neutre bleu |
