const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const card = document.getElementById("card");
const celebration = document.getElementById("celebration");
const heartsContainer = document.getElementById("floatingHearts");

/* ── Floating hearts background ── */
const heartEmojis = ["💖", "💕", "💘", "💝", "💗", "💓", "💞", "❤️", "🩷"];

function createHeart() {
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
  heart.style.left = Math.random() * 100 + "%";
  heart.style.fontSize = (Math.random() * 18 + 14) + "px";
  heart.style.animationDuration = (Math.random() * 6 + 6) + "s";
  heart.style.animationDelay = (Math.random() * 4) + "s";
  heartsContainer.appendChild(heart);
  setTimeout(() => heart.remove(), 14000);
}

setInterval(createHeart, 800);
for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, i * 200);
}

/* ── No button runs away ── */
noBtn.addEventListener("mouseenter", () => {
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

noBtn.addEventListener("touchstart", (e) => {
  e.preventDefault();
  const x = Math.random() * 200 - 100;
  const y = Math.random() * 200 - 100;
  noBtn.style.transition = "transform 0.3s ease";
  noBtn.style.transform = `translate(${x}px, ${y}px)`;
});

/* ── Yes button: confetti celebration ── */
yesBtn.addEventListener("click", () => {
  card.classList.add("hidden");
  celebration.classList.remove("hidden");

  const duration = 3000;
  const end = Date.now() + duration;
  const colors = ["#ff4d6d", "#ff758f", "#d63384", "#ffc0cb", "#ff85a1", "#ff99ac"];

  (function frame() {
    confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
    confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();

  setTimeout(() => {
    confetti({ particleCount: 200, spread: 100, origin: { y: 0.6 }, colors });
  }, 500);

  // Auto-play music
  const audio = document.getElementById("bgMusic");
  if (audio) {
    audio.play().catch(() => {});
  }
});

/* ══════════════════════════════════════
   TAB NAVIGATION
   ══════════════════════════════════════ */
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const tabId = btn.getAttribute("data-tab");

    tabBtns.forEach((b) => b.classList.remove("active"));
    tabContents.forEach((c) => c.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById("tab-" + tabId).classList.add("active");
  });
});

/* ══════════════════════════════════════
   PHOTO GALLERY LIGHTBOX
   ══════════════════════════════════════ */
const photoItems = document.querySelectorAll(".photo-item");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

const galleryImages = ["image.jpg", "image1.jpg", "image4.gif", "image123.jpg"];
let currentImageIndex = 0;

photoItems.forEach((item) => {
  item.addEventListener("click", () => {
    currentImageIndex = parseInt(item.getAttribute("data-index"));
    lightboxImg.src = galleryImages[currentImageIndex];
    lightbox.classList.remove("hidden");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.add("hidden");
});

lightboxPrev.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImageIndex];
});

lightboxNext.addEventListener("click", () => {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  lightboxImg.src = galleryImages[currentImageIndex];
});

lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.classList.add("hidden");
  }
});

document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("hidden")) return;
  if (e.key === "Escape") lightbox.classList.add("hidden");
  if (e.key === "ArrowLeft") lightboxPrev.click();
  if (e.key === "ArrowRight") lightboxNext.click();
});

/* ══════════════════════════════════════
   GIFTS SECTION
   ══════════════════════════════════════ */

/* Virtual Bouquet */
const bouquetBtn = document.getElementById("bouquetBtn");
const bouquetReveal = document.getElementById("bouquetReveal");

bouquetBtn.addEventListener("click", () => {
  bouquetReveal.classList.remove("hidden");
  bouquetBtn.classList.add("hidden");
  // Mini confetti for the bouquet
  confetti({
    particleCount: 80,
    spread: 70,
    origin: { y: 0.7 },
    colors: ["#ff4d6d", "#ff758f", "#ffc0cb", "#ff85a1", "#22c55e", "#16a34a"],
  });
});

