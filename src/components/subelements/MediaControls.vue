<template>
    <div
        class="media-player-controls-wrap align-items-center w-100 bg-white p-2"
    >
        <div class="media-player-controls d-flex flex-wrap">
            <div class="group-left inline float-left w-4/12">
                <div class="play-pause inline float-left" @click="togglePlay()">
                    {{ videoIsPlaying }}
                    <span v-if="mediaIsPlaying">
                        <pause-icon class="h-6 w-6 text-gray-800" />
                    </span>
                    <span v-else>
                        <play-icon class="h-6 w-6 text-gray-800" />
                    </span>
                </div>
                <div class="volume inline float-left" @click="toggleVolume()">
                    <span v-if="volume">
                        <volume-up-icon class="h-6 w-6 text-gray-800" />
                    </span>
                    <span v-if="!volume">
                        <volume-off-icon class="h-6 w-6 text-gray-800" />
                    </span>
                </div>
                <div class="text-blue-800">
                    <pencil-alt-icon class="h-6 w-6 inline" />
                    Kommentar schreiben
                </div>
            </div>
            <div class="group-right inline-block text-center w-4/12">
                <div class="timer">
                    {{ parseInt(currentTime) }}/{{ duration }}
                </div>
            </div>
        </div>
        <!--        <div class="media-player-progress-bar px-4">-->
        <!--            <ProgressBar-->
        <!--                v-model:current-time="mediaCurrentTime"-->
        <!--                :duration="mediaDurationTime"-->
        <!--                :bg-color="bgColor"-->
        <!--                @changeProgress="changeProgress"-->
        <!--            ></ProgressBar>-->
        <!--        </div>-->
    </div>
</template>

<script>
import {
    PlayIcon,
    PauseIcon,
    PencilAltIcon,
    VolumeUpIcon,
    VolumeOffIcon,
} from '@heroicons/vue/outline'
import { ref } from '@vue/reactivity'

export default {
    name: 'MediaControls',
    components: {
        PlayIcon,
        PauseIcon,
        PencilAltIcon,
        VolumeUpIcon,
        VolumeOffIcon,
    },
    props: {
        duration: {
            type: Number,
            default: 0,
            required: true,
        },
        currentTime: {
            type: Number,
            default: 0,
            required: true,
        },
        mediaIsPlaying: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['play-pause'],
    setup(props, { emit }) {
        const volume = ref(1)
        const togglePlay = () => {
            emit('play-pause', !props.mediaIsPlaying)
        }

        return {
            volume,
            togglePlay,
        }
    },
}
</script>

<style scoped></style>
