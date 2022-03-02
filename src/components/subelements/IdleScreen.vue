<template>
    <div class="flex flex-wrap">
        <img src="../../assets/idle-screen.png" alt="" />

        <div class="m-auto mt-36 w-6/12">
            <h2>
                {{ t('idle_text') }}
            </h2>
            <button
                type="button"
                class="confirm flex items-center rounded-md nav-button p-2 mt-5 bg-blue-900 text-white"
                @click="confirm"
            >
                <check-circle-icon class="h-6 w-6 mr-3 text-white" />
                Okay
            </button>
        </div>
    </div>
</template>

<script>
import { CheckCircleIcon } from '@heroicons/vue/outline'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
    name: 'IdleScreen',
    components: { CheckCircleIcon },
    emits: ['start'],
    setup(props, { emit }) {
        const { t } = useI18n()
        const confirm = () => {
            emit('start', true)
        }
        const getReferrer = () => {
            let preUrl = document.referrer

            if (preUrl == null) {
                return 'The previous page url is empty'
            } else {
                return preUrl
            }
        }
        onMounted(() => {
            console.log(getReferrer())
            // window.localStorage.setItem('ev-tool-backlink', getReferrer())
            // window.localStorage.setItem('backlink', getReferrer())
        })
        return {
            t,
            confirm,
            getReferrer,
        }
    },
}
</script>

<style scoped></style>
