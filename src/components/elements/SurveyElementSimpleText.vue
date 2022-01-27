<template>
    <div class="px-5">
        <h2
            class="pb-5 m-1 animate__animated animate__fadeInDown"
            tabindex="0"
            v-html="content.params.text[lang]"
        ></h2>
        <!--        <NextButton-->
        <!--            class="animate__animated animate__fadeIn animate__delay-1s"-->
        <!--            @confirm="nextStep"-->
        <!--        ></NextButton>-->
        <confirm-button
            class="animate__animated animate__fadeIn animate__delay-1s"
            @confirm="nextStep"
        ></confirm-button>
    </div>
</template>

<script>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'
// import NextButton from '../subelements/NextButton.vue'
import ConfirmButton from '../subelements/ConfirmButton.vue'
import { useRoute } from 'vue-router'

export default {
    name: 'SurveyElementSimpleText',
    components: { ConfirmButton },
    props: {
        content: {
            type: Object,
            default: () => {},
        },
        survey: {
            type: Object,
            default: () => {},
        },
        surveyResults: {
            type: Object,
            default: () => {},
        },
        subElement: {
            type: Boolean,
            default: false,
        },
    },
    setup(props) {
        const simpleText = ref()
        const store = useStore()
        const route = useRoute()
        const allowSkip = ref(props.content.allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)
        const lang = computed({
            get: () => store.state.lang,
        })

        const nextStep = async () => {
            await store.dispatch('setStepAnswering', true)
            await store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.survey,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        read: true,
                    },
                    uuid: localStorage.getItem('surveyUuid'),
                    resultLanguage: store.state.lang,
                },
            })

            if (props.subElement) {
                await store.dispatch('setCurrentVideoStep')
            } else {
                await store.dispatch('setCurrentStep')
            }
        }

        onMounted(() => {
            store.dispatch('setStepAnswering', true)
            document.querySelector('h2').focus()
        })

        return {
            lang,
            store,
            route,
            simpleText,
            allowSkip,
            resultBasedNextSteps,
            nextStep,
        }
    },
}
</script>

<style scoped>
textarea {
    resize: none;
    box-sizing: border-box;
    outline: none;
}
</style>
