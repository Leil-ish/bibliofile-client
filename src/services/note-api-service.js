import TokenService from '../services/token-service'
import config from '../config'

const NoteApiService = {
  getNotes() {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      headers: {
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getNote(noteId) {
    return fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default NoteApiService
