<template>
    <div class="survey-content">
        <SurveyElementBinaryQuestion
            v-if="survey && survey.surveyElementType === 'binary'"
            :content="survey"
        ></SurveyElementBinaryQuestion>

        <SurveyElementEmoji
            v-if="survey && survey.surveyElementType === 'emoji'"
            :content="survey"
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
        ></SurveyElementStarRating>

        <SurveyElementVideo
            v-if="survey && survey.surveyElementType === 'video'"
            :content="survey"
        ></SurveyElementVideo>

        <SurveyElementYayNay
            v-if="survey && survey.surveyElementType === 'yayNay'"
            :content="survey"
        ></SurveyElementYayNay>

        <br />
        {{ survey }}
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
    props: ['survey'],
}
</script>

<style scoped></style>