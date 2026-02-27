export interface IMembershipTier {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt?: string;
  name: string;
  monthlyPrice?: number | null;
  tierDescription: string;
}