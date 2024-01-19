import './App.css'
import { RouterProvider } from 'react-router'
import MainRoutes from './Routs/MainRouts.jsx'
import { io } from "socket.io-client";
import { createContext, useEffect, useState } from 'react';



export const SocketContext = createContext()
function App() {

  const [socket, setSocket] = useState(null);
  useEffect(() => {
    setSocket(io("http://localhost:3214"));
  }, []);
  return (
    <>
      <SocketContext.Provider value={socket}>
        <RouterProvider router={MainRoutes} />
      </SocketContext.Provider>
    </>
  )

}

export default App
