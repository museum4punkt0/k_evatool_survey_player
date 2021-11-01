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
                    <template v-if="recording">
                        {{ t('action_audio_stop_recording') }}
                    </template>
                    <template v-else>
                        {{ t('action_audio_start_recording') }}
                    </template>
                </p>
            </button>
            <button
                v-if="!recording && recordedTime > -1"
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

        <confirm-button
            :disabled="recording"
            @confirm="nextStep"
        ></confirm-button>
    </div>
</template>

<script>
import { MicrophoneIcon, TrashIcon } from '@heroicons/vue/solid'
import ConfirmButton from '../subelements/ConfirmButton.vue'

import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import AudioRecorder from '../subelements/AudioRecorder.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

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
        subElement: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const { t } = useI18n()
        const store = useStore()
        const route = useRoute()
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
            audioData.value = null

            recordedTime.value = -1
            store.dispatch('setStepAnswering', false)
        }
        const nextStep = async () => {
            if (props.subElement) {
                await store.dispatch('setCurrentVideoStep')
            } else {
                const surveySlug = route.query.survey || ''
                // await store.dispatch('surveyResults/getUuidResults', {
                //     surveyId: surveySlug,
                //     uuid: localStorage.getItem('surveyUuid'),
                // })

                await store.dispatch('surveyResults/sendSurveyResults', {
                    surveyId: surveySlug,
                    data: {
                        surveyStepId: props.content.id,
                        resultValue: {
                            audio: audioData.value,
                        },
                        uuid: props.surveyResults.uuid,
                        resultLanguage: store.state.lang,
                    },
                })

                await store.dispatch('setCurrentStep')
            }
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
                // store.dispatch('setCurrentStep')
                store.dispatch('setStepAnswering', true)
            }
        }

        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults)
            // if (questionResults.resultByUuid) {
            //     recording.value = questionResults.resultByUuid.recording
            // } else {
            //     //  text.value = questionResults.resultByUuid.text
            // }
        })

        return {
            store,
            lang,
            t,
            timer,
            recording,
            audioData,
            recordedTime,
            sendAudioAsset,
            nextStep,
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
