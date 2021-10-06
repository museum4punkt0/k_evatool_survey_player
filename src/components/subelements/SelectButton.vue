<template>
    <div
        class="
            w-min
            focus:ring-indigo-500
            relative
            flex
            items-start
            py-4
            px-7
            mb-3
            bg-white
            rounded-xl
        "
        :class="[
            selected ? 'border-blue-700 border-2' : 'border-gray-900 border-2',
            disabled ? 'cursor-not-allowed select-none' : 'cursor-pointer',
        ]"
        @click="toggleSelection"
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
                class="font-medium whitespace-nowrap"
                :class="[
                    selected ? 'text-blue-700' : 'text-gray-700',
                    disabled
                        ? 'cursor-not-allowed select-none'
                        : 'cursor-pointer',
                ]"
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
        value: {
            type: String,
            default: '',
        },
        selected: {
            type: Boolean,
            default: false,
        },
        label: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        toggleSelection() {
            if (this.disabled) {
                return
            }
            this.$emit('selected', this.value)

            // this.selected = !this.selected
        },
    },
}
</script>

<style scoped></style>
