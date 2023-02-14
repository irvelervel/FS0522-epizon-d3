// the reducer function takes the current state and the action that just fot
// dispatched as arguments!
// with these two pieces of info the reducer will compute the NEW app state!

import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions'

// let's think about the initial shape and values of the Redux Store
// this object will be shared across the entire app, is going to be
// reliable, immutable, read-only, predictable

// even if so far we have to work just with one single cart array,
// let's start already following the best practises: let's divide our main
// store object into CHUNKS, SLICES, PORTIONS.
// these slices will host in themselves every related property
const initialState = {
  // this is the cart slice of the Redux Store
  // let's put here every value related to the cart feature!
  content: [],
}

// now we're ready to write the reducer function
const cartReducer = (state = initialState, action) => {
  // the reducer is like a robot function which will be in charge
  // of returning the new application state in every possible scenario
  // it is not any function, but a PURE FUNCTION
  // a pure function never mutates its arguments, and from the same input
  // will always emit the same output (no sketchy behaviours allowed here!)

  // state = initialState as the first argument means that initialState
  // is the default value for the first argument

  switch (action.type) {
    // our dispatched action with type 'ADD_TO_CART' succesfully reached the reducer!!
    // but we didn't specify yet how to handle that action type :(
    // let's now write a case for 'ADD_TO_CART' so we can tell the reducer
    // what to do when that specific action type is encountered...
    case ADD_TO_CART:
      // IMPORTANT!
      // every switch case has to return the new application state!
      return {
        ...state, // <-- this takes care of bringing into this new
        // cart slice object ALL the previous content!
        // now, finally, we can safely provide a new value for content
        // content: state.cart.content.push(action.payload) // <-- BAD
        // we have to find ways of working with arrays without modifying
        // them in place (we need to return new things!)
        content: [...state.content, action.payload],
        // content: state.cart.content.concat(action.payload),
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        // content: [
        //   ...state.cart.content.slice(0, action.payload),
        //   ...state.cart.content.slice(action.payload + 1),
        // ],
        content: state.content.filter((el, i) => i !== action.payload),
        // again, finding ways of removing elements from an array without
        // touching the original one!
      }

    default:
      // we'll fall here if we don't recognize the last dispatched action type
      // maybe because of a bug, maybe because of a feature not finished yet!
      // what is our reducer going to compute in the case of an unhandled action??
      return state
    // returning the last state in case of "emergency" will make our app unbreakable!
  }
}

export default cartReducer
