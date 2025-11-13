import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Star, Trash2, Archive, Reply, Forward, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Email } from "@/types/email";
import { detectSpam } from "@/lib/spamDetection";
import { toast } from "sonner";

const EmailDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [email, setEmail] = useState<Email | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    loadEmail();
  }, [id]);

  const loadEmail = () => {
    const auth = localStorage.getItem("nexmail_auth");
    const userData = localStorage.getItem("nexmail_user");
    
    if (!auth || !userData) {
      navigate("/login");
      return;
    }
    
    const currentUser = JSON.parse(userData);
    setUser(currentUser);

    try {
      const storedEmails = localStorage.getItem(`emails_${currentUser.id}`);
      const emails: Email[] = storedEmails ? JSON.parse(storedEmails) : [];
      const foundEmail = emails.find(e => e.id === id);

      if (foundEmail) {
        // Mark as read
        if (!foundEmail.is_read) {
          const updated = emails.map(e =>
            e.id === id ? { ...e, is_read: true } : e
          );
          localStorage.setItem(`emails_${currentUser.id}`, JSON.stringify(updated));
        }
        setEmail(foundEmail);
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      // Silent error handling
    } finally {
      setLoading(false);
    }
  };

  const toggleStar = () => {
    if (!email || !user) return;
    const storedEmails = localStorage.getItem(`emails_${user.id}`);
    const emails: Email[] = storedEmails ? JSON.parse(storedEmails) : [];
    const updated = emails.map(e =>
      e.id === email.id ? { ...e, is_starred: !e.is_starred } : e
    );
    localStorage.setItem(`emails_${user.id}`, JSON.stringify(updated));
    setEmail({ ...email, is_starred: !email.is_starred });
  };

  const deleteEmail = () => {
    if (!email || !user) return;
    const storedEmails = localStorage.getItem(`emails_${user.id}`);
    const emails: Email[] = storedEmails ? JSON.parse(storedEmails) : [];
    const updated = emails.filter(e => e.id !== email.id);
    localStorage.setItem(`emails_${user.id}`, JSON.stringify(updated));
    toast.success("Email deleted");
    navigate("/dashboard");
  };

  const markAsSpam = () => {
    if (!email || !user) return;
    const storedEmails = localStorage.getItem(`emails_${user.id}`);
    const emails: Email[] = storedEmails ? JSON.parse(storedEmails) : [];
    const updated = emails.map(e =>
      e.id === email.id ? { ...e, is_spam: true, category: 'spam' } : e
    );
    localStorage.setItem(`emails_${user.id}`, JSON.stringify(updated));
    toast.success("Marked as spam");
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#222222] to-[#1A1F2C] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#222222] to-[#1A1F2C] flex items-center justify-center">
        <div className="text-white">Email not found</div>
      </div>
    );
  }

  const spamResult = detectSpam(email);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#222222] to-[#1A1F2C]">
      <div className="container mx-auto px-6 py-6 max-w-4xl">
        {/* Header */}
        <div className="mb-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/dashboard")}
            className="text-white mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Inbox
          </Button>
        </div>

        <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-6">
          {/* Email Header */}
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h1 className="text-2xl font-bold text-white">{email.subject}</h1>
                  {email.is_spam && (
                    <Badge variant="destructive">
                      <AlertTriangle className="mr-1 h-3 w-3" />
                      SPAM
                    </Badge>
                  )}
                  {spamResult.isSpam && !email.is_spam && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                      Suspicious (Score: {spamResult.score})
                    </Badge>
                  )}
                </div>
                <div className="text-white/70 space-y-1">
                  <p><span className="font-semibold">From:</span> {email.from}</p>
                  <p><span className="font-semibold">To:</span> {email.to}</p>
                  <p><span className="font-semibold">Date:</span> {new Date(email.created_at).toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleStar}
                  className="text-white"
                >
                  <Star
                    className={`h-5 w-5 ${
                      email.is_starred ? "fill-yellow-400 text-yellow-400" : "text-white/50"
                    }`}
                  />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAsSpam}
                  className="text-white"
                >
                  <AlertTriangle className="h-5 w-5 text-white/50" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={deleteEmail}
                  className="text-white"
                >
                  <Trash2 className="h-5 w-5 text-white/50" />
                </Button>
              </div>
            </div>
            <Separator className="bg-white/10" />
          </div>

          {/* Spam Detection Info */}
          {spamResult.isSpam && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                <div>
                  <p className="text-yellow-500 font-semibold mb-2">Spam Detection Alert</p>
                  <p className="text-white/80 text-sm mb-2">
                    This email has a spam score of {spamResult.score}/100
                  </p>
                  <ul className="text-white/70 text-sm list-disc list-inside space-y-1">
                    {spamResult.reasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Email Summary */}
          {email.summary && (
            <div className="mb-6 p-4 bg-primary/10 border border-primary/30 rounded-lg">
              <p className="text-primary font-semibold mb-2">AI Summary</p>
              <p className="text-white/90 text-sm">{email.summary}</p>
            </div>
          )}

          {/* Email Body */}
          <div className="prose prose-invert max-w-none">
            <div className="text-white/90 whitespace-pre-wrap leading-relaxed">
              {email.body}
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 pt-6 border-t border-white/10 flex space-x-2">
            <Button variant="outline" className="text-white border-white/20">
              <Reply className="mr-2 h-4 w-4" />
              Reply
            </Button>
            <Button variant="outline" className="text-white border-white/20">
              <Forward className="mr-2 h-4 w-4" />
              Forward
            </Button>
            <Button variant="outline" className="text-white border-white/20">
              <Archive className="mr-2 h-4 w-4" />
              Archive
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default EmailDetail;

