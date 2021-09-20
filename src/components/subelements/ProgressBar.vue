<template>
    <div class="d-flex flex-column w-100 progressbar-wrap">
        <div ref="progressbar" class="progress-bar position-relative mb-3">
            <input
                type="range"
                step="any"
                class="progress seekbar shadow animated"
                min="0"
                :max="duration"
                :value="currentTime"
                @change="changeTheTime"
                @input="changeTheTime"
            />
            <div
                v-for="step in interactiveSteps"
                :style="setInteractiveStep(step)"
                class="interactive-step"
            >
                <span></span>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, watch } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'

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
    },
    emits: ['changeProgress'],
    setup(props, { emit }) {
        const moving = ref(false)
        const seekbar = ref(null)

        // const mediaCurrentTime = props.currentTime
        // const mediaDuration = props.duration

        const changeTheTime = () => {
            // seekbar.value = (props.duration * props.seekbar) / props.seekbar.max
            //
            emit('changeProgress', parseFloat(seekbar.value))

            document.documentElement.style.setProperty(
                '--videoProgress',
                `${(props.currentTime / props.duration) * 100}%`,
            )
        }

        const setInteractiveStep = (second) => {
            return 'left:' + (second / props.duration) * 100 + '%'
        }
        onMounted(() => {
            // this.$nextTick(() => {
            seekbar.value = document.querySelectorAll('.seekbar')[0]

            seekbar.value.min = 0
            seekbar.value.max = props.duration.value

            document.documentElement.style.setProperty(
                '--videoProgress',
                `${(props.currentTime / props.duration) * 100}%`,
            )

            // document.documentElement.style.setProperty(
            //     '--sliderThumbColor',
            //     this.bgColor,
            // )
            // document.documentElement.style.setProperty(
            //     '--sliderProgressColor',
            //     this.bgColor,
            // )
            // })
        })

        watch(
            () => props.currentTime,
            (value) => {
                seekbar.value = props.currentTime.value
                console.log(value)
                document.documentElement.style.setProperty(
                    '--videoProgress',
                    `${(props.currentTime / props.duration) * 100}%`,
                )
            },
        )

        return {
            moving,
            seekbar,
            // mediaCurrentTime,
            // mediaDuration,
            changeTheTime,
            setInteractiveStep,
        }
    },
    // watch: {
    //     currentTime() {
    //         this.seekbar.value = this.currentTime
    //
    //         document.documentElement.style.setProperty(
    //             '--videoProgress',
    //             `${(this.currentTime / this.duration) * 100}%`,
    //         )
    //     },
    // },

    // methods: {
    //     changeTheTime() {
    //         this.seekbar.value =
    //             (this.duration * this.seekbar.value) / this.seekbar.max
    //
    //         this.$emit('changeProgress', parseFloat(this.seekbar.value))
    //
    //         document.documentElement.style.setProperty(
    //             '--videoProgress',
    //             `${(this.currentTime / this.duration) * 100}%`,
    //         )
    //     },
    // }
    // ,
}
</script>

<style lang="scss">
:root {
    --videoProgress: 1%;
    --sliderThumbColor: #1a56db;
    --sliderProgressColor: #1a56db;
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
        background-color: rgba(200, 200, 200, 0.4);

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
            animate: 0.2s;
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
            animate: 0.2s;
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
            animate: 0.2s;
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

.interactive-step {
    position: absolute;
    width: 6px;
    height: 16px;
    top: 2px;
    transform: translateX(50%);
    background-color: #76a9fa;

    //#EBF5FF
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
</style>
