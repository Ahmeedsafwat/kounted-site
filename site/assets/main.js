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
