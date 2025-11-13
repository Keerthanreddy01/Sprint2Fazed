/**
 * Spam Detection Utility
 * Uses multiple heuristics to detect spam emails
 */

export interface SpamScore {
  score: number; // 0-100, higher = more likely spam
  reasons: string[];
  isSpam: boolean; // true if score >= 70
}

// Common spam keywords
const SPAM_KEYWORDS = [
  'free money', 'click here', 'limited time', 'act now', 'urgent',
  'winner', 'congratulations', 'prize', 'lottery', 'viagra', 'casino',
  'guaranteed', 'no risk', 'special offer', 'exclusive deal', 'buy now',
  'discount', 'save up to', 'free trial', 'no credit check', 'make money',
  'work from home', 'get rich', 'lose weight', 'miracle', 'secret',
  'hidden', 'exclusive', 'one time', 'limited offer', 'expires soon'
];

// Suspicious email patterns
const SUSPICIOUS_PATTERNS = [
  /[A-Z]{5,}/, // Multiple uppercase letters
  /!{2,}/, // Multiple exclamation marks
  /\${1,}/, // Dollar signs
  /https?:\/\/[^\s]+/i, // URLs (suspicious if many)
  /[0-9]{10,}/, // Long number sequences (phone numbers)
];

// Common spam sender patterns
const SPAM_SENDER_PATTERNS = [
  /noreply/i,
  /no-reply/i,
  /donotreply/i,
  /notification/i,
  /alert/i,
  /service/i,
];

export function detectSpam(email: {
  from: string;
  subject: string;
  body: string;
  to?: string;
}): SpamScore {
  const reasons: string[] = [];
  let score = 0;

  const subject = email.subject.toLowerCase();
  const body = email.body.toLowerCase();
  const from = email.from.toLowerCase();
  const fullText = `${subject} ${body}`.toLowerCase();

  // Check for spam keywords in subject
  const subjectSpamCount = SPAM_KEYWORDS.filter(keyword => 
    subject.includes(keyword.toLowerCase())
  ).length;
  if (subjectSpamCount > 0) {
    score += subjectSpamCount * 10;
    reasons.push(`Found ${subjectSpamCount} spam keyword(s) in subject`);
  }

  // Check for spam keywords in body
  const bodySpamCount = SPAM_KEYWORDS.filter(keyword => 
    body.includes(keyword.toLowerCase())
  ).length;
  if (bodySpamCount > 2) {
    score += Math.min(bodySpamCount * 5, 30);
    reasons.push(`Found ${bodySpamCount} spam keyword(s) in body`);
  }

  // Check for suspicious patterns
  if (SUSPICIOUS_PATTERNS.some(pattern => pattern.test(email.subject))) {
    score += 15;
    reasons.push('Suspicious pattern in subject line');
  }

  // Check for excessive URLs
  const urlMatches = fullText.match(/https?:\/\/[^\s]+/gi);
  if (urlMatches && urlMatches.length > 3) {
    score += 20;
    reasons.push(`Multiple URLs found (${urlMatches.length})`);
  }

  // Check sender patterns
  if (SPAM_SENDER_PATTERNS.some(pattern => pattern.test(from))) {
    score += 10;
    reasons.push('Suspicious sender email pattern');
  }

  // Check for excessive capitalization
  const capsRatio = (email.subject.match(/[A-Z]/g) || []).length / email.subject.length;
  if (capsRatio > 0.5 && email.subject.length > 10) {
    score += 15;
    reasons.push('Excessive capitalization in subject');
  }

  // Check for excessive punctuation
  const exclamationCount = (email.subject.match(/!/g) || []).length;
  if (exclamationCount > 2) {
    score += 10;
    reasons.push('Excessive exclamation marks');
  }

  // Check email length (very short emails are suspicious)
  if (body.length < 50 && subject.length < 10) {
    score += 10;
    reasons.push('Very short email content');
  }

  // Check for suspicious email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.from)) {
    score += 25;
    reasons.push('Invalid email format');
  }

  // Check for common spam phrases
  const spamPhrases = [
    'click here now',
    'act immediately',
    'limited time only',
    'you have won',
    'claim your prize',
    'urgent action required',
    'verify your account',
    'suspended account',
    'click below',
    'unsubscribe here'
  ];
  
  const foundPhrases = spamPhrases.filter(phrase => fullText.includes(phrase));
  if (foundPhrases.length > 0) {
    score += foundPhrases.length * 8;
    reasons.push(`Found ${foundPhrases.length} spam phrase(s)`);
  }

  // Normalize score to 0-100
  score = Math.min(score, 100);

  return {
    score,
    reasons,
    isSpam: score >= 70
  };
}

/**
 * Generate AI summary of email (simulated)
 */
export function generateEmailSummary(email: { subject: string; body: string }): string {
  // Simple extraction-based summary
  const sentences = email.body.split(/[.!?]+/).filter(s => s.trim().length > 20);
  
  if (sentences.length === 0) {
    return email.subject || 'No content available';
  }

  // Take first 2-3 sentences as summary
  const summary = sentences.slice(0, 3).join('. ').trim();
  return summary.length > 150 ? summary.substring(0, 150) + '...' : summary;
}

/**
 * Categorize email based on content
 */
export function categorizeEmail(email: { subject: string; body: string }): 'inbox' | 'spam' | 'promotion' | 'social' | 'updates' {
  const text = `${email.subject} ${email.body}`.toLowerCase();
  
  // Check for spam first
  const spamScore = detectSpam(email);
  if (spamScore.isSpam) {
    return 'spam';
  }

  // Check for promotions
  if (text.match(/sale|discount|offer|deal|promo|coupon|save|buy|shop/i)) {
    return 'promotion';
  }

  // Check for social
  if (text.match(/facebook|twitter|linkedin|instagram|social|friend|follow/i)) {
    return 'social';
  }

  // Check for updates
  if (text.match(/notification|alert|update|reminder|confirm|verify/i)) {
    return 'updates';
  }

  return 'inbox';
}

