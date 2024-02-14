import Image from "next/image";
import InputEmoji from "react-input-emoji";
import moment from "moment";
import useChat from "@/hooks/chat/useChat";

const Chat = () => {
  const {
    loading,
    message,
    messages,
    conversations,
    currentChat,
    user,
    scrollRef,
    setMessage,
    handleSendClick,
    handleImageChange,
    handleConvoClick,
  } = useChat();

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 text-white">Chat</h2>
      <div className="flex gap-5">
        <div
          className={`h-[calc(100vh-150px)] overflow-y-auto ${
            currentChat ? " w-[20%]" : "w-[80%]"
          } flex flex-col gap-2 transition-all duration-300`}
        >
          {loading ? (
            <p className="text-white font-bold my-2 p-4">Loading....</p>
          ) : conversations.length === 0 ? (
            <p className="text-white font-bold my-2 p-4">
              No conversations to show
            </p>
          ) : (
            conversations?.map((conversation) => (
              <div
                className={`p-3 border-[1px] border-white ${
                  currentChat?._id === conversation._id
                    ? "bg-white/[.30]"
                    : "bg-transparent"
                } rounded-lg cursor-pointer`}
                onClick={() => handleConvoClick(conversation)}
              >
                <p className="text-base font-bold text-white">
                  {user && conversation.members && (
                    <>
                      {
                        conversation?.members.filter(
                          (member) => member._id !== user._id
                        )[0].fullName
                      }
                    </>
                  )}
                </p>
              </div>
            ))
          )}
        </div>
        {currentChat && (
          <div className="flex flex-col justify-between bg-transparent border border-white/[.20] rounded-lg shadow-md w-full">
            {loading ? (
              <p className="text-white font-bold my-2">Loading....</p>
            ) : messages.length === 0 ? (
              <p className="text-white font-bold my-2 p-4">No chats to show</p>
            ) : (
              <div className="h-[calc(100vh-190px)] overflow-y-auto p-4 ">
                {messages?.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex w-full ${
                      msg.senderId === user?._id
                        ? "flex-row"
                        : "flex-row-reverse"
                    }   mb-2`}
                    ref={scrollRef}
                  >
                    <div
                      className={`flex flex-col w-[400px] ${
                        msg.senderId === user?._id
                          ? `bg-purple-500`
                          : `bg-gray-200`
                      }  rounded-md p-2 `}
                    >
                      <span className="flex flex-col w-fit justify-start">
                        {msg.image && (
                          <Image
                            src={msg.image}
                            alt="Sent"
                            width={40}
                            height={40}
                            className="w-[50%] max-w-[70%] h-full max-h-72 object-fit rounded mt-2"
                          />
                        )}
                        <p
                          className={`w-fit ${
                            msg.senderId === user?._id
                              ? "text-white"
                              : "text-black/[.80]"
                          }`}
                        >
                          {msg.text}
                        </p>
                      </span>
                      <p
                        className={`text-xs text-end ${
                          msg.senderId === user?._id
                            ? "text-white/[.70]"
                            : "text-gray-500"
                        }`}
                      >
                        {moment(msg.createdAt).format("MMM DD, YY hh:mm A")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="p-4">
              <div
                tabIndex={0}
                className="flex items-center bg-[#2f2f2f] rounded-lg p-1"
              >
                <InputEmoji
                  value={message}
                  onChange={setMessage}
                  cleanOnEnter
                  onEnter={handleSendClick}
                  placeholder="Type a message..."
                />
                <label htmlFor="imageUpload" className="cursor-pointer mr-2">
                  <p className="text-2xl flex items-center justify-center border-gray-500 text-gray-500 border-2 rounded-full w-6 h-6">
                    +
                  </p>
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </label>
                <button
                  onClick={handleSendClick}
                  className="bg-purple-500 text-white px-4 py-2 rounded-md hover:opacity-70 transition duration-300"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
