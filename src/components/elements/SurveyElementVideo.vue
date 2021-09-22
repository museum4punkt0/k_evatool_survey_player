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
        <!--        <p>SurveyElementVideo</p>-->
        <!--        <button @click="pauseVideo">pauseVideo</button>-->
        <!--        <AudioRecorder></AudioRecorder>-->
        <div
            id="responsiveVideoWrapper"
            class="relative mx-auto pb-fluid-video flex"
        >
            <div class="sidebar-left block w-60 relative p-0 m-0">
                <div class="video-wrap relative">
                    <video
                        ref="videoPlayer"
                        src="https://ak.picdn.net/shutterstock/videos/1060516912/preview/stock-footage-beautiful-sunlight-in-the-forest.webm"
                        muted
                        autoplay
                        class="mx-auto p-0 m-0 z-10"
                        @timeupdate="videoTimeUpdate"
                        @play="playVideo"
                    ></video>

                    <div
                        v-if="showQuestion"
                        class="
                            absolute
                            bg-white
                            w-2/3
                            h-2/3
                            absolute
                            top-1/2
                            left-1/2
                            transform
                            -translate-x-1/2 -translate-y-2/3
                            z-20
                        "
                    >
                        <ContentSlider class="z-20"></ContentSlider>
                        <!--                        <formular class="z-20"></formular>-->
                    </div>
                    <div
                        v-if="showQuestion"
                        class="
                            mx-auto
                            question
                            bg-white
                            p-4
                            absolute
                            bottom-0
                            right-0
                        "
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
                </div>
                <ProgressBar
                    :current-time="mediaCurrentTime"
                    :duration="mediaDurationTime"
                    :interactive-steps="interactiveSteps"
                    :comments="commentsCounter"
                    @add-comment="addComment"
                    @changeProgress="changeProgress"
                    @jumpToItem="jumpToItem"
                ></ProgressBar>
                <MediaControls
                    :current-time="mediaCurrentTime"
                    :duration="mediaDurationTime"
                    :media-is-playing="videoIsPlaying"
                    @play-pause="tooglePlay"
                ></MediaControls>

                <div
                    class="
                        text-field
                        inline-block
                        text-center
                        comments
                        border-2 border-blue-800
                        bg-white
                        w-4/5
                    "
                >
                    <microphone-icon
                        class="h-6 w-6 mr-2 inline text-blue-800"
                    ></microphone-icon>
                    <p class="text-xs p-2 text-gray-400 inline">
                        Klicke hier und hinterlasse einen Kommentar zur aktuelle
                        Stelle im Video, es wird dabei pausiert.
                    </p>
                    <!--                    <p>{{ comment }}</p>-->
                    <input v-model="comment" type="text" />

                    <div class="flex justify-between">
                        <div>
                            <div class="time text-xs px-6 text-gray-400 inline">
                                <clock-icon
                                    class="h-6 w-6 mr-2 inline text-gray-400"
                                ></clock-icon>
                                {{ convertTime(mediaCurrentTime) }} / Kommentar
                                {{ timelineObject.length + 1 }}
                            </div>
                        </div>
                        <div>
                            <button
                                class="rounded px-2 py-1"
                                @click="deleteComment"
                            >
                                <trash-icon
                                    class="h-6 w-6 mr-2 inline text-red-600"
                                />
                                Löschen
                            </button>
                            <button
                                class="rounded px-2 py-1"
                                @click="saveComment"
                            >
                                <check-circle-icon
                                    class="h-6 w-6 mr-2 inline"
                                />
                                Speichern
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="sidebar sidebar-right w-40 mx-4">
                <TimeLine
                    :interactive-steps="interactiveSteps"
                    :answered-steps="answeredSteps"
                    :content="timelineObject"
                    @removeComment="removeComment"
                    @editComment="editComment"
                ></TimeLine>
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
import MediaControls from '../subelements/MediaControls.vue'
import TimeLine from '../subelements/TimeLine.vue'
import Formular from '../subelements/Formular.vue'
import ContentSlider from '../subelements/Contentslider.vue'
import {
    TrashIcon,
    CheckCircleIcon,
    ClockIcon,
    MicrophoneIcon,
} from '@heroicons/vue/outline'

// import SurveyElementBuilder from '../SurveyElementBuilder.vue'

