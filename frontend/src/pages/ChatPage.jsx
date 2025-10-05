import { useChatStore } from "../store/useChatStore.js";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer.jsx";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ActiveTabSwitch from "../components/ActiveTabSwitch.jsx";
import ChatsList from "../components/ChatsList.jsx";
import ContactList from "../components/ContactList.jsx";
import ChatContainer from "../components/ChatContainer.jsx";
import NoConversationPlaceholder from "../components/NoConversationPlaceholder.jsx";

export default function ChatPage() {
  const { activeTab, selectedUser } = useChatStore();

  return (
    <div className="relative w-full max-w-6xl h-full min-h-[calc(100vh-2rem)]">
      <BorderAnimatedContainer>
        <div className="flex h-full w-full">
          <div
            className={`${
              selectedUser ? "hidden md:flex md:flex-col" : "flex flex-col"
            } w-full md:w-80 bg-slate-800/50 backdrop-blur-sm md:border-r md:border-slate-700/50`}
          >
            <ProfileHeader />
            <ActiveTabSwitch />

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {activeTab === "chats" ? <ChatsList /> : <ContactList />}
            </div>
          </div>

          <div
            className={`${
              selectedUser ? "flex flex-col" : "hidden md:flex md:flex-col"
            } flex-1 bg-slate-900/50 backdrop-blur-sm`}
          >
            {selectedUser ? <ChatContainer /> : <NoConversationPlaceholder />}
          </div>
        </div>
      </BorderAnimatedContainer>
    </div>
  );
}
