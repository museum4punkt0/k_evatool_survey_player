<template>
    <h1 class="text-indigo-">{{ store.state.surveys.survey.name }}</h1>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'

export default {
    name: 'Home',
    setup() {
        const store = useStore()
        store.dispatch('surveys/getSurvey', 1)
        store.dispatch('surveys/getSurveySteps', 1)

        const method1 = () => {
            console.log('method1')
        }

        onMounted(() => {
            method1()
        })

        return {
            store,
        }
    },
}
</script>

<style scoped></style>
