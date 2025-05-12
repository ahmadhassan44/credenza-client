// Dummy data for Credenza platform (MVP)

import { Role } from "@/lib/validations/auth";

export const dummyUser = {
  id: "user-1234",
  email: "creator@example.com",
  password: "hashedpassword123", // In real use, this would be hashed
  fullName: "Alex Creator",
  avatarUrl: "/credenzaLogo.svg",
  role: Role.CREATOR,
  createdAt: "2024-01-10T12:00:00.000Z",
  updatedAt: "2025-05-12T12:00:00.000Z",
  creatorProfileId: "creator-5678",
};

export const dummyCreator = {
  id: "creator-5678",
  userId: "user-1234",
  contentCategory: "GAMING",
  contentTags: ["let's play", "walkthrough", "strategy"],
  lifecycleStage: "GROWTH",
  onboarded: true,
  createdAt: "2024-01-10T12:00:00.000Z",
  updatedAt: "2025-05-12T12:00:00.000Z",
};

export const dummyCreditScore = {
  id: "score-9999",
  creatorId: "creator-5678",
  overallScore: 82,
  scoreByPlatform: { youtube: 85, patreon: 78 },
  scoreFactors: { engagement: 82, consistency: 76 },
  trendData: [
    { date: "2024-01-01", score: 75 },
    { date: "2024-03-01", score: 78 },
    { date: "2024-06-01", score: 80 },
    { date: "2024-09-01", score: 81 },
    { date: "2025-01-01", score: 82 },
  ],
  updatedAt: "2025-05-12T12:00:00.000Z",
  createdAt: "2024-01-10T12:00:00.000Z",
};

export const dummyIncomeSources = [
  {
    id: "income-yt",
    creatorId: "creator-5678",
    platform: "YOUTUBE",
    monthlyIncome: 2200.5,
    cpm: 4.2,
    updatedAt: "2025-05-12T12:00:00.000Z",
    createdAt: "2024-01-10T12:00:00.000Z",
  },
  {
    id: "income-pt",
    creatorId: "creator-5678",
    platform: "PATREON",
    monthlyIncome: 650.0,
    cpm: 3.1,
    updatedAt: "2025-05-12T12:00:00.000Z",
    createdAt: "2024-01-10T12:00:00.000Z",
  },
];

export const dummyPlatformMetrics = [
  {
    id: "metric-yt",
    creatorId: "creator-5678",
    platform: "YOUTUBE",
    followers: 18000,
    views: 1200000,
    engagement: 3.2,
    postCount: 210,
    last30DaysViews: 110000,
    updatedAt: "2025-05-12T12:00:00.000Z",
    createdAt: "2024-01-10T12:00:00.000Z",
  },
  {
    id: "metric-pt",
    creatorId: "creator-5678",
    platform: "PATREON",
    followers: 320,
    views: 5000,
    engagement: 1.8,
    postCount: 12,
    last30DaysViews: 400,
    updatedAt: "2025-05-12T12:00:00.000Z",
    createdAt: "2024-01-10T12:00:00.000Z",
  },
];

export const dummyActivityLogs = [
  {
    id: "log-1",
    creatorId: "creator-5678",
    type: "SCORE_UPDATE",
    message: "Credit score updated to 82.",
    timestamp: "2025-05-12T12:00:00.000Z",
  },
  {
    id: "log-2",
    creatorId: "creator-5678",
    type: "INCOME_REFRESH",
    message: "Income data refreshed from YouTube.",
    timestamp: "2025-05-01T12:00:00.000Z",
  },
  {
    id: "log-3",
    creatorId: "creator-5678",
    type: "PLATFORM_SYNC",
    message: "Patreon account synced.",
    timestamp: "2025-04-15T12:00:00.000Z",
  },
];

export const dummyInsights = [
  {
    id: "insight-1",
    creatorId: "creator-5678",
    message: "Engagement dropped by 1% last month.",
    type: "ENGAGEMENT_DROP",
    severity: "WARNING",
    createdAt: "2025-05-05T12:00:00.000Z",
    dismissed: false,
  },
  {
    id: "insight-2",
    creatorId: "creator-5678",
    message: "Income stable for 3 months.",
    type: "INCOME_STABLE",
    severity: "INFO",
    createdAt: "2025-04-10T12:00:00.000Z",
    dismissed: false,
  },
];

export const dummyYoutubeMonthlyStats = [
  { month: "Jan", views: 90000, cpm: 4.1 },
  { month: "Feb", views: 95000, cpm: 4.0 },
  { month: "Mar", views: 100000, cpm: 4.3 },
  { month: "Apr", views: 110000, cpm: 4.2 },
  { month: "May", views: 120000, cpm: 4.2 },
  { month: "Jun", views: 115000, cpm: 4.4 },
  { month: "Jul", views: 105000, cpm: 4.3 },
  { month: "Aug", views: 98000, cpm: 4.1 },
  { month: "Sep", views: 102000, cpm: 4.2 },
  { month: "Oct", views: 108000, cpm: 4.3 },
  { month: "Nov", views: 112000, cpm: 4.2 },
  { month: "Dec", views: 120000, cpm: 4.5 },
];

export const dummyTopVideo = {
  id: "yt-video-1",
  title: "How to Grow on YouTube in 2025",
  thumbnailUrl: "/top-video-thumb.jpg",
  views: 80000,
  estimatedRevenue: 250,
  publishedAt: "2025-04-20T12:00:00.000Z",
};

export const dummyData = {
  user: dummyUser,
  creator: dummyCreator,
  creditScore: dummyCreditScore,
  incomeSources: dummyIncomeSources,
  platformMetrics: dummyPlatformMetrics,
  activityLogs: dummyActivityLogs,
  insights: dummyInsights,
  youtubeMonthlyStats: dummyYoutubeMonthlyStats,
  topVideo: dummyTopVideo,
};
