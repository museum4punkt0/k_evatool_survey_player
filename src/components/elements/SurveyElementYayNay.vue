<template>
    <div
        class="flex pt-24 pb-16 my-5 flex-wrap justify-center items-center w-full h-10/12"
    >
        <h2
            class="tabindex-focus pb-5"
            :class="
                store.state.showAnimations &&
                'animate__animated animate__fadeInDown'
            "
            tabindex="0"
            v-html="content.params.question[lang]"
        ></h2>
        <SwipeAnswer
            :answer="answer"
            :images="content.params.assets"
            :content="content"
            :survey-results="surveyResults"
            @dragged-threshold="setResult"
            @current-element="checkForLastElement"
        ></SwipeAnswer>

        <div class="flex flex-wrap flex-col">
            <div class="inline flex mt-5">
                <button
                    type="button"
                    class="confirm flex items-center rounded-md nav-button p-2 pr-5 mt-5 mr-3 text-white tabindex-focus"
                    :class="!isLastCard ? 'bg-blue-900' : 'bg-gray-400'"
                    :disabled="isLastCard"
                    @click.prevent.stop="setAnswer(0)"
                >
                    <x-circle-icon
                        class="h-8 w-8 mr-3 inline text-white"
                    ></x-circle-icon>

                    {{ t('action_no') }}
                </button>
                <button
                    type="button"
                    class="confirm flex items-center rounded-md nav-button p-2 pr-5 mt-5 ml-3 text-white tabindex-focus"
                    :class="!isLastCard ? 'bg-blue-900' : 'bg-gray-400'"
                    :disabled="isLastCard"
                    @click.prevent.stop="setAnswer(1)"
                >
                    <check-circle-icon
                        class="h-8 w-8 mr-3 inline text-white"
                    ></check-circle-icon>
                    {{ t('action_yes') }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import SwipeAnswer from '../subelements/SwipeAnswer.vue'
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/outline'
import { useRoute } from 'vue-router'
import ConfirmButton from '../subelements/ConfirmButton.vue'
import { useI18n } from 'vue-i18n'

export default {
    name: 'SurveyElementYayNay',
    components: { SwipeAnswer, XCircleIcon, CheckCircleIcon, ConfirmButton },
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
        subElement: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const store = useStore()
        const route = useRoute()
        const { t } = useI18n()

        const isLastCard = ref()
        // console.log(props.surveyResults)
        const lang = computed({
            get: () => store.state.lang,
        })

        const answer = ref(null)

        const setAnswer = (answerValue) => {
            answer.value = answerValue
            setTimeout(() => {
                answer.value = null
            }, 500)
        }
        const results = ref([])
        const setResult = async (res) => {
            results.value.push(res)
            await store.dispatch('setStepAnswering', true)

            await store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.survey,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        images: results.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguage: store.state.lang,
                },
            })
        }

        const checkForLastElement = (current) => {
            isLastCard.value = current === props.content.params.assets.length
            if (isLastCard.value) {
                setTimeout(() => {
                    nextStep()
                }, 1000)
            }
        }

        const nextStep = () => {
            store.dispatch('setCurrentStep')
        }

        onMounted(() => {
            setTimeout(() => {
                document.querySelector('h2').focus()
            }, 500)
        })

        return {
            t,
            lang,
            store,
            results,
            answer,
            isLastCard,
            setAnswer,
            setResult,
            nextStep,
            checkForLastElement,
        }
    },
}
</script>

<style scoped></style>
