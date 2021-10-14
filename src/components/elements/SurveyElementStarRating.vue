<template>
    <h2 class="pb-5" v-html="content.params.question[lang]"></h2>
    <StarRating
        :value="rating"
        :stars="content.params.numberOfStars"
        :labels="labels"
        @input="setRating"
        @confirm="nextStep"
    />

    <confirm-button></confirm-button>
</template>

<script>
import StarRating from '../subelements/StarRating.vue'
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'
import ConfirmButton from '../subelements/ConfirmButton.vue'

export default {
    name: 'SurveyElementStarRating',
    components: {
        StarRating,
        ConfirmButton,
    },
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
    },
    emits: ['next-step'],
    setup(props, { emit }) {
        const rating = ref(0)
        const store = useStore()
        const route = useRoute()
        const labels = ref({})
        labels.value = ['Wenig', 'Mittel', 'Viel']

        const lang = computed({
            get: () => store.state.lang,
        })

        console.log(props.content)
        const nextStep = (i) => {
            emit('next-step')
        }

        const setRating = (i) => {
            console.log(i)
            rating.value = i

            console.log(props.surveyResults)
            console.log(props.surveyResults.sampleResultPayload.resultData)

            console.log(props.content)
            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.id,
                // resultLanguageId:
                //     props.surveyResults.sampleResultPayload.resultData
                //         .resultLanguageId,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        rating: rating.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguageId:
                        props.surveyResults.sampleResultPayload.resultData
                            .resultLanguageId,
                },
            })

            // let questionResults = props.surveyResults
            // rating.value = questionResults.results.pop().result_value.rating
        }
        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults)
            // rating.value = questionResults.results.pop().result_value.rating
        })
        return { lang, labels, rating, setRating, nextStep }
    },
}
</script>
<style scoped></style>
