import { useState } from "react";
import { CONTACTS, MESSAGES_MAP, Tab } from "@/components/messenger/types";
import Sidebar from "@/components/messenger/Sidebar";
import ChatArea from "@/components/messenger/ChatArea";
import RightPanel from "@/components/messenger/RightPanel";

export default function Index() {
  const [activeChat, setActiveChat] = useState(1);
  const [activeTab, setActiveTab] = useState<Tab>("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState(MESSAGES_MAP);
  const [showEmojiPanel, setShowEmojiPanel] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
      <Sidebar
        sidebarOpen={sidebarOpen}
        activeChat={activeChat}
        activeTab={activeTab}
        searchQuery={searchQuery}
        filteredContacts={filteredContacts}
        onSelectChat={setActiveChat}
        onTabChange={setActiveTab}
        onSearchChange={setSearchQuery}
      />
      <ChatArea
        sidebarOpen={sidebarOpen}
        currentContact={currentContact}
        currentMessages={currentMessages}
        inputText={inputText}
        showEmojiPanel={showEmojiPanel}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onInputChange={setInputText}
        onSendMessage={sendMessage}
        onToggleEmoji={() => setShowEmojiPanel(!showEmojiPanel)}
        onEmojiPick={e => setInputText(prev => prev + e)}
        onKeyDown={handleKey}
      />
      <RightPanel
        currentContact={currentContact}
        currentMessages={currentMessages}
      />
    </div>
  );
}
