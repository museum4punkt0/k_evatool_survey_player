<template>
    <div
        class="
            video-element
            mx-auto
            bg-gray-200
            font-sans
            h-screen
            w-full
            flex flex-col
            justify-center
            items-center
        "
    >
        <p>SurveyElementVideo</p>
        <button @click="pauseVideo">pauseVideo</button>
        <AudioRecorder></AudioRecorder>
        <div
            id="responsiveVideoWrapper"
            class="relative mx-auto pb-fluid-video flex"
        >
            <div class="video-wrap block w-60 relative p-0 m-0">
                <video
                    ref="videoPlayer"
                    src="https://ak.picdn.net/shutterstock/videos/1060516912/preview/stock-footage-beautiful-sunlight-in-the-forest.webm"
                    muted
                    autoplay
                    class="mx-auto p-0 m-0"
                    @timeupdate="videoTimeUpdate"
                    @play="playVideo"
                ></video>
                <div
                    v-if="showQuestion"
                    class="mx-auto question bg-white p-4 absolute top-0"
                >
                    <!--            {{ store.state.surveys.surveyStep }}-->

                    <h3>Question: {{ answeredSteps }}</h3>
                    <h3>
                        StopsVideo:
                        {{ timeBasedSteps[answeredSteps - 1].stopsVideo }}
                    </h3>
                    <ul>
                        <li>
                            <button @click="setAnswer(1)">antwort 1</button>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <button @click="setAnswer(2)">antwort 2</button>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <button @click="setAnswer(3)">antwort 3</button>
                        </li>
                    </ul>
                </div>
                <ProgressBar
                    :current-time="mediaCurrentTime"
                    :duration="mediaDurationTime"
                    :interactive-steps="interactiveSteps"
                ></ProgressBar>

                <div class="w-50 comment-field relative">
                    <input type="text" placeholder="text" />
                </div>
            </div>
            <div class="sidebar w-40 mx-4">
                <TimeLine :interactive-steps="interactiveSteps"></TimeLine>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, toRefs } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

import AudioRecorder from '../subelements/AudioRecorder.vue'
import ProgressBar from '../subelements/ProgressBar.vue'
import TimeLine from '../subelements/TimeLine.vue'
// import SurveyElementBuilder from '../SurveyElementBuilder.vue'

export default {
    name: 'SurveyElementVideo',
    components: { AudioRecorder, ProgressBar, TimeLine },
    props: {
        content: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const videoPlayer = ref(null)
        const interactiveSteps = ref([])
        const answeredSteps = ref(0)
        const showQuestion = ref(false)
        const timeBasedSteps = ref(props.content.timeBasedSteps)
        const store = useStore()
        //
        const mediaCurrentTime = ref(0)
        const mediaDurationTime = ref(0)

        const setAnswer = (id) => {
            console.log(id)
            // getNextQuestionByAnswer
            nextQuestion(id)
        }

        const nextQuestion = (id) => {
            playVideo()
            console.log(id)
        }

        const videoTimeUpdate = () => {
            console.log('videoTimeUpdate')
            const currentTime = parseInt(videoPlayer.value.currentTime)
            const { content } = toRefs(props)
            console.log(content)

            mediaCurrentTime.value = videoPlayer.value.currentTime
            mediaDurationTime.value = parseInt(videoPlayer.value.duration)
            console.log(mediaCurrentTime.value)
            // if (interactiveSteps.value.indexOf(currentTime) > -1) {
            if (interactiveSteps.value[answeredSteps.value] === currentTime) {
                //ToDo close previous (not stopedVideo) question and show the next one
                showQuestion.value = false
                if (timeBasedSteps.value[answeredSteps.value].stopsVideo) {
                    pauseVideo()
                }
                console.log(timeBasedSteps.value[answeredSteps.value].stepId)
                store.dispatch(
                    'surveys/getSurveyStepById',
                    timeBasedSteps.value[answeredSteps.value].stepId,
                )

                showQuestion.value = true
                answeredSteps.value++
            }
        }
        const playVideo = () => {
            console.log('playVideo')
            videoPlayer.value.play()
            showQuestion.value = false
        }
        const pauseVideo = () => {
            console.log('pauseVideo')
            videoPlayer.value.pause()
        }
        //ToDo backend value with fps?
        const convertTimeCode = (time, fps = 24) => {
            time = time.split(':')
            let minutes = time[0] * 60 + Number(time[1])
            //let minutesCounted = minutes - Math.floor(minutes / 10)
            let seconds = minutes * 60 + Number(time[2])
            let frames = Number(time[3])
            frames += Math.ceil(seconds * fps)
            console.log(frames)
            return seconds
        }

        onMounted(() => {
            console.log('mounted!')
            timeBasedSteps.value.forEach((timestep) => {
                let stopAtSecond = convertTimeCode(timestep.timecode)
                interactiveSteps.value.push(stopAtSecond)
            })
        })

        return {
            showQuestion,
            answeredSteps,
            interactiveSteps,
            timeBasedSteps,
            videoPlayer,
            store,
            mediaCurrentTime,
            mediaDurationTime,
            convertTimeCode,
            videoTimeUpdate,
            setAnswer,
            nextQuestion,
            playVideo,
            pauseVideo,
        }
    },
}
</script>

<style scoped>
video {
    /* override other styles to make responsive */
    width: 100% !important;
    height: auto !important;
}

.sidebar {
    position: relative;
    right: 0px;
    width: 30vw;
    height: 100vh;
    overflow-y: scroll;
}

.w-40 {
    width: 40%;
}

.w-60 {
    width: 60%;
}

.question {
    position: absolute;
}

.comment-field {
    float: left;
    position: relative;
    top: 50px;
}
</style>
