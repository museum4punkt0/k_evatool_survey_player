<template>
    <div class="multiple-choice-element mx-auto">
        <span class="text-gray-700">
            {{ content }}
            <!--            {{ surveyResults.params.question[$store.state.lang] }}-->
        </span>
        <div class="mt-2">
            <div
                v-for="(option, index) in surveyResults.params.options"
                :key="index"
            >
                <label
                    class="pl-3 inline-flex items-center"
                    :for="'answer-' + index"
                >
                    <input
                        :id="'answer-' + index"
                        v-model="selectedOptions"
                        type="checkbox"
                        class="checkbox"
                        :value="option"
                    />
                    <span class="ml-2">{{ option[$store.state.lang] }}</span>
                </label>
            </div>
        </div>
        <br />
        Selected Answers :{{ selectedOptions }}
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
    name: 'SurveyElementMultipleChoice',
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
    setup(props) {
        const selectedOptions = ref([])
        const store = useStore()
        // const allowSkip = ref(props.content.allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)

        const handleAnswer = (answer) => {
            console.log(answer)
        }
        const handleResults = (results) => {
            console.log(results)
            console.log(resultBasedNextSteps)
        }

        watch(
            () => selectedOptions.value,
            (value) => {
                console.log(value)
                store.dispatch('surveyResults/sendSurveyResults', {
                    surveyId: props.content.surveyId,
                    // resultLanguageId:
                    //     props.surveyResults.sampleResultPayload.resultData
                    //         .resultLanguageId,
                    data: {
                        surveyStepId: props.content.id,
                        resultValue: {
                            selected: selectedOptions.value,
                        },
                        uuid: props.surveyResults.uuid,
                        resultLanguageId:
                            props.surveyResults.sampleResultPayload.resultData
                                .resultLanguageId,
                    },
                })
            },
        )

        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults.results)
            if (questionResults.results.length) {
                selectedOptions.value =
                    questionResults.results.pop().result_value.selected
            }
        })

        return {
            selectedOptions,
            resultBasedNextSteps,
            handleAnswer,
            handleResults,
        }
    },
}
</script>

<style scoped></style>
