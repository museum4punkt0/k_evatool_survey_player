<template>
    <div class="survey-content">
        <SurveyElementBinaryQuestion
            v-if="content && content.surveyElementType === 'binary'"
            :content="content"
            :survey="survey"
        ></SurveyElementBinaryQuestion>

        <SurveyElementEmoji
            v-if="content && content.surveyElementType === 'emoji'"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
        ></SurveyElementEmoji>

        <SurveyElementMultipleChoice
            v-if="content && content.surveyElementType === 'multipleChoice'"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
        ></SurveyElementMultipleChoice>

        <SurveyElementSimpleText
            v-if="content && content.surveyElementType === 'simpleText'"
            :content="content"
            :survey="survey"
        ></SurveyElementSimpleText>

        <SurveyElementStarRating
            v-if="content && content.surveyElementType === 'starRating'"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
        ></SurveyElementStarRating>

        <SurveyElementVideo
            v-if="content && content.surveyElementType === 'video'"
            :content="content"
            :survey="survey"
        ></SurveyElementVideo>

        <SurveyElementYayNay
            v-if="content && content.surveyElementType === 'yayNay'"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
        ></SurveyElementYayNay>
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
        content: {
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
