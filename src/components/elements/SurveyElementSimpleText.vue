<template>
    <div class="simple-text-element mx-auto">
        <p>SurveyElementSimpleText</p>
        <input v-model="simpleText" placeholder="type you answer here" />
        <p>Message is: {{ simpleText }}</p>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'

export default {
    name: 'SurveyElementSimpleText',
    props: {
        content: {
            type: Object,
            default: () => {},
        },
    },
    setup(props) {
        const simpleText = ref()
        const allowSkip = ref(props.content.allowSkip)
        const resultBasedNextSteps = ref(props.content.resultBasedNextSteps)

        return {
            simpleText,
            allowSkip,
            resultBasedNextSteps,
        }
    },
}
</script>

<style scoped></style>
