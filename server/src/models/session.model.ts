import mongoose, { Schema, Document } from 'mongoose';
import { Session, Interest, SocialLink, GifteeInfo } from '../types/session.types';

// Create interface for the document
export interface SessionDocument extends Session, Document {}

// Create schemas for nested objects
const InterestSchema = new Schema<Interest>({
  category: { 
    type: String, 
    required: true,
    trim: true 
  },
  subcategory: { 
    type: String,
    trim: true 
  },
  confidence: { 
    type: Number,
    required: true,
    min: 0,
    max: 1 
  }
}, { _id: false });

const SocialLinkSchema = new Schema<SocialLink>({
  platform: { 
    type: String,
    required: true,
    enum: ['instagram', 'twitter', 'facebook', 'tiktok', 'pinterest']
  },
  url: { 
    type: String,
    required: true,
    trim: true 
  },
  verified: { 
    type: Boolean,
    default: false 
  }
}, { _id: false });

const GifteeInfoSchema = new Schema<GifteeInfo>({
  age: { 
    type: Number,
    min: 0,
    max: 150 
  },
  gender: { 
    type: String,
    enum: ['male', 'female', 'non-binary', 'prefer-not-to-say']
  },
  occasion: { 
    type: String,
    trim: true 
  },
  relationship: { 
    type: String,
    trim: true 
  },
  budget: {
    min: { 
      type: Number,
      min: 0 
    },
    max: { 
      type: Number,
      min: 0 
    },
    currency: { 
      type: String,
      default: 'USD',
      uppercase: true,
      trim: true 
    }
  }
}, { _id: false });

// Create the main session schema
const SessionSchema = new Schema<SessionDocument>({
  sessionId: {
    type: String,
    required: true,
    unique: true,
    index: true // Index for faster queries
  },
  interests: {
    type: [InterestSchema],
    required: true,
    validate: [
      {
        validator: (interests: Interest[]) => interests.length > 0,
        message: 'At least one interest is required'
      }
    ]
  },
  socialLinks: {
    type: [SocialLinkSchema],
    default: undefined
  },
  gifteeInfo: {
    type: GifteeInfoSchema,
    default: undefined
  },
  uploadedFiles: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    required: true,
    enum: ['active', 'completed', 'expired'],
    default: 'active',
    index: true // Index for status-based queries
  },
  lastActivity: {
    type: Date,
    required: true,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    index: true // Index for expiration cleanup
  }
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt
  collection: 'sessions'
});

// Create compound indexes for common queries
SessionSchema.index({ status: 1, lastActivity: -1 });
SessionSchema.index({ 'interests.category': 1 });

// Add instance methods if needed
SessionSchema.methods.isExpired = function(): boolean {
  return this.expiresAt < new Date();
};

// Add static methods if needed
SessionSchema.statics.findActiveBySessionId = function(sessionId: string) {
  return this.findOne({ 
    sessionId,
    status: 'active',
    expiresAt: { $gt: new Date() }
  });
};

// Add middleware for data cleanup
SessionSchema.pre('save', function(next) {
  // Remove duplicate interests
  if (this.interests) {
    const uniqueInterests = new Map(
      this.interests.map(interest => [
        `${interest.category}-${interest.subcategory}`,
        interest
      ])
    );
    this.interests = Array.from(uniqueInterests.values());
  }
  next();
});

// Create and export the model
export const SessionModel = mongoose.model<SessionDocument>('Session', SessionSchema); 