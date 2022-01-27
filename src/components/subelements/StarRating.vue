<template>
    <div class="flex flex-col w-10/12 xl:w-full">
        <div class="flex w-full justify-between mb-3">
            <button
                v-for="i in parseInt(stars)"
                :key="i"
                type="button"
                :class="{ 'mr-1': i < stars }"
                role="button"
                :aria-pressed="i <= rating"
                tabindex="0"
                @click="setRating(i)"
            >
                <star-icon
                    class="h-8 w-8"
                    :class="[
                        value >= i ? 'text-blue currentColor' : 'text-grey',
                    ]"
                />
            </button>
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
</template>

<script>
import { StarIcon } from '@heroicons/vue/outline'
import { CheckCircleIcon } from '@heroicons/vue/outline'
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'StarRating',
    components: {
        StarIcon,
        CheckCircleIcon,
    },
    props: {
        value: {
            type: Number,
            default: 0,
        },
        stars: {
            type: Number,
            default: 5,
        },
        labels: {
            type: Array,
            default: null,
        },
    },
    emits: ['input'],
    setup(props, { emit }) {
        const rating = ref()
        const store = useStore()
        const setRating = (i) => {
            rating.value = i
            emit('input', i)
        }
        const lang = computed({
            get: () => store.state.lang,
        })

        /*const confirm = (i) => {
    emit('input', i)
}*/

        return { rating, lang, store, setRating }
    },
}
</script>
<style scoped>
/* ToDo: create Tailwind class */
.text-blue {
    color: #1a56db;
    fill: #1a56db;
}

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
