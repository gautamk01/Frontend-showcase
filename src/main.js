import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

// ========== IMAGE PRELOADER ==========
const loadingScreen = document.getElementById("loading-screen");
const loadingBar = document.querySelector(".loading-bar");
const loadingPercentage = document.querySelector(".loading-percentage");

// Add loading class to body to prevent scrolling
document.body.classList.add("loading");

// Collect all image URLs
const config = {
  gap: 0.08,
  speed: 0.4,
  arcRadius: 500,
};

//Max - 8 in 4
const spotlightItems = [
  {
    name: "Nike Landing Page ",
    img: "/img-4.jpeg",
    video: "/p1.mp4",
    desc: "A beautiful and responsive Nike shoes landing page built using React.js and Tailwind CSS. The design emphasizes simplicity, modern UI, and user engagement with clean animations and a smooth experience.",
    liveUrl: "https://gautamk01.github.io/Nike-_Landing_page/",
    gitUrl: "https://github.com/gautamk01/Nike-_Landing_page",
  },
  {
    name: "Intro Animation 1",
    img: "/img-1.jpeg",
    video: "/p2.mp4",
    desc: "A stunning, interactive portfolio website featuring advanced GSAP animations, dynamic text effects, and color-shifting glows. Built with React and Vite, this project showcases modern web development techniques with a focus on performance and visual excellence.",
    liveUrl: "https://gautamk01.github.io/GSAP-PROJECT-1/",
    gitUrl: "https://github.com/gautamk01/GSAP-PROJECT-1",
  },
  {
    name: "Intro Animation 2",
    img: "/img-3.jpeg",
    video: "/p3.mp4",
    desc: "A stunning React-based web application showcasing advanced scroll-driven animations using GSAP (GreenSock Animation Platform), featuring interactive Lottie animations and smooth scrolling effects.",
    liveUrl: "https://gautamk01.github.io/GSAP-PROJECT-3/",
    gitUrl: "https://github.com/gautamk01/GSAP-PROJECT-3/",
  },
  {
    name: "Scroll Animation",
    img: "/img-2.jpeg",
    video: "/p4.mp4",
    desc: "A stunning React-based web application showcasing advanced scroll-driven animations using GSAP (GreenSock Animation Platform), featuring interactive Lottie animations and smooth scrolling effects.",
    liveUrl: "https://gautamk01.github.io/GSAP-PROJECT-2/",
    gitUrl: "https://github.com/gautamk01/GSAP-PROJECT-2/",
  },
  // {
  //   name: "Mono 73",
  //   img: "/img-9.png",
  //   desc: "Monochromatic beauty in simplicity.",
  //   liveUrl: "#",
  //   gitUrl: "#",
  // },
  // {
  //   name: "Echo 9",
  //   img: "/img-4.png",
  //   desc: "Repetition creates rhythm and depth.",
  //   liveUrl: "#",
  //   gitUrl: "#",
  // },
  // {
  //   name: "Mono 73",
  //   img: "/img-9.png",
  //   desc: "Monochromatic beauty in simplicity.",
  //   liveUrl: "#",
  //   gitUrl: "#",
  // },
];

// Get unique image URLs
const imageUrls = [...new Set(spotlightItems.map((item) => item.img))];

// Store preloaded images in memory to prevent re-fetching
const imageCache = new Map();

// Preload images and cache them in memory
function preloadImages(urls) {
  return new Promise((resolve) => {
    let loadedCount = 0;
    const totalImages = urls.length;

    if (totalImages === 0) {
      resolve();
      return;
    }

    urls.forEach((url) => {
      const img = new Image();

      img.onload = () => {
        loadedCount++;
        // Cache the loaded image object
        imageCache.set(url, img);
        updateProgress(loadedCount, totalImages);

        if (loadedCount === totalImages) {
          resolve();
        }
      };

      img.onerror = () => {
        loadedCount++;
        console.warn(`Failed to load image: ${url}`);
        updateProgress(loadedCount, totalImages);

        if (loadedCount === totalImages) {
          resolve();
        }
      };

      img.src = url;
    });
  });
}

function updateProgress(loaded, total) {
  const progress = (loaded / total) * 100;
  loadingBar.style.width = `${progress}%`;
  loadingPercentage.textContent = `${Math.round(progress)}%`;
}

