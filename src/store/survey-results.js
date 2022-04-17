import SURVEY_RESULTS from '../services/survey-results-service'

export default {
    namespaced: true,
    state: {
        surveyUuidResults: null,
        surveyLoaded: false,
        slug: '',
        type: 'survey',
        uuid: '',
    },
    mutations: {
        setSurveyUuidResults(state, surveyResults) {
            state.surveyUuidResults = surveyResults
        },
        setSurveyLoaded(state, surveyLoaded) {
            state.surveyLoaded = surveyLoaded
        },
        setType(state, type) {
            state.type = type
        },
        setSlug(state, slug) {
            state.slug = slug
        },
        setUuid(state, uuid) {
            state.uuid = uuid
        },
    },
    actions: {
        async getUuidResults({ commit, state }) {
            const surveyResults = await SURVEY_RESULTS.getUuidResults(
                state.slug,
                state.uuid,
                state.type,
            )

            // check for errors
            if (surveyResults.status) {
                if (surveyResults.status === 404) {
                    console.log('error 404')
                }

                if (surveyResults.status === 409) {
                    console.log('error 409')
                }

                if (surveyResults.status === 410) {
                    console.log('error 410')
                }
            } else {
                // set survey and loaded
                commit('setSurveyUuidResults', surveyResults)
                commit('setSurveyLoaded', true)
                return surveyResults
            }
        },
        async sendSurveyResults(_, resultData) {
            await SURVEY_RESULTS.sendResults(
                resultData.surveyId,
                resultData.data,
            )
        },
        async sendSurveyAudioAsset({ commit }, resultData) {
            await SURVEY_RESULTS.sendAudioResults(resultData)
            const surveyResults = await SURVEY_RESULTS.getUuidResults(
                resultData.surveyStepResultId,
                localStorage.getItem('surveyUuid'),
            )
            commit('setSurveyUuidResults', surveyResults)
        },
        setType({ commit }, type) {
            commit('setType', type)
        },
        setSlug({ commit }, slug) {
            commit('setSlug', slug)
        },
        setUuid({ commit }, uuid) {
            commit('setUuid', uuid)
        },
    },
}
