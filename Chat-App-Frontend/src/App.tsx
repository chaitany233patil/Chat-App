import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Chat } from "./pages/Chat";
import { Home } from "./pages/Home";
import { WS_BACKEND } from "../config";

function App() {
  const [chat, setChat] = useState(false);
  const wsRef = useRef<WebSocket>(null);
  const joinRoomId = useRef<HTMLInputElement>(null);
  const username = useRef<HTMLInputElement>(null);
  const [roomId, setRoomId] = useState("");
  const [roomStatus, setRoomStatus] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const chatMessage = useRef<HTMLInputElement>(null);
  const [typingStatus, setTypingStatus] = useState({
    status: false,
    username: "none",
  });

  function createRoom() {
    wsRef.current?.send(
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
    if (!joinRoomId.current || !username.current) return;
    localStorage.setItem("roomId", joinRoomId.current.value);
    localStorage.setItem("username", username.current?.value);
    if (!joinRoomId.current?.value || !username.current?.value) return;
    wsRef.current?.send(
      JSON.stringify({
        type: "join",
        payload: {
          roomId: joinRoomId.current?.value,
        },
      })
    );
  }

  function sendChat() {
    if (!chatMessage.current?.value) return;
    wsRef.current?.send(
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

  function Typing() {
    wsRef.current?.send(
      JSON.stringify({
        type: "typing",
        payload: {
          roomId: localStorage.getItem("roomId"),
          username: localStorage.getItem("username"),
          status: "typing...",
        },
      })
    );
  }

  useEffect(() => {
    const ws = new WebSocket(WS_BACKEND);
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

      if (parseData.type == "Typing") {
        setTypingStatus({
          status: true,
          username: parseData.username,
        });
      }

      if (parseData.type == "chat") {
        setMessages((prevMess) => [...prevMess, parseData.payload]);
      }
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTypingStatus((prev) => {
        return {
          ...prev,
          status: false,
        };
      });
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [typingStatus]);

  return (
    <div>
      {chat ? (
        <Chat
          sendChat={sendChat}
          messages={messages}
          reference={chatMessage}
          Typing={Typing}
          isTyping={typingStatus}
        />
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
