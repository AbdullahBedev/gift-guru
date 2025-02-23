
# Gift Guru Project Description File

**File Name**: `PROJECT_DESCRIPTION.md`  
**Purpose**: This document serves as the central reference for the Gift Guru project within AI IDE. It provides a comprehensive overview of the project’s vision, objectives, development stages, technical architecture, and key implementation details, enabling AI-assisted tools to offer context-aware coding assistance, suggestions, and debugging support throughout the development lifecycle.

---

## 1. Project Overview

### 1.1 Vision
**Description**: Gift Guru is an AI-powered gift recommendation web application designed to revolutionize the gift-giving experience by delivering hyper-personalized, visually stunning gift suggestions with effortless simplicity. It leverages advanced social media insights and the Google Gemini API to create a seamless, delightful user journey—aiming to be 100x better than existing tools such as Amazon Gift Finder (generic suggestions) or Etsy (manual browsing). The app starts as a free service, transitioning to a profitable model through affiliate links, premium features, and data-driven partnerships, with a goal of dominating the global gift-giving market by 2026.

**Vision Statement**: “Gift Guru: Your AI Gift-Giving Genius—Delivering Stunningly Simple, Hyper-Personalized Presents for Every Moment, Accessible to All.”

**Key Elements**:  
- **Stunning UI/UX**: A visually captivating interface inspired by ui.shadcn, using black, white, calm pink, and cold yellow for a modern, sophisticated look (Stage 2).  
- **AI Intelligence**: Hyper-personalized suggestions powered by social media data and advanced AI (Stages 3-4).  
- **Inclusivity**: Accessible design and features for all users, including mobile and eco-conscious options (Stages 5-10).  

**AI Guidance**:  
- Prioritize user experience (UX) with clean, intuitive designs in all frontend code, using ui.shadcn components.  
- Focus on AI-driven personalization for backend logic.  
- Ensure accessibility (e.g., WCAG 2.1 AA) in UI components.

### 1.2 Objectives 
- **User Growth**: Achieve 500,000 active users by December 2026.  
- **Revenue**: Generate $50,000/month by 2026 through affiliate links and premium features.  
- **Market Position**: Establish Gift Guru as the leading gift recommendation tool, surpassing competitors in UI/UX and AI capabilities.

**AI Guidance**:  
- Structure code for scalability (e.g., modular components, efficient APIs) to support 500K users (Stage 7-9).  
- Include hooks for monetization (e.g., affiliate link placeholders) in frontend suggestions (Stage 9).  
- Optimize performance (<1s load times) to enhance user retention (Stage 6).

### 1.3 Target Audience
- **Primary**:  
  - Age: 25-35  
  - Profile: Tech-savvy urban professionals or young parents, $50-$150 gift budget, active on Instagram (80%) and Twitter (60%).  
  - Behavior: Shops online 4-6 times/year (50% birthdays, 30% holidays, 20% anniversaries/other).  
  - Needs: Convenience, uniqueness, personalization; values time-saving tools and engaging design.  
- **Secondary**:  
  - Age: 18-24  
  - Profile: Students or young professionals, $20-$75 budget, trend-driven, active on TikTok (70%) and Instagram (80%).  
  - Behavior: Seeks affordable, trendy gifts influenced by social media trends.  
  - Needs: Quick, budget-friendly options with a modern, youthful aesthetic.  
- **Tertiary**:  
  - Age: 35-50  
  - Profile: Occasional gift-givers (e.g., parents, professionals), $75-$200 budget, value sustainability and inclusivity.  
  - Behavior: Shops 2-4 times/year, prefers eco-friendly or thoughtful gifts.  
  - Needs: Sustainable options, accessibility features (e.g., voice input), premium experience.  

**AI Guidance**:  
- Tailor UI design to audience preferences: sophisticated colors for 25-35, youthful accents for 18-24, eco-friendly cues for 35-50 (Stage 2).  
- Optimize social media scraping for Instagram and Twitter (Stage 3), with TikTok readiness for Stage 10 mobile app.  
- Include accessibility features (e.g., keyboard navigation, high-contrast mode) for older users (Stage 5).

---

## 2. Project Goals and Value Proposition

