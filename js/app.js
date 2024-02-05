const btnEncriptar = document.querySelector("#encriptar");
const btnDsencriptar = document.querySelector("#desencriptar");
const btnBorrar = document.querySelector("#borrar");
const btnCopiar = document.querySelector("#copiar");
const btnCloseModal = document.querySelector("#closeModal");
const textOutput = document.querySelector(".text-output");
const textInput = document.querySelector(".text-input");
const containerFull = document.querySelector(".container-full");
const containerEmpty = document.querySelector(".container-empty");
const dialog = document.querySelector("dialog");
const mqLarge = window.matchMedia("(max-width: 679px)");

const dictionary = {
  a: "ai",
  e: "enter",
  i: "imes",
  o: "ober",
  u: "ufat",
};

function textOutputFull() {
  return textOutput.textContent.length ? true : false;
}

function showContent() {
  if (textOutputFull()) {
    containerFull.setAttribute("style", "display:flex");
    containerEmpty.setAttribute("style", "display:none");
  }
}

function validationInput(paragraph) {
  if (!/^[a-zñ\s]+$/.test(paragraph)) {
    dialog.showModal();
    return false;
  } else {
    return true;
  }
}

function encriptar(paragraph, dictionary) {
  const keysDictionary = Object.keys(dictionary).join("");
  const regex = new RegExp(`[${keysDictionary}]`, "g");

  paragraph = paragraph.replace(regex, (match) => {
    return dictionary[match];
  });
  return paragraph;
}

function desencriptar(paragraph, dictionary) {
  Object.entries(dictionary).forEach(
    ([key, value]) => (paragraph = paragraph.replaceAll(value, key))
  );
  return paragraph;
}

function borrar() {
  if (textInput.value.length > 0) {
    if (window.confirm("¿Esta seguro que desea borrar el texto?")) {
      textInput.value = "";
    }
  }
}

function copyclipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.info("Texto copiado al portapapeles");
    })
    .catch((err) => {
      console.error("Error al copiar al portapapeles:", err);
    });
}

function scrollToSection(section) {
  if (mqLarge.matches) {
    section.scrollIntoView();
  }
}

/**
 * SE AGREGAN FUNCIONES A LOS EVENTOS
 */

btnEncriptar.addEventListener("click", () => {
  if (validationInput(textInput.value)) {
    textOutput.textContent = encriptar(textInput.value, dictionary);
    showContent();
    scrollToSection(textOutput);
  }
});

btnDsencriptar.addEventListener("click", () => {
  if (validationInput(textInput.value)) {
    textOutput.textContent = desencriptar(textInput.value, dictionary);
    showContent();
    scrollToSection(textOutput);
  }
});

btnBorrar.addEventListener("click", borrar);

btnCopiar.addEventListener("click", () => {
  copyclipboard(textOutput.textContent);
});

btnCloseModal.addEventListener("click", () => {
  dialog.close();
});
