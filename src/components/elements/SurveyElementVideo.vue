<template>
    <div class="video-element">
        <p>SurveyElementVideo</p>
        <!--        {{ content }}-->

        <div id="responsiveVideoWrapper" className="relative  pb-fluid-video">
            <video
                src="https://ak.picdn.net/shutterstock/videos/1060516912/preview/stock-footage-beautiful-sunlight-in-the-forest.webm"
                controls
            ></video>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SurveyElementVideo',
    props: {
        content: {
            type: Object,
            default: null,
        },
    },
}
</script>

<style scoped>
video {
    /* override other styles to make responsive */
    width: auto !important;
    height: auto !important;
}
</style>
