/**
 * ==========================================================
 * MOBILE BIRTHDAY INVITATION - CONFIGURATION & LOGIC
 * Aesthetic Soft Pink & Rose Gold Glow Edition
 * ==========================================================
 */

const PARTY_CONFIG = {
  celebrantName: "Sarah Jenkins",
  milestoneText: "is turning 25!",
  vipBadgeText: "✨ Birthday Queen ✨",
  
  // Set your party date and time here (YYYY-MM-DDTHH:MM:SS)
  partyDateTime: "2026-10-24T18:30:00",
  
  displayDate: "Saturday, October 24, 2026",
  displayTime: "Starting at 6:30 PM onwards",
  venueName: "The Rosewood Garden & Terrace",
  venueAddress: "45 Grand Avenue, Downtown Metro",
  
  // Google Maps Search Query or full URL
  mapsQuery: "Rosewood Garden Downtown Metro",
  
  dressCode: "Chic & Glamorous (Touch of Pink, White or Gold)",
  rsvpDeadline: "October 18, 2026",
  
  // Host WhatsApp Phone Number with Country Code (no '+' or spaces, e.g. 15551234567 or 919876543210)
  whatsappNumber: "1234567890", 
  
  hostName: "The Jenkins Family & Besties",
  hostPhone: "+1 (234) 567-890",
  
  // Celebrant Photo Showcase (Add 1 or multiple photos!)
  photos: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
  ],
  // Fallback single photo
  photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
};

/* ==========================================================
   INITIALIZATION ON DOM LOAD
   ========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  populateInvitationDetails();
  initPhotoShowcase();
  initCountdown();
  initConfetti();
  initEnvelope();
  initRadioSelection();
  initRSVPForm();
  initWishWall();
  initBalloons();
  initMusicAudio();
});

/* ==========================================================
   POPULATE CONFIG VALUES INTO HTML
   ========================================================== */
function populateInvitationDetails() {
  document.getElementById("displayCelebrantName").textContent = PARTY_CONFIG.celebrantName;
  document.getElementById("displayMilestone").textContent = PARTY_CONFIG.milestoneText;
  document.getElementById("displayDate").textContent = PARTY_CONFIG.displayDate;
  document.getElementById("displayTime").textContent = PARTY_CONFIG.displayTime;
  document.getElementById("displayVenueName").textContent = PARTY_CONFIG.venueName;
  document.getElementById("displayAddress").textContent = PARTY_CONFIG.venueAddress;
  document.getElementById("displayDressCode").textContent = PARTY_CONFIG.dressCode;
  document.getElementById("displayRsvpDeadline").textContent = PARTY_CONFIG.rsvpDeadline;
  document.getElementById("displayHostName").textContent = PARTY_CONFIG.hostName;
  
  const vipBadge = document.getElementById("displayVipBadge");
  if (vipBadge && PARTY_CONFIG.vipBadgeText) {
    vipBadge.textContent = PARTY_CONFIG.vipBadgeText;
  }

  const hostPhoneEl = document.getElementById("hostPhoneLink");
  if (hostPhoneEl) {
    hostPhoneEl.textContent = PARTY_CONFIG.hostPhone;
    hostPhoneEl.href = `tel:${PARTY_CONFIG.whatsappNumber}`;
  }

  // Google Maps URL
  const btnMaps = document.getElementById("btnMaps");
  if (btnMaps) {
    btnMaps.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      PARTY_CONFIG.venueName + " " + PARTY_CONFIG.venueAddress
    )}`;
  }

  // Google Calendar URL
  const btnCalendar = document.getElementById("btnCalendar");
  if (btnCalendar) {
    btnCalendar.href = generateGoogleCalendarUrl();
  }

  // WhatsApp 1-Tap RSVP Button
  const btnRsvpWhatsApp = document.getElementById("btnRsvpWhatsApp");
  if (btnRsvpWhatsApp) {
    const textMsg = encodeURIComponent(
      `Hey! 🎉 I received the birthday invitation for ${PARTY_CONFIG.celebrantName}! I would love to RSVP!`
    );
    btnRsvpWhatsApp.href = `https://wa.me/${PARTY_CONFIG.whatsappNumber}?text=${textMsg}`;
  }
}

/* ==========================================================
   ADVANCED LUXURY PHOTO SHOWCASE (CAROUSEL, SWIPE, LIGHTBOX & LOVE)
   ========================================================== */
let currentPhotoIndex = 0;

