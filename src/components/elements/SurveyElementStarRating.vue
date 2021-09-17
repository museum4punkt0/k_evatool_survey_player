<template>
    <div id="app" class="flex justify-center items-center">
        <StarRating :value="rating" :stars="6" @input="setRating" />
    </div>
</template>

<script>
import StarRating from '../subelements/StarRating.vue'
import { ref } from '@vue/reactivity'
export default {
    name: 'SurveyElementStarRating',
    components: {
        StarRating,
    },
    setup() {
        const rating = ref(3)
        const setRating = (i) => {
            console.log(i)
            rating.value = i
        }
        return { rating, setRating }
    },
}
</script>
