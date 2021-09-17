<template>
    <div class="flex">
        <button
            v-for="i in stars"
            type="button"
            :class="{ 'mr-1': i < stars }"
            @click="setRating(i)"
        >
            <star-icon
                class="h-8 w-8"
                :class="[value >= i ? 'text-blue currentColor' : 'text-grey']"
            />
            <!--            <svg-->
            <!--                class="block h-8 w-8"-->
            <!--                :class="[value >= i ? 'text-blue' : 'text-grey']"-->
            <!--                fill="currentColor"-->
            <!--                xmlns="http://www.w3.org/2000/svg"-->
            <!--                viewBox="0 0 20 20"-->
            <!--            >-->
            <!--                <path-->
            <!--                    d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"-->
            <!--                />-->
            <!--            </svg>-->
        </button>
    </div>
</template>

<script>
import { StarIcon } from '@heroicons/vue/outline'

export default {
    name: 'StarRating',
    components: {
        StarIcon,
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
        const setRating = (i) => {
            emit('input', i)
        }

        return { setRating }
    },
}
</script>
<style scoped>
.text-blue {
    color: #3490dc;
    fill: #3490dc;
}
</style>
