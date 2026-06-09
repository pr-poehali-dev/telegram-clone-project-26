import Icon from "@/components/ui/icon";
import { Contact, Tab } from "./types";

interface SidebarProps {
  sidebarOpen: boolean;
  activeChat: number;
  activeTab: Tab;
  searchQuery: string;
  filteredContacts: Contact[];
  onSelectChat: (id: number) => void;
  onTabChange: (tab: Tab) => void;
  onSearchChange: (q: string) => void;
}

export default function Sidebar({
  sidebarOpen,
  activeChat,
  activeTab,
  searchQuery,
  filteredContacts,
  onSelectChat,
  onTabChange,
  onSearchChange,
}: SidebarProps) {
  return (
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
            onChange={e => onSearchChange(e.target.value)}
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
            onClick={() => onTabChange(tab.id)}
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
            onClick={() => onSelectChat(contact.id)}
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
                      {[0, 1, 2].map(j => (
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
  );
}
