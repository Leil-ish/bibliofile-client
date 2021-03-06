import TokenService from '../services/token-service'
import config from '../config'

const BookApiService = {
  getBooks() {
    return fetch(`${config.API_ENDPOINT}/library`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getBook(bookId) {
    return fetch(`${config.API_ENDPOINT}/library/${bookId}`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getNote(bookId, noteId) {
    return fetch(`${config.API_ENDPOINT}/library/${bookId}/notes/${noteId}`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getAllNotes() {
    return fetch(`${config.API_ENDPOINT}/notes`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getBookNotes(bookId) {
    return fetch(`${config.API_ENDPOINT}/library/${bookId}/notes`, {
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postNote(bookId, content, note_name) {
    return fetch(`${config.API_ENDPOINT}/library/${bookId}/add-note`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        book_id: bookId,
        content,
        note_name,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postBook(title, authors, description, categories, image_links, is_ebook) {
    return fetch(`${config.API_ENDPOINT}/library`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
        authors,
        description,
        categories,
        image_links,
        is_ebook,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  postCustomBook(title, authors, description, categories) {
    return fetch(`${config.API_ENDPOINT}/library/add-book`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        title,
        authors,
        description,
        categories,
      }),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  patchBook(bookId, rating, borrowed) {
    return fetch(`${config.API_ENDPOINT}/library/${bookId}`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      },
      body: JSON.stringify({
        book_id: bookId,
        rating,
        borrowed
      }),
    })
  },
}

export default BookApiService
