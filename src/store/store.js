import { createStore } from 'vuex'
import axios from 'axios'
import surveysStoreModule from './surveys'
import surveyResultsStoreModule from './survey-results'

export default createStore({
    modules: {
        surveys: surveysStoreModule,
        surveyResults: surveyResultsStoreModule,
    },
    state: {
        lang: 'de',
        suveyId: null,
        languages: [],
        currentStep: 0,
    },
    mutations: {
        setSuveyId(state, suveyId) {
            state.suveyId = suveyId
        },
        setCurrentStep(state) {
            state.currentStep++
        },
        decCurrentStep(state) {
            state.currentStep--
        },
        setLanguages(state, languages) {
            state.languages = languages
        },
        setUserLanguage(state, lang) {
            // set userLanguage or set defaultLanguage if userLanguage not found
            if (state.languages.find((x) => x.code === lang)) {
                state.lang = lang
            } else {
                let defaultLangObject = state.languages.find(
                    (x) => x.default === true,
                )
                state.lang = defaultLangObject.code
            }
        },
    },
    actions: {
        setSurveyId({ commit }, suveyId) {
            commit('setSurveyId', suveyId)
        },
        setCurrentStep({ commit }) {
            commit('setCurrentStep')
        },
        decCurrentStep({ commit }) {
            commit('decCurrentStep')
        },
        // async setUserLanguage({ commit }, lang) {
        async setUserLanguage() {
            // commit('setUserLanguage', lang)
        },
        // async getLanguages({ commit }, userLang) {
        async getLanguages() {
            const url = 'evaluation-tool/survey-languages'
            let languages = await axios
                .get(url)
                .then((response) => {
                    return response.data.data
                })
                .catch((error) => {
                    return error
                })
            console.log(languages)
            //commit('setLanguages', languages)
            // commit('setUserLanguage', userLang)
        },
    },
})
