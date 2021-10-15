<template>
    <div class="flex flex-wrap flex-col items-center w-full h-6/12">
        <!--        class="-->
        <!--            binary-question-element-->
        <!--            flex flex-wrap flex-col-->
        <!--            h-30-->
        <!--            mt-16-->
        <!--            justify-center-->
        <!--            items-center-->
        <!--        "-->
        <!--    >-->
        <h2 class="pb-5" v-html="content.params.question[lang]"></h2>
        <SwipeAnswer
            :answer="answer"
            :images="content.params.assets"
            @draggedThreshold="setResult"
        ></SwipeAnswer>
        <div>1/{{ content.params.assets.length }} Karten eingestuft</div>
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
                Nein
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
                Ja
            </button>
        </div>

        <button
            type="button"
            class="
                confirm
                flex
                items-center
                rounded-md
                nav-button
                p-2
                mt-5
                bg-blue-700
                text-white
            "
            @click="confirm"
        >
            <check-circle-icon class="h-6 w-6 mr-3 text-white" />
            Eingabe bestätigen
        </button>
    </div>
</template>

<script>
import SwipeAnswer from '../subelements/SwipeAnswer.vue'
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'

import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/outline'
import { useRoute } from 'vue-router'

export default {
    name: 'SurveyElementYayNay',
    components: { SwipeAnswer, XCircleIcon, CheckCircleIcon },
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
                surveyId: route.query.id,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        images: results.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguage: 'de',
                    // props.surveyResults.sampleResultPayload.resultData
                    //     .languageId,
                },
            })
        }

        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults)
            if (questionResults.results.length) {
                //     results.value = questionResults.results.pop().result_value.value
            }
        })
        return {
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
