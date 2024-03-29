<template>
    <div
        v-if="content?.surveyElementType !== 'video'"
        class="survey-content flex flex-wrap xl:flex-col md:h-full md:mt-0 justify-center items-center h-full overflow-scroll"
    >
        <div
            class="flex items-start w-full xl:mt-0 xl:w-1/3 md:mt-0 md:w-1/2 survey-content-inner bg-white rounded-2xl p-6"
            :class="{
                ' overflow-y-scroll flex-col':
                    content && content.surveyElementType !== 'yayNay',
                'h-full xl:pt-0 pb-3':
                    content && content.surveyElementType === 'yayNay',
            }"
        >
            <survey-done
                v-if="
                    store.state.surveyResults.surveyUuidResults?.survey
                        ?.statusByUuid?.currentStep === -1
                "
            />
            <template v-else>
                <SurveyElementBinaryQuestion
                    v-if="content?.surveyElementType === 'binary'"
                    :key="'binary-' + content.id"
                    :content="content"
                    :survey="survey"
                    :survey-results="surveyResults"
                ></SurveyElementBinaryQuestion>

                <SurveyElementEmoji
                    v-if="content && content.surveyElementType === 'emoji'"
                    :key="'emoji-' + content.id"
                    :content="content"
                    :survey="survey"
                    :survey-results="surveyResults"
                ></SurveyElementEmoji>

                <SurveyElementMultipleChoice
                    v-if="
                        content &&
                        content.surveyElementType === 'multipleChoice'
                    "
                    :key="'multiplechoice-' + content.id"
                    :content="content"
                    :survey="survey"
                    :survey-results="surveyResults"
                ></SurveyElementMultipleChoice>

                <SurveyElementSimpleText
                    v-if="content && content.surveyElementType === 'simpleText'"
                    :key="'simpletext-' + content.id"
                    :content="content"
                    :survey="survey"
                    :survey-results="surveyResults"
                ></SurveyElementSimpleText>

                <SurveyElementStarRating
                    v-if="content && content.surveyElementType === 'starRating'"
                    :key="'starrating-' + content.id"
                    :content="content"
                    :survey="survey"
                    :survey-results="surveyResults"
                ></SurveyElementStarRating>
                <SurveyElementTextInput
                    v-if="content && content.surveyElementType === 'textInput'"
                    :key="'textinput-' + content.id"
                    :content="content"
                    :survey="survey"
                    :survey-results="surveyResults"
                ></SurveyElementTextInput>

                <SurveyElementVoiceInput
                    v-if="content && content.surveyElementType === 'voiceInput'"
                    :key="'voiceinput-' + content.id"
                    :content="content"
                    :survey="survey"
                    :survey-results="surveyResults"
                ></SurveyElementVoiceInput>

                <SurveyElementYayNay
                    v-if="content && content.surveyElementType === 'yayNay'"
                    :key="'yaynay-' + content.id"
                    :content="content"
                    :survey="survey"
                    :survey-results="surveyResults"
                ></SurveyElementYayNay>
            </template>
        </div>
    </div>
    <div
        v-if="content && content.surveyElementType === 'video'"
        class="bg-gray-200 font-sans h-full w-full md:flex flex-col justify-center items-center"
    >
        <SurveyElementVideo
            :content="content"
            :survey="survey"
            :survey-results="surveyResults"
        ></SurveyElementVideo>
    </div>
</template>

<script>
import SurveyElementBinaryQuestion from './elements/SurveyElementBinaryQuestion.vue'
import SurveyElementEmoji from './elements/SurveyElementEmoji.vue'
import SurveyElementMultipleChoice from './elements/SurveyElementMultipleChoice.vue'
import SurveyElementStarRating from './elements/SurveyElementStarRating.vue'
import SurveyElementTextInput from './elements/SurveyElementTextInput.vue'
import SurveyElementSimpleText from './elements/SurveyElementSimpleText.vue'
import SurveyElementVideo from './elements/SurveyElementVideo.vue'
import SurveyElementVoiceInput from './elements/SurveyElementVoiceInput.vue'
import SurveyElementYayNay from './elements/SurveyElementYayNay.vue'
import SurveyDone from './SurveyDone.vue'
import { useStore } from 'vuex'
import { onMounted, watch } from 'vue'

export default {
    name: 'SurveyElementBuilder',
    components: {
        SurveyDone,
        SurveyElementBinaryQuestion,
        SurveyElementEmoji,
        SurveyElementMultipleChoice,
        SurveyElementStarRating,
        SurveyElementSimpleText,
        SurveyElementTextInput,
        SurveyElementVideo,
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
        result: {
            type: Object,
            default: null,
        },
    },
    setup(prop) {
        const store = useStore()

        onMounted(() => {
            document.querySelector('.survey-content-inner').scrollTo(0, 0)
            window.scrollTo(0, 0)
        })
        watch(
            () => prop.content,
            () => {
                setTimeout(() => {
                    document
                        .querySelector('.survey-content-inner')
                        .scrollTo(0, 0)
                    window.scrollTo(0, 0)
                }, 1000)
            },
        )

        return { store }
    },
}
</script>

<style lang="scss" scoped>
.survey-content-inner {
    scrollbar-width: none;
}
</style>
