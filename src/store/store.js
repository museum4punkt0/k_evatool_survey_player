import { createStore } from 'vuex'
import surveysStoreModule from './surveys'

export default createStore({
    modules: {
        surveys: surveysStoreModule,
    },
    state: {},
    actions: {},
})
