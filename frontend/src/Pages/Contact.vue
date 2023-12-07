<script setup lang="ts">

</script>

<template>
    <div class="text-center">
        <p class="text-2xl mt-2">Formulario de contacto</p>
    
        <p class="text-lg">¿Tienes alguna consulta o deseas informar algún error? Contáctate con nosotros con el siguiente formulario</p>
    </div>

    <section class="w-full my-24">
        <form class="w-full max-w-3xl mx-auto p-3 bg-slate-300 border-dashed border border-black rounded bg-opacity-50 shadow-lg flex flex-col items-center justify-evenly">
            <div class="p-2 flex flex-col w-full space-y-1">
                <label class="font-bold" for="name-contact">Nombre</label>
                <input type="text" id="name-contact" name="nameUser" placeholder="Ingresa tu nombre" required class="form-input">                    
            </div>

            <div class="my-3 mx-0 p-2 flex flex-col w-full space-y-1">
                <label class="font-bold" for="body-contact">Cuerpo del mensaje</label>
                <textarea id="body-contact" name="body" placeholder="Ingresa tu mensaje" required class="form-textarea"></textarea>                    
            </div>

            <button class="bg-blue-500 hover:bg-blue-600 text-white w-full" type="submit">Enviar</button>
        </form>    
    </section>
</template>
