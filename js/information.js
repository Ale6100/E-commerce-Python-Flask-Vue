const addReview = document.querySelector(".buttonReview")

if (addReview) {
    addReview.addEventListener("click", async e => {
        const { value } = await Swal.fire({
            title: "Agregar una reseña",
            html: `
                <div class="sweet-alert-custom">
                    <div>
                        <label for="swal-inputTitle" class="swal2-label">Título</label>
                        <input id="swal-inputTitle" class="swal2-input">
                    </div>
                
                    <div>
                        <label for="swal-inputCountry" class="swal2-label">País</label>
                        <input id="swal-inputCountry" class="swal2-input">
                    </div>
                
                    <div>
                        <label for="swal-inputImg" class="swal2-label">URL imagen</label>
                        <input id="swal-inputImg" class="swal2-input">
                    </div>
                
                    <div>
                        <label for="swal-inputReview" class="swal2-label">Reseña</label>
                        <input id="swal-inputReview" class="swal2-input">
                    </div>

                    <div>
                        <label for="swal-inputScore" class="swal2-label">Calificación</label>
                        <input id="swal-inputScore" class="swal2-input">
                    </div>

                    <div>
                        <label for="swal-inputAuthor" class="swal2-label">Tu nombre</label>
                        <input id="swal-inputAuthor" class="swal2-input">
                    </div>
                </div>
        
            `,
            preConfirm: () => {
                const inputTitle = document.getElementById("swal-inputTitle")
                const inputCountry = document.getElementById("swal-inputCountry")
                const inputImg = document.getElementById("swal-inputImg")
                const inputReview = document.getElementById("swal-inputReview")
                const inputScore = document.getElementById("swal-inputScore")
                const inputAuthor = document.getElementById("swal-inputAuthor")
                if (inputTitle instanceof HTMLInputElement && inputTitle.value && inputCountry instanceof HTMLInputElement && inputCountry.value && inputImg instanceof HTMLInputElement && inputImg.value && inputReview instanceof HTMLInputElement && inputReview.value && inputScore instanceof HTMLInputElement && inputScore.value && inputAuthor instanceof HTMLInputElement && inputAuthor.value) {
                    return {
                        title: inputTitle.value,
                        country: inputCountry.value,
                        image: inputImg.value,
                        review: inputReview.value,
                        score: inputScore.value,
                        author: inputAuthor.value
                    }
                } else {
                    return ""
                }
            },
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonText: "Agregar",
        });
        if (value) {
            //! Acá luego habrá una funcionalidad que agregará la reseña al backend
            Swal.fire("Reseña agregada exitosamente (en realidad todavía no)");
            await traerReseñas(sectionInfo)
        } else {
            Swal.fire("Por favor llena todos los campos");
        }
    })
}

const sectionInfo = document.querySelector("#section-info")

const traerReseñas = async (sectionInfo_) => {
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

    const data = await fetch('https://65248d31ea560a22a4e9ecde.mockapi.io/reviews').then(res => res.json()) // La información de cada reseña viene de esta API

    sectionInfo_.innerHTML = "" // El mensaje de carga se reemplaza por la información cuando llega
    data.forEach(review => {
        sectionInfo_.innerHTML += `
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
}

if (sectionInfo) {
    sectionInfo.innerHTML = '<p class="info-centrado">Cargando contenido...<p>' // Mensaje de carga mientras esperamos a que lleguen las reseñas
    traerReseñas(sectionInfo)
}
