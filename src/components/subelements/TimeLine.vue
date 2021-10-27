<template>
    <div
        class="
            timelione-container
            bg-gray-200
            md:mx-auto
            mx-0
            px-0
            w-full
            h-full
            overflow-scroll
        "
    >
        <div
            class="
                relative
                wrap
                overflow-scroll
                md:p-5 md:mx-2
                bg-blue-700
                p-4
                text-white
            "
        >
            <h3>Übersicht</h3>
            <p>
                Hier siehst du die Übersicht aller erstellten Kommentare und
                beantworteten Fragen.
            </p>
        </div>
        <div
            class="
                relative
                wrap
                overflow-scroll
                h-1/2
                p-5
                md:mx-2
                h-full
                bg-white
            "
        >
            {{ timeBasedSteps[answeredSteps - 1] }}
            <div
                class="
                    absolute
                    border-opacity-20 border-gray-700
                    h-full
                    border
                    ml-4
                "
            ></div>
            <!-- right timeline -->

            <template
                v-for="(comment, index) in content"
                :key="'comment-' + index"
            >
                <div
                    v-if="comment.type === 'comment'"
                    class="
                        mb-8
                        flex
                        justify-between
                        items-start
                        w-full
                        right-timeline
                    "
                >
                    <!--                <div class="order-1 w-5/12"></div>-->
                    <div
                        class="
                            z-20
                            flex
                            items-center
                            order-1
                            bg-gray-300
                            shadow-xl
                            w-8
                            h-8
                            rounded-full
                        "
                    >
                        <h1
                            class="
                                mx-auto
                                font-semibold
                                text-lg text-black
                                bg-gray-300
                            "
                        >
                            <chat-alt-icon class="h-6 w-6 bg-gray-300 solid" />
                        </h1>
                    </div>
                    <div class="order-1 w-10/12 p-1">
                        <h3 class="text-gray-800 inline text-xl">Kommentar</h3>
                        <p class="text-gray-400 inline">
                            bei {{ convertTime(comment.time) }}
                        </p>
                        <p
                            class="
                                mt-3
                                text-sm
                                leading-snug
                                tracking-wide
                                text-gray-900 text-opacity-100
                            "
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
                            <button
                                class="rounded-3xl border-2 px-4 px-2 py-1"
                                @click="removeComment(comment)"
                            >
                                <trash-icon
                                    class="h-6 w-6 mr-2 inline text-red-600"
                                />
                                Löschen
                            </button>
                            <button
                                class="rounded-3xl border-2 px-4 ml-5 py-1"
                                @click="editComment(comment)"
                            >
                                <pencil-alt-icon
                                    class="h-6 w-6 mr-2 inline text-blue-600"
                                />
                                Ansehen & Bearbeiten
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    v-if="comment.type === 'question'"
                    class="
                        mb-8
                        flex
                        justify-between
                        flex-row
                        items-start
                        w-full
                        left-timeline
                    "
                >
                    <!--                <div class="order-1 w-5/12"></div>-->
                    <div
                        class="
                            z-20
                            flex
                            items-center
                            order-1
                            bg-gray-300
                            shadow-xl
                            w-8
                            h-8
                            rounded-full
                        "
                    >
                        <h1 class="mx-auto text-black font-semibold text-lg">
                            <question-mark-circle-icon
                                class="h-6 w-6 bg-gray-300 text-blue-600"
                            />
                        </h1>
                    </div>
                    <div class="order-1 w-10/12 p-1">
                        <div class="inline-block">
                            <h3 class="mb-3 text-gray-400 text-xl inline">
                                {{
                                    timeBasedSteps[comment.index - 1].step
                                        .params.question[lang]
                                }}
                            </h3>
                            <p class="text-gray-400">
                                {{ convertTime(comment.time) }}
                            </p>
                        </div>
                        <button
                            class="
                                rounded-3xl
                                align-top
                                border-2
                                px-4
                                ml-5
                                py-1
                            "
                            @click="editComment(comment)"
                        >
                            <pencil-alt-icon
                                class="h-6 w-6 mr-2 inline text-blue-600"
                            />
                            Ansehen & Bearbeiten
                        </button>
                    </div>
                </div>
            </template>
        </div>
        <!-- bottom timeline -->
        <div
            class="
                mb-8
                flex
                justify-between
                flex-row
                items-start
                left-timeline
                bg-white
                md:mx-2
                border-t-2
                p-2
            "
        >
            <!--                <div class="order-1 w-5/12"></div>-->
            <div
                class="
                    z-20
                    flex
                    items-center
                    order-1
                    bg-gray-300
                    shadow-xl
                    w-8
                    h-8
                    mx-3
                    rounded-full
                "
            >
                <h1
                    v-if="interactiveSteps.length - answeredSteps > 0"
                    class="mx-auto text-black font-semibold text-lg"
                >
                    <question-mark-circle-icon class="h-6 w-6 bg-gray-300" />
                </h1>

                <h1 v-else class="mx-auto text-black font-semibold text-lg">
                    <check-circle-icon class="h-6 w-6 text-blue-600" />
                </h1>
            </div>
            <div class="order-1 w-10/12 p-1">
                <h4
                    v-if="interactiveSteps.length - answeredSteps > 0"
                    class="mb-3 text-gray-400 text-xl inline"
                >
                    {{ answeredSteps }}/{{ interactiveSteps.length }}
                    Fragen beantwortet
                </h4>

                <confirm-button></confirm-button>
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
    QuestionMarkCircleIcon,
} from '@heroicons/vue/solid'
import {
    PencilAltIcon,
    TrashIcon,
    CheckCircleIcon,
} from '@heroicons/vue/outline'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'TimeLine',
    components: {
        PlayIcon,
        ChatAltIcon,
        TrashIcon,
        QuestionMarkCircleIcon,
        PencilAltIcon,
        CheckCircleIcon,
        ConfirmButton,
        NextButton,
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
        content: {
            type: Object,
            default: null,
        },
        audioComment: {
            type: String,
            default: null,
        },
        timeBasedSteps: {
            type: Object,
            default: null,
        },
    },
    emits: ['removeComment', 'editComment'],
    setup(props, { emit }) {
        const store = useStore()
        const lang = computed({
            get: () => store.state.lang,
        })
        onMounted(() => {
            console.log(props)
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

        return {
            lang,
            store,
            convertTime,
            removeComment,
            editComment,
        }
    },
}
</script>

<style scoped></style>
