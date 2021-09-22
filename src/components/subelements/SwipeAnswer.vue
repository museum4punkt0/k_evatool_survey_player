<template>
    <div
        class="
            bg-gray-200
            font-sans
            h-screen
            w-full
            flex flex-row
            justify-center
            items-center
            overflow-hidden
        "
    >
        <div
            id="touch-element"
            class="card w-96 mx-auto bg-white shadow-xl hover:shadow"
            :style="transformString"
            @mousedown="dragMouseDown"
            @touchmove="onTouchMove"
            @touchend="onTouchEnd"
        >
            <div class="px-6 text-center font-light text-sm">
                <img src="https://picsum.photos/400" alt="" />
                <p>
                    Front end Developer, avid reader. Love to take a long walk,
                    swim
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { onMounted } from '@vue/runtime-core'

export default {
    name: 'SwipeAnswer',
    emits: ['draggedThreshold'],
    setup(props, { emit }) {
        const positions = ref({})
        const threshold = ref(window.innerWidth / 3)
        const thresholdWidth = ref(window.innerWidth / 2)
        const thresholdHeight = ref(window.innerHeight / 2)
        const maxRotation = ref(20)
        const position = ref({ x: 0, y: 0, rotation: 0 })
        const transformString = ref()
        const touchElement = ref()

        const dragMouseDown = (event) => {
            event.preventDefault()
            console.log(event)

            positions.value = {
                clientX: event.clientX - thresholdWidth.value,
                clientY: event.clientY - thresholdHeight.value,
                rotation:
                    maxRotation.value * (event.clientX / thresholdWidth.value),
            }
            console.log(positions.value)
        }
        const onTouchMove = (event) => {
            event.preventDefault()
            let touch = event.targetTouches[0]

            positions.value = {
                clientX:
                    touch.clientX -
                    touchElement.value.left -
                    touchElement.value.width / 2,
                clientY:
                    touch.clientY -
                    touchElement.value.top -
                    touchElement.value.height / 2,
                rotation:
                    maxRotation.value *
                    ((touch.clientX -
                        touchElement.value.left -
                        touchElement.value.width / 2) /
                        thresholdWidth.value),
            }
            console.log(positions.value)

            transformString.value = `transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`
            console.log(transformString.value)
        }
        const onTouchEnd = () => {
            positions.value = {
                clientX: positions.value.clientX,
                clientY: positions.value.clientY,
                rotation: 0,
            }
            transformString.value = `transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`

            if (positions.value.clientX > threshold.value) {
                emit('draggedThreshold', true)
            } else if (positions.value.clientX < -threshold.value) {
                emit('draggedThreshold', false)
            }
        }

        onMounted(() => {
            touchElement.value = document
                .getElementById('touch-element')
                .getBoundingClientRect()
        })

        return {
            threshold,
            thresholdWidth,
            thresholdHeight,
            maxRotation,
            position,
            positions,
            touchElement,
            transformString,
            dragMouseDown,
            onTouchMove,
            onTouchEnd,
        }
    },
}
</script>

<style scoped></style>
