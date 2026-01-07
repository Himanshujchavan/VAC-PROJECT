// NLP Model Backend API Configuration
const NLP_API_URL = 'http://localhost:5000/api/chat'

// Function to get response from your custom NLP model
export async function getNLPModelResponse(userMessage) {
  console.log('📤 Sending request to:', NLP_API_URL)
  console.log('📤 Message:', userMessage)
  
  try {
    const response = await fetch(NLP_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        message: userMessage
      })
    })

    console.log('📥 Response status:', response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ API Error:', errorText)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    console.log('📥 Full API response:', data)
    
    // Log AI transparency (for demo/debugging)
    console.log('🤖 AI Response:', {
      intent: data.intent,
      confidence: (data.confidence * 100).toFixed(2) + '%',
      reply: data.reply?.substring(0, 50) + '...'
    })
    
    return data.reply
  } catch (error) {
    console.error('❌ NLP Model API Error:', error)
    throw error
  }
}
