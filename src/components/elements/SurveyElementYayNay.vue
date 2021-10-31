<template>
    <div class="flex flex-wrap justify-center items-center w-full h-6/12">
        <h2 class="pb-5" v-html="content.params.question[lang]"></h2>
        <SwipeAnswer
            :answer="answer"
            :images="content.params.assets"
            :content="content"
            :survey-results="surveyResults"
            @draggedThreshold="setResult"
        ></SwipeAnswer>
        <!--        <div>1/{{ content.params.assets.length }} Karten eingestuft</div>-->
        <div class="inline flex mt-5">
            <button
                type="button"
                class="
                    confirm
                    flex
                    items-center
                    rounded-md
                    nav-button
                    p-2
                    pr-5
                    mt-5
                    mr-3
                    bg-blue-700
                    text-white
                "
                @click.prevent.stop="setAnswer(0)"
            >
                <x-circle-icon
                    class="h-8 w-8 mr-3 inline text-white"
                ></x-circle-icon>

                {{ t('action_no') }}
            </button>
            <button
                type="button"
                class="
                    confirm
                    flex
                    items-center
                    rounded-md
                    nav-button
                    p-2
                    pr-2
                    mt-5
                    ml-3
                    bg-blue-700
                    text-white
                "
                @click.prevent.stop="setAnswer(1)"
            >
                <check-circle-icon
                    class="h-8 w-8 mr-3 inline text-white"
                ></check-circle-icon>
                {{ t('action_yes') }}
            </button>
        </div>

        <!--        <button-->
        <!--            type="button"-->
        <!--            class="-->
        <!--                confirm-->
        <!--                flex-->
        <!--                items-center-->
        <!--                rounded-md-->
        <!--                nav-button-->
        <!--                p-2-->
        <!--                mt-5-->
        <!--                bg-blue-700-->
        <!--                text-white-->
        <!--            "-->
        <!--            @click="confirm"-->
        <!--        >-->
        <!--            <check-circle-icon class="h-6 w-6 mr-3 text-white" />-->
        <!--            Eingabe bestätigen-->
        <!--        </button>-->
        <!--        <confirm-button></confirm-button>-->
    </div>
</template>

<script>
import SwipeAnswer from '../subelements/SwipeAnswer.vue'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'

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
    },
    setup(props) {
        // const result = ref(0)
        const store = useStore()
        const route = useRoute()
        const { t } = useI18n()
        console.log(props.surveyResults)
        const lang = computed({
            get: () => store.state.lang,
        })
        const answer = ref()
        const setAnswer = (ans) => {
            console.log(answer)
            answer.value = ans
            setTimeout(() => {
                answer.value = null
            }, 500)
        }
        const results = ref([])
        const setResult = (res) => {
            console.log(res)
            results.value.push(res)

            console.log(results.value)
            // if (res) {
            //     result.value = props.surveyResults.params.trueValue
            // } else {
            //     result.value = props.surveyResults.params.falseValue
            // }
            store.dispatch('surveyResults/sendSurveyResults', {
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
            store.dispatch('setCurrentStep')
        }

        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults)
            // if (questionResults.results.length) {
            //     //     results.value = questionResults.results.pop().result_value.value
            // }
        })
        return {
            t,
            lang,
            store,
            results,
            answer,
            setAnswer,
            setResult,
        }
    },
    // setup() {
    //     //throwDirection == direction.LEFT ? 'left' : 'right'
    //     return {}
    // },
}
</script>

<style scoped></style>