export default {
    name: 'SurveyElementVideo',
    components: {
        AudioRecorder,
        ProgressBar,
        MediaControls,
        TimeLine,
        TrashIcon,
        ClockIcon,
        CheckCircleIcon,
        MicrophoneIcon,
        Formular,
        ContentSlider,
    },
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
        const videoIsPlaying = ref(true)

        const comment = ref()
        const timelineObject = ref([])

        const questionsCounter = ref([])
        const commentsCounter = ref([])

        if (
            comment.value === '' ||
            comment.value === null ||
            comment.value === 0
        ) {
            comment.value = 'Please enter text in text box below'
        }
        //
        const mediaCurrentTime = ref(0)
        const mediaDurationTime = ref(0)
        const addComment = (time) => {
            console.log(time)
        }

        const removeComment = (comment) => {
            let id = timelineObject.value.indexOf(comment)
            timelineObject.value.splice(id, 1)
            commentsCounter.value = timelineObject.value.filter(
                (x) => x.type === 'comment',
            )
        }
        const editComment = (comment) => {
            console.log(comment)
            answeredSteps.value = comment.index
            videoPlayer.value.currentTime = comment.time
        }

        const deleteComment = () => {
            comment.value = ''
        }
        const saveComment = () => {
            if (comment.value) {
                let message = comment.value

                commentsCounter.value = timelineObject.value.filter(
                    (x) => x.type === 'comment',
                )
                timelineObject.value.push({
                    body: message,
                    type: 'comment',
                    time: mediaCurrentTime.value,
                    index: commentsCounter.value.length + 1,
                })
                comment.value = ''
                commentsCounter.value = timelineObject.value.filter(
                    (x) => x.type === 'comment',
                )

                timelineObject.value.sort(function (a, b) {
                    return a.time - b.time
                }) // Sort youngest first
            }
        }

        const setAnswer = (id) => {
            console.log(id)
            // getNextQuestionByAnswer
            nextQuestion(id)
        }

        const nextQuestion = (id) => {
            playVideo()
            console.log(id)
        }

        const tooglePlay = () => {
            if (videoIsPlaying.value) {
                pauseVideo()
            } else {
                playVideo()
            }
        }

        const jumpToItem = (itemId) => {
            pauseVideo()
            console.log(itemId)
            // answeredSteps.value = itemId
            // console.log(questionsCounter.value)
            // // videoPlayer.value.currentTime = questionsCounter.value[itemId]
            // console.log(questionsCounter.value[itemId])
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
            if (
                interactiveSteps.value[answeredSteps.value] ===
                parseInt(videoPlayer.value.currentTime)
            ) {
                console.log('update')
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

                questionsCounter.value = timelineObject.value.filter(
                    (x) => x.type === 'question',
                )

                timelineObject.value.push({
                    body: '',
                    type: 'question',
                    time: currentTime,
                    index: questionsCounter.value.length + 1,
                })

                showQuestion.value = true
                answeredSteps.value++
            }
        }

        const changeProgress = (seekToValue) => {
            videoPlayer.value.currentTime = seekToValue
        }
        const playVideo = () => {
            console.log('playVideo')
            videoPlayer.value.play()
            showQuestion.value = false
            videoIsPlaying.value = true
        }
        const pauseVideo = () => {
            console.log('pauseVideo')
            videoPlayer.value.pause()
            videoIsPlaying.value = false
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

        const convertTime = (duration) => {
            let minutes = Math.floor(duration / 60)
            minutes = minutes < 10 ? '0' + minutes : minutes
            let seconds = Math.round(duration - minutes * 60)
            seconds = seconds < 10 ? '0' + seconds : seconds
            return minutes + ':' + seconds
        }

        onMounted(() => {
            console.log('mounted!')
            timeBasedSteps.value.forEach((timestep) => {
                let stopAtSecond = convertTimeCode(timestep.timecode)
                interactiveSteps.value.push(stopAtSecond)
            })
        })

        return {
            questionsCounter,
            commentsCounter,
            showQuestion,
            answeredSteps,
            interactiveSteps,
            timeBasedSteps,
            videoPlayer,
            store,
            videoIsPlaying,
            mediaCurrentTime,
            mediaDurationTime,
            comment,
            timelineObject,
            tooglePlay,
            convertTimeCode,
            videoTimeUpdate,
            setAnswer,
            nextQuestion,
            playVideo,
            pauseVideo,
            convertTime,
            addComment,
            saveComment,
            deleteComment,
            removeComment,
            changeProgress,
            editComment,
            jumpToItem,
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

.text-field {
    float: left;
    position: relative;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
