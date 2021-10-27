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
                "
                :class="[
                    { 'bg-red-600 text-white-900': recording },
                    { 'text-gray-900': !recording },
                ]"
                @click="toggleRecording"
            >
                <!--                <microphone-icon-->
                <!--                    class="h-6 w-6 my-2 inline text-gray-900"-->
                <!--                ></microphone-icon>-->
                <AudioRecorder
                    :recording="recording"
                    @send-audio-asset="sendAudioAsset"
                ></AudioRecorder>
                <p class="px-2">Sprache zu Text starten</p>
            </button>
        </div>
        <audio
            v-if="audioData"
            id="player"
            :src="audioData"
            type="audio/wav"
            controls
        ></audio>
        <confirm-button></confirm-button>
    </div>
</template>

<script>
import { MicrophoneIcon } from '@heroicons/vue/outline'
import ConfirmButton from '../subelements/ConfirmButton.vue'

import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import AudioRecorder from '../subelements/AudioRecorder.vue'
import { computed, ref } from 'vue'
export default {
    name: 'SurveyElementVoiceInput',
    components: {
        MicrophoneIcon,
        ConfirmButton,
        AudioRecorder,
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
        const audioData = ref()
        const { t } = useI18n()
        const recording = ref()

        const lang = computed({
            get: () => store.state.lang,
        })

        const sendAudioAsset = (data) => {
            console.log(data)
            audioData.value = data
        }

        const toggleRecording = () => {
            recording.value = !recording.value
        }
        return {
            store,
            lang,
            t,
            recording,
            audioData,
            sendAudioAsset,
            toggleRecording,
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
