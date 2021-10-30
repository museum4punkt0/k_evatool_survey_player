<template>
    <div class="">
        <button
            type="button"
            class="
                confirm
                flex
                items-center
                rounded-xl
                nav-button
                p-2
                pr-3
                mt-5
                bg-blue-700
                text-white
            "
            :disabled="disabled"
            :class="{ 'bg-gray-400': disabled }"
            @click="confirm"
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
    },
    emits: ['confirm'],
    setup(props, { emit }) {
        const store = useStore()
        const { t } = useI18n()
        const confirm = () => {
            emit('confirm')
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
