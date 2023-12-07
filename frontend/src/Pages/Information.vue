<script setup lang="ts">
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { TypeReview } from "../types/types";

const reviews = ref<TypeReview[]>([]);
const loading = ref(true);
const error = ref(false);

const getReviews = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/reviews`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_TOKEN_API}`
            }
        }).then(res => res.json())
        reviews.value = res.data
    } catch (e) {
        error.value = true
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    getReviews()
})

const addReview = async () => {
    const { value } = await Swal.fire({
        title: "Agregar una reseña",
        html: `
            <div class="sweet-alert-custom flex flex-col">
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
                        return Swal.showValidationMessage("Por favor llena todos los campos")
                }

                if (isNaN(score) || score < 0 || score > 10) {
                    return Swal.showValidationMessage('El campo "Calificación" debe ser un número entre 0 y 10')
                }

                if (title.length > 50 || author.length > 50) {
                    return Swal.showValidationMessage('Los campos "Título" y "Autor" no pueden tener más de 50 caracteres')
                }

                if (image.length > 255 || review.length > 255) {
                    return Swal.showValidationMessage('Los campos "URL imagen" y "Reseña" no pueden tener más de 255 caracteres')
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
        const { value: password } = await Swal.fire({
                icon: "info",
                title: "Ingresa una contraseña",
                input: "password",
                inputLabel: "Contraseña",
                inputPlaceholder: "****"
        });

        if (password == import.meta.env.VITE_PASSWORD) {
            const res = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_TOKEN_API}`
                },
                body: JSON.stringify(value)
            }).then(res => res.json())
            .catch(() => Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error, por favor inténtalo de nuevo más tarde"
            }))

            if (res.status == 'success') {
                Swal.fire({
                    icon: "success",
                    title: "Reseña agregada exitosamente",
                });

                reviews.value = [...reviews.value, res.data];
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error, por favor inténtalo de nuevo más tarde"
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Contraseña incorrecta"
            });
        }
    }
}

const editReview = async (review: TypeReview) => {
    const { value } = await Swal.fire({
        title: "Editar reseña",
        html: `
            <div class="sweet-alert-custom flex flex-col">
                <div>
                    <label for="swal-inputTitle-edit" class="swal2-label">Título</label>
                    <input id="swal-inputTitle-edit" class="swal2-input" value="${review.title}"">
                </div>

                <div>
                    <label for="swal-inputCountry-edit" class="swal2-label">País</label>
                    <input id="swal-inputCountry-edit" class="swal2-input" value="${review.country}">
                </div>

                <div>
                    <label for="swal-inputImg-edit" class="swal2-label">URL imagen</label>
                    <input id="swal-inputImg-edit" class="swal2-input" value="${review.image}">
                </div>

                <div>
                    <label for="swal-inputReview-edit" class="swal2-label">Reseña</label>
                    <input id="swal-inputReview-edit" class="swal2-input" value="${review.review}">
                </div>

                <div>
                    <label for="swal-inputScore-edit" class="swal2-label">Calificación</label>
                    <input id="swal-inputScore-edit" class="swal2-input" value="${review.score}">
                </div>

                <div>
                    <label for="swal-inputAuthor-edit" class="swal2-label">Tu nombre</label>
                    <input id="swal-inputAuthor-edit" class="swal2-input" value="${review.author}">
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

                if (!title || !country || !image || !review || !author) {
                        return Swal.showValidationMessage("Por favor llena todos los campos")
                }

                if (isNaN(score) || score < 0 || score > 10) {
                    return Swal.showValidationMessage('El campo "Calificación" debe ser un número entre 0 y 10')
                }

                if (title.length > 50 || author.length > 50) {
                    return Swal.showValidationMessage('Los campos "Título" y "Autor" no pueden tener más de 50 caracteres')
                }

                if (image.length > 255 || review.length > 255) {
                    return Swal.showValidationMessage('Los campos "URL imagen" y "Reseña" no pueden tener más de 255 caracteres')
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
        const { value: password } = await Swal.fire({
            icon: "info",
            title: "Ingresa una contraseña",
            input: "password",
            inputLabel: "Contraseña",
            inputPlaceholder: "****"
        });

        if (password == import.meta.env.VITE_PASSWORD) {
            const res = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/reviews/${review.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${import.meta.env.VITE_TOKEN_API}`
                },
                body: JSON.stringify(value)
            }).then(res => res.json())
            .catch(() => Swal.fire({
                icon: "error",
                title: "Error",
                text: "Error, por favor inténtalo de nuevo más tarde"
            }))

            if (res.status == 'success') {
                Swal.fire({
                    icon: "success",
                    title: "Reseña editada exitosamente"
                });

                reviews.value = reviews.value.map(review_ => {
                    if (review_.id == review.id) {
                        return res.data
                    } else {
                        return review_
                    }
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Error, por favor inténtalo de nuevo más tarde"
                });
            }
        } else {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Contraseña incorrecta"
            });
        }
    }
}

