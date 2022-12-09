import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useReducer } from "react";
import React, { createContext } from "react";

let defaultValue: any = null;
const StoreContext = createContext(defaultValue);

const ACTION_TYPES = {
  SET_LAT_LONG: 'SET_LAT_LONG',
  SET_COFFEE_STORES: 'SET_COFFEE_STORES'
}

const storeReducer = (state:any , action:any) => {
  switch(action.type) {
    case ACTION_TYPES.SET_LAT_LONG: {
        return {...state, latLong:action.payload.latLong};
    }

    case ACTION_TYPES.SET_COFFEE_STORES: {
        return {...state, coffeeStores: action.payload.latLong};
    }

    default: 
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const StoreProvider = ({ children }: any) => {
  const initialState = {
    latLong: "",
    coffeeStores: [],
  };
  const [state, dispatch] = useReducer(storeReducer,initialState);
    return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};
export default function App({ Component, pageProps }: AppProps) {
  return (
    <StoreProvider>
      <React.Fragment>
        <Component {...pageProps} />
      </React.Fragment>
    </StoreProvider>
  );
}
