"""
YCCE Chatbot - Flask Backend API
Handles intent classification and response generation
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import json
import logging

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Load trained model and vectorizer
try:
    with open('model.pkl', 'rb') as f:
        model = pickle.load(f)
    with open('vectorizer.pkl', 'rb') as f:
        vectorizer = pickle.load(f)
    logger.info("✅ Model and vectorizer loaded successfully")
except FileNotFoundError:
    logger.error("❌ Model files not found. Run train_model.py first!")
    model, vectorizer = None, None

# Load responses
with open('responses.json', 'r') as f:
    responses_data = json.load(f)
    RESPONSES = responses_data['responses']

# Confidence threshold
CONFIDENCE_THRESHOLD = 0.6

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'model_loaded': model is not None
    })

@app.route('/api/chat', methods=['POST'])
def chat():
    """
    Main chatbot endpoint
    Expected JSON: { "message": "user query" }
    Returns: { "reply": "bot response", "intent": "predicted_intent", "confidence": 0.95 }
    """
    try:
        data = request.json
        user_message = data.get('message', '').strip()
        
        if not user_message:
            return jsonify({
                'reply': 'Please enter a message.',
                'intent': 'error',
                'confidence': 0
            }), 400
        
        if model is None or vectorizer is None:
            return jsonify({
                'reply': 'Chatbot model is not loaded. Please contact support.',
                'intent': 'error',
                'confidence': 0
            }), 500
        
        # Preprocess and vectorize
        message_vec = vectorizer.transform([user_message.lower()])
        
        # Predict intent
        predicted_intent = model.predict(message_vec)[0]
        confidence = max(model.predict_proba(message_vec)[0])
        
        # Log prediction
        logger.info(f"Query: '{user_message}' | Intent: {predicted_intent} | Confidence: {confidence:.2f}")
        
        # Get response based on confidence
        if confidence < CONFIDENCE_THRESHOLD:
            response = RESPONSES['fallback']
            intent = 'fallback'
            logger.warning(f"Low confidence ({confidence:.2f}), using fallback")
        else:
            response = RESPONSES.get(predicted_intent, RESPONSES['fallback'])
            intent = predicted_intent
        
        return jsonify({
            'reply': response,
            'intent': intent,
            'confidence': float(confidence)
        })
    
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return jsonify({
            'reply': 'Sorry, an error occurred. Please try again.',
            'intent': 'error',
            'confidence': 0
        }), 500

@app.route('/api/stats', methods=['GET'])
def get_stats():
    """Get model statistics"""
    if model is None:
        return jsonify({'error': 'Model not loaded'}), 500
    
    return jsonify({
        'intents': list(model.classes_),
        'num_features': vectorizer.get_feature_names_out().shape[0],
        'confidence_threshold': CONFIDENCE_THRESHOLD
    })

if __name__ == '__main__':
    print("\n" + "="*60)
    print("🤖 YCCE CHATBOT API SERVER")
    print("="*60)
    print("📡 Server running on http://localhost:5000")
    print("📡 Health check: http://localhost:5000/api/health")
    print("📡 Chat endpoint: POST http://localhost:5000/api/chat")
    print("="*60 + "\n")
    
    app.run(debug=True, port=5000)
