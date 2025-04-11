import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";

function App() {
  const [chat, setChat] = useState(false);
  const wsRef = useRef<any>(null);
  const joinRoomId = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const [roomId, setRoomId] = useState("");
  const [roomStatus, setRoomStatus] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatMessage = useRef<HTMLInputElement>(null);

  function createRoom() {
    wsRef.current.send(
      JSON.stringify({
        type: "create",
        payload: {
          message: "",
        },
      })
    );
    setRoomStatus(true);
  }

  function joinRoom() {
    localStorage.setItem("roomId", joinRoomId.current?.value);
    localStorage.setItem("username", username.current?.value);
    wsRef.current.send(
      JSON.stringify({
        type: "join",
        payload: {
          roomId: joinRoomId.current?.value,
        },
      })
    );
  }

  function sendChat() {
    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: {
          roomId: localStorage.getItem("roomId"),
          username: localStorage.getItem("username"),
          message: chatMessage.current?.value,
        },
      })
    );
    chatMessage.current.value = "";
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      wsRef.current = ws;
    };

    ws.onmessage = (e) => {
      const parseData = JSON.parse(e.data);
      if (parseData.type == "create") {
        setRoomId(parseData.payload.roomId);
        localStorage.setItem("roomId", parseData.payload.roomId);
      }

      if (parseData.type == "join") {
        setChat(true);
      }

      if (parseData.type == "chat") {
        console.log(parseData.payload);
        setMessages((prevMess) => [...prevMess, parseData.payload]);
      }
    };
  }, []);

  return (
    <div>
      {chat ? (
        <Chat sendChat={sendChat} messages={messages} reference={chatMessage} />
      ) : (
        <Home
          createRoom={createRoom}
          joinRoom={joinRoom}
          reference={joinRoomId}
          usernameRef={username}
          roomId={roomId}
          roomStatus={roomStatus}
        />
      )}
    </div>
  );
}

export default App;
