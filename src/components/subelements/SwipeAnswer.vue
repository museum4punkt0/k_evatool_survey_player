<template>
    <div
        class="flex swiper-wrap flex-wrap justify-center items-center w-full h-full"
    >
        <!--        <div-->
        <!--            class="swipe-overlay"-->
        <!--            :class="{ visible: swipeInstructionsVisible }"-->
        <!--            @click="swipeInstructionsVisible = false"-->
        <!--        >-->
        <!--            <div-->
        <!--                class="-->
        <!--                    swipe-instructions-->
        <!--                    bg-white-->
        <!--                    left-1/2-->
        <!--                    top-1/2-->
        <!--                    -translate-x-1/2 -translate-y-1/2-->
        <!--                    h-1/3-->
        <!--                    w-1/3-->
        <!--                "-->
        <!--            >-->
        <!--                <p>test</p>-->
        <!--            </div>-->
        <!--        </div>-->
        <div class="flex m-0 p-0 w-full relative">
            <div
                v-if="currentElement !== images.length"
                class="inline swipe-left absolute md:relative z-20 top-1/2 left-12 md:left-12 xl:-left-10 flex flex-col justify-center items-center"
                :class="store.state.showAnimations && 'animate__animated animate__fadeInLeft'"
                @click="triggerAnswer(0)"
            >
                <img
                    class="hidden md:block"
                    src="../../assets/swipe-left.svg"
                />
                <img
                    class="sm:block md:hidden drop-shadow"
                    src="../../assets/swipe-left-white.svg"
                />
                <span class="text-center text-white md:text-black drop-shadow">
                    {{ surveyResults.params.falseLabel[lang] }}
                </span>
            </div>
            <div
                class="relative card-container z-10 w-1/2 md:w-96 h-1/2 pb-4"
                :class="store.state.showAnimations && 'animate__animated animate__fadeIn animate__delay-1s'"
            >
                <div class="card-ghost relative w-full md:w-96">
                    <!--                  -->
                    <div
                        v-for="(image, index) in images"
                        :key="'card-' + index"
                        class="card absolute touch-element h-full md:h-50 hover:shadow rounded-t-xl bg-white p-3 w-full md:w-96"
                        :class="[
                            { 'transition-all linear duration-300': !dragging },
                            { ' duration-0': index < currentElement },
                            {
                                'card-active opacity-1 shadow-xl':
                                    index === currentElement,
                            },
                        ]"
                        :style="index === currentElement ? transformString : ''"
                        @mousedown="onMouseDown"
                        @mouseup="onMouseUp"
                        @mouseleave="onMouseLeave"
                        @mousemove="onMouseMove"
                        @touchstart="onTouchStart"
                        @touchmove="onTouchMove"
                        @touchend="onTouchEnd"
                    >
                        <div
                            class="text-left w-full h-full card-content"
                            :style="getBGImage(image.urls.original)"
                        >
                            <img
                                class="yes-icon"
                                :style="opacityTrue"
                                src="../../assets/yes.svg"
                            />
                            <!--                            <span-->
                            <!--                                class="yes-icon bg-blue-900"-->
                            <!--                                :style="opacityTrue"-->
                            <!--                            >-->
                            <!--                                {{ surveyResults.params.trueLabel[lang] }}-->
                            <!--                            </span>-->
                            <img
                                class="no-icon"
                                :style="opacityFalse"
                                src="../../assets/no.svg"
                            />
                            <!--                            <span-->
                            <!--                                class="no-icon bg-blue-900"-->
                            <!--                                :style="opacityFalse"-->
                            <!--                            >-->
                            <!--                                {{ surveyResults.params.falseLabel[lang] }}-->
                            <!--                            </span>-->
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
                    <div
                        class="card absolute touch-element h-full md:h-50 hover:shadow rounded-t-xl bg-white w-full flex justify-center items-center"
                        :class="{
                            'last-card': currentElement === images.length,
                        }"
                    >
                        <div class="endcard w-auto h-auto">
                            <img src="../../assets/endcard.svg" />
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-if="currentElement !== images.length"
                class="inline swipe-right absolute md:relative z-20 top-1/2 right-12 md:right-12 xl:-right-10 flex flex-col justify-center items-center"
                :class="store.state.showAnimations && 'animate__animated animate__fadeInRight'"
                @click="triggerAnswer(1)"
            >
                <img
                    class="hidden md:block"
                    src="../../assets/swipe-right.svg"
                />
                <img
                    class="sm:block md:hidden drop-shadow"
                    src="../../assets/swipe-right-white.svg"
                />
                <span class="text-center text-white md:text-black drop-shadow">
                    {{ surveyResults.params.trueLabel[lang] }}
                </span>
            </div>
        </div>

        <InfoModal
            :open-modal="modalboxOpen"
            type="swipe"
            :params="surveyResults.params"
            @close-swipe-modal="closeModal"
        ></InfoModal>
    </div>
