<template>
    <h2
        class="pb-5 animate__animated animate__fadeInDown"
        v-html="content.params.question[lang]"
    ></h2>
    <!--    {{ content.params }}-->
    <textarea
        v-model="text"
        class="
            bg-gray-50
            w-full
            text-gray-800 text-2xl
            p-2
            animate__animated animate__fadeInUp
        "
        :placeholder="t('write_comment_placeholder')"
        @change="inputText"
    />

    <confirm-button
        class="animate__animated animate__fadeIn animate__delay-1s"
        :sub-element="subElement"
        :disabled="!text"
        @confirm="nextStep"
    ></confirm-button>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { CheckCircleIcon } from '@heroicons/vue/outline'
import ConfirmButton from '../subelements/ConfirmButton.vue'

export default {
    name: 'SurveyElementTextInput',

    components: { CheckCircleIcon, ConfirmButton },
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
        const text = ref()
        const store = useStore()
        const route = useRoute()
        const { t } = useI18n()

        const lang = computed({
            get: () => store.state.lang,
        })

        const inputText = () => {
            console.log(text.value)
            store.dispatch('setStepAnswering', true)
        }
        const nextStep = async () => {
            console.log(text.value)
            await store.dispatch('setStepAnswering', true)
            await store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.survey,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        text: text.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguage: store.state.lang,
                },
            })
            await store.dispatch('setCurrentStep')
        }
        console.log(props)

        const getResults = () => {
            let questionResults = props.surveyResults

            if (questionResults.resultByUuid) {
                text.value = questionResults.resultByUuid.text
                store.dispatch('setStepAnswering', true)
            } else {
                store.dispatch('setStepAnswering', false)
                //selectedOptions.value = questionResults.resultByUuid.selected
            }
        }
        onMounted(() => {
            getResults()
        })

        return {
            t,
            lang,
            text,
            store,
            route,
            inputText,
            nextStep,
            getResults,
        }
    },
}
</script>

<style scoped>
textarea {
    resize: none;
}
</style>
