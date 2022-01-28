<template>
    <div class="p-2">
        <h2
            class="
                tabindex-focus
                my-5
                m-1
                text-gray-900
                animate__animated animate__fadeInDown
            "
            tabindex="0"
            v-html="surveyResults.params.question[store.state.lang]"
        ></h2>
        <div class="mt-2">
            <template
                v-for="(option, index) in surveyResults.params.options"
                :key="'selection-button-' + index"
            >
                <select-button
                    :selected="
                        selectedOptions.findIndex(
                            (x) => x.value === option.value,
                        ) >= 0
                    "
                    :disabled="disabled(option.value)"
                    :value="option.value"
                    :label="option.labels[store.state.lang]"
                    class="animate__animated animate__fadeInUp"
                    @selected="changeValue(option)"
                />

                <div
                    v-if="
                        selectedOptions.findIndex(
                            (x) => x.value === option.value,
                        ) >= 0 && option.commentable
                    "
                >
                    <input
                        v-model="option.comment"
                        type="text"
                        class="
                            w-full
                            border-2 border-blue-600 border-black
                            rounded-lg
                            text-gray-900
                            py-2
                            px-7
                            bg-white
                            rounded-xl
                            mb-3
                            ml-1
                            tabindex-focus
                        "
                        tabindex="0"
                        :placeholder="t('write_comment_placeholder')"
                        @input="changeComment(option)"
                    />
                </div>
            </template>
        </div>
        <p
            class="
                ml-1
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
                ml-1
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
            @confirm="nextStep"
        ></confirm-button>
    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import SelectButton from '../subelements/SelectButton.vue'
import ConfirmButton from '../subelements/ConfirmButton.vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { debounce } from 'lodash'

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

        const setResults = async () => {
            if (
                props.surveyResults.params.minSelectable <=
                    selectedOptions.value.length &&
                props.surveyResults.params.maxSelectable >=
                    selectedOptions.value.length
            ) {
                await store.dispatch('setStepAnswering', true)
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
            } else {
                await store.dispatch('setStepAnswering', false)
            }
        }

        const getResults = () => {
            let questionResults = props.surveyResults

            if (questionResults.resultByUuid) {
                selectedOptions.value = questionResults.resultByUuid.selected
                store.dispatch('setStepAnswering', true)
            } else {
                store.dispatch('setStepAnswering', false)
                //selectedOptions.value = questionResults.resultByUuid.selected
            }
        }

        const nextStep = async () => {
            await store.dispatch('setCurrentStep')
        }

        const changeValue = (value) => {
            if (
                1 === parseInt(props.surveyResults.params.minSelectable) &&
                1 === parseInt(props.surveyResults.params.maxSelectable)
            ) {
                if (
                    selectedOptions.value.findIndex(
                        (x) => x.value === value.value,
                    ) >= 0
                ) {
                    selectedOptions.value = []
                    //delete value.comment
                } else {
                    if (value.comment) {
                        selectedOptions.value = [
                            { value: value.value, comment: value.comment },
                        ]
                    } else {
                        selectedOptions.value = [{ value: value.value }]
                    }
                }
            } else {
                const index = selectedOptions.value.findIndex(
                    (x) => x.value === value.value,
                )
                if (index < 0) {
                    if (value.comment) {
                        selectedOptions.value.push({
                            value: value.value,
                            comment: value.comment,
                        })
                    } else {
                        selectedOptions.value.push({ value: value.value })
                    }
                } else {
                    selectedOptions.value.splice(index, 1)
                }
            }
            setResults()
        }

        const changeComment = debounce(async (value) => {
            const index = selectedOptions.value.findIndex(
                (x) => x.value === value.value,
            )
            if (index >= 0) {
                selectedOptions.value[index].comment = value.comment
            }

            await setResults()
        }, 1000)

        onMounted(() => {
            getResults()
            document.querySelector('h2').focus()
        })

        return {
            t,
            store,
            route,
            selectedOptions,
            resultBasedNextSteps,
            setResults,
            getResults,
            nextStep,
            changeComment,
            changeValue,
        }
    },
    methods: {
        disabled(value) {
            // console.log(this.selectedOptions)
            // console.log(value)
            // console.log(this.selectedOptions.find((x) => x.value === value))
            return (
                parseInt(this.surveyResults.params.maxSelectable) > 1 &&
                this.selectedOptions.length >=
                    parseInt(this.surveyResults.params.maxSelectable) &&
                this.selectedOptions.findIndex((x) => x.value === value) < 0
            )
        },
    },
}
</script>

<style scoped></style>
