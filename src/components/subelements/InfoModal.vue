<template>
    <!-- overlay -->
    <div
        id="modal_overlay_swipe"
        ref="modal_overlay_swipe"
        class="
            hidden
            fixed
            inset-0
            bg-black bg-opacity-30
            h-screen
            w-full
            flex
            justify-center
            items-start
            md:items-center
            pt-10
            md:pt-0
            pb-10
        "
    >
        <!-- modal -->
        <div
            id="modal_swipe"
            ref="modal_swipe"
            class="
                opacity-0
                transform
                top-1/4
                -translate-y-3/4
                scale-150
                relative
                w-10/12
                md:w-1/2
                h-1/4
                md:h-1/4
                bg-white
                rounded
                shadow-lg
                transition-opacity transition-transform
                duration-300
            "
        >
            <!-- header -->
            <div class="px-4 py-3 border-b border-gray-200">
                <h2
                    id="instruction"
                    tabindex="0"
                    class="text-xl font-semibold text-gray-600"
                >
                    {{ $t('instruction') }}
                </h2>
            </div>

            <!-- body -->
            <div class="w-full h-5/6 p-3 overflow-y-scroll">
                <div class="w-full p-3 overflow-y-scroll">
                    <h2 tabindex="0">
                        {{
                            $t('swipe_instructions', [
                                params.falseLabel[lang],
                                params.trueLabel[lang],
                            ])
                        }}
                    </h2>
                </div>
            </div>

            <!-- button close -->
            <button
                id="modal_close_btn"
                class="
                    absolute
                    -top-3
                    -right-3
                    bg-red-500
                    hover:bg-red-600
                    text-2xl
                    w-10
                    h-10
                    rounded-full
                    focus:outline-none
                    text-white
                "
                tabindex="0"
                @click="openSwipeModal(false)"
            >
                &cross;
            </button>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'vuex'
// https://tailwindcomponents.com/component/animation-modal
export default {
    name: 'SwipeModal',
    props: {
        openModal: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: '',
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
            console.log(value)
            const modal_overlay = ref()
            modal_overlay.value = document.querySelector('#modal_overlay_swipe')
            const modal = ref()
            modal.value = document.querySelector('#modal_swipe')
            console.log(document.querySelector('#modal_swipe'))
            console.log(modal.value)
            const modalCl = modal.value.classList
            const overlayCl = modal_overlay.value

            if (value) {
                overlayCl.classList.remove('hidden')
                setTimeout(() => {
                    modalCl.remove('opacity-0')
                    modalCl.remove('-translate-y-full')
                    modalCl.remove('scale-150')
                }, 100)
                document.querySelector('#instruction').focus()
            } else {
                modalCl.add('-translate-y-full')
                setTimeout(() => {
                    modalCl.add('opacity-0')
                    modalCl.add('scale-150')
                }, 100)
                setTimeout(() => overlayCl.classList.add('hidden'), 300)
                emit('close-swipe-modal')
                document.querySelector('h2').focus()
            }
        }

        onMounted(() => {
            document.querySelector('#instruction').focus()
        })

        watch(
            () => props.openModal,
            (value) => {
                console.log(value)
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

button:focus {
    outline: 3px solid blue;
}
</style>
