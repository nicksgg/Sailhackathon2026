import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, MoreVertical, Send, Paperclip, Heart } from 'lucide-react';
import { units, ChatMessage } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export function AdvisorChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-001',
      role: 'bot',
      content: 'Welcome to Project Lighthouse 👋\nI can help you find the right unit.\nWhat matters most to you?',
      timestamp: new Date(),
      quickReplies: ['High floor', 'Pool view', 'Under $2M', '3 bedrooms'],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [showQuickReplies, setShowQuickReplies] = useState(true);

  const handleQuickReply = (reply: string) => {
    setShowQuickReplies(false);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: reply,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);

    // Simulate bot response
    setTimeout(() => {
      const preferences = reply.toLowerCase();
      let filteredUnits = units.filter(u => u.available);
      
      if (preferences.includes('high floor')) {
        filteredUnits = filteredUnits.filter(u => u.floorCategory === 'High');
      }
      if (preferences.includes('pool view')) {
        filteredUnits = filteredUnits.filter(u => u.tags.includes('Pool View'));
      }
      if (preferences.includes('under $2m')) {
        filteredUnits = filteredUnits.filter(u => u.price < 2000000);
      }
      if (preferences.includes('3 bedrooms')) {
        filteredUnits = filteredUnits.filter(u => u.bedrooms === 3);
      }

      const selectedUnits = filteredUnits.slice(0, 3);

      const botMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'bot',
        content: `Based on your preferences, here are ${selectedUnits.length} units that match:`,
        timestamp: new Date(),
        units: selectedUnits,
      };
      setMessages(prev => [...prev, botMessage]);

      setTimeout(() => {
        const followUp: ChatMessage = {
          id: `msg-${Date.now() + 2}`,
          role: 'bot',
          content: 'Would you like to compare these, or shall I refine the search?',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, followUp]);
      }, 1000);
    }, 1000);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simple bot response
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: 'bot',
        content: "I understand! Let me help you with that. You can use the quick action buttons below to explore more options or book a viewing with our human consultant.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const formatPrice = (price: number) => `$${(price / 1000000).toFixed(2)}M`;

  const suggestedActions = [
    'Show 3 best matches',
    'Explain payment stages',
    'Estimate monthly installment',
    'Book showflat slot',
    'Compare shortlisted units',
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-4 h-14 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 flex-1 ml-2">
          <div className="w-8 h-8 rounded-full bg-[#01696F] flex items-center justify-center text-white text-sm font-semibold">
            AI
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">Lighthouse Advisor</p>
            <p className="text-xs text-gray-500">AI Assistant</p>
          </div>
        </div>
        <button className="p-2 -mr-2">
          <MoreVertical className="w-5 h-5" />
        </button>
      </header>

      {/* Chat Body */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.role === 'bot' ? (
              <div className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-[#01696F] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                  AI
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-200 max-w-[280px]">
                    <p className="text-sm text-gray-900 whitespace-pre-line">{message.content}</p>
                  </div>
                  {message.units && message.units.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.units.map(unit => (
                        <div key={unit.id} className="bg-white rounded-xl p-3 border border-gray-200 max-w-[280px]">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1">
                            {unit.unitNumber} · {unit.type}
                          </h4>
                          <p className="text-xs text-gray-600 mb-2">
                            {unit.facing} · Floor {unit.floor} · {unit.size}sqft
                          </p>
                          <p className="font-bold text-gray-900 text-sm mb-3">
                            {formatPrice(unit.price)}
                          </p>
                          <div className="flex gap-2">
                            <Button
                              onClick={() => navigate(`/unit/${unit.id}`)}
                              size="sm"
                              variant="outline"
                              className="flex-1 h-8 text-xs"
                            >
                              View
                            </Button>
                            <Button
                              size="sm"
                              className="flex-1 h-8 text-xs bg-[#01696F] hover:bg-[#0C4E54]"
                            >
                              <Heart className="w-3 h-3 mr-1" />
                              Shortlist
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  {message.quickReplies && showQuickReplies && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {message.quickReplies.map((reply, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuickReply(reply)}
                          className="px-3 py-1.5 bg-white border border-gray-300 rounded-full text-sm text-gray-700 hover:border-[#01696F] hover:bg-[#01696F]/5"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="max-w-[280px]">
                  <div className="bg-[#01696F] text-white rounded-2xl rounded-tr-sm px-4 py-3">
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Suggested Actions */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {suggestedActions.map((action, i) => (
            <button
              key={i}
              onClick={() => {
                if (action.includes('Book')) navigate('/booking');
                if (action.includes('Compare')) navigate('/compare');
                if (action.includes('Estimate')) navigate('/calculator');
              }}
              className="px-3 py-1.5 bg-gray-100 rounded-full text-xs text-gray-700 whitespace-nowrap hover:bg-gray-200"
            >
              {action}
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <div className="bg-white border-t border-gray-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500">
            <Paperclip className="w-5 h-5" />
          </button>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type a message..."
            className="flex-1 h-10 bg-gray-50 border-gray-200"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-[#01696F] text-white rounded-lg hover:bg-[#0C4E54]"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="bg-[#F59E0B]/10 border-t border-[#F59E0B]/20 px-4 py-2">
        <button className="w-full text-sm text-[#92400E] font-medium text-center">
          Share my shortlist with a human consultant →
        </button>
      </div>
    </div>
  );
}
