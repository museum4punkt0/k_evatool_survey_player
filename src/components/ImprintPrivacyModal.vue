<template>
    <!-- overlay -->
    <div
        id="modal_overlay"
        ref="modal_overlay"
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
            id="modal"
            ref="modal"
            class="
                opacity-0
                transform
                top-1/4
                -translate-y-1/4
                scale-150
                relative
                w-10/12
                md:w-1/2
                h-3/4
                md:h-3/4
                bg-white
                rounded
                shadow-lg
                transition-opacity transition-transform
                duration-300
            "
        >
            <!-- button close -->
            <button
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
                @click="openModal(false)"
            >
                &cross;
            </button>

            <!-- header -->
            <div class="px-4 py-3 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-600">
                    {{ t(`${type}`) }}
                </h2>
            </div>

            <!-- body -->
            <div class="w-full h-5/6 p-3 overflow-y-scroll">
                <div class="w-full p-3 overflow-y-scroll">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Asperiores, quis tempora! Similique, explicabo quaerat
                    maxime corrupti tenetur blanditiis voluptas molestias totam?
                    Quaerat laboriosam suscipit repellat aliquam blanditiis eum
                    quos nihil. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Asperiores, quis tempora! Similique,
                    explicabo quaerat maxime corrupti tenetur blanditiis
                    voluptas molestias totam? Quaerat laboriosam suscipit
                    repellat aliquam blanditiis eum quos nihil. Lorem ipsum,
                    dolor sit amet consectetur adipisicing elit.
                    <br />
                    <br />
                    Asperiores, quis tempora! Similique, explicabo quaerat
                    maxime corrupti tenetur blanditiis voluptas molestias totam?
                    Quaerat laboriosam suscipit repellat aliquam blanditiis eum
                    quos nihil. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Asperiores, quis tempora! Similique,
                    explicabo quaerat maxime corrupti tenetur blanditiis
                    voluptas molestias totam? Quaerat laboriosam suscipit
                    repellat aliquam blanditiis eum quos nihil. Lorem ipsum,
                    dolor sit amet consectetur adipisicing elit.
                    <br />
                    <br />
                    Asperiores, quis tempora! Similique, explicabo quaerat
                    maxime corrupti tenetur blanditiis voluptas molestias totam?
                    Quaerat laboriosam suscipit repellat aliquam blanditiis eum
                    quos nihil. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Asperiores, quis tempora! Similique,
                    explicabo quaerat maxime corrupti tenetur blanditiis
                    voluptas molestias totam? Quaerat laboriosam suscipit
                    repellat aliquam blanditiis eum quos nihil.
                    <br />
                    <br />
                    Asperiores, quis tempora! Similique, explicabo quaerat
                    maxime corrupti tenetur blanditiis voluptas molestias totam?
                    Quaerat laboriosam suscipit repellat aliquam blanditiis eum
                    quos nihil. Lorem ipsum, dolor sit amet consectetur
                    adipisicing elit. Asperiores, quis tempora! Similique,
                    explicabo quaerat maxime corrupti tenetur blanditiis
                    voluptas molestias totam? Quaerat laboriosam suscipit
                    repellat aliquam blanditiis eum quos nihil.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
// https://tailwindcomponents.com/component/animation-modal
export default {
    name: 'ImprintPrivacyModal',
    props: {
        open: {
            type: Boolean,
            default: false,
        },
        type: {
            type: String,
            default: false,
        },
    },
    emits: ['close-modal'],
    setup(props, { emit }) {
        const { t } = useI18n()
        const openModal = (value) => {
            console.log(value)
            const modal_overlay = ref()
            modal_overlay.value = document.querySelector('#modal_overlay')
            const modal = ref()
            modal.value = document.querySelector('#modal')
            console.log(document.querySelector('#modal'))
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
            } else {
                modalCl.add('-translate-y-full')
                setTimeout(() => {
                    modalCl.add('opacity-0')
                    modalCl.add('scale-150')
                }, 100)
                setTimeout(() => overlayCl.classList.add('hidden'), 300)
                emit('close-modal')
            }
        }

        watch(
            () => props.open,
            (value) => {
                console.log(value)
                if (value) {
                    openModal(true)
                } else {
                    openModal(false)
                }
            },
        )
        return {
            t,
            openModal,
        }
    },
}
</script>

<style scoped></style>
