<template>
    <div id="app" class="flex justify-center items-center">
        <StarRating :value="rating" :stars="6" @input="setRating" />
    </div>
</template>

<script>
import StarRating from '../subelements/StarRating.vue'
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'

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
        surveyResults: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const rating = ref(0)
        const store = useStore()

        console.log(props.content)
        const setRating = (i) => {
            console.log(i)
            rating.value = i

            console.log(props.surveyResults)
            console.log(
                props.surveyResults.sampleResultPayload.resultData.languageId,
            )

            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: props.content.surveyId,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        rating: rating.value,
                    },
                    uuid: props.surveyResults.uuid,
                    languageId:
                        props.surveyResults.sampleResultPayload.resultData
                            .languageId,
                },
            })
        }
        onMounted(() => {
            let questionResults = props.surveyResults
            rating.value = questionResults.results.pop().result_value.rating
        })
        return { rating, setRating }
    },
}
</script>
