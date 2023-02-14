import { configureStore, combineReducers } from '@reduxjs/toolkit'
import bookReducer from '../reducers/bookReducer'
import cartReducer from '../reducers/cartReducer'
import userReducer from '../reducers/userReducer'
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage' // default value: localStorage
import { encryptTransform } from 'redux-persist-transform-encrypt'

const persistConfig = {
  storage: localStorage,
  key: 'root', // this brings the whole redux store into persistency
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_ENV_SECRET_KEY,
    }),
  ],
}

const combinedReducer = combineReducers({
  cart: cartReducer, // <-- use cartReducer to manage the cart slice of the Store
  user: userReducer, // <-- use userReducer to manage the user slice of the Store
  book: bookReducer,
})

const persistedReducer = persistReducer(persistConfig, combinedReducer)
// persistedReducer is the persisted version of our single (and combined) reducer function

const store = configureStore({
  reducer: persistedReducer, // ...giving back to reducer a single function once again
  // we're telling Redux which reducer function to use!
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
      // this shuts off the checking of non-serializable values in actions
    })
  },
})

const persistedStore = persistStore(store)
// a persisted version of our store
// ...lots of stuff, but feel free to take this file as a refenrce :)

export { store, persistedStore }
// store is the fully configured Redux Store!
// let's export it to use it somewhere else :)
// hint: src/index.js

// splitting the reducers we also simplify their assigned portions of the state!
// the redux store is still something like this:
// store = {
//   cart: { content: [] }, // <-- this is assigned to cartReducer
//   user: { name: '' } // <-- this is assigned to userReducer
// }

// we managed splitting the reducers in two, each one managing just
// one slice of the big redux store
// now we have to pass these 2 smaller reducers to Redux!
// ...but there's space for only one reducer function :(
// we have to use combineReducers() to join together cartReducer & userReducer
// (...or as many as you have)
// in order to give once again the reducer: property of configureStore
// a reducer function capable of dealing with the whole redux store
