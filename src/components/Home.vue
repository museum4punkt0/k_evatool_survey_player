<template>
    <div>
        <h1 class="text-indigo-">{{ store.state.surveys.survey.name }}</h1>
        <div
            v-for="(step, index) in store.state.surveys.surveySteps"
            :key="'step-element-' + index"
        >
            {{ step }}

            <SurveyElementBinaryQuestion
                v-if="1 < 0"
            ></SurveyElementBinaryQuestion>
            <SurveyElementMultipleChoice
                v-if="1 < 0"
            ></SurveyElementMultipleChoice>
            <SurveyElementStarRating v-if="1 < 0"></SurveyElementStarRating>
            <SurveyElementSimpleText v-if="1 < 0"></SurveyElementSimpleText>

            <div v-if="step.name === 'Video'">
                <SurveyElementVideo :content="step"></SurveyElementVideo>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from 'vue'

import SurveyElementBinaryQuestion from './elements/SurveyElementBinaryQuestion.vue'
import SurveyElementMultipleChoice from './elements/SurveyElementMultipleChoice.vue'
import SurveyElementStarRating from './elements/SurveyElementStarRating.vue'
import SurveyElementSimpleText from './elements/SurveyElementSimpleText.vue'
import SurveyElementVideo from './elements/SurveyElementVideo.vue'
export default {
    name: 'Home',
    components: {
        SurveyElementBinaryQuestion,
        SurveyElementMultipleChoice,
        SurveyElementStarRating,
        SurveyElementSimpleText,
        SurveyElementVideo,
    },
    setup() {
        const store = useStore()
        store.dispatch('surveys/getSurvey', 1)
        store.dispatch('surveys/getSurveySteps', 1)

        const method1 = () => {
            console.log('method1')
        }

        onMounted(() => {
            method1()
        })

        return {
            store,
        }
    },
}
</script>

<style scoped></style>
