# Configuration Tailwind CSS - Référence Rapide

## 🎨 Palettes de Couleurs Disponibles

### Article (Blog)
```tailwind
Text: text-slate-700
Hero: bg-gradient-to-r from-slate-800 to-slate-900
Accent: text-slate-300
Link: text-blue-600 hover:text-blue-800
Border: border-slate-300
```

### Legal (Officiel)
```tailwind
Text: text-slate-700
Hero: bg-gradient-to-r from-slate-700 to-slate-800
Accent: text-slate-300
Link: text-slate-600 hover:text-slate-800
Border: border-slate-400
```

### Shop (E-commerce)
```tailwind
Text: text-slate-700
Hero: bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900
Accent: text-amber-300
Link: text-amber-600 hover:text-amber-800
Border: border-amber-300
```

### Featured (Spécial)
```tailwind
Text: text-slate-700
Hero: bg-gradient-to-br from-rose-700 via-rose-600 to-amber-600
Accent: text-rose-100
Link: text-rose-600 hover:text-rose-800
Border: border-rose-300
```

---

## 📦 Classes Utiles Tailwind

### Layouts
```tailwind
max-w-3xl          // Container pour articles (768px)
max-w-4xl          // Container standard (896px)
max-w-5xl          // Container large (1280px)
max-w-6xl          // Container extra large (1344px)
```

### Typography
```tailwind
font-serif          // Georgia, serif (pour titres)
font-bold          // 700 weight
font-semibold      // 600 weight
font-light         // 300 weight
text-3xl           // 1.875rem (30px)
text-2xl           // 1.5rem (24px)
leading-relaxed    // 1.625
leading-loose      // 1.875
```

### Spacing
```tailwind
py-16              // 4rem padding vertical
py-12              // 3rem padding vertical
mb-8               // 2rem margin bottom
mb-4               // 1rem margin bottom
gap-4              // 1rem gap
gap-6              // 1.5rem gap
```

### Effects
```tailwind
shadow-lg          // Box shadow large
shadow-xl          // Box shadow extra large
hover:shadow-lg    // Shadow on hover
rounded-lg         // 8px border radius
overflow-hidden    // Clip content
```

### Responsive
```tailwind
md:text-2xl        // 768px breakpoint
lg:text-3xl        // 1024px breakpoint
sm:grid-cols-2     // 2 colonnes à 640px+
md:grid-cols-3     // 3 colonnes à 768px+
```

---

## 🎯 Pattern de Configuration Nouveau Template

Pour ajouter un template personnalisé, modifiez `DynamicPage.jsx`:

### Étape 1: Ajouter le pattern de détection
```javascript
const getTemplateType = (slug) => {
  const lowerSlug = slug.toLowerCase();
  
  // ... patterns existants ...
  
  if (lowerSlug.includes('ma-categorie')) return 'myTemplate';
  
  return 'default';
};
```

### Étape 2: Ajouter la configuration de thème
```javascript
const themeConfig = {
  myTemplate: {
    hero: 'bg-gradient-to-r from-purple-700 to-purple-900 text-white py-16 md:py-20',
    heroHeading: 'text-3xl md:text-5xl font-serif font-bold text-white mb-4',
    heroSubheading: 'text-lg md:text-xl text-purple-300 font-light',
    textSection: 'text-slate-700 leading-relaxed',
    heading: 'text-3xl font-serif font-bold text-purple-900 mt-8 mb-4 pb-3 border-b-2 border-purple-300',
    container: 'max-w-4xl mx-auto px-4 py-12',
  },
  // ... autres templates ...
};
```

### Étape 3: Utiliser dans les renderers
Le thème s'applique automatiquement via `createSectionRenderers(theme)`

---

## 🔧 Modification Rapide des Couleurs

### Pour changer la couleur d'un template:

1. **Localisez le template** dans `themeConfig`
2. **Changez les classes Tailwind** gradient:
   ```javascript
   // Avant
   hero: 'bg-gradient-to-r from-slate-800 to-slate-900 text-white'
   
   // Après
   hero: 'bg-gradient-to-r from-green-800 to-green-900 text-white'
   ```
3. **Mettez à jour les accents** (headings, borders):
   ```javascript
   heading: 'text-3xl font-serif font-bold text-green-900 border-b-2 border-green-300'
   ```

---

## 📱 Système de Responsive

Tailwind breakpoints utilisés:
- `sm:` 640px
- `md:` 768px  
- `lg:` 1024px
- `xl:` 1280px

Exemples dans le code:
```jsx
// Mobile d'abord, puis desktop
<h1 className="text-2xl md:text-4xl lg:text-5xl">
  Titre Responsive
</h1>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {/* Une colonne mobile, deux md, trois lg */}
</div>
```

---

## ✨ Animations Disponibles

Définies dans `DynamicPage.css`:

```css
.animate-fadeInUp      // Fade + remontée
.animate-fadeIn        // Fade simple
.animate-spin          // Rotation (pour spinner)
```

Utilisation:
```jsx
<div className="animate-fadeInUp">Contenu qui apparaît</div>
<div className="animate-spin">Spinner de chargement</div>
```

---

## 🎨 Prévisualisations des Gradients

### Article
```
█ slate-800 ──► slate-900 █
Noir/Gris sombre
```

### Legal
```
█ slate-700 ──► slate-800 █
Gris professionnel
```

### Shop
```
█ amber-900 ──► amber-900 █
Ambré riche
```

### Featured
```
█ rose-700 ──► amber-600 █
Rose vers doré (coucher de soleil)
```

---

## 🚀 Bonnes Pratiques Tailwind

### ✅ DO's
```tailwind
✅ max-w-3xl mx-auto          // Centré et limité
✅ py-12 md:py-16             // Responsive spacing
✅ text-slate-700             // Couleurs cohérentes
✅ hover:shadow-lg            // États interactifs
✅ rounded-lg overflow-hidden // Coins arrondis +clip
```

### ❌ DON'Ts
```tailwind
❌ w-[500px]                  // Taille fixe (responsive!)
❌ p-[50px]                   // Espacement custom (utiliser scale)
❌ text-[#5c3a21]             // Couleur hex (utiliser palette)
❌ shadow-[0_10px_40px_rgba]  // Shadow custom
```

---

## 📊 Comparaison: Avant vs Après

### AVANT (CSS Custom)
```css
.section-hero {
  background: linear-gradient(135deg, #5c3a21 0%, #8b5a2b 100%);
  padding: 4rem 2rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(92, 58, 33, 0.2);
}
```

### APRÈS (Tailwind)
```jsx
<section className="bg-gradient-to-r from-amber-900 to-amber-800 px-8 py-16 rounded-lg shadow-xl">
```

**Avantages Tailwind:**
- ✅ Plus court
- ✅ Réutilisable
- ✅ Cohérent avec design
- ✅ Responsive intégré
- ✅ Maintenance facile

---

## 🔍 Débogage Tailwind

Si une classe ne s'applique pas:

1. **Vérifiez l'ordre des classes** (dernier gagne)
2. **Utilisez `!important`** si vraiment nécessaire:
   ```jsx
   <div className="!text-red-600">Force ce rouge</div>
   ```
3. **Vérifiez dans les DevTools** (inspect > Computed)
4. **Rechargez la page** (cache Tailwind)

---

## 📚 Ressources

- Tailwind CSS: https://tailwindcss.com/docs
- Color Palette: https://tailwindcss.com/docs/customizing-colors
- Responsive Design: https://tailwindcss.com/docs/responsive-design
