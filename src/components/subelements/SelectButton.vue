<template>
    <div class="flex">
        <div
            class="relative flex items-center py-4 px-7 mb-3 bg-white rounded-xl w-auto ml-1 tabindex-focus"
            role="checkbox"
            :aria-checked="selected"
            tabindex="0"
            :class="[
                selected
                    ? 'border-blue-900 border-2'
                    : 'border-gray-900 border-2',
                disabled ? 'cursor-not-allowed select-none' : 'cursor-pointer',
            ]"
            @keydown="toggleSelection"
            @click="toggleSelection"
        >
            <div class="flex items-center">
                <span
                    class="h-6 w-6 rounded"
                    :class="
                        selected
                            ? 'border-blue-900 border-2 bg-blue-900'
                            : 'border-gray-900 border-2'
                    "
                >
                    <check-icon v-if="selected" class="text-white" />
                </span>
            </div>
            <div class="ml-3 text-sm">
                <!--            whitespace-nowrap-->
                <label
                    class="font-medium"
                    :aria-label="
                        commentable
                            ? label + ' ' + t('aria_label_write_comment')
                            : label
                    "
                    :class="[
                        selected ? 'text-blue-900' : 'text-gray-700',
                        disabled
                            ? 'cursor-not-allowed select-none'
                            : 'cursor-pointer',
                    ]"
                >
                    <div role="option">{{ label }}</div>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import { CheckIcon } from '@heroicons/vue/outline'
import { useI18n } from 'vue-i18n'
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
        labels: {
            type: Number,
            default: 1,
        },
        index: {
            type: Number,
            default: 1,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        commentable: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['selected'],
    setup() {
        const { t } = useI18n()
        return { t }
    },
    methods: {
        toggleSelection(event) {
            if (event.type === 'click') {
                if (this.disabled) {
                    return
                }
                this.$emit('selected', this.value)
            }
            if (event.type === 'keydown') {
                if (event.keyCode === 32) {
                    if (this.disabled) {
                        return
                    }
                    this.$emit('selected', this.value)
                }
            }
        },
    },
}
</script>

<style scoped></style>
