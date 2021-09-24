<template>
    <div class="binary-question-element mx-auto">
        <p>SurveyElementBinaryQuestion</p>

        {{ surveyResults }}
        <div v-for="(answer, index) in question.answers" :key="index">
            <input
                :id="'answer-' + index"
                v-model="selectedAnswer"
                type="radio"
                :value="answer"
                @change="handleAnswer(answer)"
            />
            <label class="pl-3" :for="'answer-' + index">{{ answer }}</label>
            <br />
        </div>
        <br />
        Selected Answer: {{ selectedAnswer }}
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    name: 'SurveyElementBinaryQuestion',
    props: {
        content: {
            type: Object,
            default: () => {},
        },
        surveyResults: {
            type: Object,
            default: () => {},
        },
    },
    setup(props, { emit }) {
        const question = ref({
            text: 'Question?',
            type: 'mc',
            answers: ['yes', 'no'],
            answer: 'yes',
        })
        const selectedAnswer = ref()
        const store = useStore()
        const allowSkip = ref(props.content.allowSkip)
        console.log(allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)

        const handleAnswer = (answer) => {
            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: props.content.surveyId,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        value: answer,
                    },
                    uuid: props.surveyResults.uuid,
                    languageId:
                        props.surveyResults.sampleResultPayload.resultData
                            .languageId,
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
            result.value = questionResults.results.pop().result_value.meaning
        })

        // onMounted(() => {
        //     let questionResults = props.surveyResults
        //     if (questionResults.results.length) {
        //         selectedAnswer.value =
        //             questionResults.results.pop().result_value.value
        //     }
        // })
        return {
            question,
            selectedAnswer,
            resultBasedNextSteps,
            handleAnswer,
            handleResults,
        }
    },
}
</script>

<style scoped></style>
