<template>
    <div>
        <p>SurveyElementYayNay</p>
        <p v-if="result">Answered: {{ result }}</p>
        <SwipeAnswer @draggedThreshold="setResult"></SwipeAnswer>
    </div>
</template>

<script>
import SwipeAnswer from '../subelements/SwipeAnswer.vue'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'SurveyElementYayNay',
    components: { SwipeAnswer },
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
