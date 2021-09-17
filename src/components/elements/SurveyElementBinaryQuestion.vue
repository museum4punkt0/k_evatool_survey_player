<template>
    <div class="binary-question-element mx-auto">
        <p>SurveyElementBinaryQuestion</p>
        <div v-for="(answer, index) in question.answers" :key="index">
            <input
                :id="'answer-' + index"
                v-model="selectedAnswer"
                type="radio"
                :value="answer"
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
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'SurveyElementBinaryQuestion',
    props: ['content'],
    setup(props, { emit }) {
        const question = ref({
            text: 'Question?',
            type: 'mc',
            answers: ['yes', 'no'],
            answer: 'yes',
        })
        const selectedAnswer = ref()
        const allowSkip = ref(props.content.allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)

        const handleAnswer = (answer) => {
            console.log(answer)
        }
        const handleResults = (results) => {
            console.log(results)
            console.log(resultBasedNextSteps)
        }

        onMounted(() => {
            emit('allowSkip', allowSkip)
        })

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
