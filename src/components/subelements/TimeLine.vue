<template>
    <div
        class="timeline-container bg-gray-200 md:mx-auto mx-0 px-0 w-full h-full md:overflow-scroll xl:absolute"
    >
        <!--      pb-24-->
        <div
            class="relative wrap md:p-5 md:mx-2 bg-blue-900 p-4 text-white tl-header"
        >
            <!--          md:overflow-scroll-->
            <h3>{{ t('overview') }}</h3>
            <p>
                {{ t('overview_description') }}
            </p>
        </div>
        <div
            class="relative wrap md:overflow-scroll h-auto px-5 md:mx-2 bg-white tl-body"
        >
            <!--            {{ timeBasedSteps[answeredSteps - 1] }}-->
            <div
                class="absolute border-opacity-20 border-gray-700 h-full border ml-7"
            ></div>
            <!-- right timeline -->
            <template
                v-for="(comment, index) in content"
                :key="'comment-' + index"
            >
                <div
                    v-if="comment.type === 'comment'"
                    class="mb-8 flex justify-between items-start w-full right-timeline pt-5"
                >
                    <!--                <div class="order-1 w-5/12"></div>-->
                    <div
                        class="z-20 flex items-center order-1 bg-gray-300 border-white border-8 w-14 h-14 rounded-full"
                    >
                        <h1
                            class="mx-auto font-semibold text-lg text-black bg-gray-300"
                        >
                            <chat-alt-icon class="h-6 w-6 bg-gray-300 solid" />
                        </h1>
                    </div>
                    <div class="order-1 w-10/12 p-1">
                        <h3 class="text-gray-800 text-xl">
                            {{ t('comments', 1) }}
                        </h3>
                        <p class="text-gray-400 inline">
                            {{ t('question_at') }}
                            {{ convertTime(comment.time) }}
                        </p>
                        <p
                            class="mt-3 text-sm leading-snug tracking-wide text-gray-900 text-opacity-100"
                        >
                            {{ comment.body }}
                            <!--                            <audio-->
                            <!--                                id="player"-->
                            <!--                                type="audio/wav"-->
                            <!--                                :src="audioComment"-->
                            <!--                                controls-->
                            <!--                            ></audio>-->
                        </p>
                        <div class="mt-5 text-sm">
                            <!--                            <button
    class="rounded-3xl border-2 px-4 px-2 py-1"
    @click="removeComment(comment)"
>
    <trash-icon
        class="h-6 w-6 mr-2 inline text-red-600"
    />
    {{ t('action_delete') }}
