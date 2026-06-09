export type Tab = "chats" | "channels" | "contacts";

export interface Contact {
  id: number;
  name: string;
  avatar: string;
  color: string;
  lastMsg: string;
  time: string;
  unread: number;
  online: boolean;
  typing: boolean;
  isGroup?: boolean;
}

export interface Message {
  id: number;
  text: string;
  out: boolean;
  time: string;
  read: boolean;
  reactions?: string[];
}

export const CONTACTS: Contact[] = [
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

export const MESSAGES_MAP: Record<number, Message[]> = {
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
