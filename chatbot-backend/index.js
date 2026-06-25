const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Mock database for context/history based on a session (simplistic for demo)
const sessions = {};

app.post('/api/chat', (req, res) => {
    const { message, system_prompt } = req.body;

    // In a real application, you would pass `message` and `system_prompt` to an LLM like OpenAI, Anthropic, etc.
    // For this mockup, we are simulating a response that strictly adheres to the requested JSON format.

    console.log(`Received message: ${message}`);
    if (system_prompt) {
        console.log(`Using System Prompt: ${system_prompt.substring(0, 50)}...`);
    }

    let responseData = {
        intent: 'support',
        speech_text: "I'm sorry, I didn't quite catch that. How can I help you today?",
        has_visual_component: false,
        component_type: 'none'
    };

    const lowercaseMessage = message.toLowerCase();

    if (lowercaseMessage.includes('tava') && lowercaseMessage.includes('karşılaştırma')) {
        responseData = {
            intent: 'comparison',
            speech_text: "Here is the comparison between the **Biogranit** and **Steel** pans:",
            has_visual_component: true,
            component_type: "comparison_table",
            comparison_matrix: {
                attributes: ["Material", "Price", "Warranty"],
                products: [
                    { name: "Karaca Biogranit Pan", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Tefal_Frypan.jpg/1200px-Tefal_Frypan.jpg", values: ["Biogranit", "899 TL", "2 Years"] },
                    { name: "Karaca Steel Pan", image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Stainless_steel_frying_pan.jpg/1200px-Stainless_steel_frying_pan.jpg", values: ["Steel", "1299 TL", "5 Years"] }
                ]
            },
            quick_replies: [
                { label: "Add Biogranit to Cart", query: "add_to_cart_biogranit" },
                { label: "View Steel Pan", query: "view_steel_pan" }
            ]
        };
    } else if (lowercaseMessage.includes('iade') || lowercaseMessage.includes('return')) {
        responseData = {
            intent: 'support',
            speech_text: "I can help you with your return. Please follow these steps:",
            has_visual_component: true,
            component_type: "support_steps",
            action_steps: {
                title: "Return Process",
                steps: [
                    "Pack your item securely.",
                    "Attach the return label.",
                    "Drop off at the nearest shipping point."
                ]
            }
        };
    } else if (lowercaseMessage.includes('ürünler') || lowercaseMessage.includes('products')) {
         responseData = {
            intent: 'product_explanation',
            speech_text: "Here are some of our popular products:",
            has_visual_component: true,
            component_type: "product_list",
            products: [
                {
                    product_id: "p1",
                    product_name: "Karaca Fine Pearl Teapot",
                    image_url: "https://placehold.co/200/eee/31343C",
                    price: "1599 TL",
                    key_features: ["Pearl coating", "Durable", "Elegant design"],
                    product_url: "#"
                },
                {
                    product_id: "p2",
                    product_name: "Karaca Home Bedding Set",
                    image_url: "https://placehold.co/200/eee/31343C",
                    price: "2499 TL",
                    key_features: ["100% Cotton", "Breathable", "Easy to wash"],
                    product_url: "#"
                }
            ]
        };
    } else {
        // General query
        responseData = {
            intent: 'Q&A',
            speech_text: "As a Karaca customer representative, I am happy to assist you. Could you please provide more details?",
            has_visual_component: false,
            component_type: 'none',
             quick_replies: [
                { label: "View Products", query: "show me products" },
                { label: "Return Policy", query: "how to return" }
            ]
        }
    }

    setTimeout(() => {
        res.json({ response: responseData });
    }, 1000); // Simulate network delay
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
