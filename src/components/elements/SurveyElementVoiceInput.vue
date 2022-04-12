<template>
    <div class="flex flex-wrap flex-col">
        <h2
            tabindex="0"
            class="tabindex-focus m-1 pb-5"
            :class="
                store.state.showAnimations &&
                'animate__animated animate__fadeInDown'
            "
            v-html="content.params.question[lang]"
        ></h2>
        <custom-alert
            v-if="!isSupported"
            :title="t('error')"
            :description="t('voice_recorder_not_supported')"
            :aria-label="t('voice_recorder_not_supported')"
            color="red"
            tabindex="0"
        />
        <custom-alert
            v-else-if="!micPermission && hasPermission === 'denied'"
            :title="t('error')"
            :description="t('voice_recorder_not_allowed')"
            :aria-label="t('voice_recorder_not_allowed')"
            color="red"
            tabindex="0"
        />
        <custom-alert
            v-else-if="!micPermission && hasPermission === 'ask'"
            :title="t('error')"
            tabindex="0"
            :description="t('voice_recorder_not_allowed')"
            :aria-label="t('voice_recorder_not_allowed')"
            color="yellow"
        />
        <custom-alert
            v-else-if="!micPermission && hasPermission === 'prompt'"
            :title="t('prompt')"
            tabindex="0"
            :description="t('voice_recorder_prompt')"
            :aria-label="t('voice_recorder_prompt')"
            color="yellow"
        />
        <template v-else>
            <div
                :class="
                    store.state.showAnimations &&
                    'animate__animated animate__fadeInUp'
                "
            >
                <!--                <textarea-->
                <!--                    v-if="recordedTime < 0"-->
                <!--                    tabindex="0"-->
                <!--                    class="m-1 bg-transparent w-full text-xl focus:outline-none"-->
                <!--                    cols="30"-->
                <!--                    disabled-->
                <!--                    :placeholder="t('voice_recorder_placeholder')"-->
                <!--                ></textarea>-->
                <div
                    v-if="recordedTime < 0"
                    tabindex="0"
                    class="m-1 tabindex-focus bg-transparent w-3/4 text-gray-400 text-xl focus:outline-none"
                >
                    {{ $t('voice_recorder_placeholder') }}
                </div>

                <div
                    v-else
                    class="flex bg-transparent text-red-700 text-3xl focus:outline-none items-center"
                >
                    <div tabindex="0" class="ml-1 tabindex-focus">
                        {{ convertTime(recordedTime) }}
                        <p class="text-xs">(max {{ maxRecordingTime }}s)</p>
                    </div>
                    <audio
                        v-if="audioData"
                        id="player"
                        class="ml-5 my-0 py-0 tabindex-focus"
                        preload="auto"
                        :src="audioData"
                        type="audio/wav"
                        controls
                    ></audio>
                </div>
                <div class="flex ml-1">
                    <button
                        type="button"
                        tabindex="0"
                        class="confirm flex items-center rounded-xl nav-button p-2 mt-5 bg-gray-200 tabindex-focus"
                        :class="[
                            { 'bg-red-600 text-white-900': recording },
                            { 'text-gray-900': !recording },
                        ]"
                        @click="toggleRecording"
                    >
                        <div class="p-2">
                            <microphone-icon
                                v-if="!recording"
                                class="h-6 w-6 inline text-blue-800"
                            />
                            <stop-icon
                                v-else
                                class="h-6 w-6 inline text-white"
                            />
                        </div>
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
                        class="confirm flex items-center rounded-xl nav-button p-2 mt-5 ml-4 bg-gray-200 tabindex-focus"
                        @click="deleteAudio"
                    >
                        <trash-icon class="h-6 w-6 mr-2 inline text-grey-600" />
                        {{ t('action_delete') }}
                    </button>
                </div>
            </div>
            <InfoModal
                :open-modal="modalboxOpen"
                type="audio"
                @close-swipe-modal="closeModal"
            ></InfoModal>
        </template>
        <confirm-button
            :class="
                store.state.showAnimations &&
                'animate__animated animate__fadeIn animate__delay-1s'
            "
            :disabled="recording"
            @confirm="nextStep"
        />

        <AudioRecorder
            :recording="recording"
            @send-audio-asset="sendAudioAsset"
        ></AudioRecorder>
    </div>
