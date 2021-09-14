import SURVEYS from '../services/survey-service'

export default {
    namespaced: true,
    state: {
        survey: null,
        surveySteps: [],
    },
    mutations: {
        setSurvey(state, survey) {
            state.survey = survey
        },
        setSurveySteps(state, surveySteps) {
            state.surveySteps = surveySteps
        },
    },
    actions: {
        async getSurvey({ commit }, surveyId) {
            const survey = await SURVEYS.SURVEYS_getSurvey(surveyId)
            commit('setSurvey', survey)
        },
        async getSurveySteps({ commit }, surveyId) {
            const survey = await SURVEYS.SURVEYS_getSurveySteps(surveyId)
            commit('setSurveySteps', survey)
        },
    },
}
