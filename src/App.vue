<template>
    <router-view />
</template>

<script>
import { version } from '../package.json'

console.log(version)
</script>

<style>
::-webkit-scrollbar {
    display: none;
}
</style>
