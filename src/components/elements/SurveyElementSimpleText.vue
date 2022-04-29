<template>
    <div>
        <img
            v-if="image"
            class="rounded-xl mb-5"
            :src="image"
            alt="simple text image"
        />
        <h2
            class="tabindex-focus pb-5 m-1"
            :class="
                store.state.showAnimations &&
                'animate__animated animate__fadeInDown'
            "
            tabindex="0"
            v-html="content.params.text[lang]"
        ></h2>

        <qr-code v-if="url" :url="url" />

        <!--        <NextButton-->
        <!--            class="animate__animated animate__fadeIn animate__delay-1s"-->
        <!--            @confirm="nextStep"-->
        <!--        ></NextButton>-->
        <confirm-button
            :class="
                store.state.showAnimations &&
                'animate__animated animate__fadeIn animate__delay-1s'
            "
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
import QrCode from '../subelements/QrCode.vue'

export default {
    name: 'SurveyElementSimpleText',
    components: { QrCode, ConfirmButton },
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

        const image = ref(props.content.params?.imageAsset?.urls?.original)
        const url = ref(props.content.params?.url)

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
            setTimeout(() => {
                document.querySelector('h2').focus()
            }, 500)
        })

        return {
            lang,
            store,
            route,
            simpleText,
            allowSkip,
            resultBasedNextSteps,
            nextStep,
            image,
            url,
        }
    },
}
</script>

<style scoped>
/*textarea {*/
/*    resize: none;*/
/*    box-sizing: border-box;*/
/*    outline: none;*/
/*}*/
</style>
