<template>
    <div
        class="
            survey-footer-menu
            bottom-0
            fixed
            w-full
            md:w-screen
            z-50
            bg-white
        "
    >
        <div class="survey-navigation-inner flex items-center h-16">
            <div class="ml-3 top-1 text-sm text-gray-500 absolute">
                {{ version }}
            </div>
            <div
                class="md:flex items-center justify-center md:w-screen sm:w-100"
            >
                <div class="flex justify-center items-center w-screen">
                    <button
                        class="prev flex items-center rounded-md nav-button p-2"
                        @click="prevStep()"
                    >
                        <chevron-double-left-icon
                            class="h-5 w-5 mr-1"
                        ></chevron-double-left-icon>
                        Zurück
                    </button>
                    <span class="mx-4 p-0">
                        {{ store.state.currentStep + 1 }}/{{ surveySteps }}
                    </span>
                    <button
                        class="next flex items-center rounded-md nav-button p-2"
                        @click="nextStep()"
                    >
                        Weiter
                        <chevron-double-right-icon
                            class="h-5 w-5 ml-2"
                        ></chevron-double-right-icon>
                    </button>
                </div>
                <div
                    class="
                        flex
                        relative
                        justify-center
                        xl:absolute xl:right-6
                        bg-gray-100
                        md:bg-transparent
                    "
                >
                    <button
                        class="
                            imprint
                            flex
                            items-center
                            rounded-md
                            nav-button
                            p-2
                            m-l2
                        "
                        @click="prevStep()"
                    >
                        <finger-print-icon
                            class="h-5 w-5 mr-2 invisible md:visible"
                        ></finger-print-icon>
                        Datenschutz
                    </button>
                    <button
                        class="
                            imprint
                            flex
                            items-center
                            rounded-md
                            nav-button
                            p-2
                            ml-6
                        "
                        @click="prevStep()"
                    >
                        <book-open-icon
                            class="h-5 w-5 mr-2 invisible md:visible"
                        ></book-open-icon>
                        Impressum
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { BookOpenIcon, FingerPrintIcon } from '@heroicons/vue/solid'
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/vue/outline'
import { useStore } from 'vuex'

import { version } from '../../package.json'

export default {
    name: 'Navigation',
    components: {
        BookOpenIcon,
        FingerPrintIcon,
        ChevronDoubleLeftIcon,
        ChevronDoubleRightIcon,
    },
    props: {
        currentStep: {
            type: Number,
            default: 1,
        },
        surveySteps: {
            type: Number,
            default: 1,
        },
    },
    emits: ['next-step', 'prev-step'],
    setup(props, { emit }) {
        const store = useStore()
        const nextStep = () => {
            if (props.currentStep < props.surveySteps) {
                console.log('nextStep')
                emit('next-step')
            }
        }
        const prevStep = () => {
            if (props.currentStep > 1) {
                console.log('prevStep')
                emit('prev-step')
            }
            store.dispatch('decCurrentStep')
        }

        return {
            store,
            nextStep,
            prevStep,
            version,
        }
    },
}
</script>

<style scoped></style>
