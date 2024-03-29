<template>
    <h2
        class="tabindex-focus pb-5 m-1"
        :class="
            store.state.showAnimations &&
            'animate__animated animate__fadeInDown'
        "
        tabindex="0"
        v-html="content.params.question[lang]"
    ></h2>
    <!--    {{ content.params }}-->
    <!--    grades-->
    <div v-if="content.params.displayType === 'grades'" class="w-full">
        <div class="px-2 w-full">
            <div
                class="flex w-full justify-between mb-3 mt-5"
                tabindex="0"
                :aria-label="
                    t('aria_label_school_grades', {
                        grades: parseInt(content.params.numberOfStars),
                    })
                "
            >
                <label
                    v-for="note in 6"
                    :key="note"
                    class="inline-flex flex-col flex-wrap items-center py-2 tabindex-focus"
                    role="radio"
                    :aria-checked="note === rating"
                    tabindex="0"
                    @keydown="setKeyValue(note, $event)"
                >
                    <input
                        v-model="selectedNote"
                        type="radio"
                        class="form-radio"
                        name="accountType"
                        :value="note"
                        tabindex="-1"
                        @change="setRating(note)"
                    />
                    <span class="mt-2">{{ note }}</span>
                </label>
            </div>
        </div>
    </div>
    <!--    neutral-->
    <div v-else-if="content.params.displayType === 'neutral'" class="w-full">
        <div class="px-2 w-full">
            <div
                class="flex w-full justify-between mb-3"
                tabindex="0"
                :aria-label="getLabels(labels)"
            >
                <label
                    v-for="note in parseInt(content.params.numberOfStars)"
                    :key="note"
                    class="inline-flex flex-col flex-wrap items-center py-2 tabindex-focus"
                    :aria-checked="note === rating"
                    tabindex="0"
                    role="radio"
                    :aria-label="
                        note +
                        t('aria_label_of') +
                        parseInt(content.params.numberOfStars)
                    "
                    @keydown="setKeyValue(note, $event)"
                >
                    <input
                        v-model="selectedNote"
                        type="radio"
                        class="form-radio"
                        name="accountType"
                        :value="note"
                        tabindex="-1"
                        @change="setRating(note)"
                    />
                </label>
            </div>
            <div class="labels flex justify-between w-full">
                <p
                    v-for="(label, index) in labels"
                    :key="'emoji-label-' + index"
                    class="emoji-label"
                >
                    {{ label[lang] }}
                </p>
            </div>
        </div>
    </div>
    <!--    starts-->
    <StarRating
        v-else
        :class="
            store.state.showAnimations && 'animate__animated animate__fadeInUp'
        "
        :value="rating"
        :stars="content.params.numberOfStars"
        :params="content.params"
        :labels="labels"
        @input="setRating"
    />

    <confirm-button
        :class="
            store.state.showAnimations &&
            'animate__animated animate__fadeIn animate__delay-1s'
        "
        :sub-element="subElement"
        :disabled="!rating"
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
import { useI18n } from 'vue-i18n'

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
        const { t } = useI18n()
        labels.value = [
            props.content.params.lowestValueLabel,
            props.content.params.middleValueLabel,
            props.content.params.highestValueLabel,
        ]

        const lang = computed({
            get: () => store.state.lang,
        })

        const setKeyValue = (value, event) => {
            if (event.type === 'keydown') {
                if (event.keyCode === 32) {
                    selectedNote.value = value
                    setRating(value)
                }
            }
        }

        const nextStep = async () => {
            await store.dispatch('setCurrentStep')
        }

        const setRating = async (i) => {
            rating.value = i
            await store.dispatch('surveyResults/sendSurveyResults', {
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
            await store.dispatch('setStepAnswering', true)
        }

        const getLabels = (labels) => {
            let ariaLabel = t('aria_label_stars_neutral_from_to', {
                rating: props.content.params.numberOfStars,
            })
            labels.forEach((label) => {
                ariaLabel += ', ' + label[lang.value]
            })

            return ariaLabel
        }

        watch(
            () => rating.value,
            () => {
                store.dispatch('setStepAnswering', true)
            },
        )

        onMounted(() => {
            let questionResults = props.surveyResults

            if (questionResults.resultByUuid) {
                rating.value = questionResults.resultByUuid.rating
            } else {
                //rating.value = questionResults.resultByUuid.rating
            }

            setTimeout(() => {
                document.querySelector('h2').focus()
            }, 500)
        })

        return {
            t,
            lang,
            labels,
            rating,
            selectedNote,
            setRating,
            store,
            nextStep,
            setKeyValue,
            getLabels,
        }
    },
}
</script>
<style scoped>
.emoji-label {
    flex-basis: 100%;
}

.emoji-label:nth-child(1) {
    text-align: left;
}

.emoji-label:nth-child(2) {
    text-align: center;
}

.emoji-label:nth-child(3) {
    text-align: right;
}
</style>
