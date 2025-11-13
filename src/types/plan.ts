
export type PlanType = 'starter' | 'professional' | 'enterprise';

export interface Plan {
  id: string;
  title: string;
  price: string;
  features: string[];
  popular?: boolean;
  type: PlanType;
}
