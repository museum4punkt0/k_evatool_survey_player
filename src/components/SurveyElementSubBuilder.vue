<template>
    <div
        class="
            survey-content
            flex flex-wrap flex-col
            h-auto
            mt-16
            justify-center
            items-center
            overflow-scroll
        "
    >
        <SurveyElementBinaryQuestion
            v-if="content?.surveyElementType === 'binary'"
            :key="'binary-' + content.id"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
            :sub-element="true"
        ></SurveyElementBinaryQuestion>

        <SurveyElementEmoji
            v-if="content && content.surveyElementType === 'emoji'"
            :key="'emiji-' + content.id"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
            :sub-element="true"
        ></SurveyElementEmoji>

        <SurveyElementMultipleChoice
            v-if="content && content.surveyElementType === 'multipleChoice'"
            :key="'multiplechoice-' + content.id"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
            :sub-element="true"
        ></SurveyElementMultipleChoice>

        <SurveyElementSimpleText
            v-if="content && content.surveyElementType === 'simpleText'"
            :key="'simpletext-' + content.id"
            :content="content"
            :survey="survey"
            :sub-element="true"
        ></SurveyElementSimpleText>

        <SurveyElementStarRating
            v-if="content && content.surveyElementType === 'starRating'"
            :key="'starrating-' + content.id"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
            :sub-element="true"
            @confirm="confirmed"
        ></SurveyElementStarRating>
        <SurveyElementTextInput
            v-if="content && content.surveyElementType === 'textInput'"
            :key="'textinput-' + content.id"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
            :sub-element="true"
        ></SurveyElementTextInput>

        <SurveyElementVoiceInput
            v-if="content && content.surveyElementType === 'voiceInput'"
            :key="'voiceinput-' + content.id"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
            :sub-element="true"
        ></SurveyElementVoiceInput>

        <SurveyElementYayNay
            v-if="content && content.surveyElementType === 'yayNay'"
            :key="'yaynay-' + content.id"
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
            :sub-element="true"
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