/* Reasons I Love You */
const reasons = [
  "Your smile lights up my entire world 🌟",
  "You make even the boring days feel special 💫",
  "Your laugh is my favorite sound 🎵",
  "You always know how to make me happy 😊",
  "You're the strongest person I know 💪",
  "Your kindness inspires me every day 🌸",
  "You make our home feel like heaven 🏡",
  "Every day with you is an adventure 🗺️",
  "You're my best friend and soulmate 👫",
  "Your hugs are the best medicine 🤗",
  "You believe in me even when I don't 🙏",
  "Your cooking is absolutely amazing 🍳",
  "You make everything better just by being you 💖",
  "I love the way you care about everyone 💕",
  "You're the reason I look forward to every day 🌅",
];

const reasonBtn = document.getElementById("reasonBtn");
const reasonText = document.getElementById("reasonText");
let reasonIndex = 0;

reasonBtn.addEventListener("click", () => {
  reasonText.classList.remove("hidden");
  reasonText.textContent = reasons[reasonIndex];
  reasonIndex = (reasonIndex + 1) % reasons.length;

  // Small animation reset
  reasonText.style.animation = "none";
  void reasonText.offsetHeight;
  reasonText.style.animation = "fadeIn 0.5s ease";
});

/* ══════════════════════════════════════
   DOWNLOAD ZIP FUNCTIONALITY
   ══════════════════════════════════════ */
const downloadBtn = document.getElementById("downloadBtn");
const downloadBtnText = document.getElementById("downloadBtnText");
const downloadProgress = document.getElementById("downloadProgress");

const mediaFiles = [
  { name: "photos/our-photo-1.jpg", url: "image.jpg" },
  { name: "photos/our-photo-2.jpg", url: "image1.jpg" },
  { name: "photos/our-photo-3.jpg", url: "image3.jpg" },
  { name: "photos/our-photo-4.jpg", url: "image123.jpg" },
  { name: "gifs/love-animation-1.gif", url: "image.gif" },
  { name: "gifs/love-animation-2.gif", url: "image1.gif" },
  { name: "music/our-song.mp3", url: "akash.mp3" },
];

const sourceCodeFiles = [
  { name: "source-code/index.html", url: "index.html" },
  { name: "source-code/style.css", url: "style.css" },
  { name: "source-code/script.js", url: "script.js" },
  { name: "source-code/image.jpg", url: "image.jpg" },
  { name: "source-code/image1.jpg", url: "image1.jpg" },
  { name: "source-code/image3.jpg", url: "image3.jpg" },
  { name: "source-code/image123.jpg", url: "image123.jpg" },
  { name: "source-code/image.gif", url: "image.gif" },
  { name: "source-code/image1.gif", url: "image1.gif" },
  { name: "source-code/akash.mp3", url: "akash.mp3" },
];

const loveLetter = `💖 Valentine's Love Letter 💖
================================

Hey My Love,

Every smile of yours feels like home.
Every moment with you feels like magic.

You are officially, proudly, and forever
💖 The Valentine of Akash Gupta, Your Husband ❤️

I choose you today. I'll choose you tomorrow.
And I'll keep choosing you — Always.
Every moment with you feels like a beautiful dream
I never want to wake up from.

Wishing the sweetest, happiest day to my forever Valentine!

Happy Valentine's Day My Bachhwa 💘

Forever yours,
बदमाश पति 😎

================================

💌 Love Coupons (Redeem Anytime!) 💌
- 🍕 1x Free Pizza Date Night
- 🤗 Unlimited Hugs (24/7)
- 🎬 1x Movie Night Your Choice
- 💆 1x Full Day Pampering
- 🍳 1x Breakfast in Bed
- 🛍️ 1x Shopping Spree Together

================================

💝 My Promises To You 💝
- I promise to always make you laugh 😄
- I promise to hold your hand through every storm 🌧️
- I promise to be your biggest cheerleader 📣
- I promise to love you more each day 💕
- I promise to always choose us 💑

================================

⭐ Reasons I Love You ⭐
- Your smile lights up my entire world 🌟
- You make even the boring days feel special 💫
- Your laugh is my favorite sound 🎵
- You always know how to make me happy 😊
- You're the strongest person I know 💪
- Your kindness inspires me every day 🌸
- You make our home feel like heaven 🏡
- Every day with you is an adventure 🗺️
- You're my best friend and soulmate 👫
- Your hugs are the best medicine 🤗
- You believe in me even when I don't 🙏
- Your cooking is absolutely amazing 🍳
- You make everything better just by being you 💖
- I love the way you care about everyone 💕
- You're the reason I look forward to every day 🌅

With all my love, always and forever ❤️
`;

