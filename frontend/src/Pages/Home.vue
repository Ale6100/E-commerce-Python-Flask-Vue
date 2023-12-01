<script setup lang="ts">

</script>

<template>
    <section class="relative flex items-center max-md:h-52 max-sm:h-40">
        <img class="banner w-full max-h-full" src="/img/banner.webp" alt="Banner presentación">

        <p class="pBanner font-semibold p-1 w-full absolute text-2xl max-md:text-lg">Un viaje al sabor...</p>
    </section>

    <section class="text-center">
        <h2 class="text-3xl max-md:text-2xl my-5">Bienvenidos al sitio</h2>

        <p>El placer de la comida en lugares diferentes. A través de esta página queremos invitarlos a conocer un poco más de los ricos platos de la comida europea que muchas veces conocemos pero a través del punto de vista latino. Sabores típicos que pueden disfrutar en su lugar de origen.</p>
    </section>

    <section>
        <h3 class="my-5 text-2xl max-md:text-xl text-center">Lugares y sabores</h3>

        <div class="flex justify-center flex-wrap gap-y-2 gap-x-3">
            <article class="max-w-xs">
                <router-link class="flex justify-center" to="/countries#countries-espana"><img src="/img/comida_espana.webp" alt="España comidas"></router-link>
                <h4 class="text-center">"Paellas, tortillas, cocido madrileño...</h4>
            </article>

            <article class="max-w-xs">
                <router-link class="flex justify-center" to="/countries#countries-francia"><img src="/img/comida_francia.webp" alt="Francia comidas"></router-link>
                <h4 class="text-center">La ratatouille, les escargots de Bourgogne...</h4>
            </article>  

            <article class="max-w-xs">  
                <router-link class="flex justify-center" to="/countries#countries-italia"><img src="/img/comida_italia.webp" alt="Italia comidas"></router-link>
                <h4 class="text-center">Lasaña, pasta, pizza, cannoli...</h4>
            </article>
        </div>
    </section>

    <section class="flex flex-col items-center p-5 rounded-lg">
        <h3 class="text-2xl max-md:text-xl text-center">Sobre Nosotros</h3>

        <div class="my-5 max-w-md">
            <img class="w-full rounded-sm" src="/img/aboutUsTeamWork.webp" alt="Equipo de trabajo">
        </div>

        <p class="max-w-md text-justify">¡Bienvenidos a Sabores Euro Latino! Somos una comunidad apasionada por la gastronomía europea que se esfuerza por acercar los sabores y experiencias culinarias del Viejo Continente a América Latina. No somos críticos de comida profesionales, sino amantes de la buena comida que desean compartir sus descubrimientos y aventuras gastronómicas. Este espacio está dedicado a las reseñas y recomendaciones de personas como tú, que han explorado la deliciosa variedad de platos europeos y desean compartir sus hallazgos con nuestra comunidad. ¡Acompáñanos en este viaje por los sabores de Europa y descubre nuevas delicias culinarias!</p>
    </section>     
</template>

<style scoped>
.banner {
    border-bottom: 5px solid rosybrown;
}

.pBanner {
  background-color: rgb(243, 173, 202, 0.9);
  color: rgb(80, 20, 60);  
  text-shadow: 2px 2px rgb(224, 182, 195);
}
</style>