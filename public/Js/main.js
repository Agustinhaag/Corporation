const rotateBtn = document.querySelector("#btn-icon");

const deslizar = () => {
  const cards = document.querySelectorAll(".card-icon");
  let isOpen = false;

  rotateBtn.addEventListener("click", function () {
    isOpen = !isOpen;

    cards.forEach(function (card) {
      const contentHidden = card.querySelector(".contenidoOculto");

      if (isOpen) {
        let contentHeight = contentHidden.scrollHeight + "px";
        contentHidden.style.maxHeight = contentHeight;
        rotateBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
      } else {
        contentHidden.style.maxHeight = "0";
        rotateBtn.textContent = "Conoce más";
      }
    });
  });
}

deslizar(); 


const btnInfo = document.querySelectorAll("#btnempezar");

btnInfo.forEach((btn) => {
  btn.addEventListener("click", () => {
    const article = btn.closest("#banner");
    const visibleContent = article.querySelector(".container-banner");
    visibleContent.classList.add("hide");

    const adicional = article.querySelector(".return");
    adicional.classList.add("view");
  });
});

const btnReset = document.querySelectorAll("#reset");

btnReset.forEach((btn) => {
  btn.addEventListener("click", () => {
    const article = btn.closest("#banner");

    const adicional = article.querySelector(".return");
    adicional.classList.remove("view");

    const visibleContent = article.querySelector(".container-banner");
    visibleContent.classList.remove("hide");
  });
});