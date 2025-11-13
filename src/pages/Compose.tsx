import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Email } from "@/types/email";
import { detectSpam, generateEmailSummary } from "@/lib/spamDetection";
import { toast } from "sonner";

const Compose = () => {
  const [user, setUser] = useState<any>(null);
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    const auth = localStorage.getItem("nexmail_auth");
    const userData = localStorage.getItem("nexmail_user");
    
    if (!auth || !userData) {
      navigate("/login");
      return;
    }
    
    setUser(JSON.parse(userData));
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!to || !subject || !body) {
      toast.error("Please fill in all fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      toast.error("Invalid email address");
      return;
    }

    setLoading(true);

    try {
      if (!user) {
        navigate("/login");
        return;
      }

      // Check for spam before sending
      const spamResult = detectSpam({
        from: user.email || "user@example.com",
        to,
        subject,
        body,
      });

      if (spamResult.isSpam) {
        const confirm = window.confirm(
          `This email appears to be spam (score: ${spamResult.score}/100). Do you still want to send it?`
        );
        if (!confirm) {
          setLoading(false);
          return;
        }
      }

      // Create email object
      const newEmail: Email = {
        id: `email-${Date.now()}`,
        user_id: user.id,
        from: user.email || "user@example.com",
        to,
        subject,
        body,
        is_read: true,
        is_spam: false,
        is_starred: false,
        category: "sent",
        summary: generateEmailSummary({ subject, body }),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      // Save to localStorage (in real app, save to Supabase)
      const storedEmails = localStorage.getItem(`emails_${user.id}`);
      const emails: Email[] = storedEmails ? JSON.parse(storedEmails) : [];
      emails.push(newEmail);
      localStorage.setItem(`emails_${user.id}`, JSON.stringify(emails));

      // Also create a received email for demo
      const receivedEmail: Email = {
        id: `email-received-${Date.now()}`,
        user_id: user.id,
        from: user.email || "user@example.com",
        to,
        subject: `Re: ${subject}`,
        body: `This is a demo reply. In a real application, this would be sent via email server.`,
        is_read: false,
        is_spam: false,
        is_starred: false,
        category: "inbox",
        summary: generateEmailSummary({ subject: `Re: ${subject}`, body: "Reply email" }),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      emails.push(receivedEmail);
      localStorage.setItem(`emails_${user.id}`, JSON.stringify(emails));

      toast.success("Email sent successfully!");
      navigate("/dashboard");
    } catch (error) {
      // Silent error handling
    } finally {
      setLoading(false);
    }
  };

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
          <h1 className="text-2xl font-bold text-white mb-6">Compose Email</h1>

          <form onSubmit={handleSend} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="to" className="text-white">To</Label>
              <Input
                id="to"
                type="email"
                placeholder="recipient@example.com"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-white">Subject</Label>
              <Input
                id="subject"
                type="text"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="body" className="text-white">Message</Label>
              <Textarea
                id="body"
                placeholder="Write your message here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="bg-white/5 border-white/10 text-white min-h-[300px]"
                required
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
                className="text-white border-white/20"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white"
                disabled={loading}
              >
                {loading ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Send
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Compose;

