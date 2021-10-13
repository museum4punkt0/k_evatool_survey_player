<template>
    <h2 class="pb-5" v-html="content.params.text[lang]"></h2>
    <textarea
        v-model="simpleText"
        class="bg-transparent text-gray-800 w-3/12 text-2xl"
        placeholder="Schreibe einen Kommentar..."
    />

    <confirm-button></confirm-button>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { CheckCircleIcon } from '@heroicons/vue/outline'
import ConfirmButton from '../subelements/ConfirmButton.vue'

export default {
    name: 'SurveyElementSimpleText',
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
        const simpleText = ref()
        const store = useStore()
        const allowSkip = ref(props.content.allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)
        const lang = computed({
            get: () => store.state.lang,
        })
        return {
            lang,
            store,
            simpleText,
            allowSkip,
            resultBasedNextSteps,
        }
    },
}
</script>

<style scoped>
textarea {
    resize: none;
    box-sizing: border-box;
    outline: none;
}
</style>
