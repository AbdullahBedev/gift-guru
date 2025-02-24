# Gift Guru Project Description File

**File Name**: `PROJECT_DESCRIPTION.md`  
**Purpose**: This document serves as the central reference for the Gift Guru project within AI IDE. It provides a comprehensive overview of the project's vision, objectives, development stages, technical architecture, and key implementation details, enabling AI-assisted tools to offer context-aware coding assistance, suggestions, and debugging support throughout the development lifecycle.

---

## 1. Project Overview

### 1.1 Vision
**Description**: Gift Guru is an AI-powered gift recommendation web application designed to revolutionize the gift-giving experience by delivering hyper-personalized, visually stunning gift suggestions with effortless simplicity. It leverages advanced social media insights and AI to create a seamless, delightful user journey—aiming to be 100x better than existing tools such as Amazon Gift Finder (generic suggestions) or Etsy (manual browsing). The app starts as a free service, transitioning to a profitable model through affiliate links, premium features, and data-driven partnerships, with a goal of dominating the global gift-giving market by 2026.

**Vision Statement**: "Gift Guru: Your AI Gift-Giving Genius—Delivering Stunningly Simple, Hyper-Personalized Presents for Every Moment, Accessible to All."

**Key Elements**:  
- **Stunning UI/UX**: A visually captivating interface using black, white, pink (#FF1493), and green (#E0FFE0) for a modern, sophisticated look.  
- **AI Intelligence**: Hyper-personalized suggestions powered by social media data and advanced AI.  
- **Inclusivity**: Accessible design with high contrast mode and responsive layouts for all users.  

**AI Guidance**:  
- Prioritize user experience (UX) with clean, intuitive designs using Framer Motion animations.  
- Focus on AI-driven personalization for backend logic.  
- Ensure accessibility (e.g., WCAG 2.1 AA) in UI components.

### 1.2 Objectives 
- **User Growth**: Achieve 500,000 active users by December 2026.  
- **Revenue**: Generate $50,000/month by 2026 through affiliate links and premium features.  
- **Market Position**: Establish Gift Guru as the leading gift recommendation tool, surpassing competitors in UI/UX and AI capabilities.

**AI Guidance**:  
- Structure code for scalability (e.g., modular components, efficient APIs) to support 500K users.  
- Include hooks for monetization (e.g., affiliate link placeholders) in frontend suggestions.  
- Optimize performance (<1s load times) to enhance user retention.

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
  - Needs: Sustainable options, accessibility features (e.g., high contrast mode), premium experience.  

**AI Guidance**:  
- Tailor UI design to audience preferences: sophisticated colors for 25-35, youthful accents for 18-24, eco-friendly cues for 35-50.  
- Optimize social media scraping for Instagram and Twitter, with TikTok readiness for future expansion.  
- Include accessibility features (e.g., keyboard navigation, high contrast mode) for all users.

---

## 2. Current Implementation Status

### 2.1 Frontend Architecture
- **Framework**: Next.js 13 with TypeScript 5
- **Styling**: Tailwind CSS with custom design system
- **Components**: Modular architecture with shared components
- **Animation**: Framer Motion for smooth transitions and effects
- **State Management**: React Context for theme management
- **Accessibility**: High contrast mode, keyboard navigation

### 2.2 Core Components
1. **Navigation**
   - Responsive header with mobile menu
   - Theme toggle for accessibility
   - Clean, minimal design

2. **Hero Section**
   - Dynamic headline and subtext
   - Framer Motion animations
   - Responsive layout

3. **Insight Cloud**
   - Floating tags with animations
   - Dynamic positioning
   - Mobile-optimized layout
   - Decorative background elements

4. **Multi-Step Form**
   - Three-step structure
   - Form validation
   - File upload support
   - Social media integration
   - Progress indicator
   - Responsive design

5. **Suggestions Grid**
   - Card-based layout
   - Confidence scoring
   - Save/Share functionality
   - Filter sidebar
   - Loading animations
   - "Why This?" tooltips

### 2.3 Design System
1. **Colors**
   - Primary: Black (#000000)
   - Secondary: White (#FFFFFF)
   - Accent: Pink (#FF1493)
   - Highlight: Green (#E0FFE0)

2. **Typography**
   - Borna: Headlines and emphasis
   - Geist: Modern UI elements
   - Inter: Body text and readability

3. **Animations**
   - Loading states
   - Transitions
   - Hover effects
   - Confetti celebrations
   - Progress indicators

4. **Components**
   - Buttons with ripple effects
   - Form inputs with validation
   - Cards with hover animations
   - Progress bars
   - Loading spinners

### 2.4 Next Steps
1. **Backend Integration**
   - API endpoints setup
   - Data persistence
   - Authentication system
   - AI recommendation engine

2. **Feature Completion**
   - Real data integration
   - User accounts
   - Gift history
   - Advanced filtering

3. **Optimization**
   - Performance tuning
   - Testing suite
   - Error handling
   - Analytics integration

---

## 3. Technical Stack

### 3.1 Frontend
- **Core**: Next.js 13, TypeScript 5
- **Styling**: Tailwind CSS, CSS Variables
- **Animation**: Framer Motion
- **Icons**: Iconify
- **UI Enhancement**: React Confetti

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

## 4. Development Guidelines

### 4.1 Code Style
- Use TypeScript for type safety
- Follow component-based architecture
- Implement responsive design patterns
- Maintain accessibility standards
- Document complex logic

### 4.2 Performance
- Optimize image loading
- Minimize bundle size
- Implement code splitting
- Cache API responses
- Monitor load times

### 4.3 Testing
- Write unit tests for components
- Implement integration tests
- Perform accessibility testing
- Monitor performance metrics
- Validate user flows

---

This document will be updated as the project evolves and new features are implemented.