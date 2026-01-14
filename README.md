# Frontend Project Showcase

A modern, high-performance portfolio showcase featuring advanced scroll animations, smooth transitions, and optimized image loading. Built with vanilla JavaScript and GSAP for maximum performance and visual impact.

![Project Banner](https://img.shields.io/badge/Status-Production%20Ready-success)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)
![Performance](https://img.shields.io/badge/Performance-Optimized-blue)

## ✨ Features

- **🎯 Advanced Scroll Animations** - Synchronized text and image animations using GSAP ScrollTrigger
- **⚡ Zero Loading Delays** - Pre-rendered image system with opacity-based switching
- **📱 Fully Responsive** - Adaptive bezier curves and layouts for mobile/tablet/desktop
- **🎨 Premium UI/UX** - Smooth transitions, loading bar, and modal interactions
- **🚀 Performance First** - Image preloading, caching, and optimized rendering
- **🎭 Smooth Scrolling** - Lenis integration for buttery-smooth scroll experience

## 🛠️ Technologies & Tools

### Core Technologies

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with custom properties and animations
- **JavaScript (ES6+)** - Modular, clean code

### Libraries & Frameworks

- **[GSAP](https://greensock.com/gsap/)** (v3.13.0) - Professional-grade animation library
  - ScrollTrigger - Scroll-based animations
- **[Lenis](https://lenis.studiofreight.com/)** (v1.1.18) - Smooth scrolling library
- **[Vite](https://vitejs.dev/)** (v7.0.0) - Lightning-fast build tool

### Development Tools

- **npm** - Package management
- **Git** - Version control

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd scroll_project_animation

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🚀 Usage

### Development

```bash
npm run dev
```

Opens development server at `http://localhost:5173` (default Vite port)

### Production Build

```bash
npm run build
```

Generates optimized files in the `dist/` directory

### Deployment

The project is deployment-ready for:

- **Vercel** (recommended)
- **Netlify**
- **GitHub Pages**
- Any static hosting service

For Vercel:

1. Push code to GitHub
2. Import repository in Vercel
3. Deploy automatically

## 📁 Project Structure

```
scroll_project_animation/
├── index.html              # Main HTML file
├── package.json           # Dependencies and scripts
├── src/
│   ├── main.js           # Main JavaScript (animations, logic)
│   └── style.css         # Global styles
├── public/               # Static assets
│   ├── img-1.png
│   ├── img-2.png
│   └── ...
└── dist/                 # Production build (generated)
```

## 🎨 Key Features Explained

### 1. Image Preloading System

All images are preloaded before the site becomes interactive, showing a progress bar:

```javascript
// Preloads all images and tracks progress
await preloadImages(imageUrls);
// Site only becomes interactive after 100% loaded
```

**Benefits:**

- No loading glitches during animations
- Smooth user experience even on slow connections
- Visual feedback with loading bar

### 2. Pre-Rendered Background Switching

Instead of changing image `src` (which causes re-decoding), images are pre-rendered and switched via CSS opacity:

```javascript
// All images are in DOM, we just toggle visibility
bgImages.forEach((img) => {
  img.classList.toggle("active", img.dataset.imageUrl === newImageUrl);
});
```

**Benefits:**

- **Instant switching** - No loading delays
- Works perfectly on slow connections
- Smooth CSS transitions

### 3. Adaptive Bezier Curves

Scroll animations adapt to screen size with responsive bezier math:

```javascript
// Desktop: Wide arc
// Mobile: Tight, centered arc
const arcRadius = vw <= 768 ? vw * 0.4 : 500;
```

### 4. Smooth Scrolling

Lenis provides momentum-based smooth scrolling integrated with GSAP:

```javascript
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
```

## ⚡ Performance Optimizations

### Image Optimization

- ✅ Pre-loading with progress tracking
- ✅ Memory-based caching (Map)
- ✅ Pre-rendered DOM elements
- ✅ Opacity-based switching (no re-decode)

### Animation Performance

- ✅ GSAP hardware acceleration
- ✅ `will-change` CSS properties
- ✅ RequestAnimationFrame syncing
- ✅ Debounced resize handlers

### Code Splitting

- ✅ ES6 modules
- ✅ Vite's automatic code splitting
- ✅ Tree-shaking unused code

## 🎯 Best Practices Implemented

1. **Semantic HTML** - Proper heading hierarchy, ARIA labels
2. **Mobile-First CSS** - Responsive design with media queries
3. **Clean Code** - Well-commented, modular JavaScript
4. **SEO Ready** - Meta tags, descriptive content
5. **Accessibility** - Keyboard navigation, screen reader friendly
6. **Performance** - Lazy loading, optimized assets

## 🔧 Configuration

### Modifying Projects

Edit the `spotlightItems` array in `src/main.js`:

```javascript
const spotlightItems = [
  {
    name: "Project Name",
    img: "/your-image.png",
    desc: "Project description",
    liveUrl: "https://your-live-url.com",
    gitUrl: "https://github.com/your-repo",
  },
  // Add more projects...
];
```

### Animation Timing

Adjust scroll animation speed in `src/main.js`:

```javascript
const config = {
  gap: 0.08, // Gap between image animations
  speed: 0.4, // Image transition speed
  arcRadius: 500, // Desktop arc size
};
```

## 🐛 Troubleshooting

### Build Fails on Vercel/Netlify

**Issue:** Missing `lenis` dependency  
**Fix:** Ensure `package.json` includes all dependencies:

```json
"dependencies": {
  "gsap": "^3.13.0",
  "lenis": "^1.1.18"
}
```

### Images Not Loading

**Issue:** Incorrect path references  
**Fix:** Ensure images are in `/public` folder and referenced with `/` prefix:

```javascript
img: "/img-1.png"; // ✅ Correct
img: "img-1.png"; // ❌ Wrong
```

### Slow Background Switching

**Issue:** Old code using `src` changes  
**Fix:** Ensure using the pre-rendered opacity system (latest code)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Gautam Krishna M**

- Portfolio: [Your Portfolio URL]
- GitHub: [@gautamk01](https://github.com/gautamk01)
- LinkedIn: [Your LinkedIn]

## 🙏 Acknowledgments

- **GSAP** - For the incredible animation library
- **Lenis** - For smooth scrolling implementation
- **Vite** - For blazing-fast development experience

---

**Built with ❤️ and lots of ☕**

_For questions or support, please open an issue on GitHub._
