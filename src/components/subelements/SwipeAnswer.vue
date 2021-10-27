<template>
    <div class="font-sans my-16 flex flex-wrap justify-center items-center">
        <div class="flex mt-16 h-1/2 relative">
            <img
                src="../../assets/swipe-left.svg"
                class="
                    inline
                    swipe-left
                    absolute
                    md:relative
                    z-20
                    top-1/2
                    left-10
                "
            />
            <div class="mx-auto absolute card-container w-8/12 h-2/3 z-10">
                <!--                v-if="currentElement > images.length"-->
                <!--                <div-->
                <!--                    v-if="currentElement === images.length"-->
                <!--                    class="flex items-center h-100 top-50 m-auto"-->
                <!--                >-->
                <!--                    <p>Sie haben alle Fragen beantwortet!</p>-->
                <!--                </div>-->

                <div
                    v-for="(image, index) in images"
                    :key="'card-' + index"
                    class="
                        card
                        absolute
                        touch-element
                        w-96
                        hover:shadow
                        rounded-t-xl
                        bg-white
                    "
                    :class="[
                        { 'transition-all linear duration-300': !dragging },
                        { 'opacity-0 duration-0': index < currentElement },
                        {
                            'card-active  shadow-xl': index === currentElement,
                        },
                    ]"
                    :style="index === currentElement ? transformString : ''"
                    @mousedown="onMouseDown"
                    @mouseup="onMouseUp"
                    @mousemove="onMouseMove"
                    @touchmove="onTouchMove"
                    @touchend="onTouchEnd"
                >
                    <div class="text-left">
                        <h5 class="p-4">Erläuterung</h5>
                        <img
                            :src="image.urls.original"
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
            </div>
            <img
                src="../../assets/swipe-right.svg"
                class="
                    inline
                    swipe-right
                    absolute
                    md:relative
                    z-20
                    top-1/2
                    right-10
                "
            />
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import { onMounted, watch } from 'vue'
import { useStore } from 'vuex'

export default {
    name: 'SwipeAnswer',
    props: {
        images: {
            type: Object,
            default: () => {},
        },
        answer: {
            type: Number,
            default: -1,
        },
    },
    emits: ['draggedThreshold'],
    setup(props, { emit }) {
        const store = useStore()
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
        const currentElement = ref(1)
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
            console.log(touch.clientX)
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
            if (positions.value.clientX > threshold.value) {
                emit('draggedThreshold', {
                    asset: currentElement.value, //ToDo: change with: props.images.id
                    value: 'ja',
                })

                dragging.value = true
                hideElement.value = true
                currentElement.value++
                transformString.value = `transform: translate3D(0px, 0px, 0) rotate(0deg)`
            } else if (positions.value.clientX < -threshold.value) {
                emit('draggedThreshold', {
                    asset: currentElement.value, //ToDo: change with: props.images.id
                    value: 'nein',
                })
                dragging.value = true
                hideElement.value = true
                currentElement.value++
                transformString.value = `transform: translate3D(0px, 0px, 0) rotate(0deg)`
            } else {
                dragging.value = false
                positions.value = {
                    clientX: 0, // positions.value.clientX,
                    clientY: 0, //positions.value.clientY,
                    rotation: 0,
                }
                transformString.value = `transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg)`
            }
        }
        const imageLoaded = (img) => {
            console.log(img)
            // alert(img.height)
            loaded.value = true
            touchElement.value = document
                .getElementsByClassName('card-active')[0]
                .getBoundingClientRect()
        }

        const setAnswer = () => {
            positions.value.clientY = 50
            transformString.value = `transition:all 0.3s linear; transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`

            setTimeout(() => {
                onTouchEnd()

                if (currentElement.value === props.images.length) {
                    setTimeout(() => {
                        store.dispatch('setCurrentStep')
                    }, 1000)
                }
            }, 400)
        }

        watch(
            () => props.answer,
            (val) => {
                if (val === 1) {
                    positions.value.clientX = window.innerWidth / 3
                    positions.value.rotation = 20
                    setAnswer()
                } else if (val === 0) {
                    positions.value.clientX = -window.innerWidth / 3
                    positions.value.rotation = -20
                    setAnswer()
                }
            },
        )
        onMounted(() => {
            // touchElement.value = document
            //     .getElementsByClassName('touch-element')[0]
            //     .getBoundingClientRect()
        })

        return {
            loaded,
            store,
            hideElement,
            currentElement,
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
            setAnswer,
        }
    },
}
</script>

<style lang="scss">
.card-container {
    position: relative;
    width: 40vw;
    left: 50%;
    padding: 20px;
    display: inline-block;
    transform: translateX(-50%);
    height: 570px;
    justify-content: center;
}

.card:nth-child(2) {
    opacity: 1;
    z-index: 1;
    transform: translateY(10px) scale(0.98);
}

.card:nth-child(3) {
    opacity: 1;
    z-index: 1;
    transform: translateY(20px) scale(0.96);
}

.card {
    z-index: 1;

    &.card-active {
        z-index: 10;
    }
}

.opacity-0 div {
    opacity: 0;
}
</style>
