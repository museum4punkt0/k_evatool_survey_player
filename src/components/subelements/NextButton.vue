<template>
    <button
        style="display: inline-block;"
        v-tippy="(disabled || !store.state.stepAnswering)?{ content: t('tooltip_answer_first') }:''"
        type="button"
        class="
            confirm
            flex
            items-center
            rounded-md
            nav-button
            p-2
            pr-3
            bg-blue-700
            text-white
            tabindex-focus
        "
        tabindex="0"
        @click="confirm"
    >
        <check-circle-icon class="h-6 w-6 mr-2 text-white" />
        {{ t('action_next') }}
    </button>
</template>

<script>
import { CheckCircleIcon } from '@heroicons/vue/solid'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default {
    name: 'ConfirmButton',
    components: { CheckCircleIcon },
    props: {
        subElement: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['confirm'],
    setup(props, { emit }) {
        const store = useStore()
        const { t } = useI18n()
        const confirm = () => {
            if (props.subElement) {
                store.dispatch('setCurrentVideoStep')
            } else {
                emit('confirm')
            }
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
