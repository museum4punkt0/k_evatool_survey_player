<template>
    <h2 class="pb-5" v-html="content.params.text[lang]"></h2>
    <!--    <textarea-->
    <!--        v-model="simpleText"-->
    <!--        class="bg-transparent text-gray-800 w-3/12 text-2xl"-->
    <!--        placeholder="Schreibe einen Kommentar..."-->
    <!--    />-->

    <!--    {{ surveyResults }}-->
    <NextButton @confirm="nextStep"></NextButton>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import NextButton from '../subelements/NextButton.vue'
import { useRoute } from 'vue-router'
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
        const route = useRoute()
        const allowSkip = ref(props.content.allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)
        const lang = computed({
            get: () => store.state.lang,
        })

        const nextStep = () => {
            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.survey,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        read: true,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguage: store.state.lang,
                },
            })
            store.dispatch('setCurrentStep')
        }
        return {
            lang,
            store,
            route,
            simpleText,
            allowSkip,
            resultBasedNextSteps,
            nextStep,
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
