<template>
    <router-view />
</template>

<script>
import { version } from '../package.json'
import 'animate.css'

console.log(version)
</script>

<style>
::-webkit-scrollbar {
    display: none;
}

* {
    touch-action: manipulation;
}

h1:focus,
h2:focus,
h3:focus,
h4:focus {
    outline: 3px solid blue;
}

img:focus,
button:focus {
    outline: 3px solid blue;
}
</style>
