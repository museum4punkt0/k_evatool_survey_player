<template>
    <div
        class="main-page h-screen overflow-y-scroll bg-gray-100"
        :style="{
            'background-image': 'url(' + surveySetting.backgroundImageUrl + ')',
        }"
    >
        <template v-if="store.state.surveyResults.surveyLoaded">
            <template v-if="store.state.surveyResults.type === 'survey'">
                <div
                    class="survey-header-menu top-0 fixed w-screen z-50 bg-white"
                >
                    <header-menu></header-menu>
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
import { ref, watch, inject, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import SurveyElementBuilder from './SurveyElementBuilder.vue'
import HeaderMenu from './HeaderMenu.vue'
import IdleScreen from './subelements/IdleScreen.vue'
import SurveyNavigation from './FooterNavigation.vue'

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
        const { t } = useI18n()

        const idleTimer = inject('idle-timer')

        const currentStep = ref()
        const idle = ref(false)
        const surveyStep = ref()
        const surveyNotAvailable = ref(false)
        const nextSurvey = ref()

        const languages = computed(() => store.getters.languages)
        const languageNames = computed(() => store.getters.languageNames)
        const userLang = computed(() => store.state.lang)

        const surveySetting = computed(
            () => store.getters['surveyResults/surveySetting'],
        )

        if (store.state.kiosk) {
            console.log('kiosk')
            idleTimer.emitter.on('idle', () => {
                window.location.reload()
            })
        }

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
            surveySetting,
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
