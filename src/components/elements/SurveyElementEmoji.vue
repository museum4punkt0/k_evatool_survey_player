<template>
    <div>
        <p>SurveyElementEmoji</p>
        <emoji-happy-icon class="h-8 w-8" />
        <emoji-sad-icon class="h-8 w-8" />
    </div>
</template>

<script>
import { EmojiHappyIcon, EmojiSadIcon } from '@heroicons/vue/outline'

export default {
    name: 'SurveyElementEmoji',
    components: {
        EmojiHappyIcon,
        EmojiSadIcon,
    },
    content: {
        type: Object,
        default: () => {},
    },
}
</script>

<style scoped></style>
