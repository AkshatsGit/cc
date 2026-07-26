import React, { useState, useEffect, useRef } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import Sidebar from '../components/layout/Sidebar';
import {
  Send,
  Image as ImageIcon,
  Paperclip,
  CheckCheck,
  Search,
  MessageSquare,
  Sparkles,
  Info
} from 'lucide-react';
import toast from 'react-hot-toast';

export default function MessagesPage() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetchConversations();
  }, []);

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat.chatId);
    }
  }, [activeChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchConversations = async () => {
    try {
      const res = await api.get('/chats/conversations');
      if (res.data.success) {
        setConversations(res.data.conversations);
        if (res.data.conversations.length > 0) {
          setActiveChat(res.data.conversations[0]);
        }
      }
    } catch (e) {
      toast.error('Failed to load chat conversations');
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const res = await api.get(`/chats/messages/${chatId}`);
      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (e) {
      toast.error('Failed to load messages');
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!textInput.trim() || !activeChat) return;

    const receiverId = user.role === 'brand' ? activeChat.influencer.id : activeChat.brand.id;

    try {
      const res = await api.post('/chats/messages', {
        chatId: activeChat.chatId,
        campaignId: activeChat.campaignId,
        receiverId,
        text: textInput.trim()
      });

      if (res.data.success) {
        setMessages(prev => [...prev, res.data.message]);
        setTextInput('');

        // Simulate brief typing response for demo feel
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => setIsTyping(false), 2000);
        }, 1000);
      }
    } catch (err) {
      toast.error('Failed to send message');
    }
  };

  const handleAttachImage = () => {
    const demoImage = 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&auto=format&fit=crop&q=80';
    if (!activeChat) return;
    const receiverId = user.role === 'brand' ? activeChat.influencer.id : activeChat.brand.id;

    api.post('/chats/messages', {
      chatId: activeChat.chatId,
      campaignId: activeChat.campaignId,
      receiverId,
      text: 'Sharing high-res campaign draft asset',
      image: demoImage
    }).then(res => {
      if (res.data.success) {
        setMessages(prev => [...prev, res.data.message]);
        toast.success('Image attachment shared');
      }
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <Sidebar />

      <main className="flex-1 p-4 lg:p-6 max-w-7xl overflow-hidden flex flex-col">
        <div className="card-creator flex-1 flex flex-col md:flex-row overflow-hidden shadow-2xl min-h-[600px]">
          {/* CONVERSATION LIST */}
          <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 p-4 space-y-4 shrink-0">
            <h2 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <MessageSquare size={18} className="text-[#6C63FF]" /> Direct Messages
            </h2>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {conversations.length === 0 ? (
                <p className="text-xs text-slate-400 py-8 text-center">No active chats yet. Accept an application to start collaboration chat.</p>
              ) : (
                conversations.map((conv) => {
                  const partner = user.role === 'brand' ? conv.influencer : conv.brand;
                  const isSelected = activeChat?.chatId === conv.chatId;

                  return (
                    <button
                      key={conv.chatId}
                      onClick={() => setActiveChat(conv)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center gap-3 ${
                        isSelected
                          ? 'bg-white dark:bg-slate-800 shadow-md border border-purple-100 dark:border-purple-900'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      <img src={partner.avatar || partner.logo} alt={partner.name} className="w-10 h-10 rounded-full object-cover ring-2 ring-[#6C63FF]/20 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-xs text-slate-900 dark:text-white truncate">{partner.name}</p>
                        <p className="text-[11px] text-[#6C63FF] font-semibold truncate">{conv.campaignTitle}</p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {conv.lastMessage?.text || 'Start conversation...'}
                        </p>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* ACTIVE CHAT WINDOW */}
          {activeChat ? (
            <div className="flex-1 flex flex-col bg-white dark:bg-slate-900">
              {/* CHAT HEADER */}
              <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={user.role === 'brand' ? activeChat.influencer.avatar : activeChat.brand.logo}
                    alt="Partner"
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-[#6C63FF]"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {user.role === 'brand' ? activeChat.influencer.name : activeChat.brand.name}
                    </h3>
                    <p className="text-xs text-[#6C63FF] font-medium">{activeChat.campaignTitle}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Online
                </div>
              </div>

              {/* MESSAGES LIST */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 max-h-[440px]">
                {messages.map((msg) => {
                  const isMe = msg.senderId === user.id;

                  return (
                    <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs space-y-2 shadow-xs ${
                          isMe
                            ? 'bg-[#6C63FF] text-white rounded-br-none'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-bl-none'
                        }`}
                      >
                        {msg.text && <p className="leading-relaxed font-medium">{msg.text}</p>}
                        {msg.image && (
                          <img src={msg.image} alt="Attachment" className="rounded-xl max-h-48 object-cover shadow-sm" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-[10px] text-slate-400">
                        <span>{new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        {isMe && <CheckCheck size={13} className="text-[#6C63FF]" title="Read Receipt" />}
                      </div>
                    </div>
                  );
                })}

                {/* TYPING INDICATOR */}
                {isTyping && (
                  <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                    <span className="w-2 h-2 rounded-full bg-[#6C63FF] animate-ping"></span>
                    <span>Partner is typing...</span>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* INPUT BAR */}
              <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAttachImage}
                  className="p-2.5 text-slate-400 hover:text-[#6C63FF] hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
                  title="Share image asset"
                >
                  <ImageIcon size={18} />
                </button>

                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-[#6C63FF]"
                />

                <button
                  type="submit"
                  className="bg-[#6C63FF] hover:bg-[#5A52E0] text-white p-2.5 rounded-xl shadow-md transition-all shrink-0"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400 text-sm">
              Select a conversation to start chatting
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
