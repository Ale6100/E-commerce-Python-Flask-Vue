const formContact = document.querySelector(".form-contact")

if (formContact) {
    formContact.addEventListener("submit", e => {
        e.preventDefault()

        const form = e.target

        if (form instanceof HTMLFormElement) { // Se ejecuta si form es un formulario
            const name = form.nameUser.value // Tomamos los valores de los inputs, según el atributo name
            const body = form.body.value

            if (!name || !body) { // Verificamos que los campos sean válidos
                return alert("Por favor llena todos los campos")
            }

            alert(`Mensaje enviado exitosamente \nGracias ${name}`) // Se envía un mensaje de envío exitoso y se resetean los campos
            form.reset()
        }
    })
}
