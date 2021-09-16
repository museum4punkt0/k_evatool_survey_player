<template>
    <SurveyElementBinaryQuestion v-if="1 < 0"></SurveyElementBinaryQuestion>
    <SurveyElementMultipleChoice v-if="1 < 0"></SurveyElementMultipleChoice>
    <SurveyElementStarRating
        v-if="survey && survey.surveyElementType === 'starRating'"
    ></SurveyElementStarRating>
    <SurveyElementSimpleText v-if="1 < 0"></SurveyElementSimpleText>

    {{ survey }}
    <div v-if="survey && survey.surveyElementType === 'video'">
        <SurveyElementVideo :content="survey"></SurveyElementVideo>
    </div>
</template>

<script>
import SurveyElementBinaryQuestion from './elements/SurveyElementBinaryQuestion.vue'
import SurveyElementMultipleChoice from './elements/SurveyElementMultipleChoice.vue'
import SurveyElementStarRating from './elements/SurveyElementStarRating.vue'
import SurveyElementSimpleText from './elements/SurveyElementSimpleText.vue'
import SurveyElementVideo from './elements/SurveyElementVideo.vue'

export default {
    name: 'SurveyElementBuilder',
    components: {
        SurveyElementBinaryQuestion,
        SurveyElementMultipleChoice,
        SurveyElementStarRating,
        SurveyElementSimpleText,
        SurveyElementVideo,
    },
    props: ['survey'],
}
</script>

<style scoped></style>
