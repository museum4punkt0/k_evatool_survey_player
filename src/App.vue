<template>
    <router-view
        v-if="
            store.state.appReady &&
            store.state.surveyResults.surveyLoaded &&
            !store.state.error
        "
    />
    <div
        v-if="store.state.error"
        class="w-screen h-screen flex items-center justify-center"
    >
        <div class="mx-5">
            <h1 class="text-red-700 ml-2 mb-1">Error</h1>
            <div class="p-5 bg-red-300 rounded-2xl">
                <pre class="text-red-700">{{ store.state.error }}</pre>
            </div>
            <p class="text-xs mt-2 ml-2 text-red-700">
                Please contact the administrator of this website
            </p>
        </div>
    </div>
</template>

<script>
import { version } from '../package.json'
import 'animate.css'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid'

console.log(version)

export default {
    setup() {
        const store = useStore()
        const route = useRoute()
        const router = useRouter()
        const backlink = ref()

        if (window.electronApi) {
            console.log('has electron api')

            // send vue ready event
            window.electronApi.send('vueReady', true)

            // receive status event
            window.electronApi.receive('setStatus', (data) => {
                console.log(data)
            })
        }

        onMounted(async () => {
            await router.isReady()

            const queries = { ...route.query }

            if (!route.query.survey && !route.query.step) {
                await store.dispatch('setError', {
                    error: 'No survey or step provided',
                    code: 411,
                })
            } else {
                // set survey or step
                if (route.query.survey) {
                    await store.dispatch(
                        'surveyResults/setSlug',
                        route.query.survey,
                    )
                    await store.dispatch('surveyResults/setType', 'survey')
                }
                if (route.query.step) {
                    await store.dispatch(
                        'surveyResults/setSlug',
                        route.query.step,
                    )
                    await store.dispatch('surveyResults/setType', 'step')
                }

                backlink.value = document.referer ? document.referer : '/'

                // backlink
                if (queries.backlink) {
                    window.localStorage.setItem(
                        'surveyBacklink',
                        queries.backlink,
                    )
                    delete queries.backlink
                }

                // Demo mode
                await store.dispatch(
                    'setIsDemo',
                    queries && queries.demo === 'true',
                )

                // Kiosk mode
                // Set kiosk
                if (
                    (queries.kiosk && parseInt(queries.kiosk) > 0) ||
                    parseInt(window.localStorage.getItem('surveyKiosk')) > 0
                ) {
                    window.localStorage.setItem(
                        'surveyKiosk',
                        parseInt(queries.kiosk) ||
                            parseInt(
                                window.localStorage.getItem('surveyKiosk'),
                            ),
                    )

                    await store.dispatch('setKiosk', true)

                    window.localStorage.removeItem('surveyUuid')
                }

                // Reset kiosk
                if (
                    (queries && parseInt(queries.kiosk) === 0) ||
                    parseInt(window.localStorage.getItem('surveyKiosk')) === 0
                ) {
                    window.localStorage.removeItem('surveyKiosk')
                }
                if (queries.kiosk) {
                    delete queries.kiosk
                }

                // Update URL
                await router.replace({ query: queries })

                // Load or create UUID
                const uuid =
                    window.localStorage.getItem('surveyUuid') || uuidv4()

                // Save uuid to local storage
                await localStorage.setItem('surveyUuid', uuid)
                await store.dispatch('surveyResults/setUuid', uuid)

                // load data from api
                await store.dispatch('surveyResults/getUuidResults')

                // set app ready if uuid is set
                if (store.state.surveyResults.surveyUuidResults.uuid) {
                    await store.dispatch('setAppReady', true)
                }
            }
        })

        return {
            store,
        }
    },
}
</script>

<style>
::-webkit-scrollbar {
    display: none;
}

* {
    touch-action: manipulation;
}

.timeline-container .wrap,
.timeline-container,
.sidebar,
.overflow-y-scroll,
.survey-content {
    overflow-y: scroll;
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* Internet Explorer 10+ */
}

.timeline-container .wrap::-webkit-scrollbar,
.timeline-container::-webkit-scrollbar,
.sidebar::-webkit-scrollbar,
.overflow-y-scroll::-webkit-scrollbar,
.survey-content::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
}
</style>
