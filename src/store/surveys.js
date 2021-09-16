import SURVEYS from '../services/survey-service'

export default {
    namespaced: true,
    state: {
        survey: null,
        surveySteps: [],
        surveyStep: [],
        surveyElement: [],
    },
    mutations: {
        setSurvey(state, survey) {
            state.survey = survey
        },
        setSurveySteps(state, surveySteps) {
            state.surveySteps = surveySteps
        },
        setSurveyStepById(state, surveyStep) {
            state.surveyStep = surveyStep
        },
        setSurveyElementById(state, surveyElement) {
            state.surveyElement = surveyElement
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
        async getSurveyStepById({ commit }, stepId) {
            const step = await SURVEYS.SURVEYS_getSurveyStepById(stepId)
            commit('setSurveyStepById', step)
        },
        async getSurveyElementById({ commit }, elementId) {
            const element = await SURVEYS.SURVEYS_getSurveyElementById(
                elementId,
            )
            commit('setSurveyElementById', element)
        },
    },
}
