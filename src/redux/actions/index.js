export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const SET_USERNAME = 'SET_USERNAME'
export const GET_BOOKS = 'GET_BOOKS'
export const GET_BOOKS_LOADING = 'GET_BOOKS_LOADING'
export const GET_BOOKS_ERROR = 'GET_BOOKS_ERROR'

// this is an ACTION CREATOR
// an ACTION CREATOR is a FUNCTION returning an ACTION!
export const addToCartAction = (bookSelected) => {
  return {
    type: ADD_TO_CART, // is the description of the action
    payload: bookSelected,
    // payload is the name of the property holding
    // any other necessary piece of info for making
    // our action usable, working, worthy
  }
}

// same but shortened:
// export const addToCartAction = (bookSelected) => ({
//   type: ADD_TO_CART, // is the description of the action
//   payload: bookSelected,
//   // payload is the name of the property holding
//   // any other necessary piece of info for making
//   // our action usable, working, worthy
// })

export const removeFromCartAction = (i) => {
  return {
    type: REMOVE_FROM_CART,
    payload: i,
  }
}

// the invocation of an action creator returns the action object!
// setUsernameAction('stefano') ==> returns an action of type 'SET_USERNAME'
// with 'stefano' as the payload
export const setUsernameAction = (name) => {
  return {
    type: SET_USERNAME,
    payload: name,
  }
}

// there's also another way of writing an ACTION CREATOR
// this way allows more control and more features...
export const addToCartActionAsync = (bookSelected) => {
  return async (dispatch, getState) => {
    // instead of returning an object (the action),
    // this special action creator returns A FUNCTION
    // ...in here we can do anything we want

    // if Redux detects that a special action creator has been dispatched
    // (so an action creator that doesn't return an object but a function)
    // it will automagically inject two arguments in this function:
    // 1) the dispatch() function
    // 2) getState(), which when invoked returns the whole redux store object

    // you can do your async stuff here...
    // ...and at the end use dispatch()
    console.log('...about to dispatch the "ADD_TO_CART" action')
    console.log('getState', getState())
    // just as a joke, let's limit the cart size to 6 elements :))
    if (getState().cart.content.length < 6) {
      dispatch({
        type: ADD_TO_CART,
        payload: bookSelected,
      })
    }
  }
}

export const getBooksActionAsync = () => {
  return async (dispatch, getState) => {
    try {
      let resp = await fetch(
        'https://striveschool-api.herokuapp.com/food-books'
      )
      if (resp.ok) {
        let fetchedBooks = await resp.json()
        // here I have the books from the API!
        // instead of using them in a local state,
        // I'm going to send them to the reducer :)

        // here the operation definitely finished with a 200
        // let's shut the isLoading state variable down!

        dispatch({
          type: GET_BOOKS,
          payload: fetchedBooks,
        })
        dispatch({
          type: GET_BOOKS_LOADING,
          payload: false,
        })
      } else {
        dispatch({
          type: GET_BOOKS_LOADING,
          payload: false,
        })
        dispatch({
          type: GET_BOOKS_ERROR,
          payload: true,
        })
      }
    } catch (error) {
      dispatch({
        type: GET_BOOKS_LOADING,
        payload: false,
      })
      dispatch({
        type: GET_BOOKS_ERROR,
        payload: true,
      })
    }
  }
}
