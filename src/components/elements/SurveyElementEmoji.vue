<template>
    <h2
        class="pb-5 m-1 animate__animated animate__fadeInDown"
        tabindex="0"
        v-html="content.params.question[lang]"
    ></h2>
    <div
        class="
            flex
            mb-2
            ml-1
            justify-center
            items-center
            animate__animated animate__fadeInUp
        "
        role="radiogroup"
    >
        <div
            v-for="(emoji, index) in surveyResults.params.emojis"
            :key="'emoji-' + index"
            class="cursor-pointer emoji"
            role="radio"
            :aria-pressed="result === emoji.meaning"
            tabindex="0"
            @click="setResult(emoji.meaning)"
            @keydown="setKeyValue(emoji.meaning, $event)"
        >
            <span
                class="p-5 text-3xl"
                :class="{ selected: result === emoji.meaning }"
            >
                {{ emoji.type }}
            </span>
        </div>
    </div>

    <confirm-button
        class="animate__animated animate__fadeIn animate__delay-1s"
        :sub-element="subElement"
        @confirm="nextStep"
    ></confirm-button>
</template>

<script>
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/vue/outline'
import { computed, ref, watch } from 'vue'
import { useStore } from 'vuex'
import { onMounted } from 'vue'
import ConfirmButton from '../subelements/ConfirmButton.vue'
import { useRoute } from 'vue-router'

export default {
    name: 'SurveyElementEmoji',
    components: {
        EmojiHappyIcon,
        EmojiSadIcon,
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
        const result = ref()
        const route = useRoute()
        const store = useStore()

        const lang = computed({
            get: () => store.state.lang,
        })
        const setKeyValue = (value, event) => {
            if (event.type === 'keydown') {
                if (event.keyCode === 32) {
                    result.value = value
                    setResult(value)
                }
            }
        }

        const setResult = async (i) => {
            result.value = i
            await store.dispatch('surveyResults/sendSurveyResults', {
                surveyId: route.query.survey,
                data: {
                    surveyStepId: props.content.id,
                    resultValue: {
                        meaning: result.value,
                    },
                    uuid: props.surveyResults.uuid,
                    resultLanguage: store.state.lang,
                },
            })
            await store.dispatch('setStepAnswering', true)
        }

        const nextStep = async () => {
            await store.dispatch('setCurrentStep')
        }
        watch(
            () => result.value,
            () => {
                store.dispatch('setStepAnswering', true)
            },
        )
        onMounted(() => {
            let questionResults = props.surveyResults
            console.log(questionResults.results)
            // result.value = questionResults.results.pop().result_value.meaning

            if (questionResults.resultByUuid) {
                result.value = questionResults.resultByUuid.meaning
            }
            // else {
            //     result.value = questionResults.resultByUuid.meaning
            // }
            document.querySelector('h2').focus()
        })

        return {
            result,
            route,
            store,
            lang,
            setResult,
            nextStep,
            setKeyValue,
        }
    },
}
</script>

<style scoped>
.selected {
    border-bottom: 2px solid blue;
}
.emoji:focus {
    outline: 3px solid blue;
}
</style>
