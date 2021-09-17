<template>
    <div>
        <p>SurveyElementYayNay</p>
        <SwipeAnswer></SwipeAnswer>
    </div>
</template>

<script>
import SwipeAnswer from '../subelements/SwipeAnswer.vue'

export default {
    name: 'SurveyElementYayNay',
    components: { SwipeAnswer },
    props: {
        content: {
            type: Object,
            default: () => {},
        },
    },
    // setup() {
    //     //throwDirection == direction.LEFT ? 'left' : 'right'
    //     return {}
    // },
}
</script>

<style scoped></style>
