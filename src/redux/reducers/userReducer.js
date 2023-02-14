// the reducer function takes the current state and the action that just fot
// dispatched as arguments!
// with these two pieces of info the reducer will compute the NEW app state!

import { SET_USERNAME } from '../actions'

// let's think about the initial shape and values of the Redux Store
// this object will be shared across the entire app, is going to be
// reliable, immutable, read-only, predictable

// even if so far we have to work just with one single cart array,
// let's start already following the best practises: let's divide our main
// store object into CHUNKS, SLICES, PORTIONS.
// these slices will host in themselves every related property
const initialState = {
  name: '',
}

// now we're ready to write the reducer function
const userReducer = (state = initialState, action) => {
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
    case SET_USERNAME:
      return {
        ...state, // this will make a copy of the 'cart' sub-object
        name: action.payload,
        // action.payload is the content of the input field in CartIndicator
        // travelled all the way until here!
      }

    default:
      // we'll fall here if we don't recognize the last dispatched action type
      // maybe because of a bug, maybe because of a feature not finished yet!
      // what is our reducer going to compute in the case of an unhandled action??
      return state
    // returning the last state in case of "emergency" will make our app unbreakable!
  }
}

export default userReducer