async function fetchFileAsBlob(url) {
  const response = await fetch(url);
  return response.blob();
}

const readmeContent = `# Valentine-Gift-for-Wife 💖
Valentine Surprise for My Wifey

## About
A romantic, interactive Valentine's Day surprise website built with HTML, CSS, and JavaScript. Features a playful question card, love letter, photo gallery with lightbox, interactive gifts, and a downloadable memories ZIP package.

## How to Use
1. Open \`index.html\` in any modern web browser
2. Or deploy to any static hosting service (Netlify, GitHub Pages, Vercel, etc.)

## Features
- 💌 **Love Letter** — A heartfelt letter with animated GIFs and a background song
- 📸 **Photo Gallery** — Responsive grid with full-screen lightbox viewer and keyboard navigation
- 🎁 **Gifts** — Virtual bouquet with confetti, love coupons, "Reasons I Love You" cycler, and a promise card
- 📥 **Save Memories** — One-click download of all photos, GIFs, love letter, music, and full source code as a ZIP file

## Project Structure
\`\`\`
├── index.html       Main page
├── style.css        All styles and animations
├── script.js        Interactive logic
├── readme.md        This file
├── image.jpg        Photo 1
├── image1.jpg       Photo 2
├── image3.jpg       Photo 3 (profile)
├── image123.jpg     Photo 4
├── image.gif        Love animation GIF 1
├── image1.gif       Love animation GIF 2
└── akash.mp3        Background song
\`\`\`

## Tech Stack
- HTML5, CSS3, Vanilla JavaScript (no build tools needed)
- [canvas-confetti](https://www.npmjs.com/package/canvas-confetti) — Celebration confetti effects
- [JSZip](https://stuk.github.io/jszip/) — Client-side ZIP generation
- [FileSaver.js](https://github.com/nickerso/nickerso.github.io) — Browser file download

## Deployment
Simply upload all files to any static web host. No server or build step required.

## License
Made with ❤️ by Akash Gupta
`;

function buildZip(includeSource) {
  return async function () {
    downloadBtn.disabled = true;
    if (devDownloadBtn) devDownloadBtn.disabled = true;
    downloadBtnText.classList.add("hidden");
    downloadProgress.classList.remove("hidden");

    try {
      const zip = new JSZip();

      // Add the love letter
      zip.file("love-letter.txt", loveLetter);

      // Fetch and add all media files
      const mediaPromises = mediaFiles.map(async (file) => {
        try {
          const blob = await fetchFileAsBlob(file.url);
          zip.file(file.name, blob);
        } catch (err) {
          console.warn("Could not fetch " + file.url, err);
        }
      });

      await Promise.all(mediaPromises);

      // If including source code, add the full project files
      if (includeSource) {
        zip.file("source-code/readme.md", readmeContent);

        const sourcePromises = sourceCodeFiles.map(async (file) => {
          try {
            const blob = await fetchFileAsBlob(file.url);
            zip.file(file.name, blob);
          } catch (err) {
            console.warn("Could not fetch " + file.url, err);
          }
        });

        await Promise.all(sourcePromises);
      }

      // Generate and download
      const content = await zip.generateAsync({ type: "blob" });
      const fileName = includeSource
        ? "Valentines-Surprise-Complete-Project.zip"
        : "Valentines-Surprise-For-Sakshi.zip";
      saveAs(content, fileName);

      downloadBtnText.textContent = "✅ Downloaded! 💖";
    } catch (err) {
      console.error("Download failed:", err);
      downloadBtnText.textContent = "❌ Try again";
    }

    downloadProgress.classList.add("hidden");
    downloadBtnText.classList.remove("hidden");
    downloadBtn.disabled = false;
    if (devDownloadBtn) devDownloadBtn.disabled = false;
  };
}

const devDownloadBtn = document.getElementById("devDownloadBtn");

downloadBtn.addEventListener("click", buildZip(false));
if (devDownloadBtn) {
  devDownloadBtn.addEventListener("click", buildZip(true));
}

