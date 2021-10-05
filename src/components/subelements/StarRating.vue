<template>
    <div class="flex flex-col">
        <div class="flex justify-center mb-3">
            <button
                v-for="i in parseInt(stars)"
                type="button"
                :class="{ 'mr-1': i < stars }"
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
        <div class="labels flex justify-between">
            <p>Wenig</p>
            <p>Mittle</p>
            <p>Viel</p>
        </div>

        <div>
            <button
                type="button"
                class="
                    confirm
                    flex
                    items-center
                    rounded-md
                    nav-button
                    p-2
                    mt-5
                    bg-blue-700
                    text-white
                "
                @click="setRating(rating)"
            >
                <check-circle-icon class="h-6 w-6 mr-3 text-white" />
                Eingabe bestätigen
            </button>
        </div>
    </div>
</template>

<script>
import { StarIcon } from '@heroicons/vue/outline'
import { CheckCircleIcon } from '@heroicons/vue/outline'
import { ref } from '@vue/reactivity'
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
    },
    emits: ['input'],
    setup(props, { emit }) {
        const rating = ref()
        const setRating = (i) => {
            rating.value = i
            emit('input', i)
        }
        const confirm = (i) => {
            emit('input', i)
        }

        return { rating, setRating }
    },
}
</script>
<style scoped>
/* ToDo: create Tailwind class */
.text-blue {
    color: #1a56db;
    fill: #1a56db;
}
</style>
