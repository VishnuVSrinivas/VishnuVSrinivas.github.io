(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.top nav a[href^="#"]'));
  var sections = links
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || sections.length === 0) return;

  var observer = new IntersectionObserver(
    function (entries) {
      var visible = entries
        .filter(function (entry) { return entry.isIntersecting; })
        .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; })[0];
      if (!visible) return;
      links.forEach(function (link) {
        var on = link.getAttribute("href") === "#" + visible.target.id;
        if (on) link.setAttribute("aria-current", "true");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
  );

  sections.forEach(function (section) { observer.observe(section); });
})();
