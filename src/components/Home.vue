<template>
    <div class="main-page bg-gray-200">
        <div class="survey-header-menu bg-white">
            <header-menu></header-menu>

            <!--            {{-->
            <!--                store.state.surveyResults.surveyResults.steps.original.data[-->
            <!--                    surveyStep-->
            <!--                ]-->
            <!--            }}-->
        </div>
        <div class="survey-steps container mx-auto px-4">
            <div class="survey-navigation">
                <SurveyNavigation
                    @next-step="nextStep()"
                    @prev-step="prevStep()"
                ></SurveyNavigation>
            </div>
            <!--            <h1 class="text-indigo-">{{ store.state.surveys.survey.name }}</h1>-->
            <div v-if="nextSurvey && nextSurvey.nextStepId">
                Next Step:{{ nextSurvey.nextStepId }}
            </div>
            <SurveyElementBuilder
                :survey="store.state.surveys.surveySteps[surveyStep]"
                :survey-results="
                    store.state.surveyResults.surveyResults.steps[surveyStep]
                "
            ></SurveyElementBuilder>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'

import SurveyElementBuilder from './SurveyElementBuilder.vue'
import HeaderMenu from './HeaderMenu.vue'
import SurveyNavigation from './SurveyNavigation.vue'
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
    name: 'Home',
    components: {
        HeaderMenu,
        SurveyElementBuilder,
        SurveyNavigation,
    },
    setup() {
        const surveyStep = ref(1)
        const store = useStore()
        const route = useRoute()
        const surveyId = route.query.id

        // const surveyContent = store.state.surveys.surveySteps
        const nextSurvey = ref()
        store.dispatch('surveys/getSurvey', surveyId)
        store.dispatch('surveys/getSurveySteps', surveyId)
        store.dispatch('surveyResults/setSurveyResults', surveyId)

        const nextStep = () => {
            console.log('nextStep')
            surveyStep.value++
            getNextSurvey()
        }
        const prevStep = () => {
            console.log('prevStep')
            surveyStep.value--
            getNextSurvey()
        }

        const getNextSurvey = () => {
            nextSurvey.value = store.state.surveys.surveySteps[surveyStep.value]
            console.log(nextSurvey)
        }

        onMounted(() => {
            getNextSurvey()
        })

        return {
            surveyStep,
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
