import React, { useState, useEffect } from "react"
import { io } from "socket.io-client"

const Comment = () => {
  const [comment, setComment] = useState("")
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])

  const handleChange = (e) => {
    setComment(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (comment.trim() && socket) {
      socket.emit("chatMessage", comment)
      console.log("Comment submitted:", comment)
      setComment("")
    }
  }

  useEffect(() => {
    const newSocket = io("http://localhost:5000")
    setSocket(newSocket)

    newSocket.on("connect", () => {
      console.log("Connected to server")
    })

    newSocket.on("chatMessage", (msg) => {
      setMessages((prev) => [...prev, msg]) 
    })

    return () => {
      newSocket.disconnect()
      console.log("Disconnected from server")
    }
  }, [])

  return (
    <div>
      <form onSubmit={handleSubmit}>
     
        <input
          type="text"
          placeholder="Comment here"
          value={comment}
          onChange={handleChange}
        />
        <button type="submit">Comment</button>



           <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      </form>
    </div>
  )
}

export default Comment
