<template>
    <div>
        {{ isSupported }}

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

export default {
    name: 'AudioRecorder',
    setup() {
        const isSupported = ref(false)
        const startRecording = () => {}
        const stopRecording = () => {}
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
        })

        return {
            isSupported,
            startRecording,
            stopRecording,
        }
    },
}
</script>

<style scoped></style>
