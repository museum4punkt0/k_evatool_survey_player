<template>
    <p>SurveyElementEmoji</p>
    DB Value: {{ result }}

    <div
        v-for="(emoji, index) in surveyResults.params.emojis"
        :key="'emoji-' + index"
    >
        <emoji-happy-icon class="h-8 w-8" @click="setResult(emoji.meaning)" />
    </div>
</template>

<script>
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/vue/outline'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'SurveyElementEmoji',
    components: {
        EmojiHappyIcon,
        EmojiSadIcon,
    },
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
        const result = ref(0)
        const store = useStore()
        const setResult = (i) => {
            console.log(i)
            result.value = i

            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: props.content.surveyId,
                // resultLanguageId:
                //     props.surveyResults.sampleResultPayload.resultData
                //         .resultLanguageId,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        meaning: result.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguageId:
                        props.surveyResults.sampleResultPayload.resultData
                            .resultLanguageId,
                },
            })
        }

        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults.results)
            // result.value = questionResults.results.pop().result_value.meaning
        })

        return {
            result,
            store,
            setResult,
        }
    },
}
</script>

<style scoped></style>
