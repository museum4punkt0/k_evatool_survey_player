<template>
    <div class="main-page h-screen overflow-y-scroll bg-gray-100">
        <div class="survey-header-menu top-0 fixed w-screen z-50 bg-white">
            <header-menu :languages="languages"></header-menu>

            <!--            {{ store.state.currentStep }}-->
        </div>
        <IdleScreen v-if="idle" @start="idle = false"></IdleScreen>
        <div v-else class="survey-steps xl:mx-5 pt-24 pb-16 px-4 h-full z-40">
            <!--            <SurveyElementBuilder-->
            <!--                v-if="store.state.surveys.surveySteps"-->
            <!--                :content="-->
            <!--                    store.state.surveys.surveySteps[store.state.currentStep]-->
            <!--                "-->
            <!--                :survey="store.state.surveys.survey"-->
            <!--                :result="-->
            <!--                    store.state.surveys.surveySteps[store.state.currentStep]-->
            <!--                "-->
            <!--                :survey-results="-->
            <!--                    store.state.surveyResults['surveyResults']?.steps[-->
            <!--                        store.state.currentStep-->
            <!--                    ]-->
            <!--                "-->
            <!--            ></SurveyElementBuilder>-->

            <SurveyElementBuilder
                v-if="store.state.surveys.surveySteps"
                :content="currentStep"
                :survey="store.state.surveys.survey"
                :result="currentStep"
                :survey-results="currentStep"
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
import { ref, watch } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { v4 as uuidv4 } from 'uuid'

export default {
    name: 'Home',
    components: {
        HeaderMenu,
        IdleScreen,
        SurveyElementBuilder,
        SurveyNavigation,
    },
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const backlink = ref()
        const currentStep = ref()
        const idle = ref(false)
        const surveyStep = ref()
        const languages = ref()

        backlink.value = document.referer ? document.referer : '/'

        let queries = JSON.parse(JSON.stringify(route.query))

        if (queries && queries.demo === 'true') {
            window.localStorage.setItem('ev-tool-demo', true)
            store.dispatch('setIsDemo', true)
        } else {
            window.localStorage.setItem('ev-tool-demo', false)
            store.dispatch('setIsDemo', false)
        }

        if (queries.backlink) {
            window.localStorage.setItem('backlink', queries.backlink)
            window.localStorage.setItem('ev-tool-backlink', queries.backlink)

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
        // store.dispatch('surveys/getSurvey', surveySlug)
        // store.dispatch('surveys/getSurveySteps', surveyId)
        // store.dispatch('surveyResults/setSurveyResults', surveySlug)

        // console.log(route.query)
        // console.log(router)

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
            console.log(store.state.surveys.surveySteps)
            nextSurvey.value = await store.state.surveys.surveySteps[
                surveyStep.value
            ]
            console.log(nextSurvey)
        }

        onMounted(async () => {
            // check for uuid
            if (!localStorage.getItem('surveyUuid')) {
                await localStorage.setItem('surveyUuid', uuidv4())
            }

            await store.dispatch('surveyResults/getUuidResults', {
                surveyId: surveySlug,
                uuid: localStorage.getItem('surveyUuid'),
            })
            languages.value =
                store.state.surveyResults.surveyUuidResults.survey.languages
            console.log(languages.value)
            await store.dispatch('setUserLanguage', languages.value[0])
            let surveySteps = store.state.surveyResults.surveyUuidResults.steps

            let currentStepId =
                store.state.surveyResults.surveyUuidResults.survey.statusByUuid
                    .currentStep
            currentStep.value = surveySteps.find((x) => x.id === currentStepId)

            if (surveyStep.value > 0) {
                idle.value = false
            }
        })

        watch(
            () => store.state.currentStep,
            () => {
                setTimeout(async () => {
                    await store.dispatch('surveyResults/getUuidResults', {
                        surveyId: surveySlug,
                        uuid: window.localStorage.getItem('surveyUuid'),
                    })
                    let surveySteps =
                        store.state.surveyResults.surveyUuidResults.steps
                    let currentStepId = await store.state.surveyResults
                        .surveyUuidResults.survey.statusByUuid.currentStep
                    currentStep.value = surveySteps.find(
                        (x) => x.id === currentStepId,
                    )
                }, 500)
            },
        )

        return {
            idle,
            surveyStep,
            store,
            userLang,
            router,
            route,
            backlink,
            nextSurvey,
            currentStep,
            languages,
            nextStep,
            prevStep,
        }
    },
}
</script>

<style scoped>
.survey-header-menu {
    z-index: 50;
}
</style>
