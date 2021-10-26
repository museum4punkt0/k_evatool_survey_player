<template>
    <div class="slider absolute w-full h-full z-50">
        <div class="relative slides w-full h-full overflow-hidden">
            <!--            {{ step }}-->
            <!--            &lt;!&ndash;            {{ content.id }}&ndash;&gt;-->
            <!--            {{ store.state.surveys.surveyStep }}-->

            <div
                class="
                    absolute
                    inset-0
                    w-full
                    h-full
                    text-black
                    flex
                    items-center
                    justify-center
                    text-5xl
                    transition-all
                    ease-in-out
                    duration-1000
                    transform
                    translate-x-0
                    slide
                "
            >
                Frage ID {{ content.id }}
            </div>
            <div
                class="
                    absolute
                    inset-0
                    w-full
                    h-full
                    text-black
                    flex
                    items-center
                    justify-center
                    text-5xl
                    transition-all
                    ease-in-out
                    duration-1000
                    transform
                    translate-x-full
                    slide
                "
            >
                Frage 2
            </div>

            <div
                class="
                    absolute
                    inset-0
                    text-black
                    flex
                    items-center
                    justify-center
                    text-5xl
                    transition-all
                    ease-in-out
                    duration-1000
                    transform
                    translate-x-full
                    slide
                "
            >
                Frage 3
            </div>
        </div>
        <div
            class="
                relative
                navigation
                bottom-0
                z-50
                bg-white
                flex
                justify-between
                px-4
            "
        >
            <div class="inline text-gray-400 flex items-center">
                {{ currentIndex + 1 }}/{{ slidesCounter }}
            </div>
            <div class="inline">
                <div
                    class="
                        relative
                        right-0
                        top-0
                        mr-4
                        text-black
                        inline-block
                        py-2
                        px-4
                        my-2
                    "
                    @click="cancel"
                >
                    Abbrechen
                </div>
                <div
                    class="
                        relative
                        right-0
                        top-0
                        text-white
                        inline-block
                        bg-blue-800
                        rounded-2xl
                        py-2
                        px-4
                        my-2
                    "
                    @click="nextSlide"
                >
                    Weiter
                </div>
                <!--                <div-->
                <!--                    class="-->
                <!--                        relative-->
                <!--                        right-0-->
                <!--                        top-0-->
                <!--                        bg-white-->
                <!--                        w-10-->
                <!--                        h-10-->
                <!--                        mr-16-->
                <!--                        border-r border-gray-400-->
                <!--                        text-black-->
                <!--                        inline-->
                <!--                    "-->
                <!--                    @click="previousSlide"-->
                <!--                >-->
                <!--                    &#x276E;-->
                <!--                </div>-->
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
export default {
    name: 'ContentSlider',
    props: {
        content: {
            type: Object,
            default: null,
        },
        step: {
            type: Object,
            default: null,
        },
    },
    setup() {
        const currentIndex = ref(0)
        const slidesCounter = ref()
        const store = useStore()
        const nextSlide = () => {
            if (currentIndex.value < slidesCounter.value - 1) {
                console.log('nextSlide')
                let activeSlide = document.querySelector('.slide.translate-x-0')
                console.log(activeSlide)

                activeSlide.classList.remove('translate-x-0')
                activeSlide.classList.add('-translate-x-full')

                let nextSlide = activeSlide.nextElementSibling
                nextSlide.classList.remove('translate-x-full')
                nextSlide.classList.add('translate-x-0')

                currentIndex.value = [].indexOf.call(
                    nextSlide.parentNode.children,
                    nextSlide,
                )
            }
        }

        const previousSlide = () => {
            if (currentIndex.value > 0) {
                console.log('previousSlide')
                let activeSlide = document.querySelector('.slide.translate-x-0')

                activeSlide.classList.remove('translate-x-0')
                activeSlide.classList.add('translate-x-full')

                let previousSlide = activeSlide.previousElementSibling
                previousSlide.classList.remove('-translate-x-full')
                previousSlide.classList.add('translate-x-0')
                currentIndex.value = [].indexOf.call(
                    previousSlide.parentNode.children,
                    previousSlide,
                )
            }
        }

        onMounted(() => {
            slidesCounter.value = document.querySelectorAll('.slide').length
            store.dispatch('surveys/getSurveyStepById', {
                surveyId: 2,
                stepId: 43,
            })
        })

        return {
            currentIndex,
            slidesCounter,
            store,
            nextSlide,
            previousSlide,
        }
    },
}
</script>

<style scoped></style>
