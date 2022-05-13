<template>
    <div class="px-5">
        <ul class="hidden items-center md:flex">
            <li v-for="index in surveyPath?.maxCount" :key="index" class="mx-1">
                <div
                    v-if="index <= surveyPath?.doneCount"
                    class="p-[5px] bg-blue-900 rounded-full"
                ></div>
                <div
                    v-if="index === surveyPath?.currentStepNumber"
                    class="relative border-2 border-blue-900 rounded-full p-2.5"
                >
                    <p
                        class="flex justify-center items-center absolute text-blue-900 font-bold top-0 left-0 right-0 bottom-0"
                    >
                        <span>{{ index }}</span>
                    </p>
                </div>
                <div
                    v-if="index > surveyPath?.currentStepNumber"
                    class="p-[5px] bg-gray-300 rounded-full"
                ></div>
            </li>
        </ul>
        <div class="bg-gray-300 px-3 py-2 rounded-md font-bold md:hidden">
            {{ surveyPath?.currentStepNumber }} / {{ surveyPath?.maxCount }}
        </div>
    </div>
</template>
<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
    name: 'ProgressSteps',

    setup() {
        const store = useStore()
        const surveyPath = computed(
            () => store.state['surveyResults'].surveyPath,
        )

        return { surveyPath }
    },
}
</script>
