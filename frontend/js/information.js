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
                
                const score = parseFloat(inputScore.value)

                if (isNaN(score)) {
                    return Swal.showValidationMessage('El campo "Calificación" debe ser numérico')
                } else if (score < 0 || score > 10) {
                    return Swal.showValidationMessage('El campo "Calificación" debe estar entre 0 y 10')
                }
                
                if (inputTitle instanceof HTMLInputElement && inputTitle.value && inputCountry instanceof HTMLInputElement && inputCountry.value && inputImg instanceof HTMLInputElement && inputImg.value && inputReview instanceof HTMLInputElement && inputReview.value && inputAuthor instanceof HTMLInputElement && inputAuthor.value) {
                    return {
                        title: inputTitle.value,
                        country: inputCountry.value,
                        image: inputImg.value,
                        review: inputReview.value,
                        score: score,
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
            const res = await fetch(`${URL_BACKEND}/api/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value)
            }).then(res => res.json())
            .catch(() => Swal.fire("Error, por favor inténtalo de nuevo más tarde"))

            if (res.status == 'success') {
                Swal.fire("Reseña agregada exitosamente");
            } else {
                Swal.fire("Error, por favor inténtalo de nuevo más tarde");
            }

            await traerReseñas(sectionInfo)
        } else if (value === "") {
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

    // const data = await fetch('https://65248d31ea560a22a4e9ecde.mockapi.io/reviews').then(res => res.json()) // La información de cada reseña viene de esta API
    const res = await fetch(`${URL_BACKEND}/api/reviews`).then(res => res.json())
    .catch(() => sectionInfo_.innerHTML = `<p class="info-centrado">Error, por favor inténtalo de nuevo más tarde<p>`)

    if (res.status == 'success') {
        const data = res.data

        sectionInfo_.innerHTML = "" // El mensaje de carga se reemplaza por la información cuando llega
        data.forEach(review => {
            sectionInfo_.innerHTML += `
                <article class="card-info">
                    <h2 class="info-titulo">${review.title} - ${review.country}</h2>
                    
                    <div class="info-img">
                        <img src=${review.image.includes("http") ? review.image : `../img/comidas/${review.image}`} alt="Image review"></img>
                    </div>
    
                    <div class="info-details">
                        <p class="info-review">${review.review}</p>
    
                        <div class="info-more-details">
                            <p class="info-score"><span class="info-negrita">Calificación</span>: ${colorearScore(review.score)}/10</p>
                            <p class="info-date">Fecha de publicación: ${review.date}</p>
                            <p class="info-author">Autor: ${review.author}</p>
                        </div>
                    </div>
                </article>
            `
        });        
    } else {
        sectionInfo_.innerHTML = `<p class="info-centrado">Error, por favor inténtalo de nuevo más tarde<p>`
    }
}

if (sectionInfo) {
    sectionInfo.innerHTML = '<p class="info-centrado">Cargando contenido...<p>' // Mensaje de carga mientras esperamos a que lleguen las reseñas
    traerReseñas(sectionInfo)
}
