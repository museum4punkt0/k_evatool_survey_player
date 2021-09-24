<template>
    <div class="survey-content">
        <SurveyElementBinaryQuestion
            v-if="survey && survey.surveyElementType === 'binary'"
            :content="survey"
        ></SurveyElementBinaryQuestion>

        <SurveyElementEmoji
            v-if="survey && survey.surveyElementType === 'emoji'"
            :content="survey"
            :survey-results="surveyResults"
        ></SurveyElementEmoji>

        <SurveyElementMultipleChoice
            v-if="survey && survey.surveyElementType === 'multipleChoice'"
            :content="survey"
        ></SurveyElementMultipleChoice>

        <SurveyElementSimpleText
            v-if="survey && survey.surveyElementType === 'simpleText'"
            :content="survey"
        ></SurveyElementSimpleText>

        <SurveyElementStarRating
            v-if="survey && survey.surveyElementType === 'starRating'"
            :content="survey"
            :survey-results="surveyResults"
        ></SurveyElementStarRating>

        <SurveyElementVideo
            v-if="survey && survey.surveyElementType === 'video'"
            :content="survey"
        ></SurveyElementVideo>

        <SurveyElementYayNay
            v-if="survey && survey.surveyElementType === 'yayNay'"
            :content="survey"
            :survey-results="surveyResults"
        ></SurveyElementYayNay>

        <!--        <br />-->
        <!--        {{ survey }}-->
    </div>
</template>

<script>
import SurveyElementBinaryQuestion from './elements/SurveyElementBinaryQuestion.vue'
import SurveyElementEmoji from './elements/SurveyElementEmoji.vue'
import SurveyElementMultipleChoice from './elements/SurveyElementMultipleChoice.vue'
import SurveyElementStarRating from './elements/SurveyElementStarRating.vue'
import SurveyElementSimpleText from './elements/SurveyElementSimpleText.vue'
import SurveyElementVideo from './elements/SurveyElementVideo.vue'
import SurveyElementYayNay from './elements/SurveyElementYayNay.vue'

export default {
    name: 'SurveyElementBuilder',
    components: {
        SurveyElementBinaryQuestion,
        SurveyElementEmoji,
        SurveyElementMultipleChoice,
        SurveyElementStarRating,
        SurveyElementSimpleText,
        SurveyElementVideo,
        SurveyElementYayNay,
    },
    props: {
        survey: {
            type: Object,
            default: null,
        },
        surveyResults: {
            type: Object,
            default: null,
        },
    },
}
</script>

<style scoped></style>
