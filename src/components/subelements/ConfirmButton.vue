<template>
    <div
        style="display: inline-block;"
        v-tippy="disabled?{ content: t('tooltip_answer_first') }:''"
        class="tabindex-focus-nopadding mt-5"
        :aria-label="t('aria_label_next_disabled')"
        :tabindex="disabled || !store.state.stepAnswering ? 0 : -1"
    >
        <button
            type="button"
            class="confirm flex items-center rounded-xl nav-button p-2 pr-3 ml-1 bg-blue-700 text-white tabindex-focus"
            tabindex="0"
            :aria-label="t('aria_label_next')"
            :aria-pressed="!store.state.stepAnswering"
            :disabled="disabled || !store.state.stepAnswering"
            :class="{
                'bg-gray-400 cursor-not-allowed':
                    disabled || !store.state.stepAnswering,
            }"
            @click.prevent="confirm"
        >
            <check-circle-icon class="h-6 w-6 mr-3 text-white" />
            {{ t('action_confirm') }}
        </button>
    </div>
</template>

<script>
import { CheckCircleIcon } from '@heroicons/vue/solid'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default {
    name: 'ConfirmButton',
    components: { CheckCircleIcon },
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
        subElement: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['confirm', 'confirmVideo'],
    setup(props, { emit }) {
        const store = useStore()
        const { t } = useI18n()
        const confirm = () => {
            if (props.subElement) {
                store.dispatch('setCurrentVideoStep')
                emit('confirm')
            } else {
                emit('confirm')
            }
            // store.dispatch('setCurrentStep')
        }
        return {
            t,
            store,
            confirm,
        }
    },
}
</script>

<style scoped></style>
