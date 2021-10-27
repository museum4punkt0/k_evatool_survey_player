<template>
    <div class="flex flex-wrap flex-col">
        <h2 class="pb-5" v-html="content.params.question[lang]"></h2>
        <textarea
            class="bg-transparent focus:outline-none"
            cols="30"
            rows="3"
            :placeholder="t('voice_recorder_placeholder')"
        ></textarea>

        <div class="flex">
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
                    bg-gray-200
                    text-gray-900 text-white
                "
                @click="confirm"
            >
                <microphone-icon
                    class="h-6 w-6 my-2 inline text-gray-900"
                ></microphone-icon>
                <p class="px-2">Sprache zu Text starten</p>
            </button>
        </div>
        <confirm-button></confirm-button>
    </div>
</template>

<script>
import { MicrophoneIcon } from '@heroicons/vue/outline'
import ConfirmButton from '../subelements/ConfirmButton.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
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
        const { t } = useI18n()

        const lang = computed({
            get: () => store.state.lang,
        })
        return {
            store,
            lang,
            t,
        }
    },
}
</script>

<style lang="scss" scoped>
textarea {
    box-sizing: border-box;
    resize: none;
}
</style>
