<template>
    <h2
        class="pb-5 animate__animated animate__fadeInDown"
        v-html="content.params.question[lang]"
    ></h2>
    <!--    {{ content.params }}-->
    <!--    grades-->
    <div v-if="content.params.displayType === 'grades'">
        <div class="mx-2">
            <label
                v-for="note in 6"
                class="inline-flex flex-col flex-wrap w-12 mx-3 items-center"
            >
                <input
                    v-model="selectedNote"
                    type="radio"
                    class="form-radio"
                    name="accountType"
                    :value="note"
                    @change="setAnswer(note)"
                />
                <span class="mt-2">{{ note }}</span>
            </label>
        </div>
    </div>
    <!--    neutral-->
    <div v-else-if="content.params.displayType === 'neutral'">
        <div class="mx-2">
            <div class="flex w-full justify-between mb-3">
                <label
                    v-for="note in parseInt(content.params.numberOfStars)"
                    class="
                        inline-flex
                        flex-col flex-wrap
                        w-12
                        mx-3
                        items-center
                    "
                >
                    <input
                        v-model="selectedNote"
                        type="radio"
                        class="form-radio"
                        name="accountType"
                        :value="note"
                        @change="setAnswer(note)"
                    />
                </label>
            </div>
            <div class="labels flex justify-between w-full">
                <p
                    v-for="(label, index) in labels"
                    :key="'emoji-label-' + index"
                >
                    {{ label[lang] }}
                </p>
            </div>
        </div>
    </div>
    <!--    starts-->
    <StarRating
        v-else
        class="animate__animated animate__fadeInUp"
        :value="rating"
        :stars="content.params.numberOfStars"
        :params="content.params"
        :labels="labels"
        @input="setAnswer"
    />

    <confirm-button
        class="animate__animated animate__fadeIn animate__delay-1s"
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
        const selectedNote = ref()
        labels.value = [
            props.content.params.lowestValueLabel,
            props.content.params.middleValueLabel,
            props.content.params.highestValueLabel,
        ]

        const lang = computed({
            get: () => store.state.lang,
        })

        const nextStep = async () => {
            await setRating()
            store.dispatch('setCurrentStep')
        }
        const setAnswer = (i) => {
            rating.value = i
        }
        const setRating = () => {
            // rating.value = i
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

        return {
            lang,
            labels,
            rating,
            selectedNote,
            setRating,
            nextStep,
            setAnswer,
        }
    },
}
</script>
<style scoped></style>
