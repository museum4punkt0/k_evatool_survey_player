import axios from 'axios'

axios.defaults.headers['X-DEMO'] = true
export default {
    async SURVEYS_getSurvey(surveyId) {
        const url = 'evaluation-tool/surveys/' + surveyId + '/run'
        return axios
            .get(url)
            .then((response) => {
                console.log(response.data)
                return response.data
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
    async SURVEYS_getSurveyStepById(surveyId, stepId) {
        // const url = 'evaluation-tool/survey-steps/' + stepId
        const url = 'evaluation-tool/surveys/' + surveyId + '/steps/' + stepId

        return axios
            .get(url)
            .then((response) => {
                console.log(response)
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
