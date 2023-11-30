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

                if (inputTitle instanceof HTMLInputElement && inputCountry instanceof HTMLInputElement && inputImg instanceof HTMLInputElement && inputReview instanceof HTMLInputElement && inputScore instanceof HTMLInputElement && inputAuthor instanceof HTMLInputElement) {
                    const title = inputTitle.value
                    const country = inputCountry.value
                    const image = inputImg.value
                    const review = inputReview.value
                    const score = parseFloat(inputScore.value)
                    const author = inputAuthor.value

                    if (!title || !country || !image || !review || !author) {
                        return Swal.showValidationMessage('Por favor llena todos los campos')
                    }

                    if (isNaN(score) || score < 0 || score > 10) {
                        return Swal.showValidationMessage('El campo "Calificación" debe ser un número entre 0 y 10')
                    }

                    return {
                        title: title,
                        country: country,
                        image: image,
                        review: review,
                        score: score,
                        author: author
                    }
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
                Swal.fire("Reseña agregada exitósamente");
            } else {
                Swal.fire("Error, por favor inténtalo de nuevo más tarde");
            }

            await traerReseñas(sectionInfo)
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

    const res = await fetch(`${URL_BACKEND}/api/reviews`).then(res => res.json())
    .catch(() => sectionInfo_.innerHTML = `<p class="info-centrado">Error, por favor inténtalo de nuevo más tarde<p>`)

    if (res.status == 'success') {
        const data = res.data

        sectionInfo_.innerHTML = "" // El mensaje de carga se reemplaza por la información cuando llega
        data.forEach(review => {
            sectionInfo_.innerHTML += `
                <article class="card-info">
                    <h2>${review.title} - ${review.country}</h2>
                    
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

                    <i id=icon-edit-${review.id} class="fa-solid fa-pen-to-square info-edit-review"></i>
                </article>
            `
        });

        data.forEach((review, index) => {
            const iconEdit = document.getElementById(`icon-edit-${review.id}`)

            if (iconEdit) {
                iconEdit.addEventListener("click", async () => {
                    const { value } = await Swal.fire({
                        title: "Editar una reseña",
                        html: `
                            <div class="sweet-alert-custom">
                                <div>
                                    <label for="swal-inputTitle-edit" class="swal2-label">Título</label>
                                    <input id="swal-inputTitle-edit" class="swal2-input">
                                </div>
                            
                                <div>
                                    <label for="swal-inputCountry-edit" class="swal2-label">País</label>
                                    <input id="swal-inputCountry-edit" class="swal2-input">
                                </div>
                            
                                <div>
                                    <label for="swal-inputImg-edit" class="swal2-label">URL imagen</label>
                                    <input id="swal-inputImg-edit" class="swal2-input">
                                </div>
                            
                                <div>
                                    <label for="swal-inputReview-edit" class="swal2-label">Reseña</label>
                                    <input id="swal-inputReview-edit" class="swal2-input">
                                </div>
            
                                <div>
                                    <label for="swal-inputScore-edit" class="swal2-label">Calificación</label>
                                    <input id="swal-inputScore-edit" class="swal2-input">
                                </div>
            
                                <div>
                                    <label for="swal-inputAuthor-edit" class="swal2-label">Tu nombre</label>
                                    <input id="swal-inputAuthor-edit" class="swal2-input">
                                </div>
                            </div>
                    
                        `,
                        preConfirm: () => {
                            const inputTitle = document.getElementById("swal-inputTitle-edit")
                            const inputCountry = document.getElementById("swal-inputCountry-edit")
                            const inputImg = document.getElementById("swal-inputImg-edit")
                            const inputReview = document.getElementById("swal-inputReview-edit")
                            const inputScore = document.getElementById("swal-inputScore-edit")
                            const inputAuthor = document.getElementById("swal-inputAuthor-edit")
            
                            if (inputTitle instanceof HTMLInputElement && inputCountry instanceof HTMLInputElement && inputImg instanceof HTMLInputElement && inputReview instanceof HTMLInputElement && inputScore instanceof HTMLInputElement && inputAuthor instanceof HTMLInputElement) {
                                const title = inputTitle.value
                                const country = inputCountry.value
                                const image = inputImg.value
                                const review = inputReview.value
                                const score = parseFloat(inputScore.value)
                                const author = inputAuthor.value
            
                                if (!title && !country && !image && !review && !author && !score) {
                                    return Swal.showValidationMessage('Debes editar al menos un campo')
                                }
            
                                if (score && (isNaN(score) || score < 0 || score > 10)) {
                                    return Swal.showValidationMessage('El campo "Calificación" debe ser un número entre 0 y 10')
                                }
            
                                return {
                                    title: title || undefined,
                                    country: country || undefined,
                                    image: image || undefined,
                                    review: review || undefined,
                                    score: score || undefined,
                                    author: author || undefined
                                }
                            }
                        },
                        showCancelButton: true,
                        cancelButtonText: "Cancelar",
                        confirmButtonText: "Agregar",
                    });
                    
                    if (value) {
                        const res = await fetch(`${URL_BACKEND}/api/reviews/${review.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(value)
                        }).then(res => res.json())
                        .catch(() => Swal.fire("Error, por favor inténtalo de nuevo más tarde"))
            
                        if (res.status == 'success') {
                            Swal.fire("Reseña editada exitósamente");
                        } else {
                            Swal.fire("Error, por favor inténtalo de nuevo más tarde");
                        }
            
                        await traerReseñas(sectionInfo)
                    }                                        
                })                
            }
        })
    } else {
        sectionInfo_.innerHTML = `<p class="info-centrado">Error, por favor inténtalo de nuevo más tarde<p>`
    }
}

if (sectionInfo) {
    sectionInfo.innerHTML = '<p class="info-centrado">Cargando contenido...<p>' // Mensaje de carga mientras esperamos a que lleguen las reseñas
    traerReseñas(sectionInfo)
}
