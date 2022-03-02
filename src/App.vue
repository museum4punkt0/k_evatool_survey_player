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

.timeline-container .wrap,
.timeline-container,
.sidebar,
.overflow-y-scroll,
.survey-content {
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.timeline-container .wrap::-webkit-scrollbar,
.timeline-container::-webkit-scrollbar,
.sidebar::-webkit-scrollbar,
.overflow-y-scroll::-webkit-scrollbar,
.survey-content::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
}
</style>
