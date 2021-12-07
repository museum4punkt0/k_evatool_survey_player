<template>
    <div class="relative md:mx-auto md:w-full md:flex">
        <div class="sidebar sidebar-left w-full md:w-2/3 p-0 m-0">
            <div
                class="video-wrap h-full bg-white overflow-hidden relative z-20"
            >
                <div
                    v-if="showQuestion"
                    class="
                        fixed
                        w-screen
                        h-screen
                        bg-black
                        opacity-50
                        left-0
                        top-0
                        z-40
                        md:hidden
                    "
                ></div>
                <div
                    v-if="!started"
                    class="
                        absolute
                        w-full
                        h-full
                        bg-black
                        opacity-50
                        left-0
                        top-0
                        z-20
                        flex
                        items-center
                        justify-center
                    "
                    @click="start"
                >
                    <play-icon
                        class="
                            w-16
                            h-16
                            xl:h-32 xl:w-32
                            z-100
                            inline
                            text-white
                        "
                    ></play-icon>
                </div>
                <!--                src="https://ak.picdn.net/shutterstock/videos/1060516912/preview/stock-footage-beautiful-sunlight-in-the-forest.webm"-->
                <!--                {{ content.timeBasedSteps }}-->
                <!--                :src="content.params.videoAsset.urls.original"-->
                <!--                src="https://evatool-backend.twoavy.com/evaluation-tool/lichtspiel_digitale_werkstatt.mp4"-->
                <!--                :src="content.params.videoAsset.urls.original"-->
                <div class="video-container bg-gray-200">
                    <video
                        ref="videoPlayer"
                        :src="content.params.videoAsset.urls.original"
                        preload
                        class="mx-auto p-0 m-0 z-10 border-none"
                        @timeupdate="videoTimeUpdate"
                        @play="playVideo"
                        @ended="videoEnded"
                    ></video>
                </div>

                <div
                    v-if="showQuestion || showFeedback || showFormular"
                    class="
                        md:absolute
                        bg-white
                        w-11/12
                        h-5/6
                        md:w-2/3 md:h-2/3
                        top-1/2
                        left-1/2
                        transform
                        -translate-x-1/2 -translate-y-1/2
                        md:-translate-y-2/3
                        xl:z-30
                        z-50
                        fixed
                    "
                >
                    <ContentSlider
                        v-if="showQuestion && 1 < 0"
                        :content="content"
                        :step="currentStepData()"
                        class="z-20"
                    ></ContentSlider>

                    <ModalContent
                        v-if="showQuestion"
                        class="z-20 md:relative"
                        :step-question="
                            content.timeBasedSteps[answeredSteps - 1]
                        "
                        @confirmed-answer="confirmedAnswer"
                        @close-modal="closeModal"
                    ></ModalContent>
                    <formular v-if="showFormular" class="z-20"></formular>
                    <div v-if="showFeedback" class="thanks-feedback">
                        <div class="flex">
                            <img src="../../assets/thanks.svg" class="inline" />
                            <h3 class="text-blue-800">
                                Danke für Ihre Bewertung!
                            </h3>
                        </div>
                    </div>

                    <div
                        v-if="showQuestion && 1 < 0"
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

                        <!--                        <h3>Question: {{ answeredSteps }}</h3>-->
                        <!--                        <h3>-->
                        <!--                            StopsVideo:-->
                        <!--                            {{ timeBasedSteps[answeredSteps - 1].stopsVideo }}-->
                        <!--                        </h3>-->
                        <!--                        <ul>-->
                        <!--                            <li>-->
                        <!--                                <button @click="setAnswer(1)">antwort 1</button>-->
                        <!--                            </li>-->
                        <!--                        </ul>-->
                        <!--                        <ul>-->
                        <!--                            <li>-->
                        <!--                                <button @click="setAnswer(2)">antwort 2</button>-->
                        <!--                            </li>-->
                        <!--                        </ul>-->
                        <!--                        <ul>-->
                        <!--                            <li>-->
                        <!--                                <button @click="setAnswer(3)">antwort 3</button>-->
                        <!--                            </li>-->
                        <!--                        </ul>-->
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
                    @toggle-volume="toggleVolume"
                ></MediaControls>
            </div>
            <!--            ToDo: move to component-->
            <div
                class="
                    left-1/2
                    -translate-x-1/2
                    inline-block
                    text-center
                    comments
                    border-2 border-blue-800
                    bg-white
                    w-full
                    md:w-4/5
                    z-10
                    relative
                "
                :class="[
                    { 'slideDown my-3': commentBox },
                    { 'h-0': !commentBox },
                ]"
            >
                <!--        <p>SurveyElementVideo</p>-->
                <!--        <button @click="pauseVideo">pauseVideo</button>-->
                <div class="flex justify-center items-center">
                    <AudioRecorder
                        v-if="1 < 0"
                        @send-audio-asset="sendAudioAsset"
                    ></AudioRecorder>
                    <textarea
                        v-model="comment"
                        type="text"
                        class="
                            textarea
                            px-5
                            text-left text-xs
                            w-full
                            focus:outline-none
                        "
                        :placeholder="t('write_video_comment_placeholder')"
                    />
                </div>
                <div class="flex justify-between">
                    <div>
                        <div class="time text-xs px-6 text-gray-400 inline">
                            <clock-icon
                                class="h-6 w-6 mr-2 inline text-gray-400"
                            ></clock-icon>
                            {{ convertTime(mediaCurrentTime) }} /
                            {{ t('comments', 1) }}
                            <span v-if="comment && commentBoxObject">
                                {{ commentBoxObject.index }}
                            </span>
                            <span v-else class="ml-1">
                                {{ commentsCounter.length + 1 }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <!--                        <button
                            class="rounded px-2 py-1"
                            @click="deleteComment"
                        >
                            <trash-icon
                                class="h-6 w-6 mr-2 inline text-red-600"
                            />
                            {{ t('action_delete') }}
                        </button>-->
                        <button class="rounded px-2 py-1" @click="saveComment">
                            <check-circle-icon class="h-6 w-6 mr-2 inline" />
                            {{ t('action_save') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="
                sidebar sidebar-right
                w-full
                md:w-1/3 md:mx-4
                pb-36
                h-full
                overflow-y-scroll
                relative
            "
        >
            <TimeLine
                :interactive-steps="interactiveSteps"
                :answered-steps="answeredSteps"
                :answered-steps-object="answeredStepsObject"
                :content="timelineObject"
                :time-based-steps="content.timeBasedSteps"
                :audio-comment="audioComment"
                @removeComment="removeComment"
                @editComment="editComment"
                @nextStep="nextStep"
            ></TimeLine>
        </div>
    </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

import AudioRecorder from '../subelements/AudioRecorder.vue'
import ProgressBar from '../subelements/ProgressBar.vue'
import MediaControls from '../subelements/MediaControls.vue'
import TimeLine from '../subelements/TimeLine.vue'
import Formular from '../subelements/Formular.vue'
import ContentSlider from '../subelements/ContentSlider.vue'
import ModalContent from '../subelements/ModalContent.vue'

import msToTimeCode from 'ms-to-timecode'

import {
    CheckCircleIcon,
    ClockIcon,
    MicrophoneIcon,
    PlayIcon,
    TrashIcon,
} from '@heroicons/vue/outline'

import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

// import SurveyElementBuilder from '../SurveyElementBuilder.vue'

export default {
    name: 'SurveyElementVideo',
    components: {
        AudioRecorder,
        ProgressBar,
        MediaControls,
        TimeLine,
        PlayIcon,
        TrashIcon,
        ClockIcon,
        CheckCircleIcon,
        MicrophoneIcon,
        Formular,
        ContentSlider,

        ModalContent,
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
        subElement: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const { t } = useI18n()
        const videoPlayer = ref(null)
        const interactiveSteps = ref([])
        const answeredSteps = ref(0)
        const showQuestion = ref(false)
        const timeBasedSteps = ref(props.content.timeBasedSteps)
        const timeBasedStepsData = ref()
        const store = useStore()
        const videoIsPlaying = ref(true)
        const showFeedback = ref(false)
        const showFormular = ref(false)
        const commentBox = ref(false)
        const commentBoxObject = ref()
        const started = ref(false)
        const audioComment = ref(false)
        const route = useRoute()
        const answeredStepsObject = ref([])
        console.log(timeBasedSteps)
        const currentStepData = () => {
            return timeBasedSteps.value[answeredSteps.value - 1]
        }
        const confirmedAnswer = (id) => {
            answeredStepsObject.value.push(props.content.timeBasedSteps[id])
            timelineObject.value.filter((x) => x.type === 'question')[
                answeredSteps.value - 1
            ].answered = true
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
        const editComment = (commentObj) => {
            console.log(comment)
            videoPlayer.value.currentTime = commentObj.time

            if (commentObj.type === 'question') {
                answeredSteps.value = commentObj.index
                commentBox.value = false
                comment.value = ''
            } else {
                commentsCounter.value = timelineObject.value.filter(
                    (x) => x.type === 'comment',
                )
                answeredSteps.value = 0
                showQuestion.value = false
                commentBox.value = true
                commentBoxObject.value = commentObj
                comment.value = commentObj.body
            }
        }

        const deleteComment = () => {
            comment.value = ''
        }

        const toggleComment = () => {
            commentBox.value = !commentBox.value
        }

        const toggleVolume = (value) => {
            videoPlayer.value.muted = !value
        }

        const saveComment = async () => {
            if (comment.value || audioComment.value) {
                let message = comment.value
                commentsCounter.value = timelineObject.value.filter(
                    (x) => x.type === 'comment',
                )

                let commentExist = timelineObject.value.find(
                    (x) => x.time === mediaCurrentTime.value,
                )
                if (commentExist) {
                    commentExist.body = message
                } else {
                    timelineObject.value.push({
                        body: message,
                        type: 'comment',
                        time: mediaCurrentTime.value,
                        index: commentsCounter.value.length + 1,
                    })
                }

                commentsCounter.value = timelineObject.value.filter(
                    (x) => x.type === 'comment',
                )

                timelineObject.value.sort(function (a, b) {
                    return a.time - b.time
                }) // Sort youngest first
            }

            await store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.survey,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        text: comment.value,
                    },

                    uuid: props.surveyResults.uuid,
                    resultLanguage: store.state.lang,
                    timecode: convertTimeFull(videoPlayer.value.currentTime),
                },
            })
            comment.value = ''
            // store.dispatch('setCurrentStep')
        }

        const nextStep = async () => {
            if (commentsCounter.value.length === 0) {
                await store.dispatch('surveyResults/sendSurveyResults', {
                    surveyId: route.query.survey,
                    data: {
                        surveyStepId: props.content.id,
                        resultValue: {
                            text: 'no comment',
                        },

                        uuid: props.surveyResults.uuid,
                        resultLanguage: store.state.lang,
                        timecode: convertTimeFull(
                            videoPlayer.value.currentTime,
                        ),
                    },
                })
                await store.dispatch('setCurrentStep')
            } else {
                await store.dispatch('setCurrentStep')
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
            // showFeedback.value = true
        }

        const videoTimeUpdate = () => {
            // console.log('videoTimeUpdate')
            // const currentTime = parseInt(videoPlayer.value.currentTime)
            // const { content } = toRefs(props)
            // console.log(content)

            mediaCurrentTime.value = videoPlayer.value.currentTime
            mediaDurationTime.value = videoPlayer.value.duration
            // console.log(mediaCurrentTime.value)
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
                // store.dispatch(
                //     'surveys/getSurveyStepById',
                //     timeBasedSteps.value[answeredSteps.value].stepId,
                // )

                // questionsCounter.value = timelineObject.value.filter(
                //     (x) => x.type === 'question',
                // )

                // timelineObject.value.push({
                //     body: '',
                //     type: 'question',
                //     time: currentTime,
                //     index: questionsCounter.value.length + 1,
                // })

                showQuestion.value = true
                answeredSteps.value++
            }
        }

        const changeProgress = (seekToValue) => {
            mediaCurrentTime.value = seekToValue
            videoPlayer.value.currentTime = seekToValue
            comment.value = ''
        }

        const start = () => {
            if (!started.value) {
                started.value = true
                playVideo()
            }
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
        // ToDo
        const convertTimeFull = (duration) => {
            return msToTimeCode(duration * 1000, 25)

            /*let hours = "00:00";
            let minutes = Math.floor(duration / 60);
            minutes = minutes < 10 ? "0" + minutes : minutes;
            let seconds = Math.round(duration - minutes * 60);
            seconds = seconds < 10 ? "0" + seconds : seconds;
            return hours + ":" + minutes + ":" + seconds;*/
        }

        const sendAudioAsset = (wav) => {
            store.dispatch('surveyResults/sendSurveyAudioAsset', {
                surveyStepResultId: route.query.survey,
                audio: wav,
            })
            audioComment.value = wav
        }
        const closeModal = () => {
            showQuestion.value = false
            playVideo()
        }

        watch(
            () => store.state.currentVideoStep,
            (value) => {
                setTimeout(async () => {
                    confirmedAnswer(value - 1)
                    playVideo()
                    const surveySlug = route.query.survey || ''
                    await store.dispatch('surveyResults/getUuidResults', {
                        surveyId: surveySlug,
                        uuid: window.localStorage.getItem('surveyUuid'),
                    })

                    // let currentStepId = await store.state.surveyResults
                    // console.log(currentStepId)

                    let surveySteps =
                        store.state.surveyResults.surveyUuidResults
                    console.log(surveySteps)
                    // let currentStepId = await store.state.surveyResults
                    //     .surveyUuidResults.survey.statusByUuid.currentStep
                    // console.log(currentStepId)
                    // await store.dispatch('surveyResults/getUuidResults', {
                    //     surveyId: surveySlug,
                    //     uuid: window.localStorage.getItem('surveyUuid'),
                    // })
                    // let surveySteps =
                    //     store.state.surveyResults.surveyUuidResults.steps
                    // let currentStepId = await store.state.surveyResults
                    //     .surveyUuidResults.survey.statusByUuid.currentStep
                    // currentStep.value = surveySteps.find(
                    //     (x) => x.id === currentStepId,
                    // )
                }, 300)
            },
        )

        onMounted(() => {
            console.log('mounted!')

            if (timeBasedSteps.value) {
                timeBasedSteps.value.forEach((timestep) => {
                    let stopAtSecond = convertTimeCode(timestep.timecode)
                    interactiveSteps.value.push(stopAtSecond)
                })
            }

            if (props.content.timeBasedSteps) {
                props.content.timeBasedSteps.forEach((el, index) => {
                    console.log(el)
                    timelineObject.value.push({
                        body: '',
                        type: 'question',
                        time: convertTimeCode(el.timecode),
                        index: index,
                        answered: el.step.isAnswered,
                        question: el.step.params?.question || '',
                        text: el.step.params?.text || '',
                    })
                })
            }

            console.log(timelineObject.value)
        })

        return {
            t,
            answeredStepsObject,
            questionsCounter,
            commentsCounter,
            showQuestion,
            answeredSteps,
            interactiveSteps,
            timeBasedSteps,
            timeBasedStepsData,
            videoPlayer,
            store,
            route,
            videoIsPlaying,
            mediaCurrentTime,
            mediaDurationTime,
            comment,
            timelineObject,
            showFeedback,
            showFormular,
            audioComment,
            commentBox,
            start,
            started,
            commentBoxObject,
            currentStepData,
            videoEnded,
            tooglePlay,
            sendAudioAsset,
            convertTimeCode,
            convertTimeFull,
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
            toggleVolume,
            confirmedAnswer,
            closeModal,
            nextStep,
        }
    },
}
</script>

<style lang="scss" scoped>
.video-wrap {
    z-index: 100;
    .video-container {
        height: calc(100% - 20px - 3rem);
        video {
            /* override other styles to make responsive */
            //width: 100% !important;
            //height: auto !important;
            position: relative;
            height: 100%;
        }
    }
}

.sidebar {
    max-height: 80vh;
    //    position: relative;
    //    right: 0px;
    //    /*width: 30vw;*/
    //    height: 100vh;
    //    overflow-y: scroll;
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
    transition: opacity 0.3s linear;

    &.slideDown {
        opacity: 1;
        transition: opacity 0.3s linear;
    }
}
</style>
