import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
    const [messages, setMessages] = useState([
        { sender: 'bot', text: 'Karaca\'ya hoş geldiniz! Size nasıl yardımcı olabilirim?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const messagesEndRef = useRef(null);

    // Yeni mesaj geldiğinde ekranı en alta kaydır
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Kullanıcının mesajını ekle
        const userMessage = { sender: 'user', text: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Cloudflare tüneli üzerinden güvenli backend bağlantısı
            const response = await axios.post('https://programmer-cycles-net-simulation.trycloudflare.com/api/chat', {
                message: userMessage.text
            });

            // Gelen cevabı ekrana yaz
            const botMessage = { sender: 'bot', text: response.data.response };
            setMessages((prev) => [...prev, botMessage]);

        } catch (error) {
            console.error("Hata:", error);
            setMessages((prev) => [...prev, { sender: 'bot', text: 'Sunucuya bağlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Destek Asistanı</h2>
            </div>


                <div className="chat-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`message-bubble ${msg.sender}`}>
                            {msg.text}  {/* Buranın msg.text olduğundan emin ol, msg.message veya başka bir şey kalmış olmasın */}
                        </div>
                    ))}
                {isLoading && (
                    <div className="message-bubble bot typing">
                        Asistan yazıyor...
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="chat-input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Mesajınızı yazın..."
                    disabled={isLoading}
                />
                <button onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
                    Gönder
                </button>
            </div>
        </div>
    )
}

export default App