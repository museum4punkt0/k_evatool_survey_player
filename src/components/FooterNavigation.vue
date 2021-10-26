<template>
    <div class="survey-navigation-inner flex items-center h-16">
        <div class="ml-3 text-sm text-gray-500">{{ version }}</div>
        <div class="flex items-center justify-center w-screen">
            <button
                class="
                    prev
                    flex
                    items-center
                    rounded-md
                    nav-button
                    p-2
                    bg-gray-200
                "
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
                class="
                    next
                    flex
                    items-center
                    rounded-md
                    nav-button
                    p-2
                    bg-gray-200
                "
                @click="nextStep()"
            >
                Weiter
                <chevron-double-right-icon
                    class="h-5 w-5 ml-2"
                ></chevron-double-right-icon>
            </button>
            <div class="flex absolute right-6">
                <button
                    class="
                        imprint
                        flex
                        items-center
                        rounded-md
                        nav-button
                        p-2
                        m-l2
                        bg-gray-200
                    "
                    @click="prevStep()"
                >
                    <finger-print-icon class="h-5 w-5 mr-2"></finger-print-icon>
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
                        bg-gray-200
                    "
                    @click="prevStep()"
                >
                    <book-open-icon class="h-5 w-5 mr-2"></book-open-icon>
                    Impressum
                </button>
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
