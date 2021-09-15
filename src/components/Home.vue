<template>
    <div class="main-page">
        <div class="survey-steps">
            <h1 class="text-indigo-">{{ store.state.surveys.survey.name }}</h1>
        </div>
        <SurveyElementBinaryQuestion v-if="1 < 0"></SurveyElementBinaryQuestion>
        <SurveyElementMultipleChoice v-if="1 < 0"></SurveyElementMultipleChoice>
        <SurveyElementStarRating v-if="1 < 0"></SurveyElementStarRating>
        <SurveyElementSimpleText v-if="1 < 0"></SurveyElementSimpleText>
        {{ store.state.surveys.surveySteps[page] }}
        {{ store.state.surveys.surveySteps[page].name }}
        {{ page }}
        <div v-if="store.state.surveys.surveySteps[page].name === 'Video'">
            <SurveyElementVideo
                :content="store.state.surveys.surveySteps[page]"
            ></SurveyElementVideo>
        </div>
        <div class="survey-navigation">
            <SurveyNavigation
                @next-step="nextStep()"
                @prev-step="prevStep()"
            ></SurveyNavigation>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'

import SurveyElementBinaryQuestion from './elements/SurveyElementBinaryQuestion.vue'
import SurveyElementMultipleChoice from './elements/SurveyElementMultipleChoice.vue'
import SurveyElementStarRating from './elements/SurveyElementStarRating.vue'
import SurveyElementSimpleText from './elements/SurveyElementSimpleText.vue'
import SurveyElementVideo from './elements/SurveyElementVideo.vue'
import SurveyNavigation from './SurveyNavigation.vue'
import { ref } from '@vue/reactivity'

export default {
    name: 'Home',
    components: {
        SurveyElementBinaryQuestion,
        SurveyElementMultipleChoice,
        SurveyElementStarRating,
        SurveyElementSimpleText,
        SurveyElementVideo,
        SurveyNavigation,
    },
    setup() {
        const page = ref(0)
        const store = useStore()
        store.dispatch('surveys/getSurvey', 1)
        store.dispatch('surveys/getSurveySteps', 1)

        const nextStep = () => {
            console.log('nextStep')
            page.value++
        }
        const prevStep = () => {
            console.log('prevStep')
            page.value--
        }

        return {
            page,
            store,
            nextStep,
            prevStep,
        }
    },
}
</script>

<style scoped></style>