</template>

<script>
import { MicrophoneIcon, TrashIcon, StopIcon } from '@heroicons/vue/solid'
import ConfirmButton from '../subelements/ConfirmButton.vue'

import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'
import AudioRecorder from '../subelements/AudioRecorder.vue'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import CustomAlert from '../subelements/CustomAlert.vue'
import InfoModal from '../subelements/InfoModal.vue'

export default {
    name: 'SurveyElementVoiceInput',
    components: {
        CustomAlert,
        MicrophoneIcon,
        ConfirmButton,
        AudioRecorder,
        TrashIcon,
        StopIcon,
        InfoModal,
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
        const maxRecordingTime = ref(59)
        const recordedTime = ref(-1)
        const timer = ref()
        const micPermission = ref(false)
        const isSupported = ref(false)
        const hasPermission = ref('ask')
        const modalboxOpen = ref()

        const lang = computed({
            get: () => store.state.lang,
        })

        const openModal = () => {
            modalboxOpen.value = true
        }
        const closeModal = () => {
            modalboxOpen.value = false
            window.localStorage.setItem('surveyVoiceRecording', 'confirmed')
        }

        const convertTime = (duration) => {
            let minutes = Math.floor(duration / 60)
            minutes = minutes < 10 ? '0' + minutes : minutes
            let seconds = Math.round(duration - minutes * 60)
            seconds = seconds < 10 ? '0' + seconds : seconds
            return minutes + ':' + seconds
        }

        const deleteAudio = () => {
            audioData.value = null
            recordedTime.value = -1
        }

        const nextStep = async () => {
            await store.dispatch('setStepAnswering', true)
            setResult()
            if (props.subElement) {
                await store.dispatch('setCurrentVideoStep')
            } else {
                await store.dispatch('setCurrentStep')
            }
        }

        const setResult = async () => {
            const surveySlug = route.query.survey || ''

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
        }

        const toggleRecording = () => {
            if (micPermission.value) {
                recording.value = !recording.value
                if (recording.value) {
                    recordedTime.value = 0
                    audioData.value = ''
                    timer.value = setInterval(() => {
                        if (recordedTime.value < maxRecordingTime.value) {
                            recordedTime.value++
                        } else {
                            stopRecording()
                        }
                    }, 1000)
                } else {
                    clearInterval(timer.value)
                }
            }
        }
        const stopRecording = () => {
            clearInterval(timer.value)
            recording.value = !recording.value
        }
        const sendAudioAsset = (data) => {
            console.log(data)
            audioData.value = data
        }

        const askForMicrophonePermission = () => {
            if (
                !navigator.mediaDevices &&
                !navigator.mediaDevices.getUserMedia
            ) {
                isSupported.value = false
                return
            } else {
                isSupported.value = true
            }

            if (navigator.permissions) {
                navigator.permissions
                    .query({ name: 'microphone' })
                    .then(function (permissionStatus) {
                        hasPermission.value = permissionStatus.state
                        permissionStatus.onchange = function () {
                            hasPermission.value = this.state
                        }
                    })
            }

            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(function () {
                    micPermission.value = true
                })
                .catch(function () {
                    micPermission.value = false
                })
        }

        onMounted(() => {
            store.dispatch('setStepAnswering', true)
            // let questionResults = props.surveyResults
            // console.log(questionResults)
            askForMicrophonePermission()
            setTimeout(() => {
                document.querySelector('h2').focus()
            }, 500)

            modalboxOpen.value =
                window.localStorage.getItem('surveyVoiceRecording') !==
                'confirmed'
        })

        return {
            store,
            lang,
            t,
            timer,
            recording,
            audioData,
            recordedTime,
            maxRecordingTime,
            nextStep,
            toggleRecording,
            convertTime,
            deleteAudio,
            askForMicrophonePermission,
            micPermission,
            isSupported,
            hasPermission,
            sendAudioAsset,
            setResult,
            modalboxOpen,
            openModal,
            closeModal,
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
