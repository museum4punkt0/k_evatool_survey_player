<template>
    <div class="slider absolute w-full h-full z-50">
        <div
            class="
                relative
                flex
                justify-center
                items-center
                w-full
                h-full
                overflow-x-hidden overflow-y-scroll
            "
        >
            <button class="close-btn" @click="closeModal">
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
import { onMounted } from 'vue'
import { useStore } from 'vuex'

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
    },
    emits: ['confirmed-answer', 'close-modal'],
    setup(props, { emit }) {
        const store = useStore()

        const confirmedAnswer = (id) => {
            emit('confirmed-answer', id)
        }

        const closeModal = () => {
            emit('close-modal')
        }

        onMounted(() => {})

        return {
            store,
            confirmedAnswer,
            closeModal,
        }
    },
}
</script>

<style scoped>
.close-btn {
    position: absolute;
    right: 15px;
    top: 15px;
}
</style>
