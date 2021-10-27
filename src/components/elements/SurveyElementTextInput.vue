<template>
    <h2 class="pb-5" v-html="content.params.question[lang]"></h2>
    <!--    {{ content.params }}-->
    <textarea
        v-model="text"
        class="bg-transparent text-gray-800 w-3/12 text-2xl"
        :placeholder="t('write_comment_placeholder')"
        @change="inputText"
    />
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
    name: 'SurveyElementTextInput',
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
                surveyId: route.query.id,
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
        }
        console.log(props)
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
