<template>
    <div class="main-page">
        <div class="survey-steps container mx-auto px-4">
            <div class="survey-navigation">
                <SurveyNavigation
                    @next-step="nextStep()"
                    @prev-step="prevStep()"
                ></SurveyNavigation>
            </div>
            <h1 class="text-indigo-">{{ store.state.surveys.survey.name }}</h1>
            <div v-if="nextSurvey && nextSurvey.nextStepId">
                Next Step:{{ nextSurvey.nextStepId }}
            </div>
            <SurveyElementBuilder
                :survey="store.state.surveys.surveySteps[page]"
            ></SurveyElementBuilder>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'

import SurveyElementBuilder from './SurveyElementBuilder.vue'

import SurveyNavigation from './SurveyNavigation.vue'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'Home',
    components: {
        SurveyElementBuilder,
        SurveyNavigation,
    },
    setup() {
        const page = ref(19)
        const store = useStore()
        // const surveyContent = store.state.surveys.surveySteps
        const nextSurvey = ref()
        store.dispatch('surveys/getSurvey', 2)
        store.dispatch('surveys/getSurveySteps', 2)

        const nextStep = () => {
            console.log('nextStep')
            page.value++
            getNextSurvey()
        }
        const prevStep = () => {
            console.log('prevStep')
            page.value--
            getNextSurvey()
        }

        const getNextSurvey = () => {
            nextSurvey.value = store.state.surveys.surveySteps[page.value]
            console.log(nextSurvey)
        }

        onMounted(() => {
            getNextSurvey()
        })

        return {
            page,
            store,
            // surveyContent,
            nextSurvey,
            nextStep,
            prevStep,
        }
    },
}
</script>

<style scoped></style>
