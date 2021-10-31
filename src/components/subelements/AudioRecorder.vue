<template>
    <div class="block">
        <div
            v-if="hasPermission === 'denied'"
            @click="askForMicrophonePermission"
        >
            {{ t('permissionMicrophoneDenied') }}
        </div>
        <div v-else class="flex justify-center items-center">
            <div
                v-if="isSupported"
                class="vue-audio-recorder p-2"
                :class="{ active: isRecording, paused: isPaused }"
                @mousedown="startRecording"
                @mouseleave="stopRecording"
                @mouseup="stopRecording"
                @touchstart="startRecording"
                @touchend="stopRecording"
                @touchcancel="stopRecording"
            >
                <microphone-icon
                    v-if="!recording"
                    class="h-6 w-6 inline text-blue-800"
                ></microphone-icon>
                <stop-icon v-else class="h-6 w-6 inline text-white"></stop-icon>
            </div>
            <!--            <audio id="player" type="audio/wav" controls></audio>-->
        </div>
    </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { MicrophoneIcon, StopIcon } from '@heroicons/vue/solid'

export default {
    name: 'AudioRecorder',
    components: {
        MicrophoneIcon,
        StopIcon,
    },
    props: {
        recording: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['send-audio-asset'],
    setup(props, { emit }) {
        const { t } = useI18n()
        const isSupported = ref(false)
        const hasPermission = ref('ask')
        const items = ref([])
        const audioDevices = ref()
        const blobString = ref()
        const recorder = ref(null)
        const isRecording = ref(false)
        const isPaused = ref(false)

        const askForMicrophonePermission = () => {
            return navigator.mediaDevices.getUserMedia({ audio: true })
        }

        const startRecording = () => {
            if (isRecording.value) {
                return
            }
            let device = askForMicrophonePermission()
            device.then((stream) => {
                recorder.value = new MediaRecorder(stream)
                recorder.value.start()
                isRecording.value = true
                recorder.value.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) {
                        items.value.push(e.data)
                    }
                    if (recorder.value.state === 'inactive') {
                        let blob = new Blob(items.value, { type: 'audio/wav' })
                        // const player = document.getElementById('player')
                        // console.log(blob)
                        // console.log(URL.createObjectURL(blob))
                        // player.src = URL.createObjectURL(blob)

                        var reader = new FileReader()
                        reader.readAsDataURL(blob)
                        let base64data = null
                        reader.onloadend = () => {
                            base64data = reader.result
                            // console.log(base64data)
                            blobString.value = base64data
                        }

                        getBase64(blob).then((data) => {
                            // console.log(data)
                            emit('send-audio-asset', data)
                        })
                    }
                }
            })
        }
        const stopRecording = () => {
            if (isRecording.value) {
                console.log(recorder.value)
                recorder.value.stop()
                items.value = []
                isRecording.value = false
            }
        }
        const getBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
            })
        }

        watch(
            () => props.recording,
            (value) => {
                console.log(value)
                if (value) {
                    startRecording()
                } else {
                    stopRecording()
                }
            },
        )
        onMounted(() => {
            if (
                !navigator.mediaDevices &&
                !navigator.mediaDevices.getUserMedia
            ) {
                isSupported.value = false
                // eslint-disable-next-line
            console.warn('Media Devices are not supported from your browser.')
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

            navigator.mediaDevices.enumerateDevices().then((devices) => {
                audioDevices.value = devices.filter(
                    (d) => d.kind === 'audioinput',
                )
                // console.log(audioDevices.value)
            })
        })

        return {
            t,
            items,
            blobString,
            audioDevices,
            recorder,
            isPaused,
            isRecording,
            isSupported,
            hasPermission,
            startRecording,
            stopRecording,
            askForMicrophonePermission,
        }
    },
}
</script>

<style scoped></style>
