<template>
    <div class="multiple-choice-element mx-auto">
        <span class="text-gray-700">
            Checkboxes SurveyElementMultipleChoice
        </span>
        <div class="mt-2">
            <div v-for="(answer, index) in question.answers" :key="index">
                <label
                    class="pl-3 inline-flex items-center"
                    :for="'answer-' + index"
                >
                    <input
                        :id="'answer-' + index"
                        v-model="selectedAnswers"
                        type="checkbox"
                        class="checkbox"
                        :value="answer"
                    />
                    <span class="ml-2">{{ answer }}</span>
                </label>
            </div>
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
    props: {
        content: {
            type: Object,
            default: () => {},
        },
    },
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
