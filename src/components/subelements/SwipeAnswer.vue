<template>
    <div
        class="
            bg-gray-200
            font-sans
            h-auto
            my-16
            w-full
            flex flex-row
            justify-center
            items-center
        "
    >
        <div class="flex">
            <img src="../../assets/swipe-left.svg" class="inline swipe-left" />
            <div
                id="touch-element"
                class="
                    card
                    touch-element
                    w-96
                    mx-auto
                    bg-white
                    shadow-xl
                    hover:shadow
                    rounded-t-xl
                "
                :class="[
                    { 'transition-all linear duration-300': !dragging },
                    { 'opacity-0': hideElement },
                ]"
                :style="transformString"
                @mousedown="onMouseDown"
                @mouseup="onMouseUp"
                @mousemove="onMouseMove"
                @touchmove="onTouchMove"
                @touchend="onTouchEnd"
            >
                <div class="text-left">
                    <h5 class="p-4">Erläuterung</h5>
                    <img
                        src="https://picsum.photos/400"
                        alt=""
                        @load="imageLoaded"
                    />
                </div>
            </div>
            <!--        <div class="touch-element">-->
            <!--            <div class="px-6 text-center font-light text-sm">-->
            <!--                <img src="https://picsum.photos/400" alt="" />-->
            <!--                <p>-->
            <!--                    Front end Developer, avid reader. Love to take a long walk,-->
            <!--                    swim-->
            <!--                </p>-->
            <!--            </div>-->
            <!--        </div>-->

            <img
                src="../../assets/swipe-right.svg"
                class="inline swipe-right"
            />
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
        const dragging = ref(true)
        const hideElement = ref(false)
        const threshold = ref(window.innerWidth / 4)
        const thresholdWidth = ref(window.innerWidth / 2)
        const thresholdHeight = ref(window.innerHeight / 2)
        const maxRotation = ref(20)
        const position = ref({ x: 0, y: 0, rotation: 0 })
        const transformString = ref()
        const touchElement = ref()
        const loaded = ref(false)
        const mouseDown = ref()

        const onMouseDown = (event) => {
            event.preventDefault()
            console.log(event)
            mouseDown.value = true
            // positions.value = {
            //     clientX: event.clientX - thresholdWidth.value,
            //     clientY: event.clientY - thresholdHeight.value,
            //     rotation:
            //         maxRotation.value * (event.clientX / thresholdWidth.value),
            // }
            // console.log(positions.value)
        }
        const onMouseUp = (event) => {
            event.preventDefault()
            mouseDown.value = false
        }
        // const dragMouseUp = (event) => {}
        const onMouseMove = (event) => {
            event.preventDefault()
            console.log(event)
            if (mouseDown.value) {
                positions.value = {
                    clientX:
                        event.clientX -
                        touchElement.value.left -
                        touchElement.value.width / 2,
                    clientY:
                        event.clientY -
                        touchElement.value.top -
                        touchElement.value.height / 2,
                    rotation:
                        maxRotation.value *
                        ((event.clientX -
                            touchElement.value.left -
                            touchElement.value.width / 2) /
                            thresholdWidth.value),
                }
                transformString.value = `transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`
                console.log(transformString.value)
            } else {
                positions.value = {
                    clientX: 0, // positions.value.clientX,
                    clientY: 0, //positions.value.clientY,
                    rotation: 0,
                }
                transformString.value = `transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`
            }
            console.log(positions.value)
        }
        const onTouchMove = (event) => {
            event.preventDefault()
            let touch = event.targetTouches[0]

            dragging.value = true

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
            dragging.value = false

            if (positions.value.clientX > threshold.value) {
                emit('draggedThreshold', true)
                hideElement.value = true
            } else if (positions.value.clientX < -threshold.value) {
                emit('draggedThreshold', false)
                hideElement.value = true
            } else {
                positions.value = {
                    clientX: 0, // positions.value.clientX,
                    clientY: 0, //positions.value.clientY,
                    rotation: 0,
                }
                transformString.value = `transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`
            }
        }
        const imageLoaded = (img) => {
            console.log(img)
            // alert(img.height)
            loaded.value = true
            touchElement.value = document
                .getElementsByClassName('touch-element')[0]
                .getBoundingClientRect()
        }

        onMounted(() => {
            // touchElement.value = document
            //     .getElementsByClassName('touch-element')[0]
            //     .getBoundingClientRect()
        })

        return {
            loaded,
            hideElement,

            dragging,
            threshold,
            thresholdWidth,
            thresholdHeight,
            maxRotation,
            position,
            positions,
            touchElement,
            transformString,
            imageLoaded,
            onMouseDown,
            onMouseUp,
            onMouseMove,
            onTouchMove,
            onTouchEnd,
        }
    },
}
</script>

<style scoped></style>