function initPhotoShowcase() {
  const photoList = (PARTY_CONFIG.photos && PARTY_CONFIG.photos.length > 0)
    ? PARTY_CONFIG.photos
    : [PARTY_CONFIG.photoUrl];

  const photoEl = document.getElementById("displayPhoto");
  const viewportEl = document.getElementById("photoViewport");
  const thumbsContainer = document.getElementById("photoThumbnails");
  const thumbsWrapper = document.getElementById("photoThumbnailsWrapper");
  const counterBadge = document.getElementById("photoCounterBadge");
  const btnPrev = document.getElementById("btnPrevPhoto");
  const btnNext = document.getElementById("btnNextPhoto");
  const btnZoom = document.getElementById("btnZoomPhoto");
  const doubleTapHeart = document.getElementById("doubleTapHeart");
  const btnSendLove = document.getElementById("btnSendLove");
  const heartCounter = document.getElementById("heartCounter");
  const heartsLayer = document.getElementById("floatingHeartsLayer");

  // Lightbox elements
  const lightboxModal = document.getElementById("photoLightboxModal");
  const lightboxBackdrop = document.getElementById("lightboxBackdrop");
  const lightboxImg = document.getElementById("lightboxImg");
  const btnCloseLightbox = document.getElementById("btnCloseLightbox");
  const btnLbPrev = document.getElementById("btnLbPrev");
  const btnLbNext = document.getElementById("btnLbNext");
  const lbCelebrantName = document.getElementById("lbCelebrantName");
  const lbCounter = document.getElementById("lbCounter");

  if (lbCelebrantName) {
    lbCelebrantName.textContent = PARTY_CONFIG.celebrantName;
  }

  // Populate initial photo
  if (photoEl && photoList.length > 0) {
    photoEl.src = photoList[0];
  }

  // Generate Thumbnail previews
  if (thumbsContainer) {
    thumbsContainer.innerHTML = photoList
      .map((url, i) => `<img class="photo-thumb ${i === 0 ? "active" : ""}" src="${url}" data-index="${i}" alt="Photo ${i + 1}" loading="lazy" />`)
      .join("");

    thumbsContainer.querySelectorAll(".photo-thumb").forEach((thumb) => {
      thumb.addEventListener("click", (e) => {
        e.stopPropagation();
        const idx = parseInt(thumb.getAttribute("data-index"), 10);
        showPhoto(idx);
      });
    });
  }

  // If only 1 photo, hide carousel controls
  if (photoList.length <= 1) {
    if (btnPrev) btnPrev.style.display = "none";
    if (btnNext) btnNext.style.display = "none";
    if (thumbsWrapper) thumbsWrapper.style.display = "none";
    if (counterBadge) counterBadge.style.display = "none";
    if (btnLbPrev) btnLbPrev.style.display = "none";
    if (btnLbNext) btnLbNext.style.display = "none";
    if (lbCounter) lbCounter.style.display = "none";
  } else {
    // Navigation arrows
    if (btnPrev) {
      btnPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        showPhoto(currentPhotoIndex - 1);
      });
    }

    if (btnNext) {
      btnNext.addEventListener("click", (e) => {
        e.stopPropagation();
        showPhoto(currentPhotoIndex + 1);
      });
    }

    // Lightbox navigation arrows
    if (btnLbPrev) {
      btnLbPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        showPhoto(currentPhotoIndex - 1);
      });
    }

    if (btnLbNext) {
      btnLbNext.addEventListener("click", (e) => {
        e.stopPropagation();
        showPhoto(currentPhotoIndex + 1);
      });
    }
  }

  // Function to switch photo
  function showPhoto(idx) {
    currentPhotoIndex = (idx + photoList.length) % photoList.length;

    // Update main photo with smooth fade
    if (photoEl) {
      photoEl.style.opacity = "0";
      photoEl.style.transform = "scale(0.97)";
      setTimeout(() => {
        photoEl.src = photoList[currentPhotoIndex];
        photoEl.style.opacity = "1";
        photoEl.style.transform = "scale(1)";
      }, 180);
    }

    // Update counter badges
    if (counterBadge) {
      counterBadge.textContent = `${currentPhotoIndex + 1} / ${photoList.length}`;
    }
    if (lbCounter) {
      lbCounter.textContent = `${currentPhotoIndex + 1} / ${photoList.length}`;
    }

    // Update lightbox image if modal is open
    if (lightboxImg && lightboxModal && !lightboxModal.classList.contains("hidden")) {
      lightboxImg.style.opacity = "0.3";
      setTimeout(() => {
        lightboxImg.src = photoList[currentPhotoIndex];
        lightboxImg.style.opacity = "1";
      }, 150);
    }

    // Update active thumbnail
    if (thumbsContainer) {
      thumbsContainer.querySelectorAll(".photo-thumb").forEach((th, i) => {
        th.classList.toggle("active", i === currentPhotoIndex);
      });
    }
  }

  // Lightbox Modal Open/Close handlers
  function openLightbox() {
    if (!lightboxModal) return;
    if (lightboxImg) lightboxImg.src = photoList[currentPhotoIndex];
    if (lbCounter) lbCounter.textContent = `${currentPhotoIndex + 1} / ${photoList.length}`;
    lightboxModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    if (!lightboxModal) return;
    lightboxModal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  if (btnZoom) {
    btnZoom.addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox();
    });
  }

  if (btnCloseLightbox) {
    btnCloseLightbox.addEventListener("click", closeLightbox);
  }

  if (lightboxBackdrop) {
    lightboxBackdrop.addEventListener("click", closeLightbox);
  }

  // Keyboard navigation for Lightbox
  document.addEventListener("keydown", (e) => {
    if (!lightboxModal || lightboxModal.classList.contains("hidden")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft" && photoList.length > 1) showPhoto(currentPhotoIndex - 1);
    if (e.key === "ArrowRight" && photoList.length > 1) showPhoto(currentPhotoIndex + 1);
  });

  // Mobile Touch Swipe Handling on Viewport
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  if (viewportEl) {
    viewportEl.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    viewportEl.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      handleSwipeGesture();
    }, { passive: true });
  }

  function handleSwipeGesture() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;
    // Check horizontal swipe threshold
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (photoList.length > 1) {
        if (deltaX < 0) {
          // Swipe left -> Next photo
          showPhoto(currentPhotoIndex + 1);
        } else {
          // Swipe right -> Prev photo
          showPhoto(currentPhotoIndex - 1);
        }
      }
    }
  }

  // Double-tap or Click on Viewport Logic
  let lastTapTime = 0;
  let singleTapTimeout = null;

  if (viewportEl) {
    viewportEl.addEventListener("click", (e) => {
      // If clicking directly on arrows or header tools, let those handle it
      if (e.target.closest(".photo-nav-btn") || e.target.closest(".photo-glass-header")) {
        return;
      }

      const currentTime = new Date().getTime();
      const tapInterval = currentTime - lastTapTime;

      if (tapInterval < 320 && tapInterval > 0) {
        // Double-tap detected -> Send Love burst!
        clearTimeout(singleTapTimeout);
        triggerLoveReaction(true);
      } else {
        // Single tap -> Open fullscreen lightbox
        singleTapTimeout = setTimeout(() => {
          openLightbox();
        }, 300);
      }
      lastTapTime = currentTime;
    });
  }

  // Send Love Reaction Logic
  let lovesCount = parseInt(localStorage.getItem("birthday_loves_count") || "128", 10);
  if (heartCounter) heartCounter.textContent = lovesCount;

  function triggerLoveReaction(isDoubleTap = false) {
    lovesCount += 1;
    localStorage.setItem("birthday_loves_count", lovesCount);
    if (heartCounter) heartCounter.textContent = lovesCount;

    if (btnSendLove) {
      btnSendLove.classList.add("popped");
      setTimeout(() => btnSendLove.classList.remove("popped"), 400);
    }

    // If triggered by double-tap on photo, trigger center heart animation
    if (isDoubleTap && doubleTapHeart) {
      doubleTapHeart.classList.remove("pop-animate");
      void doubleTapHeart.offsetWidth; // trigger reflow
      doubleTapHeart.classList.add("pop-animate");
      setTimeout(() => {
        doubleTapHeart.classList.remove("pop-animate");
      }, 900);
    }

    playSparkleSound();
    spawnFloatingHeart();
  }

  if (btnSendLove) {
    btnSendLove.addEventListener("click", () => {
      triggerLoveReaction(false);
    });
  }

  function spawnFloatingHeart() {
    if (!heartsLayer) return;
    const heartIcons = ["💖", "💕", "🌸", "✨", "💗", "💝", "👑"];
    const count = 5;
    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const heart = document.createElement("span");
        heart.className = "floating-heart";
        heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
        heart.style.left = Math.random() * 70 + 15 + "%";
        heartsLayer.appendChild(heart);

        setTimeout(() => {
          heart.remove();
        }, 1600);
      }, i * 140);
    }
  }
}

