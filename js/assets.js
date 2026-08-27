(() => {
  const assets = [
    { src: "assets/images/abertura.png", className: "has-opening-art" },
    { src: "assets/images/monograma.png", className: "has-monogram-art" }
  ];

  assets.forEach(({ src, className }) => {
    const image = new Image();
    image.onload = () => document.body.classList.add(className);
    image.src = src;
  });
})();
