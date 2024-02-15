import { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

// const socket = io.connect("http://localhost:5000")
const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (message.length > 0) {
      socket.emit("chat", { message });
      setMessage("");
    }
  };

  // This code will render only one time :)
  useEffect(() => {
    socket.on("chat", (payload) => {
      // setChat([payload,...chat])  // This code will change chat only one time.
      setChat((chat) => [payload, ...chat]); // Changing using function becoz it ll render one time only.
    });
  }, []);

  const chatarr = chat.map((payload) => (
    <h1 key={uuidv4()}>{payload.message}</h1>
  ));
  return (
    <div className="App">
      <center>
        <h1>Socket Chat in MERN stack</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Type message..."
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button type="submit" style={{ cursor: "pointer" }}>
            Submit
          </button>
        </form>
        <div>{chatarr}</div>
      </center>
    </div>
  );
}

export default App;
