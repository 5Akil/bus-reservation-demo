import React, { createContext, useContext, useReducer, useState } from 'react'

// This is DATA LAYER
export const SocketContext = createContext();

//BUILD A PROVIDER
export const SocketProvider = ({ children, socket }) => (

    /*use reducer hook is hear */
    <SocketContext.Provider value={ socket}>
        {/*HERe children refers to all child components that we wrap inside at index.js */}
        {children}
    </SocketContext.Provider>
)

//This is how we use contaxt in components
export const useStateValue = () => useContext(SocketContext); 