### 2.1 Core Goals
- **Personalization**: Achieve 95%+ suggestion relevance using AI and social media data (Stages 3-4).  
- **Usability**: Design a UI/UX that’s 100x more intuitive and engaging than competitors, using ui.shadcn components (Stage 2).  
- **Scalability**: Support 500K users with zero downtime by 2026 (Stages 7-9).  
- **Profitability**: Transition from free to $50K/month revenue via affiliates and premium tiers (Stage 9).  

**AI Guidance**:  
- Implement AI logic with high accuracy (e.g., confidence scores) in backend endpoints (Stages 3-4).  
- Use React components with Tailwind CSS and ui.shadcn for a scalable, engaging UI (Stage 2).  
- Configure cloud hosting (e.g., AWS) for scalability (Stage 7).

### 2.2 Value Proposition
- **Statement**: “Unwrap Perfect Gifts Instantly—AI That Knows Them Better Than You Do, Delivered with Privacy and Sophistication.”
- **Breakdown**:  
  - **Instantly**: Deliver suggestions in <1s (Stage 3 performance optimization).  
  - **Knows Them**: Leverage social media insights and AI precision (Stages 3-4).  
  - **Privacy**: Ensure secure, opt-in data usage with user controls (Stage 3 security, Stage 5 UX).  
  - **Sophistication**: Offer a clean, modern UI with black, white, calm pink, and cold yellow (Stage 2 design system).  

**AI Guidance**:  
- Optimize API response times (<500ms for scraping, <300ms for suggestions) in backend code (Stage 3).  
- Add privacy toggles to frontend UI (Stage 5).  
- Use Tailwind CSS classes (e.g., `bg-[#F5E1E5]`) for UI sophistication (Stage 2).

---

## 3. Development Stages

### 3.1 Stage 0: Ideation and Initial Planning
- **Goal**: Define a 100x better foundation.  
- **Timeframe**: 0-2 weeks  
- **Status**: Complete  
- **Deliverables**:  
  - Vision: “Gift Guru: Your AI Gift-Giving Genius—Stunningly Simple, Hyper-Personalized Presents for All.”  
  - Audience: 25-35 tech-savvy, 18-24 trend-seekers, 35-50 eco-focused.  
  - Value: “Unwrap Perfect Gifts Instantly—AI That Knows Them Better Than You Do, with Privacy and Sophistication.”  
  - Features: Dynamic form, social scraping, AI suggestions, interactive display, privacy controls.  
  - Plan: Monetization roadmap, competitive edge.  

### 3.2 Stage 1: Research and Planning
- **Goal**: Build a 100x deeper roadmap.  
- **Timeframe**: 2-4 weeks  
- **Status**: Complete  
- **Deliverables**:  
  - **Research**: Competitors (Etsy, Amazon) lack AI/UI; users need personalization (78%), privacy (55%).  
  - **Features**: Must-haves: form, scraping, AI; Should-haves: save/share, eco-filters.  
  - **Wireframes**: Homepage, 3-step form, suggestions grid.  
  - **Tech Stack**:  
    - Frontend: React 18, TypeScript 5, Tailwind CSS 3, ui.shadcn components.  
    - Backend: Node.js 20, Express 4, Redis 7.  
    - AI: Google Gemini API v1.  
    - Database: MongoDB 6, AWS S3.  

### 3.3 Stage 2: Frontend Development (Enhanced to 10/10)
- **Goal**: Create a frontend 100x more stunning, intuitive, and engaging—a clean, sophisticated UI/UX masterpiece inspired by ui.shadcn, using black, white, calm pink, and cold yellow.  
- **Timeframe**: 6-8 weeks  
- **Status**: Planned  

#### Deliverables
1. **Design System**:  
   - **Colors**:  
     - Primary: `#000000` (Black) – Backgrounds, headers.  
     - Neutral: `#FFFFFF` (White) – Backgrounds, cards, text.  
     - Accent: `#F5E1E5` (Calm Pink) – CTAs, buttons, highlights.  
     - Secondary: `#F4EBC1` (Cold Yellow) – Progress bars, filters, subtle hints.  
   - **Typography**:  
     - Headings: `Geist` (500 weight, 20-32px) – Clean, modern, sophisticated.  
     - Body: `Inter` (400 weight, 14-16px) – Readable, crisp, optimized for all devices.  
   - **Animations** (using ui.shadcn and Framer Motion):  
     - Fade-ins: 0.3s ease-in for transitions.  
     - Ripples: 0.5s cubic-bezier(0.4, 0, 0.2, 1) on clicks.  
     - Tilts: 3deg hover effect on cards (0.2s).  
   - **Components** (using ui.shadcn):  
     - Buttons: 6px radius, solid fill (`#F5E1E5`), soft shadow, hover darken effect.  
     - Inputs: Borderless, calm pink underline on focus (2px, 0.3s).  
     - Cards: 8px radius, hover scale (1.03x), white background, black border.  
   - **Tools**: React, TypeScript, Tailwind CSS, ui.shadcn, Framer Motion.  

