<template>
    <header class="py-1 sticky top-0 z-30 flex justify-between border-b border-black">
        <router-link to="/" class="flex h-14 text-black">
                <img src="/img/soup.webp" alt="Logo">
                <h1 class="whitespace-nowrap h-full flex items-center text-2xl max-md:text-lg text-center">Sabores Euro Latinos</h1>
        </router-link>

        <input type="checkbox" class="menu-bar">

        <nav class="flex justify-start translate-x-0 static top-16 left-0 transition-all border-black max-md:absolute max-md:w-full max-md:border-t max-md:-translate-x-full">
            <ul class="w-full flex justify-evenly items-center max-md:h-96 max-md:flex-col max-md:items-start max-sm:flex-col">
                <li><router-link to="/">Inicio</router-link></li>
                <li><router-link to="/information">Información</router-link></li>
                <li><router-link to="/countries">Paises</router-link></li>
                <li><router-link to="/contact">Contacto</router-link></li>
            </ul>
        </nav>
    </header>
</template>

<style scoped>
header {
    background: var(--ppal-color);
}

header nav li {
    text-shadow: 2px 2px 1px rgb(245, 222, 179);
}

header nav li a {
    padding: 4px;
    text-decoration: none;
    text-wrap: nowrap;
    margin: 15px;
    color: rgb(0, 0, 0);
    border-radius: 2px;
}

header nav a:hover {
    background: rgb(212, 175, 186);
    font-weight: bold;
}

.menu-bar {
    display: none;
}

.menu-bar:checked ~ nav {
    transform: translateX(0%); 
}

@media only screen and (max-width: 768px) {
    header nav {
        background-color: rgb(237, 201, 216);
    }
    
    .menu-bar {
        display: inline-block;
        appearance: none;
        background-image: url("../img/menu.svg");
        background-size: cover;
        width: 30px;
        height: 30px;
        margin: auto 5px auto 0px;
        cursor: pointer;
    }
}
</style>
