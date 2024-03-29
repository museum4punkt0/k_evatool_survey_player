<template>
    <div class="relative md:mx-auto md:w-full md:flex">
        <div
            class="sidebar sidebar-left w-full md:w-2/3 p-0 m-0 md:overflow-y-scroll bg-white md:bg-transparent z-10"
        >
            <div
                class="video-wrap bg-white overflow-hidden relative z-20 h-full"
                :class="
                    store.state.showAnimations &&
                    'animate__animated animate__fadeInLeft'
                "
            >
                <div
                    v-if="showQuestion"
                    class="fixed w-screen h-screen bg-black opacity-50 left-0 top-0 z-20"
                ></div>
                <div
                    v-if="!started"
                    class="absolute w-full h-full bg-black opacity-50 left-0 top-0 z-20 flex items-center justify-center"
                >
                    <div
                        tabindex="0"
                        :aria-label="t('action_play_video')"
                        class="tabindex-focus-nopadding"
                        @click="start"
                        @keydown="start"
                    >
                        <play-icon
                            class="w-16 h-16 xl:h-16 xl:w-16 z-10 inline text-white"
                        ></play-icon>
                    </div>
                </div>

                <!--              src="https://evatool-backend.twoavy.com/evaluation-tool/kultueroeffner_buchbindewerkstatt_gekuerzt.mp4#t=0,67"-->

                <!--                src="https://evatool-backend.twoavy.com/evaluation-tool/lichtspiel_digitale_werkstatt.mp4"-->

                <div class="video-container bg-gray-200">
                    <video
                        ref="videoPlayer"
                        :src="
                            content.params.videoAsset.urls.original + timeParams
                        "
                        preload
                        class="mx-auto p-0 m-0 z-10 border-none"
                        @timeupdate="videoTimeUpdate"
                        @play="playVideo"
                        @ended="videoEnded"
                    ></video>
                </div>

                <div
                    v-if="showQuestion || showFeedback"
                    class="md:absolute bg-white w-11/12 h-5/6 md:w-2/3 md:h-2/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:-translate-y-2/3 xl:z-30 z-50 fixed"
                >
                    <ModalContent
                        v-if="showQuestion"
                        class="z-20 md:relative"
                        :step-question="
                            content.timeBasedSteps[answeredSteps - 1]
                        "
                        @confirmed-answer="confirmedAnswer"
                        @close-modal="closeModal"
                    ></ModalContent>
                    <div v-if="showFeedback" class="thanks-feedback">
                        <div class="flex">
                            <img src="../../assets/thanks.svg" class="inline" />
                            <h3 class="text-blue-800">
                                {{ t('feedback_text') }}
                            </h3>
                        </div>
                    </div>
                </div>
                <ProgressBar
                    :current-time="mediaCurrentTime"
                    :duration="mediaDurationTime"
                    :interactive-steps="interactiveSteps"
                    :comments="commentsCounter"
                    @add-comment="addComment"
                    @change-progress="changeProgress"
                    @jump-to-item="jumpToItem"
                ></ProgressBar>
                <MediaControls
                    :current-time="mediaCurrentTime"
                    :duration="mediaDurationTime"
                    :video-is-playing="videoIsPlaying"
                    @play-pause="togglePlay"
                    @toggle-comment="toggleComment"
                    @toggle-volume="toggleVolume"
                ></MediaControls>
            </div>
            <!--            ToDo: move to component-->
            <div
                class="left-1/2 -translate-x-1/2 inline-block text-center comments border-2 border-blue-800 bg-white w-full md:w-4/5 z-10 relative"
                :class="[
                    { 'slideDown my-3': commentBox },
                    { 'h-0 hidden': !commentBox },
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
                        class="textarea px-5 pt-2 text-left text-xs w-full focus:outline-none"
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
                    <div
                        v-if="commentDeleting && showDeleteButton"
                        class="flex justify-center items-center mb-2 mr-2"
                    >
                        <p
                            tabindex="0"
                            class="rounded mr-2 tabindex-focus-nopadding"
                        >
                            {{ t('action_delete_comment') }}
                        </p>
                        <button
                            class="mr-2 px-2 py-1 rounded tabindex-focus-nopadding"
                            @click="confirmDelete"
                        >
                            <check-circle-icon class="h-6 w-6 inline" />
                            {{ t('action_yes') }}
                        </button>
                        <button
                            class="mr-2 px-2 py-1 rounded tabindex-focus-nopadding"
                            @click="cancelDelete"
                        >
                            <x-circle-icon class="h-6 w-6 inline" />
                            {{ t('action_no') }}
                        </button>
                    </div>
                    <div
                        v-if="!commentDeleting"
                        class="flex justify-center items-center mb-2 mr-2"
                    >
                        <button
                            tabindex="0"
                            class="rounded px-2 py-1 tabindex-focus-nopadding"
                            :class="comment ? 'text-red-600' : 'text-gray-600'"
                            :disabled="!comment"
                            @click="deleteComment"
                        >
                            <trash-icon
                                class="h-6 w-6 mr-2 inline"
                                :class="
                                    comment ? 'text-red-600' : 'text-gray-600'
                                "
                            />
                            {{ t('action_delete') }}
                        </button>

                        <button
                            v-if="!commentDeleting"
                            :disabled="!comment"
                            class="rounded px-2 py-1 tabindex-focus-nopadding"
                            :class="
                                comment ? 'text-black-600' : 'text-gray-600'
                            "
                            @click="saveComment"
                        >
                            <check-circle-icon class="h-6 w-6 mr-2 inline" />
                            {{ t('action_save') }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="sidebar sidebar-right w-full md:w-1/3 md:mx-4 h-full md:overflow-y-scroll relative"
            :class="
                store.state.showAnimations &&
                'animate__animated animate__fadeInRight'
            "
        >
            <!--          pb-36-->
            <TimeLine
                :interactive-steps="interactiveSteps"
                :answered-steps="answeredSteps"
                :answered-steps-object="answeredStepsObject"
                :content="timelineObject"
                :time-based-steps="content.timeBasedSteps"
                :audio-comment="audioComment"
                @remove-comment="removeComment"
                @edit-comment="editComment"
                @next-step="nextStep"
            ></TimeLine>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useStore } from 'vuex'

