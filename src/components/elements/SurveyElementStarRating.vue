<template>
    <h2 class="pb-5" v-html="content.params.question[lang]"></h2>
    <StarRating
        :value="rating"
        :stars="content.params.numberOfStars"
        :params="content.params"
        :labels="labels"
        @input="setRating"
    />

    <confirm-button
        :sub-element="subElement"
        @confirm="nextStep"
    ></confirm-button>
</template>

<script>
import StarRating from '../subelements/StarRating.vue'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
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
        subElement: {
            type: Boolean,
            default: false,
        },
    },

    setup(props) {
        const rating = ref(0)
        const store = useStore()
        const route = useRoute()
        const labels = ref()
        labels.value = [
            props.content.params.lowestValueLabel,
            props.content.params.middleValueLabel,
            props.content.params.highestValueLabel,
        ]

        const lang = computed({
            get: () => store.state.lang,
        })

        const nextStep = () => {
            store.dispatch('setCurrentStep')
        }

        const setRating = (i) => {
            rating.value = i
            store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.survey,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        rating: rating.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguage: store.state.lang,
                },
            })
        }

        watch(
            () => rating.value,
            () => {
                store.dispatch('setStepAnswering', true)
            },
        )

        onMounted(() => {
            let questionResults = props.surveyResults
            // console.log(props.survey)
            // console.log(questionResults)
            // console.log(store.state.surveyResults.surveyResults)
            // console.log(rating)
            // rating.value = questionResults.results.pop().result_value.rating

            if (questionResults.resultByUuid) {
                rating.value = questionResults.resultByUuid.rating
            } else {
                //rating.value = questionResults.resultByUuid.rating
            }
        })

        return { lang, labels, rating, setRating, nextStep }
    },
}
</script>
<style scoped></style>