</template>

<script>
import { computed, onUnmounted, ref } from 'vue'
import { onMounted, watch } from 'vue'
import { useStore } from 'vuex'
// import SwipeInstructionModal from '../subelements/SwipeInstructionModal.vue'
import InfoModal from '../subelements/InfoModal.vue'

export default {
    name: 'SwipeAnswer',
    components: { InfoModal },
    props: {
        images: {
            type: Object,
            default: () => {},
        },
        answer: {
            type: Number,
            default: -1,
        },
        content: {
            type: Object,
            default: () => {},
        },
        survey: {
            type: Object,
            default: () => {},
        },
        surveyResults: {
            type: Object,
            default: () => {},
        },
    },
    emits: ['draggedThreshold', 'currentElement'],
    setup(props, { emit }) {
        const store = useStore()
        const positions = ref({})
        const dragging = ref(true)
        const hideElement = ref(false)
        const threshold = ref(window.innerWidth / 8)
        const thresholdWidth = ref(window.innerWidth / 2)
        const thresholdHeight = ref(window.innerHeight / 2)
        const maxRotation = ref(20)
        const position = ref({ x: 0, y: 0, rotation: 0 })
        const transformString = ref()
        const touchElement = ref()
        const loaded = ref(false)
        const mouseDown = ref()
        const currentElement = ref(0)
        const touchPosition = ref({})
        const opacityTrue = ref()
        const opacityFalse = ref()
        const cursorTarget = ref()
        const swipeInstructions = ref()
        const modalboxOpen = ref(false)
        const infoTimeout = ref()
        infoTimeout.value = 10000

        const openModal = () => {
            modalboxOpen.value = true
            clearTimeout(swipeInstructions.value)
        }
        const closeModal = () => {
            modalboxOpen.value = false
            setInstructionTimeout()
        }

        const lang = computed({
            get: () => store.state.lang,
        })

        const getTouchPosition = (event) => {
            // Get the target
            const target = event.target
            // Get the bounding rectangle of target
            const rect = target.getBoundingClientRect()
            // Mouse position
            const x = event.clientX - rect.left
            const y = event.clientY - rect.top
            console.log(x + ' - ' + y)

            touchPosition.value.x = x - rect.width / 2
            touchPosition.value.y = y - rect.height / 2
            console.log(touchPosition)
        }

        const onMouseDown = (event) => {
            event.preventDefault()
            mouseDown.value = true
            getTouchPosition(event)
            clearTimeout(swipeInstructions.value)
        }
        const onMouseLeave = (event) => {
            event.preventDefault()
            resetCursorPosition()
            setInstructionTimeout()
        }
        const onMouseUp = (event) => {
            event.preventDefault()
            mouseDown.value = false
            getAnswerPosition(positions.value.clientX)
            setInstructionTimeout()
        }
        // const dragMouseUp = (event) => {}
        const onMouseMove = (event) => {
            event.preventDefault()
            clearTimeout(swipeInstructions.value)
            let swiperOffset = document
                .getElementsByClassName('swiper-wrap')[0]
                .getBoundingClientRect()

            if (mouseDown.value) {
                positions.value = {
                    clientX:
                        event.clientX -
                        touchElement.value.left -
                        touchElement.value.width / 2 -
                        touchPosition.value.x,
                    clientY:
                        event.clientY -
                        swiperOffset.top -
                        touchElement.value.height / 2 -
                        touchPosition.value.y,

                    rotation:
                        maxRotation.value *
                        ((event.clientX -
                            touchElement.value.left -
                            touchElement.value.width / 2 -
                            touchPosition.value.x) /
                            thresholdWidth.value),
                }

                if (positions.value.clientX > threshold.value) {
                    opacityTrue.value = 'opacity:1'
                    opacityFalse.value = 'opacity:0'
                } else if (positions.value.clientX < -threshold.value) {
                    opacityFalse.value = 'opacity:1'
                    opacityTrue.value = 'opacity:0'
                } else {
                    opacityFalse.value = 'opacity: 0'
                    opacityTrue.value = 'opacity: 0'
                }

                transformString.value = `transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`
            } else {
                positions.value = {
                    clientX: 0, // positions.value.clientX,
                    clientY: 0, //positions.value.clientY,
                    rotation: 0,
                }
                opacityFalse.value = 'opacity: 0'
                opacityTrue.value = 'opacity: 0'
                transformString.value = `transition: all 0.2s linear; transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`
            }

            // console.log(positions.value)
        }
        const onTouchStart = (event) => {
            let touch = event.targetTouches[0]
            getTouchPosition(touch)
            clearTimeout(swipeInstructions.value)
        }
        const onTouchMove = (event) => {
            event.preventDefault()
            clearTimeout(swipeInstructions.value)
            let touch = event.targetTouches[0]
            let swiperOffset = document
                .getElementsByClassName('swiper-wrap')[0]
                .getBoundingClientRect()
            dragging.value = true
            // console.log(touch.clientX)
            // console.log(touch)
            // touchElement.value.top -
            positions.value = {
                clientX:
                    touch.clientX -
                    touchElement.value.left -
                    touchElement.value.width / 2 -
                    touchPosition.value.x,
                clientY:
                    touch.clientY -
                    swiperOffset.top -
                    touchElement.value.height / 2 -
                    touchPosition.value.y,
                rotation:
                    maxRotation.value *
                    ((touch.clientX -
                        touchElement.value.left -
                        touchElement.value.width / 2 -
                        touchPosition.value.x) /
                        thresholdWidth.value),
            }

            if (positions.value.clientX > threshold.value) {
                opacityTrue.value = 'opacity:1'
                opacityFalse.value = 'opacity:0'
            } else if (positions.value.clientX < -threshold.value) {
                opacityFalse.value = 'opacity:1'
                opacityTrue.value = 'opacity:0'
            } else {
                opacityFalse.value = 'opacity: 0'
                opacityTrue.value = 'opacity: 0'
            }

            transformString.value = `transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`
        }

        const getAnswerPosition = (clientX) => {
            if (clientX > threshold.value) {
                emit('draggedThreshold', {
                    asset: props.images[currentElement.value].id,
                    value: props.surveyResults.params.trueValue,
                })

                dragging.value = true
                hideElement.value = true
                currentElement.value++
                transformString.value = `transform: translate3D(0px, 0px, 0) rotate(0deg)`
                opacityFalse.value = 'opacity: 0'
                opacityTrue.value = 'opacity: 0'
            } else if (clientX < -threshold.value) {
                emit('draggedThreshold', {
                    asset: props.images[currentElement.value].id,
                    value: props.surveyResults.params.falseValue,
                })
                dragging.value = true
                hideElement.value = true
                currentElement.value++
                transformString.value = `transform: translate3D(0px, 0px, 0) rotate(0deg)`
                opacityFalse.value = 'opacity: 0'
                opacityTrue.value = 'opacity: 0'
            } else {
                dragging.value = false
                positions.value = {
                    clientX: 0, // positions.value.clientX,
                    clientY: 0, //positions.value.clientY,
                    rotation: 0,
                }
                opacityFalse.value = 'opacity: 0'
                opacityTrue.value = 'opacity: 0'
                transformString.value = `transition:all 0.2s linear;transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg)`
            }
            emit('currentElement', currentElement.value)
        }

        const onTouchEnd = () => {
            if (positions.value.clientX > threshold.value) {
                emit('draggedThreshold', {
                    asset: props.images[currentElement.value].id,
                    value: props.surveyResults.params.trueValue,
                })

                dragging.value = true
                hideElement.value = true
                currentElement.value++
                transformString.value = `transform: translate3D(0px, 0px, 0) rotate(0deg)`
                opacityFalse.value = 'opacity: 0'
                opacityTrue.value = 'opacity: 0'
            } else if (positions.value.clientX < -threshold.value) {
                emit('draggedThreshold', {
                    asset: props.images[currentElement.value].id,
                    value: props.surveyResults.params.falseValue,
                })
                dragging.value = true
                hideElement.value = true
                currentElement.value++
                transformString.value = `transform: translate3D(0px, 0px, 0) rotate(0deg)`
                opacityFalse.value = 'opacity: 0'
                opacityTrue.value = 'opacity: 0'
            } else {
                dragging.value = false
                positions.value = {
                    clientX: 0, // positions.value.clientX,
                    clientY: 0, //positions.value.clientY,
                    rotation: 0,
                }
                opacityFalse.value = 'opacity: 0'
                opacityTrue.value = 'opacity: 0'
                transformString.value = `transition: all 0.2s linear; transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg)`
            }
            emit('currentElement', currentElement.value)
            setInstructionTimeout()
        }
        const imageLoaded = () => {
            loaded.value = true
            touchElement.value = document
                .getElementsByClassName('card-active')[0]
                .getBoundingClientRect()
        }

        const triggerAnswer = (value) => {
            // if (value) {
            //     emit('draggedThreshold', {
            //         asset: props.images[currentElement.value].id,
            //         value: props.surveyResults.params.trueValue,
            //     })
            // } else {
            //     emit('draggedThreshold', {
            //         asset: props.images[currentElement.value].id,
            //         value: props.surveyResults.params.falseValue,
            //     })
            // }
            if (value === 1) {
                positions.value.clientX = window.innerWidth / 3
                positions.value.rotation = 20
                setAnswer()
            } else if (value === 0) {
                positions.value.clientX = -window.innerWidth / 3
                positions.value.rotation = -20
                setAnswer()
            }
        }
        const setAnswer = () => {
            positions.value.clientY = 50
            transformString.value = `transition:all 0.3s linear; transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`
            opacityTrue.value = 'opacity:0'
            opacityFalse.value = 'opacity:0'
            setTimeout(() => {
                onTouchEnd()

                if (currentElement.value === props.images.length) {
                    setTimeout(() => {
                        // store.dispatch('setCurrentStep')
                    }, 1000)
                }
            }, 400)
        }
        const getBGImage = (image) => {
            return (
                'background:url(' +
                image +
                ')no-repeat; background-color: #fff;background-size:contain; background-position:center;'
            )
        }

        const resizeSwiper = () => {
            touchElement.value = document
                .getElementsByClassName('card-active')[0]
                .getBoundingClientRect()
        }

        const setInstructionTimeout = (delay) => {
            clearTimeout(swipeInstructions.value)

            swipeInstructions.value = setTimeout(
                () => {
                    modalboxOpen.value = true
                },
                delay ? delay : infoTimeout.value,
            )
        }

        const resetCursorPosition = () => {
            // console.log(e)
            // console.log(document.elementFromPoint(e.pageX, e.pageY))
            // console.log(e.target.classList.contains('card-content'))
            // cursorTarget.value = e.target.classList.contains('card-content')
            //
            // if (!cursorTarget.value) {
            dragging.value = false
            mouseDown.value = false
            positions.value = {
                clientX: 0, // positions.value.clientX,
                clientY: 0, //positions.value.clientY,
                rotation: 0,
            }
            opacityFalse.value = 'opacity: 0'
            opacityTrue.value = 'opacity: 0'
            transformString.value = `transition: all 0.2s linear; transform: translate3D(${positions.value.clientX}px, ${positions.value.clientY}px, 0) rotate(${positions.value.rotation}deg`
            // }
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
            touchElement.value = document
                .getElementsByClassName('card-active')[0]
                .getBoundingClientRect()

            window.addEventListener('resize', resizeSwiper)

            setInstructionTimeout()
        })

        onUnmounted(() => {
            window.removeEventListener('resize', resizeSwiper)
        })

        return {
            lang,
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
            touchPosition,
            imageLoaded,
            onMouseDown,
            onMouseUp,
            onMouseMove,
            onMouseLeave,
            onTouchStart,
            onTouchMove,
            onTouchEnd,
            setAnswer,
            getBGImage,
            getAnswerPosition,
            resizeSwiper,
            getTouchPosition,
            triggerAnswer,
            resetCursorPosition,
            opacityTrue,
            opacityFalse,
            cursorTarget,
            swipeInstructions,
            modalboxOpen,
            openModal,
            closeModal,
            infoTimeout,
            setInstructionTimeout,
        }
    },
}
</script>

