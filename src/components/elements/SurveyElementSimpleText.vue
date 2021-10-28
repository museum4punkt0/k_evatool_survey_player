<template>
    <h2 class="pb-5" v-html="content.params.text[lang]"></h2>
    <!--    <textarea-->
    <!--        v-model="simpleText"-->
    <!--        class="bg-transparent text-gray-800 w-3/12 text-2xl"-->
    <!--        placeholder="Schreibe einen Kommentar..."-->
    <!--    />-->

    <!--    {{ surveyResults }}-->
    <NextButton></NextButton>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import NextButton from '../subelements/NextButton.vue'
export default {
    name: 'SurveyElementSimpleText',
    components: { NextButton },
    props: {
        content: {
            type: Object,
            default: () => {},
        },
        survey: {
            type: Object,
            default: () => {},
        },
        surveyResults: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const simpleText = ref()
        const store = useStore()
        const allowSkip = ref(props.content.allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)
        const lang = computed({
            get: () => store.state.lang,
        })

        // const nextStep = () => {}
        return {
            lang,
            store,
            simpleText,
            allowSkip,
            resultBasedNextSteps,
        }
    },
}
</script>

<style scoped>
textarea {
    resize: none;
    box-sizing: border-box;
    outline: none;
}
</style>
