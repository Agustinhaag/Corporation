document.addEventListener("submit", (e) => {
    if (e.target.classList.contains("form-delete")) {
      e.preventDefault();
      Swal.fire({
        icon: "error",
        title: "¿Estás seguro?",
        text: "¡Estás a punto de eliminar tu usuario!",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          e.target.submit();
        }
      });
    }
  });