2. **Homepage**:  
   - **Hero**: Full-width black background, headline “Gift Guru: Unwrap Perfect Presents” (Geist, 32px, white), subtext “Find AI-powered gift ideas tailored to their unique vibe in minutes” (Inter, 16px, `#F5E1E5`), “Get Started” button (calm pink, hover darken, pulsing 0.5s).  
   - **Insight Cloud**: Floating tags (e.g., “Coffee Lovers,” cold yellow, 10px radius, 5s circular animation).  
   - **Features**: Three cards (180x280px, tilt on hover) – “AI Magic,” “Social Insights,” “Save & Share” (white background, black border).  

3. **Multi-Step Form**:  
   - **Structure**: Modal (75vh, max-width 480px, white, 8px radius), 3 steps:  
     - Step 1: “Who’s It For?” – Name (text), Age Group (dropdown: “Under 18,” “18-30,” etc.).  
     - Step 2: “What’s the Occasion?” – Occasion (dropdown: “Birthday,” “Holiday”), Relationship (chips: “Friend,” “Family”).  
     - Step 3: “Any Hints?” – Social Link (text, live preview), Notes (textarea, AI autocomplete).  
   - **UI**: Cold yellow progress bar (top, 4px height), calm pink underlines on focus, yellow glow on valid inputs, “Next”/“Back” buttons (calm pink).  
   - **Enhancements**: Add visual progress indicators (e.g., step numbers, progress bar) to reduce drop-off rates.  

4. **Suggestions Page**:  
   - **Grid**: 3x2 cards (240x320px, 12px gap), swipeable on mobile, white background, black border.  
   - **Cards**: Image (200x140px), title (16px, black), description (14px, `#333`), confidence bar (cold yellow), buttons (“Save” with calm pink confetti, “Share,” “Why This?” toggle).  
   - **Filters**: Floating sidebar (budget slider, type chips, eco toggle, calm pink accents).  
   - **Loading**: 2.5s gift box unwrapping animation (black outline, calm pink fill).  

5. **Accessibility & Performance**:  
   - **Accessibility**: WCAG 2.1 AA, ARIA labels, keyboard navigation, high-contrast mode (black/white with calm pink accents).  
   - **Performance**: <1s load time, lazy-loaded images, minified assets, responsive design (mobile-first, 768px breakpoint).  

#### User Journey (Condensed Example)
- **Sarah (25-35)**: Lands on homepage (black background, calm pink CTAs), clicks “Get Started,” enters “Alex,” “18-30,” “Birthday,” “Brother,” “instagram.com/alex_hikes” (preview: “Hiking, Coffee”), submits. Sees suggestions (“Hiking Backpack,” 92%, white card, black border), saves with calm pink confetti, shares via email.  

#### Implementation Notes
- **Files**: `/client/src/App.tsx` (homepage), `/client/src/components/Form.tsx` (form), `/client/src/components/Suggestions.tsx` (suggestions).  
- **Dependencies**: `npm i framer-motion react-confetti @shadcn/ui`.  
- **AI Guidance**: Use Tailwind classes (e.g., `bg-[#000000] text-[#FFFFFF]`), ensure responsiveness (768px breakpoint), mock Stage 3 data initially, integrate ui.shadcn components (e.g., buttons, inputs, cards).

### 3.4 Stage 3: Backend Development (Enhanced to 10/10)
- **Goal**: Build a backend 100x faster, smarter, and more secure to power real-time AI suggestions.  
- **Timeframe**: 6-8 weeks  
- **Status**: Planned  

