import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, User, Bot, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
}

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

// Email regex for detection
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem("zuvigo_chat_messages");
        return saved ? JSON.parse(saved) : [
            {
                id: "welcome",
                role: "assistant",
                content: "Hi! 👋 I'm Zuvigo's AI assistant. How can I help you today?",
            },
        ];
    });
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState<string | null>(() => localStorage.getItem("zuvigo_user_name"));
    const [userEmail, setUserEmail] = useState<string | null>(() => localStorage.getItem("zuvigo_user_email"));
    const [emailSaved, setEmailSaved] = useState(() => localStorage.getItem("zuvigo_email_saved") === "true");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    useEffect(() => {
        localStorage.setItem("zuvigo_chat_messages", JSON.stringify(messages));
    }, [messages]);

    useEffect(() => {
        if (userName) localStorage.setItem("zuvigo_user_name", userName);
    }, [userName]);

    useEffect(() => {
        if (userEmail) localStorage.setItem("zuvigo_user_email", userEmail);
    }, [userEmail]);

    useEffect(() => {
        localStorage.setItem("zuvigo_email_saved", emailSaved.toString());
    }, [emailSaved]);

    // Auto-save email when detected
    const saveLeadToDatabase = async (name: string, email: string) => {
        if (emailSaved) return;

        try {
            const response = await fetch(`${API_BASE}/api/chat/book`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email }),
            });

            if (response.ok) {
                setEmailSaved(true);
                console.log("Lead saved:", { name, email });
            }
        } catch (error) {
            console.error("Failed to save lead:", error);
        }
    };

    // Detect email and name from messages
    const extractEmailFromMessage = (message: string): string | null => {
        const match = message.match(EMAIL_REGEX);
        return match ? match[0] : null;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const currentInput = input.trim();
        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: currentInput,
        };

        // Check if message contains email
        const detectedEmail = extractEmailFromMessage(currentInput);
        if (detectedEmail && !userEmail) {
            setUserEmail(detectedEmail);
        }

        // Try to detect name (simple heuristic - if previous AI asked for name)
        const lastAIMessage = messages.filter(m => m.role === "assistant").pop();
        if (lastAIMessage?.content.toLowerCase().includes("your name") && !userName) {
            setUserName(currentInput);
        }

        // Auto-save if we have both name and email
        if (userEmail && userName && !emailSaved) {
            saveLeadToDatabase(userName, userEmail);
        } else if (detectedEmail && userName && !emailSaved) {
            saveLeadToDatabase(userName, detectedEmail);
        }

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        try {
            const conversationHistory = messages.slice(1).map((m) => ({
                role: m.role,
                content: m.content,
            }));

            const response = await fetch(`${API_BASE}/api/chat`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userMessage.content,
                    conversationHistory,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                const assistantMessage: Message = {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: data.message,
                };
                setMessages((prev) => [...prev, assistantMessage]);
            } else {
                throw new Error(data.error || "Failed to get response");
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages((prev) => [
                ...prev,
                {
                    id: (Date.now() + 1).toString(),
                    role: "assistant",
                    content: "Sorry, I'm having trouble connecting. Please try again or contact us directly at hello@zuvigo.com",
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const quickActions = [
        "What services do you offer?",
        "I want to book a call",
        "Tell me about pricing",
    ];

    return (
        <>
            {/* Floating Chat Button - Zuvigo Blue Theme */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-2xl hover:shadow-primary/40 transition-all flex items-center justify-center ${isOpen ? "hidden" : ""}`}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                style={{ boxShadow: "0 0 40px hsl(var(--primary) / 0.3)" }}
            >
                <Bot className="w-8 h-8" />
                <motion.div
                    className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-6 right-6 z-50 w-[420px] max-w-[calc(100vw-48px)] h-[650px] max-h-[calc(100vh-100px)] bg-background/95 backdrop-blur-xl border border-border/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/10"
                        style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 80px hsl(var(--primary) / 0.15)" }}
                    >
                        {/* Header - Glassmorphism */}
                        <div className="relative p-6 border-b border-border/10 bg-gradient-to-br from-primary/10 via-background/50 to-transparent">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        <motion.div
                                            className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg"
                                            animate={{
                                                boxShadow: [
                                                    "0 0 0px hsl(var(--primary) / 0)",
                                                    "0 0 20px hsl(var(--primary) / 0.4)",
                                                    "0 0 0px hsl(var(--primary) / 0)"
                                                ]
                                            }}
                                            transition={{ repeat: Infinity, duration: 3 }}
                                        >
                                            <Bot className="w-6 h-6 text-primary-foreground" />
                                        </motion.div>
                                        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-foreground text-lg">Zuvigo AI</h3>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-xs font-medium text-primary uppercase tracking-wider">Assistant</span>
                                            <span className="w-1 h-1 bg-muted-foreground/30 rounded-full" />
                                            <span className="text-xs text-muted-foreground font-medium">Always Active</span>
                                        </div>
                                    </div>
                                </div>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2.5 rounded-2xl bg-secondary/50 hover:bg-secondary transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </motion.button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-transparent custom-scrollbar">
                            {messages.map((message, index) => (
                                <motion.div
                                    key={message.id}
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                    className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                                >
                                    <div
                                        className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${message.role === "user"
                                            ? "bg-primary"
                                            : "bg-background border border-border/50"
                                            }`}
                                    >
                                        {message.role === "user" ? (
                                            <User className="w-5 h-5 text-primary-foreground" />
                                        ) : (
                                            <Bot className="w-5 h-5 text-primary" />
                                        )}
                                    </div>
                                    <div
                                        className={`max-w-[85%] p-4 rounded-3xl shadow-sm ${message.role === "user"
                                            ? "bg-primary text-primary-foreground rounded-tr-none"
                                            : "bg-card/50 backdrop-blur-sm border border-border/30 text-foreground rounded-tl-none"
                                            }`}
                                    >
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex gap-3"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-background border border-border/50 flex items-center justify-center shadow-sm">
                                        <Bot className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="bg-card/50 backdrop-blur-sm border border-border/30 p-4 rounded-3xl rounded-tl-none">
                                        <div className="flex gap-1.5">
                                            {[0, 1, 2].map((i) => (
                                                <motion.span
                                                    key={i}
                                                    className="w-2 h-2 bg-primary/40 rounded-full"
                                                    animate={{ backgroundColor: ["hsl(var(--primary)/0.4)", "hsl(var(--primary)/1)", "hsl(var(--primary)/0.4)"] }}
                                                    transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Quick Actions */}
                        {messages.length <= 2 && (
                            <div className="px-6 pb-4 bg-transparent mt-auto">
                                <div className="flex flex-wrap gap-2">
                                    {quickActions.map((action) => (
                                        <motion.button
                                            key={action}
                                            onClick={() => setInput(action)}
                                            className="px-4 py-2 text-xs font-medium rounded-full bg-background/50 backdrop-blur-sm text-foreground hover:bg-primary hover:text-primary-foreground transition-all border border-border/50 shadow-sm"
                                            whileHover={{ scale: 1.05, y: -2 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {action}
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input */}
                        <div className="p-6 border-t border-border/10 bg-background/50 backdrop-blur-md">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex gap-2 relative"
                            >
                                <Input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Ask anything..."
                                    disabled={isLoading}
                                    className="flex-1 h-14 bg-background/50 border-border/20 text-foreground placeholder:text-muted-foreground rounded-2xl focus-visible:ring-primary/20 focus-visible:border-primary pl-5 pr-14 transition-all"
                                />
                                <div className="absolute right-1.5 top-1.5">
                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            type="submit"
                                            size="icon"
                                            disabled={!input.trim() || isLoading}
                                            className="w-11 h-11 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90 disabled:opacity-50 transition-all"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                            ) : (
                                                <Send className="w-5 h-5" />
                                            )}
                                        </Button>
                                    </motion.div>
                                </div>
                            </form>
                            <div className="flex items-center justify-center gap-2 mt-4">
                                <Sparkles className="w-3 h-3 text-primary/60" />
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60">
                                    Hyper Intelligent Digital Assistant
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
