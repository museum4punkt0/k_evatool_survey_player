<template>
    <h2
        class="pb-5 animate__animated animate__fadeInDown"
        v-html="content.params.question[lang]"
    ></h2>
    <div
        class="
            flex
            mb-2
            justify-center
            items-center
            animate__animated animate__fadeInUp
        "
    >
        <div
            v-for="(emoji, index) in surveyResults.params.emojis"
            :key="'emoji-' + index"
            class="cursor-pointer"
            @click="setResult(emoji.meaning)"
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
        @confirm="confirm"
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
        const setResult = async (i) => {
            console.log(i)
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
        const lang = computed({
            get: () => store.state.lang,
        })

        const confirm = async () => {
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
        })

        return {
            result,
            route,
            store,
            lang,
            setResult,
            confirm,
        }
    },
}
</script>

<style scoped>
.selected {
    border-bottom: 2px solid blue;
}
</style>
