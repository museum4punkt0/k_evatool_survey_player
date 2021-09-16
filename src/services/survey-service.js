import axios from 'axios'

export default {
    async SURVEYS_getSurvey(surveyId) {
        const url = 'evaluation-tool/surveys/' + surveyId
        return axios
            .get(url)
            .then((response) => {
                return response.data.data
            })
            .catch((error) => {
                return error
            })
    },
    async SURVEYS_getSurveySteps(surveyId) {
        const url = 'evaluation-tool/surveys/' + surveyId + '/survey-steps'
        return axios
            .get(url)
            .then((response) => {
                return response.data.data
            })
            .catch((error) => {
                return error
            })
    },
    async SURVEYS_getSurveyStepById(stepId) {
        const url = 'evaluation-tool/survey-steps/' + stepId
        return axios
            .get(url)
            .then((response) => {
                return response.data.data
            })
            .catch((error) => {
                return error
            })
    },
    async SURVEYS_getSurveyElementById(elementId) {
        const url = 'evaluation-tool/survey-element/' + elementId
        return axios
            .get(url)
            .then((response) => {
                return response.data.data
            })
            .catch((error) => {
                return error
            })
    },
}
