import { useEffect, useRef, useState } from "react";

const userId = Math.floor(Math.random() * 100);

type Chat = {
  message: string;
  votes: number;
  chatId: string;
};

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [incomingMsg, setIncomingMsg] = useState<Chat[] | []>([]);
  const [outgoingMsg, setOutgoingMsg] = useState<Chat[] | []>([]);
  const chatRef = useRef<HTMLInputElement>(null);

  const sendMsg = () => {
    if (chatRef.current) {
      const chat = chatRef.current.value;
      if (!chat) return;
      setOutgoingMsg((outgoingMsg) => [
        ...outgoingMsg,
        { message: chat, votes: 0, chatId: "abc" },
      ]);
      sendChat(chat);
      chatRef.current.value = "";
    }
  };

  function sendChat(message: string) {
    socket?.send(
      JSON.stringify({
        type: "SEND_MESSAGE",
        payload: {
          message,
          userId: userId,
          roomId: "3",
        },
      })
    );
  }

  function sendUpvote(chatId: string) {
    socket?.send(
      JSON.stringify({
        type: "UPVOTE_MESSAGFE",
        payload: {
          userId: userId,
          roomId: "3",
          chatId,
        },
      })
    );
  }

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080", "echo-protocol");
    setSocket(ws);

    ws.onopen = function () {
      ws.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          payload: {
            name: "Arslan",
            userId,
            roomId: "3",
          },
        })
      );

      ws.onmessage = function (event) {
        try {
          const { payload, type } = JSON.parse(event.data);
          if (type === "ADD_CHAT") {
            setIncomingMsg((incomingMsg) => [
              ...incomingMsg,
              {
                message: payload.message,
                votes: payload.upvotes,
                chatId: payload.chatId,
              },
            ]);
          }

          if (type === "UPDATE_CHAT") {
            setIncomingMsg(
              incomingMsg.map((chat) => {
                if (chat.chatId === payload.chatId) {
                  return {
                    ...chat,
                    votes: payload.upvotes,
                  };
                }
                return chat;
              })
            );
          }
        } catch (error) {}
      };
    };

    return () => {
      ws.close;
    };
  }, []);
  return (
    <>
      <div className="grid grid-cols-3 min-h-screen">
        <div className="m-3 rounded border-dashed border-2 border-indigo-300 grid">
          <div className="rounded border-dotted border-2 border-indigo-300 mx-auto mt-2 h-fit font-semibold text-2xl grid grid-cols-2 w-fit">
            Chat
          </div>
          <div className="w-auto h-auto">
            {incomingMsg.map((chat, i) => {
              return (
                <div className="grid px-2" key={i}>
                  <div className="flex gap-2.5">
                    <div className="grid">
                      <div className="w-max grid">
                        <div className="px-3.5 py-2 bg-gray-100 rounded justify-start items-center gap-3 inline-flex">
                          <h5 className="text-gray-900 text-sm font-normal leading-snug">
                            {chat.message}
                          </h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            {outgoingMsg.map((chat, i) => {
              return (
                <div className="flex justify-end pb-40 px-2">
                  <div className="" key={i}>
                    <div className="grid mb-2">
                      <div className="px-3 py-2 bg-indigo-600 rounded">
                        <h2 className="text-white text-sm font-normal leading-snug">
                          {chat.message}
                        </h2>
                      </div>
                    </div>
                    <div className="justify-center">
                      <div className="grid w-fit ml-auto">
                        <div className="justify-start items-center inline-flex">
                          <h3 className="text-gray-500 text-xs font-normal leading-4 py-1">
                            You
                          </h3>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full pl-1 rounded-3xl border border-gray-200 items-center inline-flex justify-between h-9">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
              ></svg>
              <input
                className="grow shrink basis-0 text-black text-xs font-medium leading-4 focus:outline-none"
                placeholder="Type here..."
                ref={chatRef}
              />
            </div>
            <div className="flex items-center">
              <svg
                className="cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                viewBox="0 0 22 22"
                fill="none"
              ></svg>
              <button
                className="items-center flex px-3 py-2 bg-indigo-600 rounded-full shadow "
                onClick={sendMsg}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  <g id="Send 01">
                    <path
                      id="icon"
                      d="M9.04071 6.959L6.54227 9.45744M6.89902 10.0724L7.03391 10.3054C8.31034 12.5102 8.94855 13.6125 9.80584 13.5252C10.6631 13.4379 11.0659 12.2295 11.8715 9.81261L13.0272 6.34566C13.7631 4.13794 14.1311 3.03408 13.5484 2.45139C12.9657 1.8687 11.8618 2.23666 9.65409 2.97257L6.18714 4.12822C3.77029 4.93383 2.56187 5.33664 2.47454 6.19392C2.38721 7.0512 3.48957 7.68941 5.69431 8.96584L5.92731 9.10074C6.23326 9.27786 6.38623 9.36643 6.50978 9.48998C6.63333 9.61352 6.72189 9.7665 6.89902 10.0724Z"
                      stroke="white"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </g>
                </svg>
                <h3 className="text-white text-xs font-semibold leading-4 px-2">
                  Send
                </h3>
              </button>
            </div>
          </div>
        </div>
        <div className="m-3 rounded border-dashed border-2 border-indigo-300 grid">
          <div className="rounded border-dotted border-2 border-indigo-300 mx-auto mt-2 h-fit px-4 font-semibold text-2xl">
            Upvoted
          </div>
        </div>
        <div className="m-3 rounded border-dashed border-2 border-indigo-300 grid">
          <div className="rounded border-dotted border-2 border-indigo-300 mx-auto mt-2 h-fit px-4 font-semibold text-2xl">
            Most Upvoted
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
