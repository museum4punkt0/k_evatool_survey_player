<template>
    <div class="flex flex-wrap flex-col">
        <h2 class="pb-5" v-html="content.params.question[lang]"></h2>
        <textarea
            v-if="recordedTime < 0"
            class="bg-transparent text-red-700 text-3xl focus:outline-none"
            cols="30"
            disabled
            :placeholder="t('voice_recorder_placeholder')"
        ></textarea>

        <div
            v-else
            class="bg-transparent text-red-700 text-3xl focus:outline-none"
        >
            {{ convertTime(recordedTime) }}
        </div>
        <audio
            v-if="audioData"
            id="player"
            preload="auto"
            :src="audioData"
            type="audio/wav"
            controls
        ></audio>
        <div class="flex">
            <button
                type="button"
                class="
                    confirm
                    flex
                    items-center
                    rounded-xl
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
                <AudioRecorder
                    :recording="recording"
                    @send-audio-asset="sendAudioAsset"
                ></AudioRecorder>
                <p class="px-2" :class="{ 'text-white': recording }">
                    {{ t('action_audio_text') }}
                </p>
            </button>
            <button
                v-if="!recording && recordedTime"
                class="
                    confirm
                    flex
                    items-center
                    rounded-xl
                    nav-button
                    p-2
                    mt-5
                    ml-4
                    bg-gray-200
                "
                @click="deleteAudio"
            >
                <trash-icon class="h-6 w-6 mr-2 inline text-grey-600" />
                {{ t('action_delete') }}
            </button>
        </div>

        <confirm-button :disabled="recording"></confirm-button>
    </div>
</template>

<script>
import { MicrophoneIcon, TrashIcon } from '@heroicons/vue/solid'
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
        TrashIcon,
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
        const { t } = useI18n()
        const store = useStore()
        const audioData = ref()
        const recording = ref()
        const recordedTime = ref(-1)
        const timer = ref()

        const lang = computed({
            get: () => store.state.lang,
        })

        const sendAudioAsset = (data) => {
            console.log(data)
            audioData.value = data
        }

        const convertTime = (duration) => {
            let minutes = Math.floor(duration / 60)
            minutes = minutes < 10 ? '0' + minutes : minutes
            let seconds = Math.round(duration - minutes * 60)
            seconds = seconds < 10 ? '0' + seconds : seconds
            return minutes + ':' + seconds
        }

        const deleteAudio = () => {
            console.log('delete')
        }

        const toggleRecording = () => {
            recording.value = !recording.value

            if (recording.value) {
                recordedTime.value = 0
                timer.value = setInterval(() => {
                    recordedTime.value++
                }, 1000)
            } else {
                clearInterval(timer.value)
            }
        }
        return {
            store,
            lang,
            t,
            timer,
            recording,
            audioData,
            recordedTime,
            sendAudioAsset,
            toggleRecording,
            convertTime,
            deleteAudio,
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