</button>-->
                            <button
                                class="rounded-3xl border-2 px-4 py-1"
                                @click="editComment(comment)"
                            >
                                <pencil-alt-icon
                                    class="h-6 w-6 mr-2 inline text-blue-600"
                                />
                                {{ t('view_edit') }}
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    v-if="comment.type === 'question'"
                    class="mb-8 flex justify-between flex-row items-start w-full left-timeline pt-5"
                >
                    <!--                <div class="order-1 w-5/12"></div>-->
                    <div
                        class="z-20 flex items-center border-white border-8 w-14 h-14 rounded-full"
                        :class="{
                            'bg-green-400': content[index].answered,
                            'bg-blue-900': !content[index].answered,
                        }"
                    >
                        <h1 class="mx-auto text-black font-semibold text-lg">
                            <check-icon
                                v-if="content[index].answered"
                                class="h-6 w-6 bg-green-400 rounded-full text-white"
                            />
                            <question-mark-circle-icon
                                v-else
                                class="h-6 w-6 bg-blue-900 rounded-full text-white"
                                :class="{
                                    'bg-green-400': content[index].answered,
                                }"
                            />
                        </h1>
                    </div>
                    <div class="order-1 w-10/12 p-1">
                        <div class="inline-block">
                            <h3
                                v-if="content[index]?.question"
                                class="mb-3 text-blue-900 text-xl inline"
                                :class="{
                                    'text-green-400': content[index].answered,
                                }"
                                v-html="content[index].question[lang]"
                            ></h3>
                            <h3
                                v-if="content[index]?.text"
                                class="mb-3 text-blue-900 text-xl inline"
                                :class="{
                                    'text-green-400': content[index].answered,
                                }"
                                v-html="content[index].text[lang]"
                            ></h3>

                            <p class="text-gray-400">
                                {{ t('question_at') }}
                                {{ convertTime(comment.time) }}
                            </p>
                        </div>
                        <div class="w-full mt-2">
                            <button
                                v-if="content[index].answered"
                                class="rounded-3xl align-top border-2 px-4 py-1"
                                @click="editComment(comment)"
                            >
                                <pencil-alt-icon
                                    class="h-6 w-6 mr-2 inline text-blue-600"
                                />
                                {{ t('view_edit') }}
                            </button>
                            <button
                                v-else
                                class="rounded-3xl align-top border-2 px-4 py-1"
                                @click="editComment(comment)"
                            >
                                <fast-forward-icon
                                    class="h-6 w-6 mr-2 inline text-blue-600"
                                />
                                <!--                            <pencil-alt-icon-->
                                <!--                                class="h-6 w-6 mr-2 inline text-blue-600"-->
                                <!--                            />-->
                                <!--                            {{ t('view_edit') }}-->
                                {{ t('jump_to_question') }}
                            </button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <!-- bottom timeline -->

        <!--        {{ content }}-->
        <div
            class="flex justify-between flex-row items-center left-timeline bg-white md:mx-2 border-t-2 p-2 tl-footer mb-24 md:mb-0"
        >
            <!--                <div class="order-1 w-5/12"></div>-->
            <div
                class="z-20 flex items-center order-1 bg-blue-900 w-14 h-14 border-white border-8 mx-3 rounded-full"
                :class="{
                    'bg-green-400': interactiveSteps.length - answeredSteps > 0,
                }"
            >
                <!--                <h1-->
                <!--                    v-if="interactiveSteps.length - answeredSteps > 0"-->
                <!--                    class="mx-auto text-black font-semibold text-lg"-->
                <!--                >-->
                <!--                    <question-mark-circle-icon class="h-6 w-6 text-white" />-->
                <!--                </h1>-->

                <h1 class="mx-auto text-black font-semibold text-lg">
                    <check-circle-icon class="h-5 w-5 text-white" />
                </h1>
            </div>
            <div class="order-1 w-10/12 p-1 flex justify-between items-center">
                <!--                v-if="interactiveSteps.length - answeredSteps > 0"-->
                <h4
                    v-if="interactiveSteps.length > 0"
                    class="text-gray-400 text-xl inline"
                >
                    {{ content.filter((x) => x.answered === true).length }}/{{
                        interactiveSteps.length
                    }}
                    {{ t('questions_answered') }}
                </h4>

                <next-button
                    v-if="
                        content.filter((x) => x.answered === true).length ===
                        interactiveSteps.length
                    "
                    @confirm="confirm"
                ></next-button>
            </div>
        </div>
    </div>
</template>

<script>
import ConfirmButton from '../subelements/ConfirmButton.vue'
import NextButton from '../subelements/NextButton.vue'
import {
    PlayIcon,
    ChatAltIcon,
    CheckCircleIcon,
    CheckIcon,
    QuestionMarkCircleIcon,
} from '@heroicons/vue/solid'
import {
    PencilAltIcon,
    TrashIcon,
    FastForwardIcon,
} from '@heroicons/vue/outline'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default {
    name: 'TimeLine',
    components: {
        CheckIcon,
        PlayIcon,
        ChatAltIcon,
        TrashIcon,
        QuestionMarkCircleIcon,
        PencilAltIcon,
        CheckCircleIcon,
        ConfirmButton,
        NextButton,
        FastForwardIcon,
    },
    props: {
        interactiveSteps: {
            type: Array,
            default: null,
        },
        answeredSteps: {
            type: Number,
            default: 0,
        },
        answeredStepsObject: {
            type: Object,
            default: null,
        },
        content: {
            type: Object,
            default: null,
        },
        audioComment: {
            type: Boolean,
            default: null,
        },
        timeBasedSteps: {
            type: Object,
            default: null,
        },
    },
    emits: ['removeComment', 'editComment', 'nextStep'],
    setup(props, { emit }) {
        const { t } = useI18n()
        const store = useStore()
        const lang = computed({
            get: () => store.state.lang,
        })

        const convertTime = (duration) => {
            let minutes = Math.floor(duration / 60)
            minutes = minutes < 10 ? '0' + minutes : minutes
            let seconds = Math.round(duration - minutes * 60)
            seconds = seconds < 10 ? '0' + seconds : seconds
            return minutes + ':' + seconds
        }

        const removeComment = (comment) => {
            emit('removeComment', comment)
        }
        const editComment = (comment) => {
            emit('editComment', comment)
        }

        const confirm = () => {
            // store.dispatch('setCurrentStep')
            emit('nextStep')
        }

        return {
            t,
            lang,
            store,
            confirm,
            convertTime,
            removeComment,
            editComment,
        }
    },
}
</script>

<style lang="scss" scoped>
.timeline-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

.tl-header {
    flex: 1;
}

.tl-body {
    flex: 8;
    overflow-y: scroll;
}

.tl-footer {
    flex: 1;
}
</style>
