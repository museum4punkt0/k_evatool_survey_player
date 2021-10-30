import axios from 'axios'

axios.defaults.headers['X-DEMO'] = true
export default {
    /*async SURVEYS_getSurvey(surveySlug) {
        const url = 'evaluation-tool/surveys/' + surveySlug + '/run'
        return axios
            .get(url)
            .then((response) => {
                // console.log(response.data)
                return response.data
            })
            .catch((error) => {
                return error
            })
    },*/
}
