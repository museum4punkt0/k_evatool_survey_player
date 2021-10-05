<template>
    <div class="flex flex-wrap flex-col h-96 mt-16 justify-center items-center">
        <p class="pb-5">
            {{ content.params.question[lang] }}
        </p>
        <StarRating
            :value="rating"
            :stars="content.params.numberOfStars"
            :labels="labels"
            @input="setRating"
            @confirm="nextStep"
        />
    </div>
</template>

<script>
import StarRating from '../subelements/StarRating.vue'
import { computed, ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'
import { useRoute } from 'vue-router'

export default {
    name: 'SurveyElementStarRating',
    components: {
        StarRating,
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
    // emits: ['next-step'],
    setup(props) {
        const rating = ref(0)
        const store = useStore()
        const route = useRoute()
        const labels = ref({})
        labels.value = ['Wenig', 'Mittle', 'Viel']

        const lang = computed({
            get: () => store.state.lang,
        })

        console.log(props.content)
        // const nextStep = (i) => {
        //     emit('next-step')
        // }

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
        return { lang, labels, rating, setRating }
    },
}
</script>
<style scoped></style>