const deleteReview = async (id: number) => {
    const { value: password, dismiss } = await Swal.fire({
        title: "Eliminar reseña",
        text: "Ingresa una contraseña",
        icon: "warning",
        input: "password",
        inputPlaceholder: "****",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonText: "Eliminar",
    })

    if (password == import.meta.env.VITE_PASSWORD) {
        const res = await fetch(`${import.meta.env.VITE_URL_BACKEND}/api/reviews/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${import.meta.env.VITE_TOKEN_API}`
            }
        }).then(res => res.json())
        .catch(() => Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error, por favor inténtalo de nuevo más tarde"
        }))

        if (res.status == 'success') {
            Swal.fire({
                icon: "success",
                title: "Reseña eliminada exitosamente"
            });

            reviews.value = reviews.value.filter(review => review.id != id)
        }
    } else if (!dismiss) {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "Contraseña incorrecta"
        });
    }
}

</script>

<template>
    <div>
        <h2 class="text-2xl text-center mt-2">Información</h2>

        <button @click="addReview" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-700 rounded">Agregar una reseña</button>

        <p class="text-center">A continuación se muestra el listado total de reseñas que se han realizado gracias a los voluntarios que han participado</p>
    </div>

    <section class="w-full flex flex-col items-center">

    <div v-if="loading.valueOf()">
        <p>Cargando contenido...</p>
    </div>

    <div v-else-if="error.valueOf()">
        <p>Error al cargar contenido</p>
    </div>

    <div v-else-if="reviews.length == 0">
        <p>No hay reseñas disponibles</p>
    </div>

    <div v-else v-for="(review, index) in reviews" :key="index" class="max-w-3xl my-5">
        <article class="relative p-1 mb-7 flex flex-col items-center max-md:w-72 border border-black rounded-sm">
            <h2 class="text-xl font-semibold">{{ review.title }} - {{ review.country }}</h2>

            <div class="my-2 max-w-sm max-h-96">
                <img class="w-full h-full max-w-sm max-h-96 rounded-sm" :src="review.image.includes('http') ? review.image : `../img/comidas/${review.image}`" alt="Image review">
            </div>

            <div class="flex w-full justify-evenly max-md:flex-col">
                <p class="flex items-center text-center w-2/3 max-md:w-full">{{review.review}}</p>

                <div class="flex flex-col justify-evenly text-center">
                    <p><span class="font-semibold">Calificación</span>: <span v-bind:class="review.score >= 8 ? 'text-green-700' : review.score >= 6 ? 'text-yellow-700' : 'text-red-700'">{{ review.score }}/10</span></p>
                    <p>Fecha de publicación: {{review.date}}</p>
                    <p>Autor: {{review.author}}</p>
                </div>
            </div>

            <i @click="() => editReview(review)" class="fa-solid fa-pen-to-square absolute top-2 right-2 cursor-pointer"></i>
            <i @click="() => deleteReview(review.id)" class="fa-solid fa-trash absolute top-2 right-8 cursor-pointer"></i>
        </article>
    </div>

    </section>
</template>

<style>
.sweet-alert-custom div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
</style>
