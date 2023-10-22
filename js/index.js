const sectionInfo = document.querySelector("#section-info")

if (sectionInfo) {
    sectionInfo.innerHTML = '<p class="info-centrado">Cargando contenido...<p>' // Mensaje de carga mientras esperamos a que lleguen las reseñas

    const colorearScore = (score) => { // Retorna la calificación con un color distinto dependiendo del número
        let color = ""
        if (score >= 8) {
            color = "verde"
        } else if (score >= 6) {
            color = "amarillo"
        } else {
            color = "rojo"
        }
        return `<span class='score-${color}'>${score}</span>`
    }

    const formatearFecha = (date) => { // Cambia un formato de fecha de la siguiente forma 2022-12-09T19:18:50.110Z a este 09/12/2022
        const fecha = new Date(date);
        return `${fecha.getDate()}/${fecha.getMonth()+1}/${fecha.getFullYear()}`;     
    }

    fetch('https://65248d31ea560a22a4e9ecde.mockapi.io/reviews') // La información de cada reseña viene de esta API
        .then(res => res.json())
        .then(data => {
            sectionInfo.innerHTML = "" // El mensaje de carga se reemplaza por la información cuando llega
            data.forEach(review => {
                sectionInfo.innerHTML += `
                    <article class="card-info">
                        <h2 class="info-titulo">${review.title} - ${review.country}</h2>
                        
                        <div class="info-img">
                            <img src="../img/comidas/${review.image}" alt="Image review"></img>
                        </div>

                        <div class="info-details">
                            <p class="info-review">${review.review}</p>

                            <div class="info-more-details">
                                <p class="info-score"><span class="info-negrita">Calificación</span>: ${colorearScore(review.score)}/10</p>
                                <p class="info-date">Fecha de publicación: ${formatearFecha(review.date)}</p>
                                <p class="info-author">Autor: ${review.author}</p>
                            </div>
                        </div>
                    </article>
                `
            });
        })
        .catch(err => {
            sectionInfo.innerHTML = "<p class='info-centrado'>Error, por favor intente de nuevo más tarde</p>"
        })
}

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

            alert(`Mensaje enviado exitósamente \nGracias ${name}`) // Se envía un mensaje de envío exitoso y se resetean los campos
            form.reset()
        }
    })
}
