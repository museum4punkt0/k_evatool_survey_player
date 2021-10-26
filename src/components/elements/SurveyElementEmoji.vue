<template>
    <h2 class="pb-5" v-html="content.params.question[lang]"></h2>

    <div class="flex justify-center items-center">
        <div
            v-for="(emoji, index) in surveyResults.params.emojis"
            :key="'emoji-' + index"
            @click="setResult(emoji.meaning)"
        >
            <span class="p-5 text-3xl">{{ emoji.type }}</span>
            <!--        <emoji-happy-icon class="h-8 w-8" @click="setResult(emoji.meaning)" />-->
        </div>
    </div>
    Selected: {{ result }}

    <confirm-button></confirm-button>
</template>

<script>
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/vue/outline'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import ConfirmButton from '../subelements/ConfirmButton.vue'
import { useRoute } from 'vue-router'

export default {
    name: 'SurveyElementEmoji',
    components: {
        EmojiHappyIcon,
        EmojiSadIcon,
        ConfirmButton,
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
        const result = ref()
        const route = useRoute()
        const store = useStore()
        const setResult = (i) => {
            console.log(i)
            result.value = i

            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.id,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        meaning: result.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguage: store.state.lang,
                },
            })
        }
        const lang = computed({
            get: () => store.state.lang,
        })
        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults.results)
            // result.value = questionResults.results.pop().result_value.meaning
        })

        return {
            result,
            route,
            store,
            lang,
            setResult,
        }
    },
}
</script>

<style scoped></style>
