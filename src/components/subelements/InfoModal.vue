<template>
    <!-- overlay -->
    <div
        id="modal_overlay_swipe"
        ref="modal_overlay_swipe"
        class="hidden fixed inset-0 bg-black bg-opacity-30 h-screen w-full flex justify-center items-center pt-10 md:pt-0 pb-10"
    >
        <!-- modal -->
        <div
            id="modal_swipe"
            ref="modal_swipe"
            class="opacity-0 transform scale-150 relative w-10/12 md:w-1/2 h-1/2 md:h-1/2 bg-white rounded shadow-lg transition-opacity transition-transform duration-300"
        >
            <!-- header -->
            <div class="px-4 py-3 border-b border-gray-200">
                <h2
                    v-if="type === 'swipe'"
                    tabindex="0"
                    class="tabindex-focus instruction text-2xl w-auto inline font-semibold text-gray-600"
                >
                    {{ $t('instruction') }}
                </h2>
                <h2
                    v-if="type === 'audio'"
                    tabindex="0"
                    class="tabindex-focus instruction text-xl inline font-semibold text-gray-600"
                >
                    {{ $t('audio_recording_confirmation_header') }}
                </h2>
            </div>

            <!-- body -->
            <div class="w-full h-5/6 p-3 overflow-y-scroll flex items-center">
                <div
                    v-if="type === 'swipe'"
                    class="w-full p-3 overflow-y-scroll"
                >
                    <h2 tabindex="0" class="tabindex-focus">
                        {{
                            $t('swipe_instructions', [
                                params.falseLabel[lang],
                                params.trueLabel[lang],
                            ])
                        }}
                    </h2>

                    <!-- button close -->
                    <button
                        v-if="type === 'swipe'"
                        class="modal_close_btn absolute inline-flex items-center justify-center -top-3 -right-3 bg-red-500 hover:bg-red-600 text-2xl w-10 h-10 rounded-full focus:outline-none text-white tabindex-focus-nopadding"
                        tabindex="0"
                        @click="openSwipeModal(false)"
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

                <div
                    v-if="type === 'audio'"
                    class="w-full p-3 pb-4 overflow-y-scroll"
                >
                    <h2 tabindex="0" class="tabindex-focus">
                        {{ $t('audio_recording_confirmation_body') }}
                    </h2>

                    <!-- button confirm -->
                    <button
                        v-if="type === 'audio'"
                        class="mt-4 modal_close_btn relative bg-blue-900 hover:bg-blue-900 text-2xl left-1/2 -translate-x-1/2 w-auto flex items-center py-1 px-4 rounded-xl focus:outline-none text-white tabindex-focus"
                        tabindex="0"
                        @click="openSwipeModal(false)"
                    >
                        {{ $t('audio_recording_confirmation_confirm') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'

export default {
    name: 'SwipeModal',
    props: {
        openModal: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: 'swipe',
        },
        params: {
            type: Object,
            default: null,
        },
    },
    emits: ['close-swipe-modal'],
    setup(props, { emit }) {
        const { t } = useI18n()
        const store = useStore()
        const lang = computed({
            get: () => store.state.lang,
        })
        const openSwipeModal = (value) => {
            const modal_overlay = ref()
            modal_overlay.value = document.querySelector('#modal_overlay_swipe')
            const modal = ref()
            modal.value = document.querySelector('#modal_swipe')
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
                    document.querySelector('.instruction').focus()
                }, 1000)
            } else {
                modalCl.add('-translate-y-full')
                setTimeout(() => {
                    modalCl.add('opacity-0')
                    modalCl.add('scale-150')
                }, 100)
                setTimeout(() => overlayCl.classList.add('hidden'), 300)
                emit('close-swipe-modal')
                setTimeout(() => {
                    document.querySelector('h2').focus()
                }, 1000)
            }
        }

        onMounted(() => {
            setTimeout(() => {
                document.querySelector('.instruction').focus()
            }, 1000)
            if (props.openModal) {
                openSwipeModal(true)
            }
        })

        watch(
            () => props.openModal,
            (value) => {
                if (value) {
                    openSwipeModal(true)
                } else {
                    openSwipeModal(false)
                }
            },
        )
        return {
            t,
            lang,
            openSwipeModal,
        }
    },
}
</script>

<style scoped>
#modal_overlay_swipe {
    z-index: 999;
}
</style>