/* ==========================================================
   GOOGLE CALENDAR LINK GENERATOR
   ========================================================== */
function generateGoogleCalendarUrl() {
  const startDate = new Date(PARTY_CONFIG.partyDateTime);
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000); // +4 hours

  const formatCalDate = (d) => {
    return d.toISOString().replace(/-|:|\.\d\d\d/g, "");
  };

  const title = encodeURIComponent(`🎉 ${PARTY_CONFIG.celebrantName}'s Birthday Party!`);
  const details = encodeURIComponent(
    `Join us in celebrating ${PARTY_CONFIG.celebrantName}'s Birthday!\nDress Code: ${PARTY_CONFIG.dressCode}`
  );
  const location = encodeURIComponent(`${PARTY_CONFIG.venueName}, ${PARTY_CONFIG.venueAddress}`);
  const dates = `${formatCalDate(startDate)}/${formatCalDate(endDate)}`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
}

/* ==========================================================
   ENVELOPE OPENING ANIMATION & REVEAL
   ========================================================== */
function initEnvelope() {
  const envelopeSection = document.getElementById("envelopeSection");
  const envelopeWrapper = document.getElementById("envelopeWrapper");
  const waxSealBtn = document.getElementById("waxSealBtn");
  const invitationContent = document.getElementById("invitationContent");

  function openCard() {
    if (envelopeWrapper.classList.contains("open")) return;
    
    // Play celebratory sound & trigger confetti
    playCelebrationChime();
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight / 2, 75);

    // Envelope open animation
    envelopeWrapper.classList.add("open");

    setTimeout(() => {
      // Fade out envelope section
      envelopeSection.classList.add("opened");

      // Completely remove from layout flow after fade out
      setTimeout(() => {
        envelopeSection.style.display = "none";
      }, 800);

      // Show invitation page
      invitationContent.classList.remove("hidden");
      
      // Secondary celebratory confetti shower
      setTimeout(() => {
        triggerConfettiBurst(window.innerWidth * 0.25, window.innerHeight * 0.35, 50);
        triggerConfettiBurst(window.innerWidth * 0.75, window.innerHeight * 0.35, 50);
      }, 400);

      // Start background melody if not playing
      if (!isMusicPlaying) {
        toggleMusic(true);
      }
    }, 900);
  }

  if (waxSealBtn) waxSealBtn.addEventListener("click", openCard);
  if (envelopeWrapper) envelopeWrapper.addEventListener("click", openCard);

  // Pop confetti button at bottom
  const popBtn = document.getElementById("popConfettiBtn");
  if (popBtn) {
    popBtn.addEventListener("click", () => {
      const rect = popBtn.getBoundingClientRect();
      triggerConfettiBurst(rect.left + rect.width / 2, rect.top, 70);
      playSparkleSound();
    });
  }
}

