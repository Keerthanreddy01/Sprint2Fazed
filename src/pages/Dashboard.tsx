import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, Search, Plus, Star, Trash2, Archive, Filter, 
  LogOut, Inbox, AlertTriangle, Send, FileText, 
  MoreVertical, CheckCircle2, Circle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Email } from "@/types/email";
import { detectSpam, generateEmailSummary } from "@/lib/spamDetection";
import { toast } from "sonner";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [emails, setEmails] = useState<Email[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("inbox");
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (user) {
      loadEmails();
    }
  }, [user, selectedCategory]);

  useEffect(() => {
    filterEmails();
  }, [emails, searchQuery, selectedCategory]);

  const checkUser = () => {
    const auth = localStorage.getItem("nexmail_auth");
    const userData = localStorage.getItem("nexmail_user");
    
    if (!auth || !userData) {
      navigate("/login");
      return;
    }
    
    setUser(JSON.parse(userData));
  };

  const loadEmails = () => {
    if (!user) return;
    
    setLoading(true);
    try {
      const storedEmails = localStorage.getItem(`emails_${user.id}`);
      let emailList: Email[] = storedEmails ? JSON.parse(storedEmails) : [];

      // If no emails, create some sample emails
      if (emailList.length === 0) {
        emailList = generateSampleEmails(user.id, user.email);
        localStorage.setItem(`emails_${user.id}`, JSON.stringify(emailList));
      }

      setEmails(emailList);
    } catch (error) {
      // Silent error handling
    } finally {
      setLoading(false);
    }
  };

  const filterEmails = () => {
    let filtered = emails.filter(email => {
      // Filter by category
      if (selectedCategory !== "all" && email.category !== selectedCategory) {
        return false;
      }

      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          email.subject.toLowerCase().includes(query) ||
          email.from.toLowerCase().includes(query) ||
          email.body.toLowerCase().includes(query)
        );
      }

      return true;
    });

    // Sort by date (newest first)
    filtered.sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    setFilteredEmails(filtered);
  };

  const handleLogout = () => {
    localStorage.removeItem("nexmail_auth");
    localStorage.removeItem("nexmail_user");
    navigate("/");
  };

  const toggleRead = (emailId: string) => {
    const updated = emails.map(email =>
      email.id === emailId ? { ...email, is_read: !email.is_read } : email
    );
    setEmails(updated);
    if (user) {
      localStorage.setItem(`emails_${user.id}`, JSON.stringify(updated));
    }
  };

  const toggleStar = (emailId: string) => {
    const updated = emails.map(email =>
      email.id === emailId ? { ...email, is_starred: !email.is_starred } : email
    );
    setEmails(updated);
    if (user) {
      localStorage.setItem(`emails_${user.id}`, JSON.stringify(updated));
    }
  };

  const deleteEmail = (emailId: string) => {
    const updated = emails.filter(email => email.id !== emailId);
    setEmails(updated);
    if (user) {
      localStorage.setItem(`emails_${user.id}`, JSON.stringify(updated));
    }
    toast.success("Email deleted");
  };

  const markAsSpam = (emailId: string) => {
    const updated = emails.map(email =>
      email.id === emailId ? { ...email, is_spam: true, category: 'spam' } : email
    );
    setEmails(updated);
    if (user) {
      localStorage.setItem(`emails_${user.id}`, JSON.stringify(updated));
    }
    toast.success("Marked as spam");
  };

  const categories = [
    { id: "inbox", label: "Inbox", icon: Inbox, count: emails.filter(e => e.category === "inbox").length },
    { id: "spam", label: "Spam", icon: AlertTriangle, count: emails.filter(e => e.category === "spam" || e.is_spam).length },
    { id: "sent", label: "Sent", icon: Send, count: emails.filter(e => e.category === "sent").length },
    { id: "draft", label: "Drafts", icon: FileText, count: emails.filter(e => e.category === "draft").length },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1A1F2C] via-[#222222] to-[#1A1F2C]">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-white">Nexmail</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => navigate("/compose")}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                <Plus className="mr-2 h-4 w-4" />
                Compose
              </Button>
              <Button variant="ghost" onClick={handleLogout} className="text-white">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-4">
              <div className="space-y-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                        selectedCategory === cat.id
                          ? "bg-primary/20 text-primary"
                          : "text-white/70 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <Icon className="h-4 w-4" />
                        <span>{cat.label}</span>
                      </div>
                      {cat.count > 0 && (
                        <Badge variant="secondary" className="bg-white/10">
                          {cat.count}
                        </Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 text-white"
                />
              </div>
            </div>

            {/* Email List */}
            {loading ? (
              <div className="text-center text-white/70 py-12">Loading emails...</div>
            ) : filteredEmails.length === 0 ? (
              <Card className="bg-white/5 backdrop-blur-xl border-white/10 p-12 text-center">
                <Mail className="h-12 w-12 text-white/30 mx-auto mb-4" />
                <p className="text-white/70">No emails found</p>
              </Card>
            ) : (
              <div className="space-y-2">
                {filteredEmails.map((email) => (
                  <Card
                    key={email.id}
                    className={`bg-white/5 backdrop-blur-xl border-white/10 p-4 cursor-pointer hover:bg-white/10 transition-colors ${
                      !email.is_read ? "border-l-4 border-l-primary" : ""
                    }`}
                    onClick={() => navigate(`/email/${email.id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1 min-w-0">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleRead(email.id);
                          }}
                          className="mt-1"
                        >
                          {email.is_read ? (
                            <CheckCircle2 className="h-5 w-5 text-white/50" />
                          ) : (
                            <Circle className="h-5 w-5 text-primary" />
                          )}
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleStar(email.id);
                          }}
                          className="mt-1"
                        >
                          <Star
                            className={`h-5 w-5 ${
                              email.is_starred ? "fill-yellow-400 text-yellow-400" : "text-white/50"
                            }`}
                          />
                        </button>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold text-white truncate">
                              {email.from}
                            </span>
                            {email.is_spam && (
                              <Badge variant="destructive" className="text-xs">
                                SPAM
                              </Badge>
                            )}
                          </div>
                          <p className="text-white/90 font-medium truncate">{email.subject}</p>
                          <p className="text-white/60 text-sm truncate mt-1">
                            {email.summary || email.body.substring(0, 100)}...
                          </p>
                          <p className="text-white/40 text-xs mt-2">
                            {new Date(email.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="sm" className="text-white/70">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            markAsSpam(email.id);
                          }}>
                            Mark as Spam
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={(e) => {
                            e.stopPropagation();
                            deleteEmail(email.id);
                          }}>
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Generate sample emails for demo
function generateSampleEmails(userId: string, userEmail?: string): Email[] {
  const samples = [
    {
      from: "team@github.com",
      subject: "Your repository has new activity",
      body: "We noticed some new commits in your repository. Check them out!",
      isSpam: false,
    },
    {
      from: "noreply@lottery.com",
      subject: "CONGRATULATIONS! YOU WON $1,000,000!!!",
      body: "Click here now to claim your prize! Limited time offer! Act immediately!",
      isSpam: true,
    },
    {
      from: "support@supabase.com",
      subject: "Welcome to Supabase",
      body: "Thank you for signing up. We're excited to have you on board. Get started by reading our documentation.",
      isSpam: false,
    },
    {
      from: "deals@shopping.com",
      subject: "Special Offer - 50% OFF Everything!",
      body: "Don't miss out on our exclusive sale. Shop now and save big!",
      isSpam: false,
    },
    {
      from: "free-money@scam.com",
      subject: "FREE MONEY - NO RISK GUARANTEED!",
      body: "Make money from home! No experience needed! Click here to get rich quick!",
      isSpam: true,
    },
  ];

  return samples.map((sample, index) => {
    const spamResult = detectSpam(sample);
    const summary = generateEmailSummary(sample);
    
    return {
      id: `email-${Date.now()}-${index}`,
      user_id: userId,
      from: sample.from,
      to: userEmail || "user@example.com",
      subject: sample.subject,
      body: sample.body,
      is_read: false,
      is_spam: spamResult.isSpam,
      is_starred: false,
      category: spamResult.isSpam ? 'spam' : 'inbox',
      summary,
      created_at: new Date(Date.now() - index * 3600000).toISOString(),
      updated_at: new Date().toISOString(),
    };
  });
}

export default Dashboard;

