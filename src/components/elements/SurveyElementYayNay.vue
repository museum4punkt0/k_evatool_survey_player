<template>
    <div
        class="
            binary-question-element
            flex flex-wrap flex-col
            h-30
            mt-16
            justify-center
            items-center
        "
    >
        <p class="pb-5">
            {{ content.params.question[lang] }}
        </p>
        <p v-if="result">Answered: {{ result }}</p>
        <SwipeAnswer @draggedThreshold="setResult"></SwipeAnswer>
        <div>0/3 Karten eingestuft</div>
        <div class="inline-block mt-5">
            <x-circle-icon
                class="h-8 w-8 mr-3 inline text-red-700"
            ></x-circle-icon>
            <check-circle-icon
                class="h-8 w-8 ml-3 inline text-blue-700"
            ></check-circle-icon>
        </div>
    </div>
</template>

<script>
import SwipeAnswer from '../subelements/SwipeAnswer.vue'
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'

import { XCircleIcon, CheckCircleIcon } from '@heroicons/vue/outline'

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
        const result = ref(0)
        const store = useStore()
        console.log(props.surveyResults)
        const lang = computed({
            get: () => store.state.lang,
        })
        const setResult = (res) => {
            if (res) {
                result.value = props.surveyResults.params.trueValue
            } else {
                result.value = props.surveyResults.params.falseValue
            }
            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: props.content.surveyId,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        value: result.value,
                    },
                    uuid: props.surveyResults.uuid,
                    languageId:
                        props.surveyResults.sampleResultPayload.resultData
                            .languageId,
                },
            })
        }

        onMounted(() => {
            let questionResults = props.surveyResults
            if (questionResults.results.length) {
                result.value = questionResults.results.pop().result_value.value
            }
        })
        return {
            lang,
            result,
            store,
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
