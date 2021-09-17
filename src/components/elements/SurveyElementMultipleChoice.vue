<template>
    <div class="multiple-choice-element mx-auto">
        <p>SurveyElementMultipleChoice</p>

        <div v-for="(answer, index) in question.answers" :key="index">
            <input
                :id="'answer-' + index"
                v-model="selectedAnswers"
                type="checkbox"
                :value="answer"
            />
            <label class="pl-3" :for="'answer-' + index">{{ answer }}</label>
            <br />
        </div>
        <br />
        Selected Answers :{{ selectedAnswers }}
        <br />
        {{ question }}
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'SurveyElementMultipleChoice',
    props: ['content'],
    setup(props, { emit }) {
        const question = ref({
            text: 'Question?',
            type: 'mc',
            answers: ['answer1', 'answer2', 'answer3'],
            answer: 'answer2',
        })
        const selectedAnswers = ref([])
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
            selectedAnswers,
            resultBasedNextSteps,
            handleAnswer,
            handleResults,
        }
    },
}
</script>

<style scoped></style>
