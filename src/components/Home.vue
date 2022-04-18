<template>
    <div class="main-page h-screen overflow-y-scroll bg-gray-100">
        <template v-if="store.state.surveyResults.surveyLoaded">
            <template v-if="store.state.surveyResults.type === 'survey'">
                <div
                    class="survey-header-menu top-0 fixed w-screen z-50 bg-white"
                >
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
                        {{ t('survey_not_available') }}
                    </h2>
                </div>
                <div
                    v-else
                    class="survey-steps xl:mx-5 pt-20 pb-12 px-4 h-full z-40"
                >
                    <SurveyElementBuilder
                        v-if="
                            store.state.surveyResults.surveyUuidResults.steps
                                .length > 0
                        "
                        :content="currentStep"
                        :survey="
                            store.state.surveyResults.surveyUuidResults.survey
                        "
                        :result="currentStep"
                        :survey-results="currentStep"
                    ></SurveyElementBuilder>
                </div>

                <SurveyNavigation
                    v-if="!idle"
                    :survey-steps="
                        store.state.surveyResults.surveyUuidResults.steps.length
                    "
                    :current-step="surveyStep + 1"
                    @next-step="nextStep()"
                    @prev-step="prevStep()"
                ></SurveyNavigation>
            </template>
            <template v-if="store.state.surveyResults.type === 'step'">
                <div class="survey-steps xl:mx-5 pt-20 pb-12 px-4 h-full z-40">
                    <SurveyElementBuilder
                        v-if="store.state.surveyResults.surveyUuidResults.step"
                        :content="currentStep"
                        :survey="
                            store.state.surveyResults.surveyUuidResults.survey
                        "
                        :result="currentStep"
                        :survey-results="currentStep"
                    ></SurveyElementBuilder>
                </div>
            </template>
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
import { ref, watch, inject } from 'vue'
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

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
        const currentStep = ref()
        const idle = ref(false)
        const surveyStep = ref()
        const { t } = useI18n()
        const languages = ref()
        const languageNames = ref()
        const idleTimer = inject('idle-timer')
        const surveyNotAvailable = ref(false)

        if (store.state.kiosk) {
            console.log('kiosk')
            idleTimer.emitter.on('idle', () => {
                window.location.reload()
            })
        }

        const userLang = ref()
        const nextSurvey = ref()

        const nextStep = () => {
            surveyStep.value++
            store.dispatch('setCurrentStep')
            getNextSurvey()
        }

        const prevStep = () => {
            surveyStep.value--
            getNextSurvey()
        }

        const getNextSurvey = async () => {
            nextSurvey.value = await store.state.surveyResults.surveySteps[
                surveyStep.value
            ]
        }

        onMounted(async () => {
            // get languages
            languages.value =
                store.state.surveyResults.surveyUuidResults.survey.languages

            // get language names (for display)
            languageNames.value =
                store.state.surveyResults.surveyUuidResults.survey.languageNames

            // set user Language
            userLang.value = localStorage.getItem('surveyUserLanguage')

            // check if user language is available, if not fallback to default (first available language)
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

            // set current step for survey mode
            if (store.state.surveyResults.type === 'survey') {
                const surveySteps =
                    store.state.surveyResults.surveyUuidResults.steps
                let currentStepId =
                    store.state.surveyResults.surveyUuidResults.survey
                        .statusByUuid.currentStep
                currentStep.value = surveySteps.find(
                    (x) => x.id === currentStepId,
                )
            }

            // set current step for step mode
            if (store.state.surveyResults.type === 'step') {
                currentStep.value =
                    store.state.surveyResults.surveyUuidResults.step
            }

            if (surveyStep.value > 0) {
                idle.value = false
            }
        })

        watch(
            () => store.state.currentStep,
            () => {
                setTimeout(async () => {
                    await store.dispatch('surveyResults/getUuidResults')

                    // set current step for survey mode
                    if (store.state.surveyResults.type === 'survey') {
                        let surveySteps =
                            store.state.surveyResults.surveyUuidResults.steps
                        let currentStepId = await store.state.surveyResults
                            .surveyUuidResults.survey.statusByUuid.currentStep
                        currentStep.value = await surveySteps.find(
                            (x) => x.id === currentStepId,
                        )
                    }

                    if (store.state.surveyResults.type === 'step') {
                        currentStep.value =
                            store.state.surveyResults.surveyUuidResults.step
                    }
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
            nextSurvey,
            currentStep,
            languages,
            languageNames,
            surveyNotAvailable,
            nextStep,
            prevStep,
            t,
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
