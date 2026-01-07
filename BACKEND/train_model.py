"""
YCCE Chatbot - Intent Classification Model Training
Uses TF-IDF + Logistic Regression for intent prediction
"""

import json
import pickle
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, precision_recall_fscore_support, confusion_matrix
import matplotlib.pyplot as plt
import seaborn as sns

# Load dataset
def load_data():
    with open('intents.json', 'r') as f:
        data = json.load(f)
    
    queries = []
    labels = []
    
    for intent_data in data['intents']:
        intent = intent_data['intent']
        for query in intent_data['queries']:
            queries.append(query.lower())
            labels.append(intent)
    
    return queries, labels

# Preprocess text (basic)
def preprocess_text(text):
    return text.lower().strip()

# Train model
def train_model():
    print("📚 Loading dataset...")
    queries, labels = load_data()
    
    print(f"✅ Loaded {len(queries)} queries across {len(set(labels))} intents")
    print(f"📊 Intents: {set(labels)}\n")
    
    # Split data
    X_train, X_test, y_train, y_test = train_test_split(
        queries, labels, test_size=0.2, random_state=42, stratify=labels
    )
    
    print(f"🔀 Train samples: {len(X_train)}, Test samples: {len(X_test)}\n")
    
    # TF-IDF Vectorization
    print("🔢 Creating TF-IDF vectors...")
    vectorizer = TfidfVectorizer(max_features=500, ngram_range=(1, 2))
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)
    
    # Train Logistic Regression
    print("🧠 Training Logistic Regression model...")
    model = LogisticRegression(max_iter=1000, random_state=42)
    model.fit(X_train_vec, y_train)
    
    # Predictions
    y_pred = model.predict(X_test_vec)
    
    # Evaluation
    print("\n" + "="*60)
    print("📊 MODEL EVALUATION RESULTS")
    print("="*60)
    
    accuracy = accuracy_score(y_test, y_pred)
    print(f"\n✅ Accuracy: {accuracy*100:.2f}%")
    
    precision, recall, f1, _ = precision_recall_fscore_support(
        y_test, y_pred, average='weighted'
    )
    print(f"✅ Precision: {precision*100:.2f}%")
    print(f"✅ Recall: {recall*100:.2f}%")
    print(f"✅ F1-Score: {f1*100:.2f}%")
    
    # Confusion Matrix
    cm = confusion_matrix(y_test, y_pred, labels=model.classes_)
    
    plt.figure(figsize=(10, 8))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', 
                xticklabels=model.classes_, yticklabels=model.classes_)
    plt.title('Confusion Matrix - Intent Classification')
    plt.ylabel('True Intent')
    plt.xlabel('Predicted Intent')
    plt.tight_layout()
    plt.savefig('confusion_matrix.png')
    print("\n📈 Confusion matrix saved as 'confusion_matrix.png'")
    
    # Save model and vectorizer
    with open('model.pkl', 'wb') as f:
        pickle.dump(model, f)
    with open('vectorizer.pkl', 'wb') as f:
        pickle.dump(vectorizer, f)
    
    print("\n💾 Model saved as 'model.pkl'")
    print("💾 Vectorizer saved as 'vectorizer.pkl'")
    print("\n" + "="*60)
    
    return model, vectorizer

# Test prediction
def test_prediction(model, vectorizer):
    print("\n🧪 TESTING PREDICTIONS")
    print("="*60)
    
    test_queries = [
        "How can I apply for admission?",
        "What courses do you offer?",
        "What is the fee structure?",
        "Tell me about placements",
        "How to contact the college?"
    ]
    
    for query in test_queries:
        vec = vectorizer.transform([query.lower()])
        intent = model.predict(vec)[0]
        confidence = max(model.predict_proba(vec)[0])
        print(f"Query: '{query}'")
        print(f"  → Intent: {intent} | Confidence: {confidence*100:.2f}%\n")

if __name__ == "__main__":
    print("\n🤖 YCCE CHATBOT - NLP MODEL TRAINING\n")
    
    model, vectorizer = train_model()
    test_prediction(model, vectorizer)
    
    print("\n✅ Training complete! Run 'app.py' to start the chatbot API.")
