const QuickReplies = ({ replies, onReply }) => {
    if (!replies || replies.length === 0) return null;

    return (
        <div className="quick-replies-container">
            {replies.map((reply, idx) => (
                <button
                    key={idx}
                    className="quick-reply-pill"
                    onClick={() => onReply(reply.label, reply.query || reply.label)}
                >
                    {reply.label}
                </button>
            ))}
        </div>
    );
};

export default QuickReplies;
