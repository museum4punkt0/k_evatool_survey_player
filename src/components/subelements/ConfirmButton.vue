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
            :disabled="disabled || !store.state.stepAnswering"
            :class="{
                'bg-gray-400': disabled || !store.state.stepAnswering,
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