<style lang="scss">
.card-container {
    position: relative;
    //width: 40vw;
    //width: 32rem;
    //left: 50%;
    //padding: 20px 20px 60% 20px;
    display: flex;
    //transform: translateX(-50%);
    justify-content: center;
    width: 100%;
    height: 60vh;
}

.card {
    margin: auto;
}

.card:nth-child(1) {
    z-index: 2;
    //transform: translateX(0%) translateY(0) scale(1);
    &.card-active {
        z-index: 10;
    }
}

.card:nth-child(2) {
    //opacity: 1;
    //z-index: 1;
    //transform: translateX(0%) translateY(10px) scale(0.98);
}

.card:nth-child(3) {
    //opacity: 1;
    //z-index: 1;
    //transform: translateX(-0%) translateY(20px) scale(0.96);
}

.card {
    opacity: 0;
    z-index: 1;

    &.last-card {
        opacity: 1;
    }
}

.card-ghost {
    &:before,
    &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: #fff;
        transform: rotate(5deg);
        background-size: cover;
        //box-shadow: 5px 8px 44px rgb(0 0 0 / 10%);
        border-radius: 8px;
        z-index: -1;
        top: 0px;
        left: 0px;
    }

    &:before {
        content: '';
        position: absolute;
        transform: rotate(5deg);
        display: none;
    }

    &:after {
        content: '';
        position: absolute;
        transform: rotate(-5deg);
        display: none;
    }
}

.card.card-active {
    z-index: 10;
    opacity: 1;
    transition: opacity 0.3s linear;
}

//.opacity-0 div {
//    opacity: 0;
//}
.opacity-1 div {
    opacity: 1;
}

.yes-icon,
.no-icon {
    position: absolute;
    left: 50%;
    top: 50%;
    opacity: 0;
    transform: translateX(-50%) translateY(-50%);
    font-size: 30px;
    color: white;
    //background-color: rgba(255, 255, 255, 0.8);
    width: 100px;
    text-align: center;

    transition: opacity 0.1s linear;
}

.swipe-left,
.swipe-right {
    pointer-events: none;
    img {
        max-width: unset;
    }
}

.swipe-overlay {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: -1;
    opacity: 0;
    transition: all 0.2s linear;

    &.visible {
        z-index: 1000;
        opacity: 1;
        transition: all 0.2s linear;
    }
}

.swipe-instructions {
    z-index: 1001;
    position: absolute;
}
</style>
