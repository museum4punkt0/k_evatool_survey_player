<template>
    <div class="video-element mx-auto">
        <p>SurveyElementVideo</p>
        <button @click="pauseVideo">pauseVideo</button>
        <div
            id="responsiveVideoWrapper"
            className="relative mx-auto pb-fluid-video"
        >
            <div class="video-wrap">
                <p v-if="showQuestion">?</p>
                <video
                    ref="videoPlayer"
                    src="https://ak.picdn.net/shutterstock/videos/1060516912/preview/stock-footage-beautiful-sunlight-in-the-forest.webm"
                    muted
                    autoplay
                    class="mx-auto"
                    @timeupdate="videoTimeUpdate"
                    @play="playVideo"
                ></video>
            </div>
            <div v-if="showQuestion" class="mx-auto">
                {{ store.state.surveys.surveyStep }}

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
        </div>
    </div>
</template>

<script>
import { onMounted, toRefs } from '@vue/runtime-core'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'

// import SurveyElementBuilder from '../SurveyElementBuilder.vue'

export default {
    name: 'SurveyElementVideo',
    // components: { SurveyElementBuilder },
    props: ['content'],
    setup(props) {
        const videoPlayer = ref(null)
        const interactiveSteps = ref([])
        const answeredSteps = ref(0)
        const showQuestion = ref(false)
        const timeBasedSteps = ref(props.content.timeBasedSteps)
        const store = useStore()
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
    width: auto !important;
    height: auto !important;
}
</style>
