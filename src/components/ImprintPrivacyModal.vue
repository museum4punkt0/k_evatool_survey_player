<template>
    <!-- overlay -->
    <div
        id="modal_overlay"
        ref="modal_overlay"
        class="hidden fixed inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-start md:items-center pt-10 md:pt-0 pb-10"
    >
        <!-- modal -->
        <div
            id="modal"
            ref="modal"
            class="opacity-0 transform top-1/4 -translate-y-1/4 scale-150 relative w-10/12 md:w-1/2 h-3/4 md:h-3/4 bg-white rounded shadow-lg transition-opacity transition-transform duration-300"
        >
            <!-- header -->
            <div class="px-4 py-3 border-b border-gray-200">
                <h2
                    tabindex="0"
                    class="text-xl font-semibold text-gray-600 header"
                >
                    <slot name="header"></slot>
                </h2>
            </div>

            <!-- body -->
            <div class="w-full h-5/6 p-3 overflow-y-scroll">
                <div class="w-full p-3 overflow-y-scroll" tabindex="0">
                    <slot></slot>
                </div>
            </div>
            <!-- button close -->
            <button
                tabindex="0"
                class="absolute inline-flex items-center justify-center -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white"
                @click="openModal(false)"
            >
                <svg
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { ExternalLinkIcon } from '@heroicons/vue/solid'
// https://tailwindcomponents.com/component/animation-modal
export default {
    name: 'ImprintPrivacyModal',
    components: { ExternalLinkIcon },
    props: {
        open: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['close-modal'],
    setup(props, { emit }) {
        const { t } = useI18n()
        const openModal = (value) => {
            const modal_overlay = ref()
            modal_overlay.value = document.querySelector('#modal_overlay')
            const modal = ref()
            modal.value = document.querySelector('#modal')
            const modalCl = modal.value.classList
            const overlayCl = modal_overlay.value

            if (value) {
                overlayCl.classList.remove('hidden')
                setTimeout(() => {
                    modalCl.remove('opacity-0')
                    modalCl.remove('-translate-y-full')
                    modalCl.remove('scale-150')
                }, 100)

                setTimeout(() => {
                    document.querySelector('h2.header').focus()
                }, 1000)
            } else {
                modalCl.add('-translate-y-full')
                setTimeout(() => {
                    modalCl.add('opacity-0')
                    modalCl.add('scale-150')
                }, 100)
                setTimeout(() => overlayCl.classList.add('hidden'), 300)
                emit('close-modal')
                setTimeout(() => {
                    document.querySelector('h2').focus()
                }, 1000)
            }
        }

        watch(
            () => props.open,
            (value) => openModal(value),
        )
        return {
            t,
            openModal,
        }
    },
}
</script>

<style scoped></style>
