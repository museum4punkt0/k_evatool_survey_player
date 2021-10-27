import axios from 'axios'

axios.defaults.headers['X-DEMO'] = true
export default {
    async getResults(surveySlug) {
        console.log(surveySlug)
        const url = 'evaluation-tool/surveys/' + surveySlug + '/run'

        return axios
            .get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            })
    },
    async getUuidResults(surveySlug, uuid) {
        console.log(surveySlug)
        const url =
            'evaluation-tool/surveys/' + surveySlug + '/run?uuid=' + uuid

        return axios
            .get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            })
    },
    /*async sendAudioResults(data, surveyId, surveyStepId, surveyStepResultId) {
      console.log(data, surveyId, surveyStepId, surveyStepResultId)
      const url =
          'evaluation-tool/surveys/' +
          surveyId +
          '/survey-steps/' +
          surveyStepId +
          '/survey-step-results/' +
          surveyStepResultId +
          '/survey-step-result-assets'
      console.log(data)
      return axios
          .post(url, data)
          .then((res) => {
              return { code: res.status, data: res }
          })
          .catch((error) => {
              return error
          })
  },*/
    async sendResults(surveySlug, data) {
        const url =
            'evaluation-tool/surveys/' +
            surveySlug +
            '/run?uuid=' +
            window.localStorage.getItem('surveyUUID')
        return axios
            .post(url, data)
            .then((res) => {
                return { code: res.status, data: res }
            })
            .catch((error) => {
                return error
            })
    },

    // /api/evaluation-tool/survey-step-result-assets
}
