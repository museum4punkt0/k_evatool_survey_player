<template>
    <div class="main-page h-screen overflow-y-scroll bg-gray-100">
        <div class="survey-header-menu top-0 fixed w-screen z-50 bg-white">
            <header-menu></header-menu>

            <!--            {{ store.state.currentStep }}-->
        </div>
        <IdleScreen v-if="idle" @start="idle = false"></IdleScreen>
        <div v-else class="survey-steps mx-5 pt-28 pb-16 px-4 h-full z-40">
            <SurveyElementBuilder
                v-if="store.state.surveys.surveySteps"
                :content="
                    store.state.surveys.surveySteps[store.state.currentStep]
                "
                :survey="store.state.surveys.survey"
                :survey-results="
                    store.state.surveys.surveySteps[store.state.currentStep]
                "
            ></SurveyElementBuilder>
        </div>

        <SurveyNavigation
            v-if="!idle"
            :survey-steps="store.state.surveys.surveySteps.length"
            :current-step="surveyStep + 1"
            @next-step="nextStep()"
            @prev-step="prevStep()"
        ></SurveyNavigation>
    </div>
</template>

<script>
import { useStore } from 'vuex'

import SurveyElementBuilder from './SurveyElementBuilder.vue'
import HeaderMenu from './HeaderMenu.vue'
import IdleScreen from './subelements/IdleScreen.vue'
import SurveyNavigation from './FooterNavigation.vue'
import { ref } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
    name: 'Home',
    components: {
        HeaderMenu,
        IdleScreen,
        SurveyElementBuilder,
        SurveyNavigation,
    },
    setup() {
        const surveyStep = ref(0)
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const backlink = ref()
        const idle = ref(true)

        backlink.value = document.referer ? document.referer : '/'

        let queries = JSON.parse(JSON.stringify(route.query))
        if (queries.backlink) {
            window.localStorage.setItem('backlink', queries.backlink)
            window.localStorage.setItem(' ev-tool-backlink', queries.backlink)

            delete queries.backlink
            console.log(queries)
            router.replace({ query: queries })
        }

        // if (
        //     !localStorage.getItem('ev-tool-backlink') ||
        //     window.history.state.back !==
        //         localStorage.getItem('ev-tool-backlink')
        // )
        backlink.value = window.history.state.back

        // localStorage.setItem('ev-tool-backlink', backlink.value)
        // queries.backlink = backlink.value
        //
        // router.replace({ query: queries })

        const surveySlug = route.query.survey || ''
        queries.survey = route.query.survey || ''
        router.replace({ query: queries })
        const userLang = route.query.lang || ''

        // const surveyContent = store.state.surveys.surveySteps
        const nextSurvey = ref()

        //store.dispatch('getLanguages', userLang)
        //store.dispatch('setUserLanguage', userLang)
        store.dispatch('surveys/getSurvey', surveySlug)
        // store.dispatch('surveys/getSurveySteps', surveyId)
        store.dispatch('surveyResults/setSurveyResults', surveySlug)

        console.log(route.query)
        console.log(router)

        const nextStep = () => {
            console.log('nextStep')
            surveyStep.value++

            store.dispatch('setCurrentStep')
            getNextSurvey()
        }
        const prevStep = () => {
            console.log('prevStep')
            surveyStep.value--
            getNextSurvey()
        }

        const getNextSurvey = async () => {
            // alert('next')
            console.log(store.state.surveys.surveySteps)
            nextSurvey.value = await store.state.surveys.surveySteps[
                surveyStep.value
            ]
            console.log(nextSurvey)
        }

        onMounted(() => {
            // getNextSurvey()
            console.log(store.state.surveys)
            console.log(window)
            console.log(document.referrer)
        })

        return {
            idle,
            surveyStep,
            store,
            userLang,
            router,
            route,
            backlink,
            nextSurvey,
            nextStep,
            prevStep,
        }
    },
}
</script>

<style scoped></style>