// Create pre-rendered background images for instant switching
function createBackgroundImages() {
  const bgContainer = document.querySelector(".spotlight-bg-img");
  const shade = bgContainer.querySelector(".spotlight-shade");

  // Get unique Media
  // We use object to track uniqueness by img/url
  const addedUrls = new Set();
  let firstVideo = null;

  spotlightItems.forEach((item, index) => {
    const uniqueKey = item.img;
    if (addedUrls.has(uniqueKey)) return;
    addedUrls.add(uniqueKey);

    let mediaEl;
    if (item.video) {
      mediaEl = document.createElement("video");
      mediaEl.src = item.video;
      mediaEl.muted = true;
      mediaEl.loop = true;
      mediaEl.playsInline = true;
      // Don't autoplay - we'll control this manually
    } else {
      mediaEl = document.createElement("img");
      mediaEl.src = item.img;
      mediaEl.alt = "";
    }

    mediaEl.dataset.mediaUrl = uniqueKey; // Store key for easy lookup

    // First item active by default
    if (index === 0) {
      mediaEl.classList.add("active");
      if (item.video) {
        firstVideo = mediaEl;
      }
    }

    // Insert before the shade element
    bgContainer.insertBefore(mediaEl, shade);
  });

  // Start playing the first video if it exists
  if (firstVideo) {
    firstVideo.play().catch((err) => console.log("Autoplay prevented:", err));
  }
}

// Initialize site after images are loaded
async function initializeSite() {
  await preloadImages(imageUrls);

  // Create pre-rendered background images
  createBackgroundImages();

  // Wait a brief moment for the 100% to be visible
  await new Promise((resolve) => setTimeout(resolve, 300));

  // Hide loading screen
  loadingScreen.classList.add("hidden");
  document.body.classList.remove("loading");

  // Remove loading screen from DOM after animation completes
  setTimeout(() => {
    loadingScreen.remove();
  }, 600);
}

// Start preloading
initializeSite();

const live = {
  get vh() {
    return window.innerHeight;
  },
  get vw() {
    return window.innerWidth;
  },
  get w75() {
    return this.vw * 0.75;
  },
  get end() {
    return `+=${this.vh * 10}px`;
  }, // 1️⃣ scroll distance
  get arc() {
    // 2️⃣ bezier points
    const startX = this.w75 - 220;
    const cpX = startX + 500; // config.arcRadius
    const cpY = this.vh / 2;
    return { startX, cpX, cpY };
  },
};
gsap.set("body", { overflowX: "hidden" });
window.addEventListener("wheel", (e) => e.deltaX && e.preventDefault(), {
  passive: false,
});

const lenis = new Lenis();
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

//DOM
const titlesContainer = document.querySelector(".spotlight-titles");
const imagesContainer = document.querySelector(".spotlight-images");
const spotlightHeader = document.querySelector(".spotlight-header");

const titlesContainerElement = document.querySelector(
  ".spotlight-titles-container"
);

const introTextElement = document.querySelectorAll(".spotlight-intro-text");
const imageElement = [];

spotlightItems.forEach((item, index) => {
  const titleElement = document.createElement("h1");
  titleElement.textContent = item.name;
  if (index === 0) titleElement.style.opacity = "1";
  titlesContainer.appendChild(titleElement);

  const imgWrapper = document.createElement("div");
  imgWrapper.className = "spotlight-img";
  const imgElement = document.createElement("img");
  imgElement.src = item.img;
  imgElement.alt = "";
  imgWrapper.appendChild(imgElement);
  imagesContainer.appendChild(imgWrapper);
  imageElement.push(imgWrapper);
});

const titleElement = titlesContainer.querySelectorAll("h1");
let currentActiveIndex = 0;

function getBezierPosition(t) {
  /* everything is now computed on-the-fly */
  const vh = window.innerHeight;
  const vw = window.innerWidth;

  /* MATH ADAPTATION FOR MOBILE */
  let startX, cpX, cpY;

  if (vw <= 768) {
    // -- MOBILE LOGIC --
    // Center the start point horizontally
    startX = vw / 2 - 100; // -100 compensates for half image width (approx)

    // Create a much tighter arc
    // Instead of flaring out 500px, we flare out based on available screen width
    // using roughly 40% of the screen width as the curve variance
    const arcRadius = vw * 0.4;

    cpX = startX + arcRadius;
    cpY = vh / 2;
  } else {
    // -- DESKTOP LOGIC (Original) --
    // 75% across the screen
    const w75 = vw * 0.75;
    startX = w75 - 220;
    cpX = startX + 500; // same as config.arcRadius
    cpY = vh / 2;
  }

  const startY = -200;
  const endY = vh + 200;

  const x = (1 - t) ** 2 * startX + 2 * (1 - t) * t * cpX + t ** 2 * startX;

  const y = (1 - t) ** 2 * startY + 2 * (1 - t) * t * cpY + t ** 2 * endY;

  return { x, y };
}

