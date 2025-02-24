import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import logger from '../config/logger';

export interface GiftSuggestion {
  title: string;
  description?: string;
  price?: number;
  confidence: number;
  reasoning?: string;
  category?: string;
  ageGroup?: string;
  source?: string;
}

const MOCK_SUGGESTIONS: { [key: string]: GiftSuggestion[] } = {
  'tech': [
    { title: "Wireless Noise-Cancelling Earbuds", confidence: 0.95, description: "Perfect for music lovers and commuters", price: 129.99, category: 'Electronics' },
    { title: "Smart Watch with Fitness Tracking", confidence: 0.92, description: "Great for health-conscious tech enthusiasts", price: 199.99, category: 'Wearables' },
    { title: "Portable Power Bank 20000mAh", confidence: 0.88, description: "Essential for people always on the go", price: 49.99, category: 'Accessories' },
    { title: "HD Webcam for Streaming", confidence: 0.85, description: "Ideal for content creators", price: 79.99, category: 'Electronics' },
    { title: "Smart Home Starter Kit", confidence: 0.82, description: "Perfect introduction to home automation", price: 149.99, category: 'Smart Home' }
  ],
  'sports': [
    { title: "Premium Yoga Mat", confidence: 0.94, description: "Perfect for fitness enthusiasts", price: 68.99, category: 'Fitness' },
    { title: "Wireless Sport Earphones", confidence: 0.91, description: "Great for workouts", price: 89.99, category: 'Electronics' },
    { title: "Smart Water Bottle", confidence: 0.87, description: "Tracks hydration levels", price: 45.99, category: 'Fitness' },
    { title: "Compression Running Socks", confidence: 0.84, description: "Enhanced comfort for runners", price: 24.99, category: 'Apparel' },
    { title: "Fitness Tracker Band", confidence: 0.81, description: "Monitors activity and sleep", price: 99.99, category: 'Wearables' }
  ],
  'art': [
    { title: "Professional Sketch Set", confidence: 0.96, description: "High-quality drawing tools", price: 79.99, category: 'Art Supplies' },
    { title: "Digital Drawing Tablet", confidence: 0.93, description: "Perfect for digital artists", price: 159.99, category: 'Electronics' },
    { title: "Artist's Easel Set", confidence: 0.89, description: "Complete painting setup", price: 129.99, category: 'Art Supplies' },
    { title: "Calligraphy Starter Kit", confidence: 0.86, description: "Beautiful writing art", price: 49.99, category: 'Art Supplies' },
    { title: "Watercolor Paint Set", confidence: 0.83, description: "Premium painting supplies", price: 89.99, category: 'Art Supplies' }
  ]
};

export class GeminiService {
  private readonly genAI: GoogleGenerativeAI;
  private readonly model: any;
  private readonly maxRetries: number;
  private readonly timeout: number;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    this.maxRetries = parseInt(process.env.GEMINI_MAX_RETRIES || '3');
    this.timeout = parseInt(process.env.GEMINI_TIMEOUT_MS || '10000');

    // Configure safety settings
    this.configureSafetySettings();
  }

  private configureSafetySettings() {
    const safetySettings = [
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
    ];

    this.model.setGenerationConfig({
      temperature: 0.7,
      topK: 40,
      topP: 0.95,
      maxOutputTokens: 1024,
      safetySettings,
    });
  }

  private buildPrompt(ageGroup: string, interests: string[], budget: number): string {
    return `You are an expert gift recommendation system. Your task is to suggest 5 thoughtful and specific gifts for a ${ageGroup} who loves ${interests.join(', ')} with a budget under $${budget}.

Consider these factors:
1. Age appropriateness for ${ageGroup}
2. Alignment with interests: ${interests.join(', ')}
3. Budget constraint: $${budget}
4. Gift practicality and usefulness
5. Current trends and popularity

Format your response as a JSON array with each gift having these exact properties:
{
  "title": "specific product name",
  "description": "brief explanation why it's suitable",
  "price": numerical price under ${budget},
  "confidence": number between 0 and 1 indicating match with interests,
  "reasoning": "detailed explanation of why this matches their interests",
  "category": "product category",
  "ageGroup": "${ageGroup}",
  "source": "AI recommendation"
}

Ensure:
- All prices are under $${budget}
- Confidence scores reflect how well the gift matches interests
- Each suggestion is unique and specific
- Descriptions are concise but informative
- Categories are consistent and meaningful

Return ONLY the JSON array with exactly 5 items, no additional text.`;
  }

  private async makeGeminiRequest(prompt: string): Promise<GiftSuggestion[]> {
    let attempt = 0;
    let lastError: any;

    while (attempt < this.maxRetries) {
      try {
        const result = await this.model.generateContent({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        });

        const response = result.response;
        const text = response.text();
        return JSON.parse(text) as GiftSuggestion[];
      } catch (error) {
        lastError = error;
        attempt++;
        
        if (attempt < this.maxRetries) {
          const delay = Math.min(1000 * Math.pow(2, attempt), 4000);
          logger.warn(`Gemini API request failed, retrying in ${delay}ms... (Attempt ${attempt + 1}/${this.maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    logger.error('All Gemini API retries failed:', lastError);
    throw new Error('Failed to get suggestions from Gemini API after multiple retries');
  }

  private getMockSuggestions(interests: string[], ageGroup: string): GiftSuggestion[] {
    // Get a random category from mock data if no matching interests
    const category = interests.find(i => i.toLowerCase() in MOCK_SUGGESTIONS) || 
      Object.keys(MOCK_SUGGESTIONS)[Math.floor(Math.random() * Object.keys(MOCK_SUGGESTIONS).length)];
    
    return MOCK_SUGGESTIONS[category.toLowerCase()].map(suggestion => ({
      ...suggestion,
      ageGroup,
      source: 'mock data'
    }));
  }

  public async getSuggestions(
    ageGroup: string,
    interests: string[],
    budget: number
  ): Promise<GiftSuggestion[]> {
    try {
      // Use mock data in development
      if (process.env.NODE_ENV === 'development') {
        logger.info('Using mock gift suggestions in development mode');
        return this.getMockSuggestions(interests, ageGroup);
      }

      // Build and send prompt to Gemini
      const prompt = this.buildPrompt(ageGroup, interests, budget);
      const suggestions = await this.makeGeminiRequest(prompt);

      // Validate and clean suggestions
      return suggestions.map(suggestion => ({
        ...suggestion,
        confidence: Math.min(Math.max(suggestion.confidence, 0), 1), // Ensure confidence is between 0 and 1
        price: suggestion.price && suggestion.price > 0 && suggestion.price <= budget ? suggestion.price : undefined,
        ageGroup: suggestion.ageGroup || ageGroup,
        source: suggestion.source || 'AI recommendation'
      }));
    } catch (error) {
      logger.error('Error getting gift suggestions:', error);
      throw error;
    }
  }
}

export default new GeminiService(); 