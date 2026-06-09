import Icon from "@/components/ui/icon";
import { Contact, Message } from "./types";

interface RightPanelProps {
  currentContact: Contact;
  currentMessages: Message[];
}

export default function RightPanel({ currentContact, currentMessages }: RightPanelProps) {
  return (
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
  );
}
