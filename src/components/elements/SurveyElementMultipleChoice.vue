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
            {{
                t('min_selectable', {
                    selectable: surveyResults.params.minSelectable,
                })
            }}
        </p>
        <p class="text-gray-700">
            {{
                t('max_selectable', {
                    selectable: surveyResults.params.maxSelectable,
                })
            }}
        </p>
        <confirm-button></confirm-button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import SelectButton from '../subelements/SelectButton.vue'
import ConfirmButton from '../subelements/ConfirmButton.vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

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
        const route = useRoute()
        const { t } = useI18n()
        // const allowSkip = ref(props.content.allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)

        const handleAnswer = (answer) => {
            console.log(answer)
        }
        const handleResults = (results) => {
            console.log(results)
            console.log(selectedOptions.value)
            if (
                props.surveyResults.params.minSelectable <=
                    selectedOptions.value.length &&
                props.surveyResults.params.maxSelectable >=
                    selectedOptions.value.length
            ) {
                store.dispatch('surveyResults/sendSurveyResults', {
                    surveyId: route.query.survey,
                    data: {
                        surveyStepId: props.content.id,
                        resultValue: {
                            selected: selectedOptions.value,
                        },
                        uuid: props.surveyResults.uuid,
                        resultLanguage: store.state.lang,
                    },
                })
            }
        }

        const getResults = (answer) => {
            let questionResults = props.surveyResults
            console.log(questionResults)

            if (questionResults.resultByUuid) {
                selectedOptions.value = questionResults.resultByUuid.selected
            } else {
                //selectedOptions.value = questionResults.resultByUuid.selected
            }
        }

        onMounted(() => {
            getResults()
        })

        return {
            t,
            store,
            route,
            selectedOptions,
            resultBasedNextSteps,
            handleAnswer,
            handleResults,
            getResults,
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
            this.handleResults()
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
