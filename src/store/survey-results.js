import SURVEY_RESULTS from '../services/survey-results-service'

export default {
    namespaced: true,
    state: {
        surveyUuidResults: null,
        surveyLoaded: false,
    },
    mutations: {
        setSurveyUuidResults(state, surveyResults) {
            state.surveyUuidResults = surveyResults
        },
        setSurveyLoaded(state) {
            state.surveyLoaded = true
        },
    },
    actions: {
        async getUuidResults({ commit }, data) {
            const surveyResults = await SURVEY_RESULTS.getUuidResults(
                data.surveyId,
                data.uuid,
            )

            if (surveyResults.status !== 404 && surveyResults.status !== 409) {
                commit('setSurveyUuidResults', surveyResults)
                commit('setSurveyLoaded')
                return surveyResults
            }
        },
        async sendSurveyResults(_, resultData) {
            console.log(resultData)
            await SURVEY_RESULTS.sendResults(
                resultData.surveyId,
                resultData.data,
            )

            // const surveyResults = await SURVEY_RESULTS.getUuidResults(
            //     resultData.surveyId,
            //     localStorage.getItem('surveyUuid'),
            // )
            // commit('setSurveyUuidResults', surveyResults)
        },
        async sendSurveyAudioAsset({ commit }, resultData) {
            await SURVEY_RESULTS.sendAudioResults(resultData)
            const surveyResults = await SURVEY_RESULTS.getUuidResults(
                resultData.surveyStepResultId,
                localStorage.getItem('surveyUuid'),
            )
            commit('setSurveyUuidResults', surveyResults)
        },
    },
}
