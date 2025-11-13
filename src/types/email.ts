export interface Email {
  id: string;
  user_id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  is_read: boolean;
  is_spam: boolean;
  is_starred: boolean;
  category: 'inbox' | 'spam' | 'sent' | 'draft' | 'trash';
  summary?: string;
  created_at: string;
  updated_at: string;
}

export interface EmailFilters {
  category?: string;
  is_read?: boolean;
  is_spam?: boolean;
  search?: string;
}

