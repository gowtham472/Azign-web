import { useState, useEffect } from "react";
import axios from "axios";
import "./Chat.css"; // Ensure to create a Chat.css file for styling

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    useEffect(() => {
        // Fetch messages from MongoDB
        axios.get("https://c1q1h48z-8000.inc1.devtunnels.ms/api/messages")
            .then(response => setMessages(response.data))
            .catch(error => console.error("Error fetching messages:", error));
    }, []);

    const sendMessage = () => {
        if (input.trim() === "") return;
        const newMessage = { text: input, sender: "user" };

        // Save message to MongoDB
        axios.post("https://c1q1h48z-8000.inc1.devtunnels.ms/api/messages", newMessage)
            .then(response => setMessages([...messages, response.data]))
            .catch(error => console.error("Error sending message:", error));

        setInput("");
    };

    return (
        <div className="chat-container">
            <div className="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={msg.sender === "user" ? "chat-message user" : "chat-message bot"}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
}
