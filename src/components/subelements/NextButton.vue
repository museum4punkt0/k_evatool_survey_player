<template>
    <button
        type="button"
        class="
            confirm
            flex
            items-center
            rounded-md
            nav-button
            p-2
            bg-blue-700
            text-white
        "
        @click="confirm"
    >
        <check-circle-icon class="h-6 w-6 mr-3 text-white" />
        {{ t('action_next') }}
    </button>
</template>

<script>
// import { CheckCircleIcon } from '@heroicons/vue/outline'

import { CheckCircleIcon } from '@heroicons/vue/solid'
import { useStore } from 'vuex'
import { useI18n } from 'vue-i18n'

export default {
    name: 'ConfirmButton',
    components: { CheckCircleIcon },
    emits: ['confirm'],
    setup(props, { emit }) {
        const store = useStore()
        const { t } = useI18n()
        const confirm = () => {
            emit('confirm')
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
