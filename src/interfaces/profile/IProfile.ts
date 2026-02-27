import type {IMembershipTier } from "@/interfaces";

export interface IProfile {
  id: string;
  sport: string;
  sourceSubscriptionsTotal?: number;
  fullName: string;
  fan?: number;
  avatar: string;
  totalFan: number;
  totalInteractions: number;
  nickName: string;
  isCurrentUserSubscribed: boolean;
  membershipTier?: IMembershipTier;
}