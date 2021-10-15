<template>
    <div class="flex flex-wrap flex-col">
        <h2 class="pb-5" v-html="content.params.question[lang]"></h2>

        <!--        // ToDo placeholder lang-->
        <textarea
            class="bg-transparent"
            cols="30"
            rows="3"
            placeholder="Klicke auf das Mikrofon zur Spracheingabe, was du sagst, wird dann in Text umgewandelt."
        ></textarea>

        <div class="flex">
            <microphone-icon
                class="h-6 w-6 inline text-blue-800"
            ></microphone-icon>
            <p>Sprache zu Text starten</p>
        </div>

        <confirm-button></confirm-button>
    </div>
</template>

<script>
import { MicrophoneIcon } from '@heroicons/vue/outline'
import ConfirmButton from '../subelements/ConfirmButton.vue'
import { computed } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    name: 'SurveyElementVoiceInput',
    components: {
        MicrophoneIcon,
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
    setup() {
        const store = useStore()
        const lang = computed({
            get: () => store.state.lang,
        })
        return {
            store,
            lang,
        }
    },
}
</script>

<style scoped></style>
