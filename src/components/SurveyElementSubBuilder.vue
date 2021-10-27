<template>
    <div
        class="
            survey-content
            flex flex-wrap flex-col
            h-auto
            mt-16
            justify-center
            items-center
        "
    >
        <SurveyElementBinaryQuestion
            v-if="content?.surveyElementType === 'binary'"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
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
            @confirm="confirmed"
        ></SurveyElementStarRating>
        <SurveyElementTextInput
            v-if="content && content.surveyElementType === 'textInput'"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
        ></SurveyElementTextInput>

        <SurveyElementVoiceInput
            v-if="content && content.surveyElementType === 'voiceInput'"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
        ></SurveyElementVoiceInput>

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
import SurveyElementTextInput from './elements/SurveyElementTextInput.vue'
import SurveyElementSimpleText from './elements/SurveyElementSimpleText.vue'
import SurveyElementVoiceInput from './elements/SurveyElementVoiceInput.vue'
import SurveyElementYayNay from './elements/SurveyElementYayNay.vue'

export default {
    name: 'SurveyElementSubBuilder',
    components: {
        SurveyElementBinaryQuestion,
        SurveyElementEmoji,
        SurveyElementMultipleChoice,
        SurveyElementStarRating,
        SurveyElementSimpleText,
        SurveyElementTextInput,
        SurveyElementVoiceInput,
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
