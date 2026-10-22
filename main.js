// Applies config.js to the page, builds the link tiles and runs the copy button.
(function () {
  var S = window.SITE || {};
  var $ = function (id) { return document.getElementById(id); };
  var each = function (sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); };
  var port = String(S.PORT || "");
  var address = (S.IP || "play.example.com") + (port && port !== "25565" ? ":" + port : "");
  var css = document.documentElement.style;

  // Colours and hero image
  var C = S.COLORS || {};
  if (C.accent) css.setProperty("--accent", C.accent);
  if (C.accentText) css.setProperty("--accent-text", C.accentText);
  if (C.background) css.setProperty("--bg", C.background);
  if (S.HERO_IMAGE !== undefined) $("hero").style.backgroundImage = S.HERO_IMAGE ? 'url("' + S.HERO_IMAGE + '")' : "none";
  if (S.HERO_OVERLAY !== undefined) css.setProperty("--overlay", S.HERO_OVERLAY);

  // Text
  if (S.NAME) {
    document.title = S.NAME + " · Minecraft server";
    each("[data-name]", function (n) { n.textContent = S.NAME; });
    var acc = S.NAME_ACCENT || "", i = acc ? S.NAME.lastIndexOf(acc) : -1;
    each("[data-wordmark]", function (h) {
      h.children[0].textContent = i > -1 ? S.NAME.slice(0, i) : S.NAME;
      h.children[1].textContent = i > -1 ? S.NAME.slice(i) : "";
    });
  }
  if (S.TAGLINE) each("[data-tagline]", function (n) { n.textContent = S.TAGLINE; });
  each("[data-ip]", function (n) { n.textContent = address; });
  each("[data-version]", function (n) { n.textContent = S.VERSION || ""; n.hidden = !S.VERSION; });
  each("[data-logo]", function (n) { if (S.LOGO) n.src = S.LOGO; else n.hidden = true; });
  each("[data-year]", function (n) { n.textContent = new Date().getFullYear(); });
  each("[data-tip]", function (n) { n.href = S.TIP_URL || "#"; if (S.TIP_LABEL) n.textContent = S.TIP_LABEL; });

  // Pixel icons (8x8 grids, "#" = filled)
  var ICONS = {
    chat:  ["########", "#......#", "#.#..#.#", "#......#", "#..##..#", "########", ".##.....", "#......."],
    cart:  ["#.......", "########", ".#.....#", ".#.....#", ".#######", ".#......", "..#...#.", "..#...#."],
    star:  ["...##...", "...##...", "########", ".######.", "..####..", ".##..##.", ".#....#.", "........"],
    book:  ["#######.", "#.....##", "#.###.##", "#.....##", "#.###.##", "#.....##", "########", ".#######"],
    sword: [".....###", "....#..#", "...#..#.", "#.#..#..", ".#..#...", "..##....", ".#..#...", "#......."]
  };
  function icon(name) {
    var g = ICONS[name]; if (!g) return "";
    var r = "";
    g.forEach(function (row, y) { row.split("").forEach(function (c, x) { if (c === "#") r += '<rect x="' + x + '" y="' + y + '" width="1" height="1"/>'; }); });
    return '<svg viewBox="0 0 8 8" shape-rendering="crispEdges" fill="#000" aria-hidden="true">' + r + "</svg>";
  }

  // Tiles and nav buttons
  var tiles = $("tiles"), nav = $("nav");
  (S.LINKS || []).forEach(function (l, n) {
    if (!l.url) return;
    var li = document.createElement("li"), a = document.createElement("a");
    li.style.setProperty("--i", n);
    a.className = "tile"; a.href = l.url;
    if (l.color) a.style.setProperty("--c", l.color);
    var box = document.createElement("span"); box.className = "tile-icon";
    if (l.image) { var img = document.createElement("img"); img.src = l.image; img.alt = ""; box.appendChild(img); }
    else box.innerHTML = icon(l.icon);
    var body = document.createElement("span"), t = document.createElement("span"), d = document.createElement("span");
    t.className = "tile-label"; t.textContent = l.label;
    d.className = "tile-text"; d.textContent = l.text || "";
    body.append(t, d);
    if (l.icon || l.image) a.appendChild(box);
    a.appendChild(body); li.appendChild(a); tiles.appendChild(li);
    if (l.nav) {
      var ni = document.createElement("li"), na = document.createElement("a");
      na.href = l.url; na.textContent = l.label; ni.appendChild(na); nav.appendChild(ni);
    }
  });

  // Copy IP
  var btn = $("copy"), msg = $("copied"), timer;
  btn.addEventListener("click", function () {
    var say = function (t) {
      msg.textContent = t;
      btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop");
      clearTimeout(timer); timer = setTimeout(function () { msg.textContent = ""; }, 3000);
    };
    var fallback = function () {
      var t = document.createElement("textarea");
      t.value = address; t.style.position = "fixed"; t.style.opacity = "0";
      document.body.appendChild(t); t.select();
      var ok = false; try { ok = document.execCommand("copy"); } catch (e) {}
      t.remove();
      say(ok ? "Copied! See you in game." : "Couldn't copy. The IP is " + address);
    };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(address).then(function () { say("Copied! See you in game."); }, fallback);
    else fallback();
  });

  // Optional live player count
  if (S.STATUS && window.fetch) {
    fetch("https://api.mcsrvstat.us/3/" + encodeURIComponent(address))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        var el = $("status");
        $("status-text").textContent = !d.online ? "Offline" : d.players ? d.players.online + " players online" : "Online";
        el.classList.toggle("offline", !d.online);
        el.hidden = false;
      })
      .catch(function () {});
  }
})();
