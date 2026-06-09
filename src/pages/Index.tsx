import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";

const CONTACTS = [
  {
    id: 1,
    name: "Алекс Волков",
    avatar: "АВ",
    color: "from-violet-500 to-purple-700",
    lastMsg: "Увидимся завтра на встрече!",
    time: "21:34",
    unread: 3,
    online: true,
    typing: false,
  },
  {
    id: 2,
    name: "Дизайн-команда",
    avatar: "🎨",
    color: "from-pink-500 to-rose-600",
    lastMsg: "Новый макет уже в Figma",
    time: "20:15",
    unread: 12,
    online: false,
    isGroup: true,
    typing: true,
  },
  {
    id: 3,
    name: "Мария Сотова",
    avatar: "МС",
    color: "from-sky-400 to-blue-600",
    lastMsg: "Отправила файлы на почту",
    time: "18:50",
    unread: 0,
    online: true,
    typing: false,
  },
  {
    id: 4,
    name: "Стартап-чат",
    avatar: "🚀",
    color: "from-orange-400 to-amber-600",
    lastMsg: "Инвесторы готовы к звонку",
    time: "17:22",
    unread: 5,
    online: false,
    isGroup: true,
    typing: false,
  },
  {
    id: 5,
    name: "Никита Громов",
    avatar: "НГ",
    color: "from-emerald-400 to-teal-600",
    lastMsg: "👍",
    time: "16:44",
    unread: 0,
    online: false,
    typing: false,
  },
  {
    id: 6,
    name: "Анна Климова",
    avatar: "АК",
    color: "from-fuchsia-500 to-pink-600",
    lastMsg: "Спасибо за помощь!",
    time: "15:30",
    unread: 1,
    online: true,
    typing: false,
  },
  {
    id: 7,
    name: "Продукт-команда",
    avatar: "💡",
    color: "from-indigo-400 to-violet-600",
    lastMsg: "Бэклог обновлён",
    time: "14:00",
    unread: 0,
    online: false,
    isGroup: true,
    typing: false,
  },
];

const MESSAGES_MAP: Record<number, { id: number; text: string; out: boolean; time: string; read: boolean; reactions?: string[] }[]> = {
  1: [
    { id: 1, text: "Привет! Как дела с проектом?", out: false, time: "21:10", read: true },
    { id: 2, text: "Всё идёт по плану, закончим к пятнице 🔥", out: true, time: "21:12", read: true },
    { id: 3, text: "Отлично! Клиент будет доволен", out: false, time: "21:15", read: true },
    { id: 4, text: "Надеюсь 😄 Кстати отправил тебе дизайн для ревью", out: true, time: "21:20", read: true },
    { id: 5, text: "Посмотрел — выглядит круто! Пара небольших правок и будет идеал", out: false, time: "21:25", read: true, reactions: ["👍", "🔥"] },
    { id: 6, text: "Увидимся завтра на встрече!", out: false, time: "21:34", read: false },
  ],
  2: [
    { id: 1, text: "Коллеги, апдейт по проекту", out: false, time: "19:50", read: true },
    { id: 2, text: "Новый макет уже в Figma, посмотрите", out: false, time: "20:15", read: true },
  ],
  3: [
    { id: 1, text: "Мария, можешь прислать документы?", out: true, time: "18:30", read: true },
    { id: 2, text: "Конечно, уже готовлю", out: false, time: "18:40", read: true },
    { id: 3, text: "Отправила файлы на почту", out: false, time: "18:50", read: true },
  ],
  4: [
    { id: 1, text: "Всем привет! Большие новости 🎉", out: false, time: "17:00", read: true },
    { id: 2, text: "Инвесторы готовы к звонку на следующей неделе", out: false, time: "17:22", read: true },
  ],
  5: [
    { id: 1, text: "Никит, всё ок с задачами?", out: true, time: "16:40", read: true },
    { id: 2, text: "👍", out: false, time: "16:44", read: true },
  ],
  6: [
    { id: 1, text: "Аня, помогла разобраться с контрактом", out: true, time: "15:20", read: true },
    { id: 2, text: "Спасибо за помощь!", out: false, time: "15:30", read: false },
  ],
  7: [
    { id: 1, text: "Команда, бэклог обновлён на Q3", out: false, time: "14:00", read: true },
  ],
};

type Tab = "chats" | "channels" | "contacts";

