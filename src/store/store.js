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
        setCurrentStep(state, step) {
            if (step) {
                state.currentStep = step
            } else {
                if (state.currentStep + 1 < state.surveys.surveySteps.length) {
                    state.currentStep++
                    window.localStorage.setItem(
                        'ev-tool-current-step',
                        state.currentStep,
                    )
                }
                if (
                    state.currentStep + 1 ===
                    state.surveys.surveySteps.length
                ) {
                    window.localStorage.setItem('ev-tool-current-step', 0)
                }
            }
        },
        decCurrentStep(state) {
            if (state.currentStep > 0) {
                state.currentStep--
            }
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
        setSurveyId({ commit }, surveyId) {
            commit('setSurveyId', surveyId)
        },
        setCurrentStep({ commit }, step) {
            commit('setCurrentStep', step)
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
