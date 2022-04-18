<template>
    <div class="slider absolute w-full h-full z-50">
        <div
            class="relative flex justify-center items-center w-full h-full overflow-x-hidden overflow-y-scroll"
        >
            <button class="close-btn tabindex-focus" @click="closeModal">
                <img src="../../assets/close.svg" />
            </button>

            <SurveyElementSubBuilder
                v-if="stepQuestion"
                :content="stepQuestion.step"
                :survey="stepQuestion.step"
                :survey-results="stepQuestion.step"
                @confirmed-answer="confirmedAnswer"
            ></SurveyElementSubBuilder>
        </div>
    </div>
</template>

<script>
import SurveyElementSubBuilder from '../SurveyElementSubBuilder.vue'
import { onMounted, watch } from 'vue'
import { useStore } from 'vuex'
import { ref } from 'vue'

export default {
    name: 'ModalContent',
    components: { SurveyElementSubBuilder },
    props: {
        content: {
            type: Object,
            default: null,
        },
        stepQuestion: {
            type: Object,
            default: null,
        },
        editMode: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['confirmed-answer', 'close-modal'],
    setup(props, { emit }) {
        const store = useStore()
        const displayTime = ref()
        const confirmedAnswer = (id) => {
            emit('confirmed-answer', id)
        }

        const closeModal = () => {
            emit('close-modal')
        }

        const setDelay = () => {
            if (props.stepQuestion.displayTime) {
                displayTime.value = setTimeout(() => {
                    closeModal()
                }, props.stepQuestion.displayTime * 1000)
            }
        }
        onMounted(() => {})

        watch(
            () => props.stepQuestion,
            () => {
                clearTimeout(displayTime.value)
                setDelay()
            },
        )

        return {
            store,
            confirmedAnswer,
            closeModal,
            displayTime,
            setDelay,
        }
    },
}
</script>

<style scoped>
.close-btn {
    position: fixed;
    right: 15px;
    top: 15px;
    z-index: 99999;
}

.slider {
    scrollbar-width: none;
    -ms-overflow-style: none;
}
</style>