function getImgProgressState(index, overallProgress) {
  const startTime = index * config.gap;
  const endTime = startTime + config.speed;

  if (overallProgress < startTime) return -1;
  if (overallProgress > endTime) return 2;
  return (overallProgress - startTime) / config.speed;
}

imageElement.forEach((img) => gsap.set(img, { opacity: 0 }));

ScrollTrigger.create({
  trigger: ".spotlight",
  start: "top top",
  end: live.end,
  pin: true,
  pinSpacing: true,
  scrub: 1,
  onUpdate: (self) => {
    const progress = self.progress;
    if (progress <= 0.2) {
      const animationProgress = progress / 0.2;
      const moveDistance = window.innerWidth * 0.6;
      gsap.set(introTextElement[0], {
        x: -animationProgress * moveDistance,
      });
      gsap.set(introTextElement[1], {
        x: animationProgress * moveDistance,
      });
      gsap.set(introTextElement[0], {
        opacity: 1,
      });
      gsap.set(introTextElement[1], {
        opacity: 1,
      });

      gsap.set(".spotlight-bg-img", {
        transform: `scale(${animationProgress})`,
      });

      gsap.set(".spotlight-bg-img img, .spotlight-bg-img video", {
        transform: `scale(${1.5 - animationProgress * 0.5})`,
      });

      imageElement.forEach((img) => gsap.set(img, { opacity: 0 }));
      spotlightHeader.style.opacity = "0";
      gsap.set(titlesContainerElement, {
        "--before-opacity": "0",
        "--after-opacity": "0",
      });
    } else if (progress > 0.2 && progress <= 0.25) {
      gsap.set(
        ".spotlight-bg-img, .spotlight-bg-img img, .spotlight-bg-img video",
        { transform: "scale(1)" }
      );
      gsap.set(introTextElement[0], { opacity: 0 });
      gsap.set(introTextElement[1], { opacity: 0 });

      imageElement.forEach((img) => gsap.set(img, { opacity: 0 }));
      spotlightHeader.style.opacity = "1";
      gsap.set(titlesContainerElement, {
        "--before-opacity": "1",
        "--after-opacity": "1",
      });
    } else if (progress > 0.25) {
      // Run until the end
      gsap.set(
        ".spotlight-bg-img, .spotlight-bg-img img, .spotlight-bg-img video",
        { transform: "scale(1)" }
      );
      gsap.set(introTextElement[0], { opacity: 0 });
      gsap.set(introTextElement[1], { opacity: 0 });

      imageElement.forEach((img) => gsap.set(img, { opacity: 0 }));

      // Graceful fade out of UI near the very end
      if (progress > 0.9) {
        spotlightHeader.style.opacity = "0";
        gsap.set(titlesContainerElement, {
          "--before-opacity": "0",
          "--after-opacity": "0",
        });
      } else {
        spotlightHeader.style.opacity = "1";
        gsap.set(titlesContainerElement, {
          "--before-opacity": "1",
          "--after-opacity": "1",
        });
      }

      const switchProgress = (progress - 0.25) / 0.75; // Adjusted divisor for full range (1.0 - 0.25)
      const viewportHeight = window.innerHeight;
      const titlesContainerHeight = titlesContainer.scrollHeight;
      const startPosition = viewportHeight;
      const targetPosition = -titlesContainerHeight;
      const totalDistance = startPosition - targetPosition;
      const currentY = startPosition - switchProgress * totalDistance;

      gsap.set(".spotlight-titles", {
        transform: `translateY(${currentY}px)`,
      });

      /* PRECISION SYNC LOGIC */
      // Instead of guessing timing with "gaps", we lock the image position to the title's screen position.
      // This ensures that when the Title is in the center, the Image is EXACTLY in the center of its bezier curve.

      titleElement.forEach((title, index) => {
        // 1. Get Title Position
        const rect = title.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const vh = window.innerHeight;

        // 2. Map to 0-1 range (0 = Top of screen, 1 = Bottom)
        const screenProgress = center / vh;

        // 3. Calculate separate 't' for the bezier curve
        // We want Counter-Flow: As Text goes Bottom -> Top (1 -> 0), Image goes Top -> Bottom (0 -> 1)
        // This ensures they meet locally in the center (0.5 matches 0.5)
        const t = 1 - screenProgress;

        const imgWrapper = imageElement[index];

        // 4. Update Image Position if visible
        // We add a buffer (-0.2 to 1.2) so they don't pop out instantly at edges
        if (t >= -0.2 && t <= 1.2) {
          const pos = getBezierPosition(t);
          gsap.set(imgWrapper, {
            x: pos.x - 100, // Centering correction
            y: pos.y - 75,
            opacity: 1, // You could map this to distance from center for a fade effect
            visibility: "visible",
          });
        } else {
          gsap.set(imgWrapper, { opacity: 0, visibility: "hidden" });
        }
      });

      const viewportMiddle = viewportHeight / 2;
      let closestIndex = 0;
      let closestDistance = Infinity;

      titleElement.forEach((title, index) => {
        const titleRect = title.getBoundingClientRect();
        const titleCenter = titleRect.top + titleRect.height / 2;
        const distanceFromCenter = Math.abs(titleCenter - viewportMiddle);

        if (distanceFromCenter < closestDistance) {
          closestDistance = distanceFromCenter;
          closestIndex = index;
        }
      });

      if (closestIndex !== currentActiveIndex) {
        // Reset previous active item
        if (titleElement[currentActiveIndex]) {
          titleElement[currentActiveIndex].classList.remove("active");
          titleElement[currentActiveIndex].style.opacity = "0.25";

          // Reset animation (Global)
          gsap.to(titleElement[currentActiveIndex], {
            scale: 0.9,
            filter: "blur(2px)",
            duration: 0.4,
          });
        }

        // Highlight new active item
        titleElement[closestIndex].classList.add("active");
        titleElement[closestIndex].style.opacity = "1";

        // Highlight animation (Global)
        gsap.to(titleElement[closestIndex], {
          scale: 1.15,
          filter: "blur(0px)",
          textShadow: "0 0 20px rgba(255,255,255,0.4)",
          duration: 0.4,
        });

        // Switch background image via opacity (instant, no loading)
        // Switch background image/video via opacity
        const newUrl = spotlightItems[closestIndex].img;
        const bgMedia = document.querySelectorAll(
          ".spotlight-bg-img img, .spotlight-bg-img video"
        );

        bgMedia.forEach((el) => {
          if (el.dataset.mediaUrl === newUrl) {
            el.classList.add("active");
            if (el.tagName === "VIDEO") el.play();
          } else {
            el.classList.remove("active");
            if (el.tagName === "VIDEO") el.pause();
          }
        });

        currentActiveIndex = closestIndex;
      }
    }
  },
});

