/*
 * config.js: everything you'll usually change.
 * Edit, save, refresh. index.html and style.css are plain and safe to edit too.
 */
window.SITE = {
  // Server name. NAME_ACCENT = the part shown in the accent colour ("" for none).
  NAME: "Blockhaven",
  NAME_ACCENT: "haven",
  TAGLINE: "Survival, events and a friendly community. Hop on and build with us.",

  // Address players connect to. PORT is optional ("" or 25565 = hidden).
  IP: "play.example.com",
  PORT: "",
  VERSION: "Java 1.21+",              // small note under the IP, "" to hide

  LOGO: "assets/logo.svg",            // small logo in the top bar, "" to hide

  // Hero background. Use a screenshot of your server (e.g. "assets/hero.jpg").
  // A dark overlay is added automatically so text stays readable.
  HERO_IMAGE: "assets/hero.svg",
  HERO_OVERLAY: 0.45,                 // 0 = no overlay, 1 = black

  COLORS: {
    accent: "#9FE079",                // IP button, highlights
    accentText: "#0C1015",            // text on the accent colour
    background: "#0C1015"
  },

  // Portal tiles. Add, remove or reorder freely.
  //   icon:  "chat" | "cart" | "star" | "book" | "sword" | "" (none)
  //   image: optional picture for the tile (shown instead of the icon)
  //   color: tile accent colour
  //   nav:   true = also show as a button in the top bar
  LINKS: [
    { label: "Discord", text: "Chat, events and support", url: "https://discord.gg/your-invite", icon: "chat", color: "#8C9EFF", nav: true },
    { label: "Store",   text: "Ranks, keys and cosmetics", url: "#", icon: "cart", color: "#F5C451", nav: true },
    { label: "Vote",    text: "Vote daily for rewards",    url: "#", icon: "star", color: "#9FE079", nav: true },
    { label: "Rules",   text: "Read before you join",      url: "#", icon: "book", color: "#F08A6C", nav: false }
  ],

  // Live player count pill (uses the public mcsrvstat.us API). Off by default.
  STATUS: false,

  // Footer
  TIP_URL: "https://dampsnag.com/coffee",
  TIP_LABEL: "Buy me a coffee"
};
