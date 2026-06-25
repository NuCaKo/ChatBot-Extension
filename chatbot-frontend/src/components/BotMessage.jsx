import ReactMarkdown from 'react-markdown';
import ProductCard from './ProductCard';
import ProductCarousel from './ProductCarousel';
import ComparisonTable from './ComparisonTable';
import SupportSteps from './SupportSteps';
import QuickReplies from './QuickReplies';

const BotMessage = ({ message, onQuickReply }) => {
    // Determine if the message is a string (fallback/error) or a structured JSON object
    let messageData = message;

    if (typeof message === 'string') {
        try {
            messageData = JSON.parse(message);
        } catch {
            // It's just a plain string
            messageData = { speech_text: message };
        }
    }

    if (!messageData) {
        return null;
    }

    const {
        speech_text = '',
        has_visual_component = false,
        component_type = 'none',
        products = [],
        comparison_matrix = null,
        action_steps = null,
        quick_replies = []
    } = messageData;

    return (
        <div className="message-wrapper bot">
            <div className="message-bubble bot">
                <ReactMarkdown>{speech_text}</ReactMarkdown>
            </div>

            {has_visual_component && (
                <div className="visual-component-container">
                    {component_type === 'product_card' && products.length > 0 && (
                        <ProductCard product={products[0]} />
                    )}

                    {component_type === 'product_list' && products.length > 0 && (
                        <ProductCarousel products={products} />
                    )}

                    {component_type === 'comparison_table' && comparison_matrix && (
                        <ComparisonTable matrix={comparison_matrix} />
                    )}

                    {component_type === 'support_steps' && action_steps && (
                        <SupportSteps data={action_steps} />
                    )}
                </div>
            )}

            {/* Quick replies are always rendered if they exist, possibly outside visual components */}
            {quick_replies && quick_replies.length > 0 && (
                <QuickReplies replies={quick_replies} onReply={onQuickReply} />
            )}
        </div>
    );
};

export default BotMessage;
