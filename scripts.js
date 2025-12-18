// comentarios ----------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-comentario");
  const nombreInput = document.getElementById("nombre");
  const mensajeInput = document.getElementById("mensaje");
  const lista = document.getElementById("lista-comentarios");

  const comentariosGuardados = JSON.parse(localStorage.getItem("comentariosBinarios")) || [];
  comentariosGuardados.forEach(binario => {
    const comentario = decodificarComentario(binario);
    mostrarComentario(comentario.nombre, comentario.mensaje);
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = nombreInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    if (nombre && mensaje) {
      mostrarComentario(nombre, mensaje);

      const binario = codificarComentario(nombre, mensaje);
      comentariosGuardados.unshift(binario);
      localStorage.setItem("comentariosBinarios", JSON.stringify(comentariosGuardados));

      nombreInput.value = "";
      mensajeInput.value = "";
    }
  });

  function mostrarComentario(nombre, mensaje) {
    const comentario = document.createElement("div");
    comentario.classList.add("comentario");
    comentario.innerHTML = `
      <strong>${nombre}</strong>
      <p>${mensaje}</p>
    `;
    lista.prepend(comentario);
  }

  function codificarComentario(nombre, mensaje) {
    const texto = JSON.stringify({ nombre, mensaje });
    return btoa(texto);
  }

  function decodificarComentario(binario) {
    const texto = atob(binario);
    return JSON.parse(texto);
  }
});

//boton oscuro claro ---------------------------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("toggle-theme");

  const saved = localStorage.getItem("theme");
  if (saved === "light") {
    document.body.classList.add("light");
    btn.textContent = "☀️";
  }

  btn.addEventListener("click", () => {
    const light = document.body.classList.toggle("light");
    btn.textContent = light ? "☀️" : "🌙";
    localStorage.setItem("theme", light ? "light" : "dark");
  });
});
