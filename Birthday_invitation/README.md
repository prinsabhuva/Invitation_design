# 🌸 Soft Pink & Rose Gold Mobile Birthday Invitation

A modern, responsive, mobile-first birthday invitation website with a dreamy **Soft Pink & Rose Gold Glow** aesthetic, animated 3D blush envelope opening, music, confetti celebrations, countdown timer, Google Maps navigation, Google Calendar integration, interactive multi-photo showcase with live "Send Love 💖" reactions, and 1-tap WhatsApp RSVP.

---

## 📱 How It Works When Opened on Mobile
1. **Interactive Opening:** The recipient receives your link on their phone and clicks it.
2. **Special Delivery Screen:** They see an elegant blush pink envelope with a glowing ruby wax seal.
3. **Tap to Open:** Tapping the wax seal triggers an opening animation with celebratory chimes and a burst of pastel pink & rose gold confetti!
4. **Full Invitation Details:**
   - **Luxury Editorial Photo Showcase:** Modern portrait card with soft rose-gold ambient lighting, silk shimmer reflection, interactive thumbnail strip, swipe gesture support, full-screen Lightbox view modal, double-tap to like, and a tactile **"Send Love 💖"** button with floating celebratory hearts and a live counter!
   - Milestone announcement (*"Turning 25!"*).
   - Real-time countdown timer ticking down to the party in frosted blush glass.
   - Date, Time, Venue, and Dress Code.
   - **Get Directions** button (Opens directly in Google Maps).
   - **Save to Calendar** button (Adds the event to Google Calendar).
   - Party Schedule / Timeline (Welcome drinks, Games, Cake cutting, Dance floor).
   - **RSVP via WhatsApp** with a pre-formatted message.
   - **In-page RSVP Form** + **Birthday Wish Wall** (where guests can post wishes!).
   - Floating celebration balloons you can tap to pop.
   - Background celebration music toggle.

---

## ✏️ How to Customize Your Invitation

You can edit all the party details in just **ONE place**: `script.js` (at the very top):

```javascript
const PARTY_CONFIG = {
  celebrantName: "Sarah Jenkins",             // Birthday person's name
  milestoneText: "is turning 25!",             // Age or milestone
  vipBadgeText: "✨ Birthday Queen ✨",       // VIP Ribbon text
  
  partyDateTime: "2026-10-24T18:30:00",        // Date & Time (YYYY-MM-DDTHH:MM:SS)
  displayDate: "Saturday, October 24, 2026",
  displayTime: "Starting at 6:30 PM onwards",
  venueName: "The Rosewood Garden & Terrace",
  venueAddress: "45 Grand Avenue, Downtown Metro",
  
  dressCode: "Chic & Glamorous (Touch of Pink, White or Gold)",
  rsvpDeadline: "October 18, 2026",
  
  // Enter host's WhatsApp number with country code (no '+' or spaces):
  whatsappNumber: "1234567890", 
  
  hostName: "The Jenkins Family & Besties",
  hostPhone: "+1 (234) 567-890",
  
  // Add 1 or multiple photos for the interactive carousel:
  photos: [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80"
  ]
};
```

---

## 🚀 How to Put This Online and Get Your Free Shareable Link

To send this invitation to everyone's mobile phone, the website needs a public link (URL). Here are the 3 easiest **100% free** ways to get your link:

### Option 1: Netlify Drop (Easiest — Takes 10 Seconds, No Coding!)
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop this entire `Birthday_invitation` folder onto the page.
3. Done! Netlify will immediately give you a live link like:
   `https://sarah-25th-birthday.netlify.app`
4. Copy this link and send it to your friends on WhatsApp!

---

### Option 2: Vercel (Fast & Free)
1. Go to [https://vercel.com](https://vercel.com).
2. Sign in and drag/drop the project folder or import via GitHub.
3. Click **Deploy** to get your instant `https://....vercel.app` link.

---

### Option 3: GitHub Pages (Permanent & Free)
1. Create a repository on GitHub (e.g., `birthday-invitation`).
2. Upload `index.html`, `style.css`, and `script.js`.
3. Go to **Settings** > **Pages** > Select `main` branch and click **Save**.
4. Your link will be: `https://<your-username>.github.io/birthday-invitation/`.

---

## 💬 Sample WhatsApp Message to Send with the Link

When you get your live link, send this message to your guests on WhatsApp:

> ✨ **You're Invited!** ✨
> 
> Hey! We're celebrating Sarah's 25th Birthday! 🎉🎂
> Tap the link below to open your exclusive invitation card:
> 
> 👉 **https://your-invitation-link.netlify.app**
> 
> *Tap the wax seal on the card to open it! Don't forget to RSVP!* 🥂🍾