export default function Index() {
  const [activeChat, setActiveChat] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState(MESSAGES_MAP);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const emojis = ["😀","😂","🥰","😎","🤩","🔥","👍","❤️","🎉","💯","👀","🚀","✨","🌟","💬","🤝"];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeChat, messages]);

  const currentContact = CONTACTS.find(c => c.id === activeChat)!;
  const currentMessages = messages[activeChat] || [];
  const filteredContacts = CONTACTS.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sendMessage = () => {
    if (!inputText.trim()) return;
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, "0")}`;
    setMessages(prev => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), {
        id: Date.now(),
        text: inputText,
        out: true,
        time,
        read: false,
      }]
    }));
    setInputText("");
    setShowEmojiPanel(false);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden" style={{ background: "hsl(240 15% 5%)" }}>

      {/* Sidebar */}
      <div
        className={`flex flex-col h-full transition-all duration-300 ease-in-out flex-shrink-0 ${sidebarOpen ? "w-80" : "w-0 overflow-hidden"}`}
        style={{ background: "hsl(240 15% 7%)", borderRight: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #7c3aed 0%, #ec4899 100%)" }}
            >
              <Icon name="Zap" size={16} className="text-white" />
            </div>
            <span className="font-bold text-lg gradient-text">NovaMSG</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all">
              <Icon name="PenSquare" size={16} />
            </button>
            <button className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all">
              <Icon name="Settings" size={16} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 mb-3">
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-2xl"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <Icon name="Search" size={15} className="text-white/30" />
            <input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm text-white/80 placeholder-white/25 outline-none flex-1"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-3 mb-3">
          {([
            { id: "chats", label: "Чаты", icon: "MessageCircle" },
            { id: "channels", label: "Каналы", icon: "Radio" },
            { id: "contacts", label: "Люди", icon: "Users" },
          ] as { id: Tab; label: string; icon: string }[]).map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                activeTab === tab.id ? "text-white" : "text-white/35 hover:text-white/60"
              }`}
              style={activeTab === tab.id ? {
                background: "linear-gradient(135deg, rgba(124,58,237,0.3) 0%, rgba(236,72,153,0.2) 100%)",
                border: "1px solid rgba(124,58,237,0.3)"
              } : {}}
            >
              <Icon name={tab.icon} size={13} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-0.5">
          {filteredContacts.map((contact, i) => (
            <button
              key={contact.id}
              onClick={() => setActiveChat(contact.id)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all hover-scale text-left animate-fade-in"
              style={{
                animationDelay: `${i * 40}ms`,
                background: activeChat === contact.id
                  ? "linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(236,72,153,0.12) 100%)"
                  : "transparent",
                border: activeChat === contact.id
                  ? "1px solid rgba(124,58,237,0.25)"
                  : "1px solid transparent",
              }}
            >
              <div className="relative flex-shrink-0">
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white font-semibold text-sm bg-gradient-to-br ${contact.color}`}>
                  {contact.avatar}
                </div>
                {contact.online && (
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 pulse-online"
                    style={{ border: "2px solid hsl(240 15% 7%)" }}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5">
                  <span className="font-semibold text-sm text-white/90 truncate">{contact.name}</span>
                  <span className="text-[11px] text-white/30 flex-shrink-0 ml-1">{contact.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  {contact.typing ? (
                    <div className="flex items-center gap-1">
                      <span className="text-xs" style={{ color: "#a78bfa" }}>печатает</span>
                      <div className="flex gap-0.5">
                        {[0,1,2].map(j => (
                          <div key={j} className="typing-dot w-1 h-1 rounded-full bg-violet-400" />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-white/35 truncate">{contact.lastMsg}</span>
                  )}
                  {contact.unread > 0 && (
                    <div
                      className="flex-shrink-0 ml-1 min-w-[20px] h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white px-1.5"
                      style={{ background: "linear-gradient(135deg, #7c3aed, #ec4899)" }}
                    >
                      {contact.unread > 99 ? "99+" : contact.unread}
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom Nav */}
        <div
          className="flex items-center justify-around p-3 mx-3 mb-3 rounded-2xl"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[
            { icon: "MessageCircle", label: "Чаты" },
            { icon: "Phone", label: "Звонки" },
            { icon: "Bookmark", label: "Сохранённые" },
            { icon: "User", label: "Профиль" },
          ].map(item => (
            <button key={item.icon} className="flex flex-col items-center gap-0.5 text-white/30 hover:text-white/80 transition-all p-1.5 rounded-xl hover:bg-white/5">
              <Icon name={item.icon} size={18} />
              <span className="text-[9px]">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
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
            onClick={() => setSidebarOpen(!sidebarOpen)}
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
                {[0,1,2].map(i => (
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
              {emojis.map(e => (
                <button
                  key={e}
                  onClick={() => setInputText(prev => prev + e)}
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
                onChange={e => setInputText(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Написать сообщение..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-white/90 placeholder-white/25 outline-none resize-none max-h-32 leading-relaxed"
                style={{ fontFamily: "'Golos Text', sans-serif" }}
              />
              <button
                onClick={() => setShowEmojiPanel(!showEmojiPanel)}
                className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${showEmojiPanel ? "text-violet-400" : "text-white/30 hover:text-white/70"}`}
              >
                <Icon name="Smile" size={17} />
              </button>
            </div>

            <button
              onClick={sendMessage}
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

      {/* Right Panel */}
      <div
        className="hidden xl:flex flex-col w-72 h-full flex-shrink-0"
        style={{ background: "hsl(240 15% 7%)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex flex-col items-center pt-8 pb-5 px-4">
          <div
            className={`w-20 h-20 rounded-3xl flex items-center justify-center text-3xl font-bold text-white bg-gradient-to-br ${currentContact.color} mb-3`}
            style={{ boxShadow: "0 8px 32px rgba(124,58,237,0.3)" }}
          >
            {currentContact.avatar}
          </div>
          <div className="font-bold text-white text-lg text-center">{currentContact.name}</div>
          <div className="text-xs mt-1" style={{ color: currentContact.online ? "#34d399" : "rgba(255,255,255,0.3)" }}>
            {currentContact.online ? "в сети" : "был(а) недавно"}
          </div>

          <div className="flex gap-2 mt-4">
            {[
              { icon: "Phone", label: "Позвонить" },
              { icon: "Video", label: "Видео" },
              { icon: "Bell", label: "Уведомления" },
            ].map(a => (
              <button
                key={a.icon}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl transition-all hover:bg-white/5"
                title={a.label}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(124,58,237,0.3)" }}
                >
                  <Icon name={a.icon} size={16} className="text-violet-400" />
                </div>
                <span className="text-[10px] text-white/40">{a.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px mx-4" style={{ background: "rgba(255,255,255,0.06)" }} />

        <div className="px-4 py-4 space-y-2">
          {[
            { label: "Сообщений", value: currentMessages.length, icon: "MessageCircle" },
            { label: "Медиафайлов", value: 24, icon: "Image" },
            { label: "Ссылок", value: 7, icon: "Link" },
          ].map(stat => (
            <div
              key={stat.label}
              className="flex items-center gap-3 px-3 py-2.5 rounded-2xl transition-all cursor-pointer hover:bg-white/3"
              style={{ border: "1px solid rgba(255,255,255,0.05)" }}
            >
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "rgba(124,58,237,0.15)" }}
              >
                <Icon name={stat.icon} size={14} className="text-violet-400" />
              </div>
              <span className="text-sm text-white/60 flex-1">{stat.label}</span>
              <span className="text-sm font-semibold text-white/80">{stat.value}</span>
            </div>
          ))}
        </div>

        <div className="h-px mx-4" style={{ background: "rgba(255,255,255,0.06)" }} />

        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-white/50 uppercase tracking-wider">Медиа</span>
            <button className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Все</button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              "from-violet-600 to-purple-800",
              "from-pink-500 to-rose-700",
              "from-sky-500 to-blue-700",
              "from-amber-500 to-orange-700",
              "from-teal-500 to-emerald-700",
              "from-fuchsia-500 to-pink-700",
            ].map((g, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl bg-gradient-to-br ${g} cursor-pointer hover:scale-105 transition-transform opacity-80 hover:opacity-100`}
              />
            ))}
          </div>
        </div>

        <div className="flex-1" />

        <div className="px-4 pb-4 space-y-1">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/30 hover:text-amber-400 hover:bg-amber-400/5 transition-all">
            <Icon name="BellOff" size={15} />
            Отключить уведомления
          </button>
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm text-white/30 hover:text-red-400 hover:bg-red-400/5 transition-all">
            <Icon name="Ban" size={15} />
            Заблокировать
          </button>
        </div>
      </div>
    </div>
  );
}
