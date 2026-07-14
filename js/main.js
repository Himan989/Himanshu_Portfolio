/* ============================================================
   Himanshu Shiyara — Portfolio interactions (vanilla JS)
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Navbar: scrolled state + active link ---------- */
  var nav = document.getElementById("nav");
  var navLinks = document.getElementById("navLinks");
  var navToggle = document.getElementById("navToggle");
  var sections = document.querySelectorAll("section[id], header[id]");
  var links = navLinks ? navLinks.querySelectorAll('a[href^="#"]') : [];

  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 20);

    var pos = window.scrollY + 120;
    var current = "";
    sections.forEach(function (sec) {
      if (sec.offsetTop <= pos) current = sec.id;
    });
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });

    var toTop = document.getElementById("toTop");
    if (toTop) toTop.classList.toggle("show", window.scrollY > 500);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("open");
      navLinks.classList.toggle("open");
    });
    navLinks.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navToggle.classList.remove("open");
        navLinks.classList.remove("open");
      }
    });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) toTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ---------- Typed effect ---------- */
  var typedEl = document.getElementById("typed");
  var phrases = [
    "C# Gameplay Programming",
    "WebGL & Mobile Games",
    "VFX · Shaders · Particles",
    "Multiplayer & Slot Systems",
    "Founder of PlayPuzzles"
  ];
  if (typedEl && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var pi = 0, ci = 0, deleting = false;
    (function tick() {
      var word = phrases[pi];
      typedEl.textContent = word.substring(0, ci);
      if (!deleting && ci < word.length) {
        ci++; setTimeout(tick, 65);
      } else if (!deleting && ci === word.length) {
        deleting = true; setTimeout(tick, 1600);
      } else if (deleting && ci > 0) {
        ci--; setTimeout(tick, 32);
      } else {
        deleting = false; pi = (pi + 1) % phrases.length; setTimeout(tick, 350);
      }
    })();
  } else if (typedEl) {
    typedEl.textContent = phrases[0];
  }

  /* ---------- Scroll reveal ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Portfolio / Work ---------- */
  var works = [
    { id: "hl0tz3163vQ", cat: "multiplayer", label: "Multiplayer" },
    { id: "Oh1gzRQcsuY", cat: "multiplayer", label: "Multiplayer" },
    { id: "G5pBg2vddzo", cat: "casino", label: "Casino" },
    { id: "8D8YgmX7jjA", cat: "casino", label: "Casino" },
    { id: "NeunV8q78Tk", cat: "casino", label: "Casino" },
    { id: "bcQnWN162F4", cat: "casino", label: "Casino" },
    { id: "xKIC9XQpIis", cat: "casino", label: "Casino" },
    { id: "lp00xddJ2as", cat: "hypercasual", label: "Hyper-casual" },
    { id: "x7V9x7FC2J8", cat: "hypercasual", label: "Hyper-casual" },
    { id: "LGgkUQCjKAc", cat: "hypercasual", label: "Hyper-casual" },
    { id: "LhSM2yHm-EM", cat: "hypercasual", label: "Hyper-casual" },
    { id: "BggkkSVJPyA", cat: "hypercasual", label: "Hyper-casual" },
    { id: "V85j3dMAl0M", cat: "hypercasual", label: "Hyper-casual" },
    { id: "zL8SbSOCcPs", cat: "casual", label: "Casual" },
    { id: "sbtTQT7VTJQ", cat: "casual", label: "Casual" },
    { id: "_hOMFJa5Asw", cat: "casual", label: "Casual" },
    { id: "y4h5Njnmz08", cat: "casual", label: "Casual" }
  ];

  var grid = document.getElementById("workGrid");
  if (grid) {
    works.forEach(function (w) {
      var card = document.createElement("div");
      card.className = "work-card";
      card.setAttribute("data-cat", w.cat);
      card.innerHTML =
        '<span class="work-cat">' + w.label + "</span>" +
        '<img loading="lazy" src="https://i.ytimg.com/vi/' + w.id + '/hqdefault.jpg" alt="' + w.label + ' gameplay">' +
        '<div class="work-play"><span class="pbtn">' +
          '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>' +
        "</span></div>";
      card.addEventListener("click", function () {
        if (card.dataset.playing) return;
        card.dataset.playing = "1";
        card.innerHTML =
          '<iframe src="https://www.youtube.com/embed/' + w.id +
          '?autoplay=1&rel=0" title="' + w.label + ' gameplay" frameborder="0" ' +
          'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" ' +
          "allowfullscreen></iframe>";
      });
      grid.appendChild(card);
    });
  }

  /* ---------- Filters ---------- */
  var filterBar = document.getElementById("filters");
  if (filterBar && grid) {
    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var f = btn.getAttribute("data-filter");
      grid.querySelectorAll(".work-card").forEach(function (c) {
        var show = f === "all" || c.getAttribute("data-cat") === f;
        c.classList.toggle("hide", !show);
      });
    });
  }
})();