import AudioRecorder from '../subelements/AudioRecorder.vue'
import ProgressBar from '../subelements/ProgressBar.vue'
import MediaControls from '../subelements/MediaControls.vue'
import TimeLine from '../subelements/TimeLine.vue'
import ModalContent from '../subelements/ModalContent.vue'

import msToTimeCode from 'ms-to-timecode'
import {
    XCircleIcon,
    CheckCircleIcon,
    ClockIcon,
    MicrophoneIcon,
    PlayIcon,
    TrashIcon,
} from '@heroicons/vue/outline'

import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

export default {
    name: 'SurveyElementVideo',
    components: {
        AudioRecorder,
        ProgressBar,
        MediaControls,
        TimeLine,
        XCircleIcon,
        PlayIcon,
        TrashIcon,
        ClockIcon,
        CheckCircleIcon,
        MicrophoneIcon,
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
        const commentBox = ref(false)
        const commentBoxObject = ref()
        const started = ref(false)
        const audioComment = ref(false)
        const route = useRoute()
        const answeredStepsObject = ref([])

        const showDeleteButton = ref(true)

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
        const commentDeleting = ref(false)
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

        const addComment = () => {}

        const removeComment = async (comment) => {
            let id = timelineObject.value.indexOf(comment)
            if (id > -1) {
                timelineObject.value.splice(id, 1)
                await store.dispatch('surveyResults/sendSurveyResults', {
                    surveyId: route.query.survey,
                    data: {
                        surveyStepId: props.content.id,
                        resultValue: {
                            text: comment.value,
                        },

                        uuid: props.surveyResults.uuid,
                        resultLanguage: store.state.lang,
                        timecode: convertTimeFull(comment.time),
                        deleted: true,
                    },
                })
                commentsCounter.value = timelineObject.value.filter(
                    (x) => x.type === 'comment',
                )
            }
        }
        const editComment = (commentObj) => {
            pauseVideo()
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
            commentDeleting.value = true
        }

        const cancelDelete = () => {
            commentDeleting.value = false
        }

        const confirmDelete = () => {
            // comment.value = ''

            removeComment(commentBoxObject.value)
            commentDeleting.value = false
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
                    // deleted:
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
            // getNextQuestionByAnswer
            nextQuestion(id)
        }

        const nextQuestion = () => {
            playVideo()
        }

        const togglePlay = () => {
            if (videoIsPlaying.value) {
                pauseVideo()
            } else {
                playVideo()
            }
        }

        const jumpToItem = () => {
            pauseVideo()
        }

        const videoEnded = () => {}

        const videoTimeUpdate = () => {
            mediaCurrentTime.value = videoPlayer.value.currentTime
            mediaDurationTime.value = videoPlayer.value.duration

            if (
                interactiveSteps.value[answeredSteps.value] ===
                parseInt(videoPlayer.value.currentTime)
            ) {
                // Todo: close previous (not stopedVideo) question and show the next one
                showQuestion.value = false

                if (timeBasedSteps.value[answeredSteps.value].stopsVideo) {
                    pauseVideo()
                }

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
            videoPlayer.value.play()
            showQuestion.value = false
            videoIsPlaying.value = true
        }
        const pauseVideo = () => {
            videoPlayer.value.pause()
            videoIsPlaying.value = false
        }

        // Todo: backend value with fps?
        const convertTimeCode = (time /*,fps = 24*/) => {
            time = time.split(':')
            const minutes = time[0] * 60 + Number(time[1])

            const seconds = minutes * 60 + Number(time[2])
            /*let frames = Number(time[3])
            frames += Math.ceil(seconds * fps)*/

            return seconds
        }

        const convertTime = (duration) => {
            let minutes = Math.floor(duration / 60)
            minutes = minutes < 10 ? '0' + minutes : minutes
            let seconds = Math.round(duration - minutes * 60)
            seconds = seconds < 10 ? '0' + seconds : seconds
            return minutes + ':' + seconds
        }

        const convertTimeFull = (duration) => {
            return msToTimeCode(duration * 1000, 25)
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
                    const stepSlug = route.query.step || ''
                    await store.dispatch('surveyResults/getUuidResults', {
                        surveyId: surveySlug,
                        stepId: stepSlug,
                        uuid: window.localStorage.getItem('surveyUuid'),
                    })
                }, 300)
            },
        )

        const timeParams = computed(() => {
            if (
                props.content?.stepParams?.startTimecode &&
                props.content?.stepParams?.stopTimecode
            ) {
                return (
                    '#t=' +
                    convertTimeCode(props.content.stepParams.startTimecode) +
                    ',' +
                    convertTimeCode(props.content.stepParams.stopTimecode)
                )
            } else if (props.content?.stepParams?.startTimecode) {
                return (
                    '#t=' +
                    convertTimeCode(props.content.stepParams.startTimecode)
                )
            } else {
                return ''
            }
        })

        onMounted(() => {
            if (timeBasedSteps.value) {
                timeBasedSteps.value.forEach((timestep) => {
                    let stopAtSecond = convertTimeCode(timestep.timecode)
                    interactiveSteps.value.push(stopAtSecond)
                })
            }

            if (props.content.timeBasedSteps) {
                props.content.timeBasedSteps.forEach((el, index) => {
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
            audioComment,
            commentBox,
            start,
            started,
            commentBoxObject,
            currentStepData,
            videoEnded,
            togglePlay,
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
            timeParams,
            commentDeleting,
            cancelDelete,
            confirmDelete,
            showDeleteButton,
        }
    },
}
</script>

<style lang="scss" scoped>
.video-wrap {
    &.z-100 {
        z-index: 100;
    }

    .video-container {
        height: calc(100% - 20px - 3rem);

        video {
            position: relative;
            height: 100%;
        }
    }
}

.sidebar {
    max-height: 80vh;
}

@media (max-width: 768px) {
    .sidebar {
        max-height: unset;
    }
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

.z-100 {
    z-index: 100;
}
</style>
