import axios from 'axios'

export const BASE_URL = 'http://localhost:8001/api/v1'

class Request {
  getHeaders() {
    try {
      return {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user') || '').token}`,
      }
    } catch (e) {
      return console.log(e.message)
    }
  }

  get: (url: string,headers?: any) => any = (url, headers = {}) => {
    return axios({
      method: 'get',
      url: BASE_URL + url,
      headers: { ...this.getHeaders(), ...headers },
    })
  }

  post: (url: string,data: any,headers?: any) => any = (url,data, headers = {}) => {
    return axios({
      method: 'post',
      url: BASE_URL + url,
      headers: { ...this.getHeaders(), ...headers },
      data
    })
  }

}
export default new Request()
