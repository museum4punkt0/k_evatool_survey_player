<template>
    <h2
        class="pb-5 animate__animated animate__fadeInDown"
        v-html="content.params.question[lang]"
    ></h2>
    <div>
        <label
            class="
                pl-3
                flex
                items-center
                rounded-md
                nav-button
                p-2
                pr-3
                mt-5
                text-white
                focus:outline-none
                animate__animated animate__fadeInUp
            "
            :class="
                selectedAnswer === content.params.trueValue
                    ? 'bg-blue-700'
                    : 'bg-blue-400'
            "
            :for="'answer-1'"
        >
            <input
                :id="'answer-1'"
                v-model="selectedAnswer"
                type="radio"
                class="invisible appearance-none"
                :value="content.params.trueValue"
            />
            <!--            @change="handleAnswer(content.params.trueValue)"-->
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
                pr-3
                mt-5
                bg-blue-700
                text-white
                focus:outline-none
                animate__animated animate__fadeInUp
            "
            :class="
                selectedAnswer === content.params.falseValue
                    ? 'bg-blue-700'
                    : 'bg-blue-400'
            "
            :for="'answer-2'"
        >
            <input
                :id="'answer-2'"
                v-model="selectedAnswer"
                type="radio"
                class="invisible appearance-none"
                :value="content.params.falseValue"
            />
            <!--            @change="handleAnswer(content.params.falseValue)"-->
            <arrow-circle-right-icon class="h-6 w-6 mr-3 text-white" />
            <span v-html="content.params.falseLabel[lang]"></span>
        </label>
    </div>
    <confirm-button
        class="animate__animated animate__fadeIn animate__delay-1s"
        :sub-element="subElement"
        @confirm="confirm"
    ></confirm-button>
</template>

<script>
import { computed, ref, watch } from 'vue'
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
        subElement: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const selectedAnswer = ref()
        const store = useStore()
        const route = useRoute()
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)
        const lang = computed({
            get: () => store.state.lang,
        })
        const handleAnswer = () => {
            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.survey,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        value: selectedAnswer.value,
                    },

                    uuid: props.surveyResults.uuid,
                    resultLanguage: store.state.lang,
                },
            })
        }
        const handleResults = () => {
            // console.log(results)
            // console.log(resultBasedNextSteps)
        }

        watch(
            () => selectedAnswer.value,
            () => {
                store.dispatch('setStepAnswering', true)
            },
        )

        onMounted(() => {
            // let questionResults = props.surveyResults
        })

        const confirm = () => {
            handleAnswer()
            store.dispatch('setCurrentStep')
        }

        return {
            store,
            route,
            lang,
            selectedAnswer,
            resultBasedNextSteps,
            handleAnswer,
            handleResults,
            confirm,
        }
    },
}
</script>

<style scoped>
input {
}
</style>
