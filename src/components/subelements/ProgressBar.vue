<template>
    <div class="d-flex flex-column w-100 progressbar-wrap">
        <div ref="progressbar" class="progress-bar position-relative mb-3">
            <input
                type="range"
                step="any"
                class="progress seekbar shadow animated bg-blue-200"
                min="0"
                :max="duration"
                :value="currentTime"
                @change="changeTheTime()"
                @input="changeTheTime()"
            />
            <div
                v-for="(step, index) in interactiveSteps"
                :key="'step-' + index"
                :style="setInteractiveStep(step)"
                class="interactive-step"
                @click="showContent(index, 'question')"
            >
                <span></span>
            </div>
            <div
                v-for="(comment, index) in comments"
                :key="'comment-' + index"
                :style="setComments(comment.time)"
                class="comment"
                @click="showContent(index, 'comment')"
            >
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, watch } from 'vue'
import { ref } from 'vue'

export default {
    name: 'ProgressBar',
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
        interactiveSteps: {
            type: Array,
            default: null,
        },
        comments: {
            type: Object,
            default: null,
        },
    },
    emits: ['changeProgress', 'addComment'],
    setup(props, { emit }) {
        const moving = ref(false)
        const seekbar = ref()

        // const mediaCurrentTime = props.currentTime
        // const mediaDuration = props.duration
        //
        // const changeProgress = (seekToValue) => {
        //     console.log(seekToValue)
        //
        //     // this.$refs.mediaPlayer.pause()
        //     // this.mediaCurrentTime = parseInt(seekToValue)
        //     // this.mediaPlayer.currentTime = seekToValue
        //     // if (this.mediaIsPlaying) {
        //     //     this.mediaPlayer.play()
        //     // }
        // }
        // const seekbarMin = ref(0)
        // const seekbarMax = ref(0)

        // const seekbar = ref()

        const showContent = (content) => {
            console.log(content)
            emit('jumpToItem', content)
        }

        const changeTheTime = (seekToValue) => {
            // seekbar.value = (props.duration * props.seekbar) / props.seekbar.max
            //

            // seekbar.value = (props.duration * seekbar.value) / props.duration

            // console.log(seekToValue)
            // console.log(seekbar.value.value)
            // emit('addComment', parseFloat(props.currentTime))
            emit('changeProgress', parseFloat(seekbar.value.value))
            // console.log(props.currentTime)
            // console.log(props.duration)
            // console.log((props.currentTime / props.duration) * 100)
            document.documentElement.style.setProperty(
                '--videoProgress',
                `${(props.currentTime / props.duration) * 100}%`,
            )
        }

        const setInteractiveStep = (second) => {
            return 'left:' + (second / props.duration) * 100 + '%'
        }

        const setComments = (second) => {
            return 'left:' + (second / props.duration) * 100 + '%'
        }

        onMounted(() => {
            seekbar.value = document.querySelectorAll('.seekbar')[0]

            document.documentElement.style.setProperty(
                '--videoProgress',
                `${(props.currentTime / props.duration) * 100}%`,
            )
        })

        watch(
            () => props.currentTime,
            (value) => {
                seekbar.value.value = value
                // console.log(value)
                document.documentElement.style.setProperty(
                    '--videoProgress',
                    `${(props.currentTime / props.duration) * 100}%`,
                )
            },
        )
        return {
            moving,
            seekbar,
            // seekbarMin,
            // seekbarMax,
            // mediaCurrentTime,
            // mediaDuration,
            changeTheTime,
            setInteractiveStep,
            setComments,
            // changeProgress,
            showContent,
        }
    },
}
</script>

<style lang="scss">
:root {
    --videoProgress: 0%;
    --sliderThumbColor: #76a9fa;
    --sliderProgressColor: #76a9fa;
}

.progress-bar {
    width: 100%;
    overflow: visible;
    display: block;
    background-color: transparent;
    height: 20px;

    .animated {
        transition: all 0.3s linear;
    }

    #seekbar {
        z-index: 99999;
        transition: 0.5s all;
    }

    .progress {
        height: 16px;
        appearance: none;
        margin: 0;
        width: 100%;
        //background-color: rgba(200, 200, 200, 0.4);
        //background-color: #c3ddfd;

        &:focus {
            outline: none;

            &::-ms-fill-lower {
                background: linear-gradient(
                    to right,
                    var(--sliderProgressColor) 0%,
                    var(--sliderProgressColor) var(--videoProgress),
                    rgba(0, 0, 0, 0) var(--videoProgress),
                    rgba(0, 0, 0, 0) 100%
                );
            }

            &::-ms-fill-upper {
                background-color: transparent;
            }

            &::-webkit-slider-runnable-track {
                background: linear-gradient(
                    to right,
                    var(--sliderProgressColor) 0%,
                    var(--sliderProgressColor) var(--videoProgress),
                    rgba(0, 0, 0, 0) var(--videoProgress),
                    rgba(0, 0, 0, 0) 100%
                );
            }
        }

        &::-webkit-slider-runnable-track {
            width: 100%;
            height: 16px;
            cursor: pointer;
            //animate: 0.2s;
            background: linear-gradient(
                to right,
                var(--sliderProgressColor) 0%,
                var(--sliderProgressColor) var(--videoProgress),
                rgba(0, 0, 0, 0) var(--videoProgress),
                rgba(0, 0, 0, 0) 100%
            );
        }

        &::-webkit-slider-thumb {
            height: 16px;
            width: 0px;
            background: var(--sliderThumbColor);
            cursor: pointer;
            appearance: none;
            margin-top: 0px;
        }

        &::-moz-range-track {
            width: 100%;
            height: 5px;
            cursor: pointer;
            //animate: 0.2s;
            background: linear-gradient(
                to right,
                var(--sliderProgressColor) 0%,
                var(--sliderProgressColor) var(--videoProgress),
                rgba(0, 0, 0, 0) var(--videoProgress),
                rgba(0, 0, 0, 0) 100%
            );
        }

        &::-moz-range-thumb {
            height: 7px;
            width: 10px;
            background: var(--sliderThumbColor);
            cursor: pointer;
        }

        &::-ms-track {
            width: 100%;
            height: 5px;
            cursor: pointer;
            //animate: 0.2s;
            background: transparent;
            border-color: transparent;
            color: transparent;
        }

        &::-ms-fill-lower {
            background: white;
            border: 0px solid #000000;
        }

        &::-ms-fill-upper {
            background-color: transparent;
            border: 0px solid #000000;
        }

        &::-ms-thumb {
            margin-top: 1px;
            height: 5px;
            width: 10px;
            background: var(--sliderThumbColor);
            cursor: pointer;
        }
    }
}

.interactive-step,
.comment {
    position: absolute;
    width: 6px;
    height: 16px;
    top: 2px;

    //#EBF5FF
}

.interactive-step {
    background-color: #1a56db;
    transform: translateX(0%);
}

.comment {
    background-color: #e5e7eb;
    transform: translateX(-50%);
}

.progress-bar {
    position: relative;
    display: inline-block;
}

.progressbar-wrap {
    position: relative;
    bottom: 0px;
    height: 20px;
}

input[type='range']::-moz-range-thumb {
    background-color: transparent !important;
    border: none;
    display: none !important;
}

input[type='range']::-webkit-progress-bar,
input[type='range']::-moz-range-progress {
    height: 100%;
    background: var(--sliderThumbColor);
}
</style>
