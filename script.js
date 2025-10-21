// === LOVE Animation Function ===
const crtLoveTL = (el) => {
  const move = 1000;
  const boom = 200;
  const easing = "sin.inOut";
  const easingBoom = "sin.in";
  const easingOut = "sin.out";
  const delta = 100;

  const opts = { duration: move, easing, opacity: 1 };

  // Timeline
  const tl = new mojs.Timeline();

  // Letter motion animation
  const moveTween = new mojs.Tween({
    duration: move,
    onUpdate: (progress) => {
      const p = Math.sin(progress * Math.PI);
      el.l.style.transform = `translateY(${p * -delta}px)`;
      el.o.style.transform = `translateY(${p * delta}px)`;
      el.v.style.transform = `translateY(${p * -delta}px)`;
      el.e.style.transform = `translateY(${p * delta}px)`;
    },
    onComplete: () => {
      // Fade out letters
      [el.l, el.o, el.v, el.e].forEach((part) => (part.style.opacity = 0));

      // Play burst
      new mojs.Burst({
        parent: el.container || document.body,
        count: 12,
        radius: { 0: 80 },
        children: {
          shape: "circle",
          stroke: "#FF6B6B",
          strokeWidth: { 8: 0 },
          radius: { 0: 20 },
          duration: boom,
          easing: easingBoom,
        },
      }).play();

      el.blop.play();
    },
  });

  // Fade in letters
  const fadeInTween = new mojs.Tween({
    ...opts,
    onUpdate: (progress) => {
      [el.l, el.o, el.v, el.e].forEach((part) => {
        part.style.opacity = progress;
      });
    },
  });

  tl.add(fadeInTween, moveTween);
  return tl;
};

// === RUN ===
const el = {
  l: document.getElementById("L"),
  o: document.getElementById("O"),
  v: document.getElementById("V"),
  e: document.getElementById("E"),
  container: document.getElementById("love-container"),
  blop: { play: () => console.log("ðŸ’¥ blop sound") },
};

// Play the animation repeatedly
setInterval(() => crtLoveTL(el).play(), 2500);