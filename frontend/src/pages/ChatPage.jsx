import { useAuthStore } from "../store/useAuthStore.js";

export default function ChatPage() {
  const { logout } = useAuthStore();

  return (
    <div className="z-10">
      ChatPage
      <button onClick={logout}>Logout</button>
    </div>
  );
}
