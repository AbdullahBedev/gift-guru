import { Gift, GiftCollection } from "../types";

export const MOCK_GIFTS: Gift[] = [
  {
    id: "1",
    name: "Personalized Star Map",
    description: "A custom star map showing the night sky from a specific date and location. Perfect for commemorating special moments like anniversaries, birthdays, or when you first met.",
    price: 49.99,
    category: "Personalized",
    imageUrl: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/star-map",
    tags: ["romantic", "personalized", "anniversary", "home decor"],
    confidenceScore: 92,
    matchReasons: ["Matches interest in astronomy", "Perfect for romantics", "Unique home decoration"]
  },
  {
    id: "2",
    name: "Wireless Noise-Canceling Headphones",
    description: "Premium wireless headphones with active noise cancellation, perfect for music lovers, travelers, or anyone who appreciates high-quality audio.",
    price: 249.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/headphones",
    tags: ["music", "tech", "travel", "premium"],
    confidenceScore: 88,
    matchReasons: ["Aligns with interest in music", "Perfect for frequent travelers", "High-quality tech gift"]
  },
  {
    id: "3",
    name: "Handcrafted Leather Journal",
    description: "A beautiful handmade leather journal with premium paper, perfect for writers, artists, or anyone who appreciates the tactile experience of putting pen to paper.",
    price: 35.99,
    category: "Stationery",
    imageUrl: "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/leather-journal",
    tags: ["writing", "artistic", "handmade", "personalized"],
    confidenceScore: 85,
    matchReasons: ["Perfect for journaling enthusiasts", "Handcrafted quality", "Supports creative expression"]
  },
  {
    id: "4",
    name: "Indoor Plant Collection",
    description: "A curated set of easy-to-care-for indoor plants that purify the air and bring nature indoors. Perfect for plant lovers or those looking to enhance their living space.",
    price: 65.00,
    category: "Home & Garden",
    imageUrl: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/plant-collection",
    tags: ["plants", "home decor", "nature", "wellness"],
    confidenceScore: 78,
    matchReasons: ["Matches interest in plants", "Enhances living space", "Promotes wellness"]
  },
  {
    id: "5",
    name: "Gourmet Cooking Class Subscription",
    description: "A 3-month subscription to online cooking classes taught by world-renowned chefs. Perfect for food enthusiasts looking to expand their culinary skills.",
    price: 129.00,
    category: "Experiences",
    imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/cooking-class",
    tags: ["cooking", "food", "learning", "experience"],
    confidenceScore: 90,
    matchReasons: ["Perfect for cooking enthusiasts", "Provides ongoing experience", "Develops new skills"]
  },
  {
    id: "6",
    name: "Vintage Vinyl Record Player",
    description: "A high-quality record player with modern features like Bluetooth connectivity, perfect for music lovers who appreciate both vintage sound and modern convenience.",
    price: 199.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1535992165812-68d1861aa71e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/record-player",
    tags: ["music", "vintage", "tech", "home entertainment"],
    confidenceScore: 82,
    matchReasons: ["Appeals to music lovers", "Combines vintage and modern", "Unique home entertainment option"]
  },
  {
    id: "7",
    name: "Premium Coffee Subscription",
    description: "A 6-month subscription to artisanal, single-origin coffee beans delivered fresh every two weeks, perfect for coffee connoisseurs.",
    price: 120.00,
    category: "Food & Drink",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/coffee-subscription",
    tags: ["coffee", "gourmet", "subscription", "morning routine"],
    confidenceScore: 87,
    matchReasons: ["Perfect for coffee lovers", "Provides ongoing enjoyment", "Exposes recipient to new flavors"]
  },
  {
    id: "8",
    name: "Adventure Photography Drone",
    description: "A compact, easy-to-use drone with high-quality camera capabilities, perfect for capturing amazing aerial photos and videos during outdoor adventures.",
    price: 399.99,
    category: "Electronics",
    imageUrl: "https://images.unsplash.com/photo-1506947411487-a56738267384?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/photography-drone",
    tags: ["photography", "outdoors", "tech", "adventure"],
    confidenceScore: 79,
    matchReasons: ["Matches interest in photography", "Perfect for outdoor enthusiasts", "Provides new creative possibilities"]
  },
  {
    id: "9",
    name: "Personalized Recipe Cutting Board",
    description: "A handcrafted wooden cutting board engraved with a special family recipe in the original handwriting, creating both a functional kitchen tool and a cherished keepsake.",
    price: 59.99,
    category: "Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1648646377151-8ccc33571d39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/recipe-cutting-board",
    tags: ["cooking", "personalized", "kitchen", "keepsake"],
    confidenceScore: 93,
    matchReasons: ["Combines cooking interest with personalization", "Both functional and sentimental", "Preserves family heritage"]
  },
  {
    id: "10",
    name: "Custom Literary Map Print",
    description: "A beautifully designed map of a famous fictional world from the recipient's favorite book, perfect for literature lovers and fans of specific book series.",
    price: 45.00,
    category: "Art & Decor",
    imageUrl: "https://images.unsplash.com/photo-1518893494013-481c1d8ed3fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/literary-map",
    tags: ["books", "literature", "art", "home decor"],
    confidenceScore: 88,
    matchReasons: ["Perfect for book lovers", "Combines literature and art interests", "Unique conversation piece"]
  },
  {
    id: "11",
    name: "Sustainable Activewear Set",
    description: "A premium activewear set made from recycled materials, combining performance, comfort, and eco-consciousness for the fitness enthusiast who cares about sustainability.",
    price: 120.00,
    category: "Fashion",
    imageUrl: "https://images.unsplash.com/photo-1561654791-00316c79efa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/sustainable-activewear",
    tags: ["fitness", "eco-friendly", "fashion", "wellness"],
    confidenceScore: 85,
    matchReasons: ["Aligns with fitness interests", "Appeals to eco-conscious values", "High-quality practical gift"]
  },
  {
    id: "12",
    name: "Astronomy Telescope Kit",
    description: "A beginner-friendly telescope with all accessories needed to start exploring the night sky, perfect for astronomy enthusiasts or anyone curious about stargazing.",
    price: 189.99,
    category: "Hobbies",
    imageUrl: "https://images.unsplash.com/photo-1566004100631-35d015d6a491?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
    affiliateLink: "https://example.com/telescope-kit",
    tags: ["astronomy", "science", "outdoors", "learning"],
    confidenceScore: 81,
    matchReasons: ["Perfect for space enthusiasts", "Encourages outdoor activity", "Educational and fun"]
  }
];

export const MOCK_GIFT_COLLECTIONS: GiftCollection[] = [
  {
    id: "collection-1",
    title: "For the Tech Enthusiast",
    description: "Cutting-edge gadgets and accessories for those who love staying ahead with technology.",
    gifts: MOCK_GIFTS.filter(gift => gift.category === "Electronics" || gift.tags.includes("tech"))
  },
  {
    id: "collection-2",
    title: "Personalized Treasures",
    description: "Thoughtful custom gifts that show you've put extra care into finding something unique.",
    gifts: MOCK_GIFTS.filter(gift => gift.tags.includes("personalized") || gift.tags.includes("custom"))
  },
  {
    id: "collection-3",
    title: "For the Home",
    description: "Beautiful and functional items to enhance any living space.",
    gifts: MOCK_GIFTS.filter(gift => gift.category === "Home & Garden" || gift.category === "Kitchen" || gift.tags.includes("home decor"))
  },
  {
    id: "collection-4",
    title: "Experience Gifts",
    description: "Memorable experiences that create lasting memories instead of material possessions.",
    gifts: MOCK_GIFTS.filter(gift => gift.category === "Experiences" || gift.tags.includes("subscription") || gift.tags.includes("experience"))
  }
]; 