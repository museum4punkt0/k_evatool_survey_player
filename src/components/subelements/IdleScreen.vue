<template>
    <div class="flex flex-wrap">
        <img src="../../assets/idle-screen.png" alt="" />

        <div class="m-auto mt-36 w-6/12">
            <h2>
                Vielen Dank für’s Vorbeischauen. Hier kannst du unsere Inhalte
                direkt bewerten und somit für ein besseres Angebot sorgen.
                <br />
                Backlink: {{ getReferrer() }}
            </h2>
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
import { onMounted } from 'vue'

export default {
    name: 'IdleScreen',
    components: { CheckCircleIcon },
    emits: ['start'],
    setup(props, { emit }) {
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
            confirm,
            getReferrer,
        }
    },
}
</script>

<style scoped></style>
