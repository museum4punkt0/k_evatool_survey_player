<template>
    <div class="relative mx-auto w-full pb-fluid-video flex">
        <div class="sidebar sidebar-left w-2/3 relative p-0 m-0">
            <div class="video-wrap bg-white overflow-hidden relative z-100">
                <!--                src="https://ak.picdn.net/shutterstock/videos/1060516912/preview/stock-footage-beautiful-sunlight-in-the-forest.webm"-->
                <video
                    ref="videoPlayer"
                    :src="content.params.videoAsset.urls.original"
                    muted
                    autoplay
                    class="mx-auto p-0 m-0 z-10"
                    @timeupdate="videoTimeUpdate"
                    @play="playVideo"
                    @ended="videoEnded"
                ></video>

                <div
                    v-if="showQuestion || showFeedback || showFormular"
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
                    <ContentSlider
                        v-if="showQuestion"
                        :content="content"
                        :step="currentStepData()"
                        class="z-20"
                    ></ContentSlider>
                    <formular v-if="showFormular" class="z-20"></formular>
                    <div v-if="showFeedback" class="thanks-feedback">
                        <div class="flex">
                            <img src="../../assets/thanks.svg" class="inline" />
                            <h3 class="text-blue-800">
                                Danke für ihre Bewertung!
                            </h3>
                        </div>
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
                    :video-is-playing="videoIsPlaying"
                    @play-pause="tooglePlay"
                    @toggle-comment="toggleComment"
                ></MediaControls>
            </div>
            <!--            ToDo: move to component-->
            <div
                class="
                    text-field
                    inline-block
                    text-center
                    comments
                    border-2 border-blue-800
                    bg-white
                    w-4/5
                    z-10
                "
                :class="{ slideDown: commentBox }"
            >
                <!--        <p>SurveyElementVideo</p>-->
                <!--        <button @click="pauseVideo">pauseVideo</button>-->
                <div class="flex justify-center items-center">
                    <AudioRecorder
                        @send-audio-asset="sendAudioAsset"
                    ></AudioRecorder>
                    <textarea
                        v-model="comment"
                        type="text"
                        class="textarea px-5 text-left text-xs w-full"
                        placeholder="Schreibe ein Kommentar zur aktuellen Stelle im Video oder klicke auf das Mikrofon für die Spracheingabe"
                    />
                </div>
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
                        <button class="rounded px-2 py-1" @click="saveComment">
                            <check-circle-icon class="h-6 w-6 mr-2 inline" />
                            Speichern
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="sidebar sidebar-right w-1/3 mx-4">
            <TimeLine
                :interactive-steps="interactiveSteps"
                :answered-steps="answeredSteps"
                :content="timelineObject"
                :audio-comment="audioComment"
                @removeComment="removeComment"
                @editComment="editComment"
            ></TimeLine>
        </div>
    </div>
</template>

<script>
import { onMounted, toRefs } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'

import AudioRecorder from '../subelements/AudioRecorder.vue'
import ProgressBar from '../subelements/ProgressBar.vue'
import MediaControls from '../subelements/MediaControls.vue'
import TimeLine from '../subelements/TimeLine.vue'
import Formular from '../subelements/Formular.vue'
import ContentSlider from '../subelements/ContentSlider.vue'
import {
    TrashIcon,
    CheckCircleIcon,
    ClockIcon,
    MicrophoneIcon,
} from '@heroicons/vue/outline'

import { useRoute } from 'vue-router'

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
        survey: {
            type: Object,
            default: () => {},
        },
        surveyResults: {
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
        const showFeedback = ref(false)
        const showFormular = ref(false)
        const commentBox = ref(false)

        const audioComment = ref(false)
        const route = useRoute()

        console.log(timeBasedSteps)
        const currentStepData = () => {
            return timeBasedSteps.value[answeredSteps.value - 1]
        }

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

        const toggleComment = () => {
            commentBox.value = !commentBox.value
        }

        const saveComment = () => {
            if (comment.value || audioComment.value) {
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

        const videoEnded = () => {
            showFeedback.value = true
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

        const sendAudioAsset = (wav) => {
            console.log(props.content)
            store.dispatch('surveyResults/sendSurveyAudioAsset', {
                surveyStepResultId: route.query.id,
                audio: wav,
            })
            audioComment.value = wav
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
            showFeedback,
            showFormular,
            audioComment,
            commentBox,
            currentStepData,
            videoEnded,
            tooglePlay,
            sendAudioAsset,
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
            toggleComment,
        }
    },
}
</script>

<style lang="scss" scoped>
video {
    /* override other styles to make responsive */
    width: 100% !important;
    height: auto !important;
}

.sidebar {
    position: relative;
    right: 0px;
    /*width: 30vw;*/
    height: 100vh;
    overflow-y: scroll;
}

.text-field {
    float: left;
    position: relative;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
}

textarea {
    box-sizing: border-box;
    resize: none;
}

.comments {
    opacity: 0;
    transition: all 0.3s linear;
    &.slideDown {
        opacity: 1;
        transition: all 0.3s linear;
    }
}

.video-wrap {
    z-index: 100;
}
</style>