#### Deliverables
1. **API Endpoints**:  
   - **POST /submit**: Input: Form data (name, age, occasion, socialLink); Output: `{ sessionId }` (<200ms).  
   - **GET /scrape/:session**: Input: Session ID; Output: `{ interests: ["hiking", "coffee"] }` (<500ms).  
   - **POST /suggest**: Input: Session ID; Output: `[ { title: "Hiking Backpack", confidence: 0.92 } ]` (<300ms).  
   - **POST /feedback**: Input: Session ID, rating (1-5); Output: `{ message: "Feedback saved" }`.  
   - **Tech**: Express.js, rate-limited (100/min).  

2. **Social Media Scraping**:  
   - **Platforms**: Instagram, Twitter (OAuth 2.0).  
   - **Process**: 50 posts/profile, NLP extracts interests (95% accuracy).  
   - **Speed**: <500ms with Redis caching.  
   - **Privacy**: Opt-in consent for scraping, clear data usage explanation, privacy controls in UI.  
   - **Tech**: Axios, Natural (NLP).  

3. **AI Integration**:  
   - **Setup**: Google Gemini API v1, prompts (e.g., “Suggest gifts for a 25-year-old hiker, $50”).  
   - **Output**: 3-5 suggestions, 95%+ relevance.  
   - **Fallbacks**: Manual curated suggestions, user refinement options (e.g., adjust preferences) if AI underperforms.  
   - **Learning**: Adjusts via feedback (Stage 9).  
   - **Tech**: Axios, Redis.  

4. **Database & Caching**:  
   - **MongoDB**: Sessions (schema: `{ sessionId, userData, suggestions }`), 10K capacity.  
   - **Redis**: Caches scrapes/suggestions (1M entries, 24h TTL).  
   - **S3**: Images (<100KB, CDN).  
   - **Tech**: Mongoose, redis-client, AWS SDK.  

5. **Security**:  
   - **Auth**: OAuth 2.0, JWT (30-day expiry).  
   - **Encryption**: AES-256, TLS 1.3.  
   - **Compliance**: GDPR/CCPA opt-in, user privacy dashboard (Stage 5).  
   - **Tech**: Passport.js, crypto.  

#### Implementation Notes
- **Files**: `/server/index.js` (API), `/server/config/db.js` (DB setup).  
- **Dependencies**: `npm i express redis axios mongoose passport crypto`.  
- **AI Guidance**: Mock Gemini API calls initially, optimize with Redis (`setEx`), secure with environment variables (e.g., `.env` for keys), implement scraping consent mechanisms.

### 3.5 Stage 4: AI and Data Integration
- **Goal**: Achieve 100x precise, adaptive AI.  
- **Timeframe**: 4-6 weeks  
- **Status**: Planned  
- **Deliverables**: 95%+ AI precision, real-time pipeline, adaptive engine, live previews, fallback mechanisms.  

### 3.6 Stage 5: User Experience Enhancements
- **Goal**: Elevate UX 100x with delight and inclusivity.  
- **Timeframe**: 4-6 weeks  
- **Status**: Planned  
- **Deliverables**: Loading animation (calm pink, cold yellow), gamification (points), voice input, privacy dashboard (scrape consent, data controls).  

### 3.7 Stage 6: Testing and Quality Assurance
- **Goal**: Ensure 100x reliability.  
- **Timeframe**: 3-4 weeks  
- **Status**: Planned  
- **Deliverables**: 90%+ test coverage (focus on critical paths), 92% user satisfaction, accessibility testing.  

### 3.8 Stage 7: Deployment and Launch Preparation
- **Goal**: Deploy 100x scalable app.  
- **Timeframe**: 2-3 weeks  
- **Status**: Planned  
- **Deliverables**: AWS hosting (Amplify, EC2), HTTPS, landing page (black, white, calm pink, cold yellow).  

### 3.9 Stage 8: Launch and Initial User Acquisition
- **Goal**: Achieve 100x initial reach.  
- **Timeframe**: 1-2 weeks  
- **Status**: Planned  
- **Deliverables**: Live launch, marketing campaigns (influencer partnerships, Instagram/Twitter ads for 25-35 audience), feedback collection.  

