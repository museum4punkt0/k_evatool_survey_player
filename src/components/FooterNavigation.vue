<template>
    <div class="survey-navigation-inner flex justify-center items-center h-16">
        <button
            class="prev flex items-center rounded-md nav-button p-2 bg-gray-200"
            @click="prevStep()"
        >
            <chevron-double-left-icon
                class="h-5 w-5 mr-1"
            ></chevron-double-left-icon>
            Zurück
        </button>
        <span class="mx-4 p-0">{{ currentStep }}/{{ surveySteps }}</span>
        <button
            class="next flex items-center rounded-md nav-button p-2 bg-gray-200"
            @click="nextStep()"
        >
            Weiter
            <chevron-double-right-icon
                class="h-5 w-5 ml-1s"
            ></chevron-double-right-icon>
        </button>
    </div>
</template>

<script>
import {
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
} from '@heroicons/vue/outline'

export default {
    name: 'Navigation',
    components: { ChevronDoubleLeftIcon, ChevronDoubleRightIcon },
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
        }

        return {
            nextStep,
            prevStep,
        }
    },
}
</script>

<style scoped></style>
