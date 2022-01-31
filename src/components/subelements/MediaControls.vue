<template>
    <div
        class="
            media-player-controls-wrap
            items-center
            justify-center
            bg-white
            p-2
        "
    >
        <div
            class="
                media-player-controls
                flex flex-wrap
                items-start
                xl:items-center
            "
        >
            <div
                class="group-left inline xl:flex items-center float-left w-6/12"
            >
                <div
                    class="
                        play-pause
                        inline
                        float-left
                        tabindex-focus-nopadding
                    "
                    tabindex="0"
                    @click="togglePlay()"
                >
                    <span v-if="videoIsPlaying">
                        <pause-icon class="h-6 w-6 text-gray-800" />
                    </span>
                    <span v-else>
                        <play-icon class="h-6 w-6 text-gray-800" />
                    </span>
                </div>
                <div
                    tabindex="0"
                    class="
                        volume
                        inline
                        float-left
                        mx-3
                        tabindex-focus-nopadding
                    "
                    @click="toggleVolume"
                >
                    <span v-if="volume">
                        <volume-up-icon class="h-6 w-6 text-gray-800" />
                    </span>
                    <span v-if="!volume">
                        <volume-off-icon class="h-6 w-6 text-gray-800" />
                    </span>
                </div>

                <!--                    Kommentar schreiben-->
                <div class="float-left inline">
                    <button
                        tabindex="0"
                        class="
                            rounded-2xl
                            text-gray-400 text-xs
                            px-3
                            py-1
                            bg-gray-100
                            whitespace-nowrap
                            tabindex-focus-nopadding
                        "
                        @click="writeComment()"
                    >
                        <pencil-alt-icon class="h-6 w-6 inline" />
                        {{ t('write_comment') }}
                    </button>
                </div>
                <!--                <div class="text-blue-800"></div>-->
            </div>
            <div class="group-right inline-block text-right w-6/12">
                <div class="timer">
                    {{ convertTime(parseInt(currentTime)) }}/{{
                        convertTime(duration)
                    }}
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
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

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
        videoIsPlaying: {
            type: Boolean,
            default: true,
        },
    },
    emits: ['play-pause', 'toggle-comment', 'toggle-volume'],
    setup(props, { emit }) {
        const { t } = useI18n()
        const volume = ref(true)
        const togglePlay = () => {
            emit('play-pause', !props.videoIsPlaying)
        }
        const toggleVolume = () => {
            volume.value = !volume.value
            emit('toggle-volume', volume.value)
        }

        const writeComment = () => {
            if (props.videoIsPlaying) {
                emit('play-pause', false)
            }
            emit('toggle-comment', true)
        }

        const convertTime = (sec) => {
            let minutes = Math.floor(sec / 60)
            minutes = minutes < 10 ? '0' + minutes : minutes
            let seconds = Math.round(sec - minutes * 60)
            seconds = seconds < 10 ? '0' + seconds : seconds
            return minutes + ':' + seconds
        }

        return {
            t,
            volume,
            togglePlay,
            writeComment,
            convertTime,
            toggleVolume,
        }
    },
}
</script>

<style scoped></style>
