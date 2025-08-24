document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("start-button");

  // Animación de "rebote" al cargar
  button.style.transform = "scale(0)";
  setTimeout(() => {
    button.style.transition = "transform 0.5s ease";
    button.style.transform = "scale(1)";
  }, 300);

  // Efecto de "latido" al pasar el mouse
  button.addEventListener("mouseenter", () => {
    button.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.1)" },
        { transform: "scale(1)" }
      ],
      {
        duration: 500,
        iterations: 1
      }
    );
  });
});
