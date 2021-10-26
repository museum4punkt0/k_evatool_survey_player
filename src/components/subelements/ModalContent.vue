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
                overflow-hidden
            "
        >
            <SurveyElementSubBuilder
                v-if="stepQuestion"
                :content="stepQuestion.step"
                :survey="stepQuestion.step"
                :survey-results="stepQuestion.step"
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
    setup() {
        const store = useStore()

        onMounted(() => {})

        return {
            store,
        }
    },
}
</script>

<style scoped></style>
