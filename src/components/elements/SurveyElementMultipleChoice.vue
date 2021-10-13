<template>
    <div>
        <h2
            class="my-5 text-gray-900"
            v-html="surveyResults.params.question[$store.state.lang]"
        ></h2>
        <div class="mt-2">
            <select-button
                v-for="(option, index) in surveyResults.params.options"
                :key="'selection-button-' + index"
                :selected="selectedOptions.includes(option.value)"
                :disabled="disabled(option.value)"
                :value="option.value"
                :label="option.labels[store.state.lang]"
                @selected="changeValue"
            />
        </div>
        <p class="text-gray-700">
            mind. {{ surveyResults.params.minSelectable }} auswählen
        </p>
        <p class="text-gray-700">
            max. {{ surveyResults.params.maxSelectable }} auswählen
        </p>
        <!--        Selected Answers :{{ selectedOptions }}-->
        <confirm-button></confirm-button>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import SelectButton from '../subelements/SelectButton.vue'
import ConfirmButton from '../subelements/ConfirmButton.vue'
export default {
    name: 'SurveyElementMultipleChoice',
    components: { SelectButton, ConfirmButton },
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

        onMounted(() => {
            /*
            let questionResults = props.surveyResults
            if (questionResults.results.length) {
                selectedOptions.value =
                    questionResults.results.pop().result_value.selected
            } else {
                selectedOptions.value =
                    questionResults.results.pop().result_value.selected
            }
            */
        })

        return {
            store,
            selectedOptions,
            resultBasedNextSteps,
            handleAnswer,
            handleResults,
        }
    },
    methods: {
        changeValue(value) {
            console.log(value)
            if (
                1 === parseInt(this.surveyResults.params.minSelectable) &&
                1 === parseInt(this.surveyResults.params.maxSelectable)
            ) {
                console.log('min & max = 1')
                if (this.selectedOptions.includes(value)) {
                    this.selectedOptions = []
                } else {
                    this.selectedOptions = [value]
                }
            } else {
                const index = this.selectedOptions.indexOf(value)
                if (index < 0) {
                    this.selectedOptions.push(value)
                } else {
                    this.selectedOptions.splice(index, 1)
                }
            }
        },
        disabled(value) {
            if (
                parseInt(this.surveyResults.params.maxSelectable) > 1 &&
                this.selectedOptions.length >=
                    parseInt(this.surveyResults.params.maxSelectable) &&
                !this.selectedOptions.includes(value)
            ) {
                return true
            }
            return false
        },
    },
}
</script>

<style scoped></style>
