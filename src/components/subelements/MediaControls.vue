<template>
    <div
        class="media-player-controls-wrap align-items-center w-100"
        :class="{ slideout: slideout }"
    >
        <div class="media-player-controls d-flex flex-wrap">
            <div class="group-left">
                <div class="play-pause" @click="togglePlay()">
                    <span v-if="mediaIsPlaying">
                        <icon
                            class="pause-icon"
                            icon-name="Pause"
                            small
                            white
                        />
                    </span>
                    <span v-else>
                        <icon class="play-icon" icon-name="Play" small white />
                    </span>
                </div>
                <div class="timer">
                    {{ convertTime(mediaCurrentTime) }}/{{
                        convertTime(mediaDurationTime)
                    }}
                </div>
            </div>
            <div class="group-right">
                <div class="volume" @click="toggleVolume()">
                    <span v-if="volume">
                        <icon
                            class="sound-icon high"
                            icon-name="SpeakerHigh"
                            small
                            white
                        />
                    </span>
                    <span v-if="!volume">
                        <icon
                            class="sound-icon mute"
                            icon-name="SpeakerX"
                            small
                            white
                        />
                    </span>
                </div>
                <div class="lb-fullscreen" @click="closeFullscreen()">
                    <icon
                        class="fullscreen-icon"
                        icon-name="ArrowsIn"
                        small
                        white
                    />
                </div>
                <div
                    v-if="hasVideo"
                    class="fullscreen"
                    @click="openFullscreen()"
                >
                    <icon
                        class="fullscreen-icon"
                        icon-name="ArrowsOut"
                        small
                        white
                    />
                </div>
            </div>
        </div>
        <div class="media-player-progress-bar px-4">
            <ProgressBar
                v-model:current-time="mediaCurrentTime"
                :duration="mediaDurationTime"
                :bg-color="bgColor"
                @changeProgress="changeProgress"
            ></ProgressBar>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MediaControls',
}
</script>

<style scoped></style>
