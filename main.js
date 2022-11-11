const h1 = document.querySelector("h1");
const p = document.querySelector(".description");
const form = document.querySelector(".input-container");
const input = document.querySelector("input");
const button = document.querySelector(".convert");
const back = document.getElementById("back");

let text = "";
let lever = false;
let array = [];

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (text.length > 0 && !lever) {
    const convert = text.split(",");

    const newArray = [];

    convert.map((text) =>
      (text.length > 0) && newArray.push(text.trimStart().trimEnd().replace(/\s+/g, " "))
    );

    array = newArray.sort();

    h1.textContent = "Convertido";
    p.textContent =
      "Tu texto ha sido convertido en array por orden alfabético, puedes copiar el array, o revisar la consola.";
    button.textContent = "Copiar Array";
    input.style.display = "none";
    back.style.display = "flex";

    console.log(array);

    lever = true;

    Swal.fire({
      title: "Excelente",
      text: "Se ha convertido a array",
      icon: "success",
      confirmButtonColor: "#222831",
      denyButtonColor: "#222831",
      focusConfirm: false,
      background: "#222831",
      color: "#EEEEEE",
      confirmButtonText: "Genial",
    });

    return;
  }

  if (lever) {
    // Crea un campo de texto "oculto"
    var aux = document.createElement("input");

    // Asigna el contenido del elemento especificado al valor del campo
    aux.setAttribute("value", `[${array.map((text) => `'${text}'`)}]`);

    // Añade el campo a la página
    document.body.appendChild(aux);

    // Selecciona el contenido del campo
    aux.select();

    // Copia el texto seleccionado
    document.execCommand("copy");

    // Elimina el campo de la página
    document.body.removeChild(aux);

    Swal.fire({
      title: "Copiado",
      text: "Gracias por utilizar Array Convert",
      icon: "success",
      background: "#222831",
      color: "#EEEEEE",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }
});

back.addEventListener("click", () => {
  h1.textContent = "Array Convert";
  p.textContent =
    "Convierte las palabras separadas por comas en array por orden alfabético.";
  button.textContent = "Convertir";
  input.style.display = "block";
  back.style.display = "none";

  lever = false;
});
input.addEventListener("change", (e) => (text = e.target.value));
