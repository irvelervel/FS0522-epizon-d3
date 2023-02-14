import { GET_BOOKS, GET_BOOKS_ERROR, GET_BOOKS_LOADING } from '../actions'

const initialState = {
  stock: [],
  isLoading: true,
  isError: false,
}

const bookReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        stock: action.payload, // action.payload is the array of the fetched books
      }

    case GET_BOOKS_LOADING:
      return {
        ...state,
        isLoading: action.payload, // which is false when the books are fetched
      }

    case GET_BOOKS_ERROR:
      return {
        ...state,
        isError: action.payload,
      }

    default:
      return state
  }
}

export default bookReducer