/* ----------  MODAL HANDLERS  ---------- */
const modal = document.getElementById("spotlight-modal");
const mTitle = modal.querySelector(".spotlight-modal__title");
const mClose = modal.querySelector(".spotlight-modal__close");

/* open */
/* open modal ONLY on highlighted title */
titlesContainer.addEventListener("click", (e) => {
  const h1 = e.target.closest("h1");
  if (!h1) return;

  const idx = [...titleElement].indexOf(h1);
  // allow click only if it is the highlighted one
  if (idx !== currentActiveIndex) return;

  const item = spotlightItems[idx];

  /* populate modal */
  modal.querySelector(".spotlight-modal__img").src = item.img;
  modal.querySelector(".spotlight-modal__title").textContent = item.name;
  modal.querySelector(".spotlight-modal__desc").textContent = item.desc;
  modal.querySelector(".live").href = item.liveUrl;
  modal.querySelector(".git").href = item.gitUrl;

  modal.classList.add("open");
  originalScrollFn.open();
});

/* close */
mClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

const originalScrollFn = {
  open() {
    lenis.stop();
  },
  close() {
    lenis.start();
  },
};

/* plug the pause/resume into the existing close helpers */
function closeModal() {
  modal.classList.remove("open");
  originalScrollFn.close();
}

/* ----------  HANDLE RESIZE  ---------- */
let resizeDebounce;
window.addEventListener("resize", () => {
  clearTimeout(resizeDebounce);
  resizeDebounce = setTimeout(() => {
    /* recompute the geometry that the scroll animation uses */
    containerHeight = window.innerHeight;
    containerWidth = window.innerWidth * 0.75;
    arcStartX = containerWidth - 220;
    arcControlPointX = arcStartX + config.arcRadius;
    arcControlPointY = containerHeight / 2;

    /* let ScrollTrigger re-measure and re-pin */
    ScrollTrigger.refresh(true);
  }, 150); // debounce so we don’t do it 50× while dragging
});
