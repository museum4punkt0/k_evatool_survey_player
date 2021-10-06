<template>
    <p class="pb-5">
        {{ content.params.text[lang] }}
    </p>
    <textarea
        v-model="simpleText"
        class="bg-transparent text-gray-800 w-3/12 text-2xl"
        placeholder="Schreibe einen Kommentar..."
    />

    <div class="flex justify-self-start">
        <button
            type="button"
            class="
                confirm
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
            @click="setRating(rating)"
        >
            <check-circle-icon class="h-6 w-6 mr-3 text-white" />
            Eingabe bestätigen
        </button>
    </div>
</template>

<script>
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { CheckCircleIcon } from '@heroicons/vue/outline'

export default {
    name: 'SurveyElementSimpleText',
    components: { CheckCircleIcon },
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
