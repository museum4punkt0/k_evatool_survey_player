<template>
    <div>
        <h2
            class="my-5 text-gray-900 animate__animated animate__fadeInDown"
            v-html="surveyResults.params.question[store.state.lang]"
        ></h2>
        <div class="mt-2">
            <select-button
                v-for="(option, index) in surveyResults.params.options"
                :key="'selection-button-' + index"
                :selected="selectedOptions.includes(option.value)"
                :disabled="disabled(option.value)"
                :value="option.value"
                :label="option.labels[store.state.lang]"
                class="animate__animated animate__fadeInUp"
                @selected="changeValue"
            />
        </div>
        <p
            class="
                text-gray-700
                animate__animated animate__fadeIn animate__delay-1s
            "
        >
            {{
                t('min_selectable', {
                    selectable: surveyResults.params.minSelectable,
                })
            }}
        </p>
        <p
            class="
                text-gray-700
                animate__animated animate__fadeIn animate__delay-1s
            "
        >
            {{
                t('max_selectable', {
                    selectable: surveyResults.params.maxSelectable,
                })
            }}
        </p>
        <confirm-button
            class="animate__animated animate__fadeIn animate__delay-1s"
            :sub-element="subElement"
            @confirm="confirm"
        ></confirm-button>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
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
        subElement: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const selectedOptions = ref([])
        const store = useStore()
        const route = useRoute()
        const { t } = useI18n()

        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)

        const handleAnswer = () => {
            // console.log(answer)
        }
        const handleResults = async () => {
            if (
                props.surveyResults.params.minSelectable <=
                    selectedOptions.value.length &&
                props.surveyResults.params.maxSelectable >=
                    selectedOptions.value.length
            ) {
                await store.dispatch('surveyResults/sendSurveyResults', {
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
                await store.dispatch('setStepAnswering', true)
            } else {
                await store.dispatch('setStepAnswering', false)
            }
        }

        const getResults = () => {
            let questionResults = props.surveyResults

            if (questionResults.resultByUuid) {
                selectedOptions.value = questionResults.resultByUuid.selected
            } else {
                //selectedOptions.value = questionResults.resultByUuid.selected
            }
        }

        onMounted(() => {
            getResults()
        })

        const confirm = () => {
            store.dispatch('setCurrentStep')
        }

        return {
            t,
            store,
            route,
            selectedOptions,
            resultBasedNextSteps,
            handleAnswer,
            handleResults,
            getResults,
            confirm,
        }
    },
    methods: {
        changeValue(value) {
            if (
                1 === parseInt(this.surveyResults.params.minSelectable) &&
                1 === parseInt(this.surveyResults.params.maxSelectable)
            ) {
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
            return (
                parseInt(this.surveyResults.params.maxSelectable) > 1 &&
                this.selectedOptions.length >=
                    parseInt(this.surveyResults.params.maxSelectable) &&
                !this.selectedOptions.includes(value)
            )
        },
    },
}
</script>

<style scoped></style>
