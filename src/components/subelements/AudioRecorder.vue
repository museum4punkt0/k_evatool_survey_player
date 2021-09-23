<template>
    <div class="block">
        {{ isSupported }}

        <!--        <input type="file" accept="audio/*" capture />-->

        <!-- Voice Record Title + Button -->
        <div class="form-group row">
            <label for="Audio" class="col-2 col-form-label labelTop">
                Audio
            </label>
            <button class="mr-3" @click="getStream">getStream</button>
            <button
                id="button_record"
                type="button"
                class="btn mr-3"
                @click="startRecording()"
            >
                startRecording
            </button>
            <button
                id="button_stop"
                type="button"
                class="btn mr-3"
                @click="stopRecording()"
            >
                stopRecording
            </button>
            <div id="audio" class="audio" controls></div>
            <audio id="player" controls></audio>
        </div>
        <div
            v-if="isSupported"
            class="vue-audio-recorder"
            :class="{
                active: isRecording,
                paused: isPaused,
            }"
            @mousedown="startRecording"
            @mouseleave="stopRecording"
            @mouseup="stopRecording"
            @touchstart="startRecording"
            @touchend="stopRecording"
            @touchcancel="stopRecording"
        >
            <span></span>
        </div>
    </div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

export default {
    name: 'AudioRecorder',
    setup() {
        const isSupported = ref(false)
        const items = ref([])
        const store = useStore()
        const audioDevices = ref()
        const blobString = ref()
        const recorder = ref(null)
        const startRecording = () => {
            let device = navigator.mediaDevices.getUserMedia({ audio: true })

            device.then((stream) => {
                // use this!
                recorder.value = new MediaRecorder(stream)
                recorder.value.start()
                recorder.value.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) {
                        items.value.push(e.data)
                    }
                    if (recorder.value.state === 'inactive') {
                        let blob = new Blob(items.value, { type: 'audio/wav' })
                        const player = document.getElementById('player')
                        console.log(blob)
                        console.log(URL.createObjectURL(blob))
                        player.src = URL.createObjectURL(blob)

                        var reader = new FileReader()
                        reader.readAsDataURL(blob)
                        let base64data = null
                        reader.onloadend = () => {
                            base64data = reader.result
                            console.log(base64data)
                            blobString.value = base64data
                        }

                        getBase64(blob).then((data) => {
                            console.log(data)

                            store.dispatch(
                                'surveyResults/sendSurveyAudioAsset',
                                {
                                    surveyStepResultId: 1,
                                    audio: data,
                                },
                            )
                        })
                    }
                }
            })
        }
        const getBase64 = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => resolve(reader.result)
                reader.onerror = (error) => reject(error)
            })
        }
        const stopRecording = () => {
            recorder.value.stop()
            items.value = []
        }

        const getStream = async () => {
            var constraints = { audio: true, video: false }

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    let audio = document.getElementById('audioCapture')
                    audio.srcObject = stream

                    console.log(audio)
                    // audio.play()
                })
                .catch(function (err) {
                    console.log(err)
                })

            // let devices = await navigator.mediaDevices
            // console.log(devices)
            const stream = await navigator.mediaDevices.getUserMedia(
                constraints,
            )
            console.log(stream)
            // this.$_stream = stream
            // this.$emit('stream', stream)
            // return stream
        }
        onMounted(() => {
            if (
                !navigator.mediaDevices &&
                !navigator.mediaDevices.getUserMedia
            ) {
                // eslint-disable-next-line
                console.warn('Media Devices are not supported from your browser.')
                return
            }
            isSupported.value = true

            navigator.mediaDevices.enumerateDevices().then((devices) => {
                audioDevices.value = devices.filter(
                    (d) => d.kind === 'audioinput',
                )
            })
            console.log(audioDevices.value)
        })

        return {
            items,
            blobString,
            audioDevices,
            recorder,
            isSupported,
            getBase64,
            getStream,
            startRecording,
            stopRecording,
        }
    },
}
</script>

<style scoped></style>
