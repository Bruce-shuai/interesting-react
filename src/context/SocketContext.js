import React, { useContext, useEffect, useState } from 'react'
import io from 'socket.io-client'

const SocketContext = React.createContext()

export function useSocket() {
  return useContext(SocketContext)
}

export function SocketProvider({ id, children }) {  // 这里的id是用户的email
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      'http://localhost:5004',
      { query: { id } }
    )
    setSocket(newSocket)

    return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  )
}