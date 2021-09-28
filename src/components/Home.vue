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
        <div class="survey-steps mx-5 px-4">
            <div class="survey-navigation">
                {{ store.state.lang }}
                <SurveyNavigation
                    @next-step="nextStep()"
                    @prev-step="prevStep()"
                ></SurveyNavigation>
            </div>
            <!--            <h1 class="text-indigo-">{{ store.state.surveys.survey.name }}</h1>-->
            <!--            <div v-if="nextSurvey && nextSurvey.nextStepId">-->
            <!--                Next Step:{{ nextSurvey.nextStepId }}-->
            <!--            </div>-->

            <!--            {{ store.state.surveys.surveySteps }}-->
            <!--            {{ store.state.surveyResults.surveyResults.steps }}-->
            <SurveyElementBuilder
                v-if="
                    store.state.surveys.surveySteps &&
                    store.state.surveyResults.surveyResults &&
                    store.state.surveyResults.surveyResults.steps &&
                    store.state.surveyResults.surveyResults.steps[surveyStep]
                "
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
import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'Home',
    components: {
        HeaderMenu,
        SurveyElementBuilder,
        SurveyNavigation,
    },
    setup() {
        const surveyStep = ref(2)
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const backlink = ref()

        let queries = JSON.parse(JSON.stringify(route.query))
        console.log(queries)
        console.log(window.history.state.back)
        // if (
        //     !localStorage.getItem('ev-tool-backlink') ||
        //     window.history.state.back !==
        //         localStorage.getItem('ev-tool-backlink')
        // )
        // backlink.value = window.history.state.back
        // localStorage.setItem('ev-tool-backlink', backlink.value)
        // queries.backlink = backlink.value
        //
        // router.replace({ query: queries })

        const surveyId = route.query.id
        const userLang = route.query.lang || ''
        // const surveyContent = store.state.surveys.surveySteps
        const nextSurvey = ref()

        store.dispatch('getLanguages', userLang)
        //store.dispatch('setUserLanguage', userLang)
        store.dispatch('surveys/getSurvey', surveyId)
        store.dispatch('surveys/getSurveySteps', surveyId)
        store.dispatch('surveyResults/setSurveyResults', surveyId)

        console.log(route.query)
        console.log(router)

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
            userLang,
            router,
            route,
            backlink,
            // surveyContent,
            nextSurvey,
            nextStep,
            prevStep,
        }
    },
}
</script>

<style scoped></style>
