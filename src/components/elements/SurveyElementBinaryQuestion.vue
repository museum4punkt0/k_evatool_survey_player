<template>
    <div class="binary-question-element mx-auto">
        <p>SurveyElementBinaryQuestion</p>

        {{ surveyResults.params.question }}
        <div>
            <label class="pl-3" :for="'answer-' + index">
                <input
                    :id="'answer-' + index"
                    v-model="selectedAnswer"
                    type="radio"
                    :value="surveyResults.params.trueValue"
                    @change="handleAnswer(surveyResults.params.trueValue)"
                />
                {{ surveyResults.params.trueLabel[$store.state.lang] }}
            </label>
            <label class="pl-3" :for="'answer-' + index">
                <input
                    :id="'answer-' + index"
                    v-model="selectedAnswer"
                    type="radio"
                    :value="surveyResults.params.trueValue"
                    @change="handleAnswer(surveyResults.params.trueValue)"
                />
                {{ surveyResults.params.trueLabel[$store.state.lang] }}
            </label>
        </div>
        <br />
        Selected Answer: {{ selectedAnswer }}
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    name: 'SurveyElementBinaryQuestion',
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
        const selectedAnswer = ref()
        const store = useStore()
        // const allowSkip = ref(props.content.allowSkip)
        // console.log(allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)

        const handleAnswer = () => {
            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: props.content.surveyId,
                // resultLanguageId:
                //     props.surveyResults.sampleResultPayload.resultData
                //         .resultLanguageId,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        value: selectedAnswer.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguageId:
                        props.surveyResults.sampleResultPayload.resultData
                            .resultLanguageId,
                },
            })
        }
        const handleResults = (results) => {
            console.log(results)
            console.log(resultBasedNextSteps)
        }

        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults.results)
            if (questionResults.results.length) {
                selectedAnswer.value =
                    questionResults.results.pop().result_value.value
            }
        })

        // onMounted(() => {
        //     let questionResults = props.surveyResults
        //     if (questionResults.results.length) {
        //         selectedAnswer.value =
        //             questionResults.results.pop().result_value.value
        //     }
        // })
        return {
            selectedAnswer,
            resultBasedNextSteps,
            handleAnswer,
            handleResults,
        }
    },
}
</script>

<style scoped></style>
