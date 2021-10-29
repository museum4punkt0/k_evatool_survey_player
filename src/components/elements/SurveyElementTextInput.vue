<template>
    <h2 class="pb-5" v-html="content.params.question[lang]"></h2>
    <!--    {{ content.params }}-->
    <textarea
        v-model="text"
        class="bg-gray-50 w-full text-gray-800 text-2xl p-2"
        :placeholder="t('write_comment_placeholder')"
        @change="inputText"
    />

    <confirm-button></confirm-button>
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
    },
    setup(props) {
        const text = ref([])
        const store = useStore()
        const route = useRoute()
        const { t } = useI18n()

        const lang = computed({
            get: () => store.state.lang,
        })

        const inputText = () => {
            console.log(text.value)

            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.survey,
                // resultLanguageId:
                //     props.surveyResults.sampleResultPayload.resultData
                //         .resultLanguageId,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        text: text.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguage: store.state.lang,
                },
            })
            store.dispatch('setCurrentStep')
        }
        console.log(props)

        onMounted(() => {
            let questionResults = props.surveyResults

            if (questionResults.resultByUuid) {
                text.value = questionResults.resultByUuid.text
            } else {
                //  text.value = questionResults.resultByUuid.text
            }
        })

        return {
            t,
            lang,
            text,
            store,
            route,
            inputText,
        }
    },
}
</script>

<style scoped>
textarea {
    resize: none;
}
</style>