### 3.10 Stage 9: Post-Launch Iteration and Scaling
- **Goal**: Scale and refine 100x.  
- **Timeframe**: 3-6 months  
- **Status**: Planned  
- **Deliverables**: Feedback iteration, 20x capacity, $10K/month revenue (affiliate links, premium features: advanced filters, ad-free).  

### 3.11 Stage 10: Future Enhancements for 2026 Dominance
- **Goal**: Secure 100x market leadership.  
- **Timeframe**: 6-12 months  
- **Status**: Planned  
- **Deliverables**: AR previews, eco-filters, mobile app (500K downloads, responsive from Stage 2), sentiment analysis (prioritized by user feedback).  

---

## 4. Technical Architecture

### 4.1 Frontend
- **Framework**: React 18 with TypeScript 5 for type safety and scalability.  
- **Styling**: Tailwind CSS 3 with ui.shadcn components for rapid, consistent design.  
- **Libraries**:  
  - `framer-motion`: For animations (e.g., fade-ins, tilts).  
  - `react-confetti`: For celebratory effects (e.g., save button, calm pink confetti).  
  - `axios`: For API calls to backend.  
  - `@shadcn/ui`: For pre-built components (buttons, inputs, cards).  
- **Structure**:  
  - `/client/src/App.tsx`: Main app with homepage.  
  - `/client/src/components/Form.tsx`: Multi-step form.  
  - `/client/src/components/Suggestions.tsx`: Suggestions grid.  
- **AI Guidance**: Use `className` with Tailwind (e.g., `bg-[#000000]`), ensure components are reusable and responsive (768px breakpoint), integrate ui.shadcn components.

### 4.2 Backend
- **Framework**: Node.js 20 with Express 4 for API routing.  
- **Data Storage**:  
  - MongoDB 6: Persistent storage for sessions, feedback.  
  - Redis 7: Caching for scrapes and suggestions.  
  - AWS S3: Image hosting with CDN.  
- **Libraries**:  
  - `axios`: For social media API calls.  
  - `mongoose`: MongoDB ORM.  
  - `redis`: Caching client.  
  - `passport`: OAuth authentication.  
  - `crypto`: AES-256 encryption.  
- **Structure**:  
  - `/server/index.js`: Main server with API endpoints.  
  - `/server/config/db.js`: Database connections.  
- **AI Guidance**: Optimize endpoints for <500ms response, use `.env` for secrets (e.g., `GEMINI_API_KEY`), mock social scraping initially, implement privacy controls.

### 4.3 Deployment
- **Frontend**: AWS Amplify (giftguru.ai).  
- **Backend**: AWS EC2 with auto-scaling, MongoDB Atlas, Redis Cloud.  
- **Security**: HTTPS via AWS Certificate Manager, OAuth/JWT.  
- **AI Guidance**: Configure CORS for frontend-backend communication, test with `curl` locally.

---

## 5. Implementation Notes

### 5.1 General Guidelines
- **Coding Style**: Use ES6+ syntax, camelCase naming, consistent indentation (2 spaces).  
- **Error Handling**: Return 400/500 status codes with meaningful messages (e.g., `{ error: "Invalid social link" }`).  
- **Performance**: Aim for <1s frontend load, <500ms backend responses.  

### 5.2 Stage-Specific Notes
- **Stage 2**: Mock Stage 3 data initially (e.g., `{ interests: ["hiking"] }`); implement animations with Framer Motion, use ui.shadcn components (buttons, inputs, cards).  
- **Stage 3**: Mock Google Gemini API with static responses until Stage 4 (e.g., `[{ title: "Hiking Backpack" }]`); secure `.env` keys, implement scraping consent.  
- **Stage 4**: Replace mock AI with real Gemini API calls, implement fallback mechanisms (manual suggestions, refinement options).  

### 5.3 Dependencies
- **Frontend**: `npm i react typescript tailwindcss framer-motion react-confetti @shadcn/ui axios`.  
- **Backend**: `npm i express redis axios mongoose passport crypto`.  

---

## **Conclusion**

This improved project description file aligns with your vision for Gift Guru, incorporating ui.shadcn and the requested color scheme (black, white, calm pink, cold yellow). It addresses key areas for improvement, such as privacy, monetization, mobile responsiveness, and user acquisition, while maintaining a focus on personalization, usability, scalability, and profitability. With these adjustments, Gift Guru is well-positioned to become a standout product in the gift recommendation space.