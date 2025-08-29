// ChatRoom.jsx
function ChatRoom({ user }) {
  return (
    <div>
      <h2 className="text-lg font-semibold">
        Welcome {user?.displayName || "Anonymous"}
      </h2>
      {/* Chat messages UI will go here */}
    </div>
  );
}

export default ChatRoom;
