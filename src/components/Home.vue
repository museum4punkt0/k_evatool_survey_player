<template>
    <div class="main-page h-screen overflow-y-scroll bg-gray-100">
        <template v-if="store.state.surveyResults.surveyLoaded">
            <div class="survey-header-menu top-0 fixed w-screen z-50 bg-white">
                <header-menu
                    :languages="languages"
                    :language-names="languageNames"
                    :user-lang="userLang"
                ></header-menu>
            </div>

            <IdleScreen v-if="idle" @start="idle = false"></IdleScreen>
            <div
                v-else-if="surveyNotAvailable"
                class="survey-not-available flex items-center justify-center xl:mx-5 pt-24 pb-16 px-4 w-full h-full z-40"
            >
                <h2 tabindex="0" class="text-center">
                    {{ $t('survey_not_available') }}
                </h2>
            </div>
            <div
                v-else
                class="survey-steps xl:mx-5 pt-20 pb-12 px-4 h-full z-40"
            >
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
        </template>
        <template v-else>
            <div class="w-full h-full flex items-center justify-center">
                <h1>Umfrage nicht geladen / Survey not loaded</h1>
            </div>
        </template>
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
        const languageNames = ref()

        const surveyNotAvailable = ref(false)

        backlink.value = document.referer ? document.referer : '/'

        let queries = JSON.parse(JSON.stringify(route.query))

        if (queries && queries.demo === 'true') {
            window.localStorage.setItem('surveyDemo', true)
            store.dispatch('setIsDemo', true)
        } else {
            window.localStorage.setItem('surveyDemo', false)
            store.dispatch('setIsDemo', false)
        }

        if (queries.backlink) {
            window.localStorage.setItem('backlink', queries.backlink)
            window.localStorage.setItem('surveyBacklink', queries.backlink)

            delete queries.backlink
            router.replace({ query: queries })
        }

        backlink.value = window.history.state.back

        const surveySlug = route.query.survey || ''
        queries.survey = route.query.survey || ''
        router.replace({ query: queries })
        const userLang = ref()

        const nextSurvey = ref()

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
            nextSurvey.value = await store.state.surveys.surveySteps[
                surveyStep.value
            ]
        }

        onMounted(async () => {
            let surveyAvailable = await store.dispatch(
                'surveyResults/getUuidResults',
                {
                    surveyId: surveySlug,
                    uuid: window.localStorage.getItem('surveyUuid'),
                },
            )
            if (surveyAvailable.status === 410) {
                surveyNotAvailable.value = true
                setTimeout(() => {
                    document.querySelector('h2').focus()
                }, 1000)
            }
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

            languageNames.value =
                store.state.surveyResults.surveyUuidResults.survey.languageNames

            // set User Language
            userLang.value = localStorage.getItem('surveyUserLanguage')

            if (languages.value.indexOf(userLang.value) > -1) {
                await store.dispatch('setUserLanguage', userLang.value)
                document.documentElement.setAttribute('lang', userLang.value)
            } else {
                await store.dispatch('setUserLanguage', languages.value[0])
                document.documentElement.setAttribute(
                    'lang',
                    languages.value[0],
                )
                localStorage.setItem('surveyUserLanguage', languages.value[0])
                userLang.value = languages.value[0]
            }

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
                    currentStep.value = await surveySteps.find(
                        (x) => x.id === currentStepId,
                    )
                }, 300)
            },
        )

        watch(
            () => store.state.lang,
            (val) => {
                document.documentElement.setAttribute('lang', val)
                localStorage.setItem('surveyUserLanguage', val)
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
            languageNames,
            surveyNotAvailable,
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

.survey-steps {
    scrollbar-width: none;
}

.survey-not-available h1 {
    white-space: pre-line;
}
</style>
