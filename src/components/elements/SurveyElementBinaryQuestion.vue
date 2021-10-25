<template>
    <h2 class="pb-5" v-html="content.params.question[lang]"></h2>
    <div>
        <label
            class="
                pl-3
                flex
                items-center
                rounded-md
                nav-button
                p-2
                mt-5
                bg-blue-700
                text-white
                focus:outline-none
            "
            :for="'answer-1'"
        >
            <input
                :id="'answer-1'"
                v-model="selectedAnswer"
                type="radio"
                class="invisible appearance-none"
                :value="content.params.trueValue"
                @change="handleAnswer(content.params.trueValue)"
            />
            <arrow-circle-right-icon class="h-6 w-6 mr-3 text-white" />
            <span v-html="content.params.trueLabel[lang]"></span>
        </label>
        <label
            class="
                pl-3
                flex
                items-center
                rounded-md
                nav-button
                p-2
                mt-5
                bg-blue-700
                text-white
                focus:outline-none
            "
            :for="'answer-2'"
        >
            <input
                :id="'answer-2'"
                v-model="selectedAnswer"
                type="radio"
                class="invisible appearance-none"
                :value="content.params.falseValue"
                @change="handleAnswer(content.params.falseValue)"
            />
            <arrow-circle-right-icon class="h-6 w-6 mr-3 text-white" />
            <span v-html="content.params.falseLabel[lang]"></span>
        </label>
    </div>
    <confirm-button></confirm-button>
</template>

<script>
import { computed, ref } from 'vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { CheckCircleIcon, ArrowCircleRightIcon } from '@heroicons/vue/outline'
import { useRoute } from 'vue-router'
import ConfirmButton from '../subelements/ConfirmButton.vue'

export default {
    name: 'SurveyElementBinaryQuestion',
    components: { CheckCircleIcon, ArrowCircleRightIcon, ConfirmButton },
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
        const selectedAnswer = ref()
        const store = useStore()
        const route = useRoute()
        // const allowSkip = ref(props.content.allowSkip)
        // console.log(allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)
        const lang = computed({
            get: () => store.state.lang,
        })
        const handleAnswer = () => {
            console.log(selectedAnswer.value)
            // store.dispatch('surveyResults/sendSurveyResults', {
            //     surveyId: route.query.id,
            //     // resultLanguageId:
            //     //     props.surveyResults.sampleResultPayload.resultData
            //     //         .resultLanguageId,
            //     data: {
            //         surveyStepId: props.content.id,
            //         resultValue: {
            //             value: selectedAnswer.value,
            //         },
            //         //         uuid: props.surveyResults.uuid,
            //         //         resultLanguageId:
            //         //             props.surveyResults.sampleResultPayload.resultData
            //         //                 .resultLanguageId,
            //     },
            // })
        }
        const handleResults = (results) => {
            console.log(results)
            console.log(resultBasedNextSteps)
        }

        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults)
            // if (questionResults.results.length) {
            //     selectedAnswer.value =
            //         questionResults.results.pop().result_value.value
            // }
        })

        // onMounted(() => {
        //     let questionResults = props.surveyResults
        //     if (questionResults.results.length) {
        //         selectedAnswer.value =
        //             questionResults.results.pop().result_value.value
        //     }
        // })
        return {
            store,
            route,
            lang,
            selectedAnswer,
            resultBasedNextSteps,
            handleAnswer,
            handleResults,
        }
    },
}
</script>

<style scoped>
input {
}
</style>
