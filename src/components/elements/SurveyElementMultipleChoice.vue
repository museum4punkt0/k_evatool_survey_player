<template>
    <span class="text-gray-700">
        {{ surveyResults.params }}
        <!--            {{ content }}-->
        <!--            {{ surveyResults.params.question[$store.state.lang] }}-->
    </span>
    <span class="text-gray-700">
        {{ surveyResults.params.maxSelectable }}
    </span>
    <span class="text-gray-700">
        {{ surveyResults.params.minSelectable }}
    </span>
    <div class="m-5 text-gray-900">
        {{ surveyResults.params.question[$store.state.lang] }}
    </div>
    <div class="mt-2">
        <select-button
            v-for="(option, index) in surveyResults.params.options"
            :key="'selection-button-' + index"
            :label="option.labels[$store.state.lang]"
        />
    </div>
    <br />
    Selected Answers :{{ selectedOptions }}
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import SelectButton from '../subelements/SelectButton.vue'

export default {
    name: 'SurveyElementMultipleChoice',
    components: { SelectButton },
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
