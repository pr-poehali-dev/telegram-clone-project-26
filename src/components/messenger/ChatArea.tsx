import { useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Contact, Message } from "./types";

interface ChatAreaProps {
  sidebarOpen: boolean;
  currentContact: Contact;
  currentMessages: Message[];
  inputText: string;
  showEmojiPanel: boolean;
  onToggleSidebar: () => void;
  onInputChange: (val: string) => void;
  onSendMessage: () => void;
  onToggleEmoji: () => void;
  onEmojiPick: (e: string) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

const EMOJIS = ["😀","😂","🥰","😎","🤩","🔥","👍","❤️","🎉","💯","👀","🚀","✨","🌟","💬","🤝"];

export default function ChatArea({
  sidebarOpen,
  currentContact,
  currentMessages,
  inputText,
  showEmojiPanel,
  onToggleSidebar,
  onInputChange,
  onSendMessage,
  onToggleEmoji,
  onEmojiPick,
  onKeyDown,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentContact.id, currentMessages]);

  return (
    <div className="flex flex-col flex-1 h-full min-w-0">

      {/* Chat Header */}
      <div
        className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
        style={{
          background: "rgba(10,8,20,0.8)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <button
          onClick={onToggleSidebar}
          className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
        >
          <Icon name={sidebarOpen ? "PanelLeftClose" : "PanelLeftOpen"} size={18} />
        </button>

        <div className="relative">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-br ${currentContact.color}`}>
            {currentContact.avatar}
          </div>
          {currentContact.online && (
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400" style={{ border: "2px solid hsl(240 13% 5%)" }} />
          )}
        </div>

        <div className="flex-1">
          <div className="font-semibold text-white/95 text-sm">{currentContact.name}</div>
          <div className="text-xs" style={{ color: currentContact.online ? "#34d399" : "rgba(255,255,255,0.3)" }}>
            {currentContact.typing
              ? <span style={{ color: "#a78bfa" }}>печатает...</span>
              : currentContact.online ? "в сети" : "был(а) недавно"
            }
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[
            { icon: "Phone" },
            { icon: "Video" },
            { icon: "Search" },
            { icon: "MoreVertical" },
          ].map(btn => (
            <button
              key={btn.icon}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
            >
              <Icon name={btn.icon} size={17} />
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 space-y-2"
        style={{ background: "hsl(240 13% 5%)" }}
      >
        <div className="flex items-center gap-3 py-2">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
          <span
            className="text-[11px] px-3 py-1 rounded-full"
            style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.3)" }}
          >
            Сегодня
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
        </div>

        {currentMessages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex ${msg.out ? "justify-end" : "justify-start"} animate-fade-in`}
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div className="max-w-[68%] relative group">
              <div className={`px-4 py-2.5 text-sm leading-relaxed ${msg.out ? "msg-bubble-out text-white" : "msg-bubble-in text-white/90"}`}>
                {msg.text}
                <div className={`flex items-center gap-1 mt-1 ${msg.out ? "justify-end" : "justify-start"}`}>
                  <span className="text-[10px] opacity-50">{msg.time}</span>
                  {msg.out && (
                    <Icon
                      name={msg.read ? "CheckCheck" : "Check"}
                      size={11}
                      className={msg.read ? "text-violet-300" : "text-white/40"}
                    />
                  )}
                </div>
              </div>

              {msg.reactions && msg.reactions.length > 0 && (
                <div className={`absolute -bottom-3 ${msg.out ? "right-2" : "left-2"} flex gap-0.5 animate-pop`}>
                  {msg.reactions.map((r, ri) => (
                    <div
                      key={ri}
                      className="text-xs px-1.5 py-0.5 rounded-full"
                      style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(124,58,237,0.4)" }}
                    >
                      {r}
                    </div>
                  ))}
                </div>
              )}

              <div className={`absolute top-1/2 -translate-y-1/2 ${msg.out ? "-left-8" : "-right-8"} opacity-0 group-hover:opacity-100 transition-all`}>
                <button className="w-6 h-6 rounded-lg flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/10">
                  <Icon name="Smile" size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}

        {currentContact.typing && (
          <div className="flex justify-start animate-fade-in">
            <div className="msg-bubble-in px-4 py-3 flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="typing-dot w-2 h-2 rounded-full bg-violet-400" />
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        className="px-4 py-3 flex-shrink-0"
        style={{
          background: "rgba(10,8,20,0.9)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {showEmojiPanel && (
          <div
            className="mb-2 p-3 rounded-2xl flex flex-wrap gap-2 animate-slide-up"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {EMOJIS.map(e => (
              <button
                key={e}
                onClick={() => onEmojiPick(e)}
                className="text-xl hover:scale-125 transition-transform"
              >
                {e}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-end gap-2">
          <button className="w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all pb-0.5">
            <Icon name="Paperclip" size={18} />
          </button>

          <div
            className="flex-1 flex items-end gap-2 px-4 py-2.5 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
          >
            <textarea
              value={inputText}
              onChange={e => onInputChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Написать сообщение..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-white/90 placeholder-white/25 outline-none resize-none max-h-32 leading-relaxed"
              style={{ fontFamily: "'Golos Text', sans-serif" }}
            />
            <button
              onClick={onToggleEmoji}
              className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${showEmojiPanel ? "text-violet-400" : "text-white/30 hover:text-white/70"}`}
            >
              <Icon name="Smile" size={17} />
            </button>
          </div>

          <button
            onClick={onSendMessage}
            className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all flex-shrink-0 hover:scale-105 active:scale-95"
            style={{
              background: inputText.trim()
                ? "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)"
                : "rgba(255,255,255,0.06)",
              border: inputText.trim() ? "none" : "1px solid rgba(255,255,255,0.09)",
              boxShadow: inputText.trim() ? "0 0 20px rgba(124,58,237,0.4)" : "none",
            }}
          >
            <Icon
              name={inputText.trim() ? "Send" : "Mic"}
              size={17}
              className={inputText.trim() ? "text-white" : "text-white/40"}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
