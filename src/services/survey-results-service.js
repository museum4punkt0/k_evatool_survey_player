import axios from 'axios'
import store from '../store/store'

export default {
    async getUuidResults(surveySlug, uuid = null) {
        let url = 'evaluation-tool/surveys/' + surveySlug + '/run'
        if (uuid) {
            url += '?uuid=' + uuid
        }
        return axios
            .get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                return error
            })
    },
    async sendResults(surveySlug, data) {
        // let header = {}

        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'Access-Control-Allow-Origin': '*',
            },
        }
        if (store.state.isDemo === true) {
            // header = { 'X-Demo': true }
            axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'X-Demo': true,
                },
            }
        }

        const url =
            'evaluation-tool/surveys/' +
            surveySlug +
            '/run?uuid=' +
            window.localStorage.getItem('surveyUuid')

        return axios
            .post(url, data, {
                axiosConfig,
            })
            .then((res) => {
                return { code: res.status, data: res }
            })
            .catch((error) => {
                return error
            })
    },
}
