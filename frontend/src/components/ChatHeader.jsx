import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { XIcon } from "lucide-react";

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    const handelEscKey = (e) => {
      if (e.key === "Escape") {
        setSelectedUser(null);
      }
    };

    return () => window.addEventListener("keydown", handelEscKey);
  }, [setSelectedUser]);

  return (
    <div className="flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 max-h-[84px] px-6 flex-1">
      <div className="flex items-center space-x-3">
        <div className="avatar online">
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium text-slate-200">
            {selectedUser.fullName}
          </h3>
          <p className="text-sm text-slate-400">Online</p>
        </div>
      </div>
      <button
        onClick={() => {
          setSelectedUser(null);
        }}
      >
        <XIcon className="text-slate-400 w-5 h-5 hover:text-slate-200 transition-colors cursor-pointer" />
      </button>
    </div>
  );
}
