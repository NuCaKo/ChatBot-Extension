import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import BotMessage from './components/BotMessage'

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

    const handleSendMessage = async (customMessage = null, hiddenQuery = null) => {
        const displayMessage = typeof customMessage === 'string' ? customMessage : input;
        const queryToSend = typeof hiddenQuery === 'string' ? hiddenQuery : displayMessage;

        if (!displayMessage.trim()) return;

        // Kullanıcının mesajını ekle
        const userMessage = { sender: 'user', text: displayMessage };
        setMessages((prev) => [...prev, userMessage]);
        if (typeof customMessage !== 'string') {
            setInput('');
        }
        setIsLoading(true);

        try {
            // Cloudflare tüneli üzerinden güvenli backend bağlantısı
            const response = await axios.post('https://programmer-cycles-net-simulation.trycloudflare.com/api/chat', {
                message: queryToSend
            });

            // Gelen cevabı ekrana yaz
            const botData = response.data.response || response.data;
            const botMessage = { sender: 'bot', data: botData };
            setMessages((prev) => [...prev, botMessage]);

        } catch (error) {
            console.error("Hata:", error);
            setMessages((prev) => [...prev, { sender: 'bot', data: 'Sunucuya bağlanırken bir hata oluştu. Lütfen daha sonra tekrar deneyin.' }]);
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
                {messages.map((msg, index) => {
                    if (msg.sender === 'user') {
                        return (
                            <div key={index} className="message-bubble user">
                                {msg.text}
                            </div>
                        );
                    }
                    return <BotMessage key={index} message={msg.data || msg.text} onQuickReply={handleSendMessage} />;
                })}
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
                <button onClick={() => handleSendMessage()} disabled={isLoading || !input.trim()}>
                    Gönder
                </button>
            </div>
        </div>
    )
}

export default App