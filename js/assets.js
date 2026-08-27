(() => {
  const assets = [
    { src: "3(1).png", className: "has-opening-art" },
    { src: "nostro timbre.png", className: "has-monogram-art" }
  ];

  assets.forEach(({ src, className }) => {
    const image = new Image();
    image.onload = () => document.body.classList.add(className);
    image.src = src;
  });
})();