/* ==========================================================
   COUNTDOWN TIMER
   ========================================================== */
function initCountdown() {
  const daysEl = document.getElementById("daysVal");
  const hoursEl = document.getElementById("hoursVal");
  const minsEl = document.getElementById("minutesVal");
  const secsEl = document.getElementById("secondsVal");

  const targetTime = new Date(PARTY_CONFIG.partyDateTime).getTime();

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetTime - now;

    if (distance <= 0) {
      daysEl.textContent = "00";
      hoursEl.textContent = "00";
      minsEl.textContent = "00";
      secsEl.textContent = "00";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minsEl.textContent = String(minutes).padStart(2, "0");
    secsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/* ==========================================================
   RADIO CARD TOGGLES
   ========================================================== */
function initRadioSelection() {
  const radioCards = document.querySelectorAll(".radio-card");
  radioCards.forEach((card) => {
    card.addEventListener("click", () => {
      radioCards.forEach((c) => c.classList.remove("selected"));
      card.classList.add("selected");
      const radioInput = card.querySelector('input[type="radio"]');
      if (radioInput) radioInput.checked = true;

      const guestGroup = document.getElementById("guestCountGroup");
      if (radioInput.value.includes("Sorry")) {
        if (guestGroup) guestGroup.style.display = "none";
      } else {
        if (guestGroup) guestGroup.style.display = "block";
      }
    });
  });
}

/* ==========================================================
   RSVP FORM SUBMISSION & WHATSAPP REDIRECT
   ========================================================== */
function initRSVPForm() {
  const rsvpForm = document.getElementById("rsvpForm");
  const successMsg = document.getElementById("rsvpSuccessMessage");
  const successDetails = document.getElementById("rsvpSuccessDetails");

  if (!rsvpForm) return;

  rsvpForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("guestName").value.trim();
    const attendanceRadio = document.querySelector('input[name="attendance"]:checked');
    const attendance = attendanceRadio ? attendanceRadio.value : "Attending";
    const guestCount = document.getElementById("guestCount").value;

    if (!name) return;

    // Show celebratory confetti
    triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.7, 70);
    playSparkleSound();

    // Hide form, show success
    rsvpForm.style.display = "none";
    successMsg.classList.remove("hidden");
    successDetails.innerHTML = `<strong>${name}</strong>: ${attendance} (${guestCount} Guest/s).<br><br>
      <a href="https://wa.me/${PARTY_CONFIG.whatsappNumber}?text=${encodeURIComponent(
        `Hi! This is ${name}. RSVP Confirmation for ${PARTY_CONFIG.celebrantName}'s Birthday:\n- Attendance: ${attendance}\n- Total Guests: ${guestCount}`
      )}" target="_blank" style="color: #25d366; font-weight: bold; text-decoration: underline;">
        👉 Tap here to also notify the host on WhatsApp
      </a>`;
  });
}

/* ==========================================================
   BIRTHDAY WISH WALL (LOCAL STORAGE)
   ========================================================== */
const DEFAULT_WISHES = [
  { name: "Jessica & Liam", text: "Happy 25th Birthday Sarah! Can't wait to dance and celebrate with you! 🥂💖", time: "Just now" },
  { name: "Marcus T.", text: "Cheers to another fabulous year around the sun! See you at the party! 🎉✨", time: "1 hour ago" },
  { name: "Grandma Rose", text: "Wishing you endless happiness, joy, and blessings my sweet angel! 🌸🎂", time: "3 hours ago" }
];

function initWishWall() {
  const wishForm = document.getElementById("wishForm");
  const wishesList = document.getElementById("wishesList");

  let wishes = JSON.parse(localStorage.getItem("birthday_wishes_list") || "null");
  if (!wishes || wishes.length === 0) {
    wishes = DEFAULT_WISHES;
    localStorage.setItem("birthday_wishes_list", JSON.stringify(wishes));
  }

  function renderWishes() {
    wishesList.innerHTML = wishes
      .map(
        (w) => `
      <div class="wish-item">
        <div class="wish-header">
          <span class="wisher-name">💖 ${escapeHtml(w.name)}</span>
          <span class="wish-time">${escapeHtml(w.time)}</span>
        </div>
        <p class="wish-text">${escapeHtml(w.text)}</p>
      </div>
    `
      )
      .join("");
  }

  renderWishes();

  if (wishForm) {
    wishForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("wisherName");
      const messageInput = document.getElementById("wishMessage");

      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

      if (!name || !message) return;

      const newWish = {
        name: name,
        text: message,
        time: "Just now"
      };

      wishes.unshift(newWish);
      localStorage.setItem("birthday_wishes_list", JSON.stringify(wishes));
      renderWishes();

      nameInput.value = "";
      messageInput.value = "";

      triggerConfettiBurst(window.innerWidth / 2, window.innerHeight * 0.8, 45);
      playSparkleSound();
    });
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case "&": return "&amp;";
      case "<": return "&lt;";
      case ">": return "&gt;";
      case '"': return "&quot;";
      case "'": return "&#039;";
      default: return m;
    }
  });
}

/* ==========================================================
   FLOATING BALLOONS GENERATOR (SOFT PINK PALETTE)
   ========================================================== */
function initBalloons() {
  const container = document.getElementById("balloonsContainer");
  if (!container) return;

  const colors = [
    "radial-gradient(circle at 30% 30%, #ffb6c1, #f472b6)",
    "radial-gradient(circle at 30% 30%, #fbcfe8, #ec4899)",
    "radial-gradient(circle at 30% 30%, #fed7aa, #fb923c)",
    "radial-gradient(circle at 30% 30%, #f5d0fe, #d946ef)",
    "radial-gradient(circle at 30% 30%, #ffe4e6, #fda4af)"
  ];

  function createBalloon() {
    const balloon = document.createElement("div");
    balloon.className = "balloon";
    balloon.style.left = Math.random() * 85 + 5 + "%";
    balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
    balloon.style.animationDuration = Math.random() * 6 + 9 + "s";
    
    // Tap to pop balloon
    balloon.addEventListener("click", () => {
      const rect = balloon.getBoundingClientRect();
      triggerConfettiBurst(rect.left + rect.width / 2, rect.top + rect.height / 2, 25);
      playPopSound();
      balloon.remove();
    });

    container.appendChild(balloon);

    setTimeout(() => {
      balloon.remove();
    }, 15000);
  }

  for (let i = 0; i < 4; i++) {
    setTimeout(createBalloon, i * 2000);
  }

  setInterval(createBalloon, 3500);
}

/* ==========================================================
   CONFETTI ENGINE (SOFT PINK & ROSE GOLD PARTICLES)
   ========================================================== */
let confettiParticles = [];
let confettiAnimationId = null;

function initConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  window.addEventListener("resize", resize);
  resize();

  function render() {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = confettiParticles.length - 1; i >= 0; i--) {
      const p = confettiParticles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.vRot;
      p.opacity -= 0.008;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.opacity);

      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }

      ctx.restore();

      if (p.opacity <= 0 || p.y > canvas.height + 50) {
        confettiParticles.splice(i, 1);
      }
    }

    if (confettiParticles.length > 0) {
      confettiAnimationId = requestAnimationFrame(render);
    } else {
      confettiAnimationId = null;
    }
  }

  window.triggerConfettiBurst = function (originX, originY, count = 50) {
    const palette = ["#f472b6", "#ec4899", "#fbcfe8", "#ffe4e6", "#e5b072", "#ffffff", "#db2777"];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      confettiParticles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        gravity: 0.18,
        size: Math.random() * 8 + 6,
        color: palette[Math.floor(Math.random() * palette.length)],
        shape: Math.random() > 0.4 ? "rect" : "circle",
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        opacity: 1
      });
    }

    if (!confettiAnimationId) {
      render();
    }
  };
}

/* ==========================================================
   WEB AUDIO API SOUND & CELEBRATION MUSIC ENGINE
   ========================================================== */
let audioCtx = null;
let isMusicPlaying = false;
let musicInterval = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === "suspended") {
    audioCtx.resume();
  }
  return audioCtx;
}

function playCelebrationChime() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
  notes.forEach((freq, idx) => {
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    }, idx * 120);
  });
}

function playSparkleSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const freqs = [880, 1174.66, 1318.51, 1760];
  freqs.forEach((f, i) => {
    setTimeout(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.5);
    }, i * 70);
  });
}

function playPopSound() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(400, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.08);

  gain.gain.setValueAtTime(0.2, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.09);
}

function initMusicAudio() {
  const btn = document.getElementById("musicToggleBtn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    toggleMusic();
  });
}

function toggleMusic(forcePlay = false) {
  const btn = document.getElementById("musicToggleBtn");
  const ctx = getAudioContext();
  if (!ctx) return;

  if (isMusicPlaying && !forcePlay) {
    isMusicPlaying = false;
    clearInterval(musicInterval);
    if (btn) btn.classList.remove("playing");
  } else {
    isMusicPlaying = true;
    if (btn) btn.classList.add("playing");
    playBirthdayMelody();
    clearInterval(musicInterval);
    musicInterval = setInterval(() => {
      if (isMusicPlaying) playBirthdayMelody();
    }, 14000);
  }
}

function playBirthdayMelody() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const melody = [
    { f: 392.0, d: 0.35, t: 0 },
    { f: 392.0, d: 0.35, t: 0.4 },
    { f: 440.0, d: 0.6, t: 0.8 },
    { f: 392.0, d: 0.6, t: 1.5 },
    { f: 523.25, d: 0.6, t: 2.2 },
    { f: 493.88, d: 1.0, t: 2.9 },

    { f: 392.0, d: 0.35, t: 4.2 },
    { f: 392.0, d: 0.35, t: 4.6 },
    { f: 440.0, d: 0.6, t: 5.0 },
    { f: 392.0, d: 0.6, t: 5.7 },
    { f: 587.33, d: 0.6, t: 6.4 },
    { f: 523.25, d: 1.2, t: 7.1 }
  ];

  melody.forEach((n) => {
    setTimeout(() => {
      if (!isMusicPlaying) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(n.f, ctx.currentTime);

      gain.gain.setValueAtTime(0.07, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + n.d);
    }, n.t * 1000);
  });
}
