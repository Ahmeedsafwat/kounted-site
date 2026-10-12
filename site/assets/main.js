// Kounted. Minimal enhancements only; the page works without this file.
(function () {
  var doc = document.documentElement;
  doc.classList.add("js");

  // Hairline under the header once content scrolls beneath it.
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Menu below 900px. The button owns aria-expanded; Escape, a link
  // or a click outside closes it and focus goes back to the button.
  var nav = document.querySelector(".nav");
  var toggle = nav && nav.querySelector(".nav-toggle");
  if (toggle) {
    var links = document.getElementById("nav-links");
    var wide = window.matchMedia("(min-width: 56.25em)");
    var setOpen = function (open, returnFocus) {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (!open && returnFocus) toggle.focus();
    };
    toggle.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      setOpen(open);
      if (open) {
        var first = links.querySelector("a");
        if (first) first.focus();
      }
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) setOpen(false, true);
    });
    document.addEventListener("click", function (e) {
      if (nav.classList.contains("is-open") && !nav.contains(e.target)) setOpen(false);
    });
    nav.addEventListener("focusout", function (e) {
      if (nav.classList.contains("is-open") && e.relatedTarget && !nav.contains(e.relatedTarget)) setOpen(false);
    });
    var onWide = function () { if (wide.matches) setOpen(false); };
    if (wide.addEventListener) wide.addEventListener("change", onWide);
  }

  // Draw the view velocity chart when it comes into view.
  var chart = document.getElementById("velocity");
  if (chart) {
    var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      chart.classList.add("is-drawn");
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            chart.classList.add("is-drawn");
            io.disconnect();
          }
        });
      }, { threshold: 0.35 });
      io.observe(chart);
    }
  }

  var y = document.getElementById("y");
  if (y) y.textContent = String(new Date().getFullYear());
})();
