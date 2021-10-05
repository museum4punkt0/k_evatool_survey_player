<template>
    <div
        class="
            focus:ring-indigo-500
            relative
            flex
            items-start
            py-4
            px-7
            mb-3
            w-auto
            bg-white
            rounded-xl
        "
        :class="
            selected ? 'border-blue-700 border-2' : 'border-gray-900 border-2'
        "
        @click="selected = !selected"
    >
        <div class="flex items-center">
            <span
                class="h-6 w-6 rounded"
                :class="
                    selected
                        ? 'border-blue-700 border-2 bg-blue-700'
                        : 'border-gray-900 border-2'
                "
            >
                <check-icon v-if="selected" class="text-white" />
            </span>
        </div>
        <div class="ml-3 text-sm">
            <label
                class="font-medium text-gray-700"
                :class="{ 'text-blue-700': selected }"
            >
                {{ label }}
            </label>
        </div>
    </div>
</template>

<script>
import { CheckIcon } from '@heroicons/vue/outline'

export default {
    name: 'SelectButton',
    components: {
        CheckIcon,
    },
    props: {
        label: {
            type: String,
            default: '',
        },
    },
    setup() {
        /*
        watch(
            () => selectedOptions.value,
            (value) => {
                console.log(value)
                store.dispatch('surveyResults/sendSurveyResults', {
                    surveyId: props.content.surveyId,
                    // resultLanguageId:
                    //     props.surveyResults.sampleResultPayload.resultData
                    //         .resultLanguageId,
                    data: {
                        surveyStepId: props.content.id,
                        resultValue: {
                            selected: selectedOptions.value,
                        },
                        uuid: props.surveyResults.uuid,
                        resultLanguageId:
                        props.surveyResults.sampleResultPayload.resultData
                            .resultLanguageId,
                    },
                })
            },
        )*/

        return {}
    },
    data() {
        return {
            selected: false,
        }
    },
}
</script>

<style scoped></style>
