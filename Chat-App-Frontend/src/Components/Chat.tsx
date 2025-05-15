import { useEffect, useRef } from "react";
import { ChatIcon } from "../icons/ChatIcon";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Chat = (props: any) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    autoScroll();
  }, [props.isTyping.status]);

  const autoScroll = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="bg-black h-screen pt-1 flex font-mono">
      <div className="m-auto p-6 border w-150 rounded border-zinc-800 flex justify-center flex-col">
        <div className="text-gray-50 flex items-center text-4xl gap-3">
          <ChatIcon size={"size-10"} />
          ChatterSphere
        </div>
        <p className="text-gray-500 mt-1 text-xl ml-1">
          Connect, Chat, Collaborate
        </p>
        <div className="border border-zinc-800 mt-3 flex flex-col justify-between">
          <div
            ref={scrollRef}
            className="h-90 w-full flex flex-col overflow-auto scroll-smooth"
          >
            {props.messages.map(
              (message: { username: string; message: string }) => {
                return (
                  <>
                    <p
                      className={`p-2 rounded-lg m-2 flex flex-col max-w-95 ${
                        message.username == localStorage.getItem("username")
                          ? "self-end bg-blue-500"
                          : "self-start bg-gray-500"
                      } text-white translate-y-[10px] animate-move-up`}
                    >
                      {" "}
                      <i className="text-sm text-gray-950">
                        {message.username}
                      </i>
                      <span>{message.message}</span>
                    </p>
                  </>
                );
              }
            )}
            {props.isTyping.status &&
              props.isTyping.username !== localStorage.getItem("username") && (
                <p className="p-2 rounded-lg m-2 flex flex-col max-w-95 text-white self-start bg-gray-500">
                  <i className="text-sm text-gray-950">
                    {props.isTyping.username}
                  </i>
                  Typing...
                </p>
              )}
          </div>
          <div className="mt-4 gap-4 flex w-full">
            <input
              ref={props.reference}
              className="text-gray-400 w-full border p-2.5 text-xl"
              type="text"
              placeholder="Enter message"
              onChange={props.Typing}
            />
            <button
              onClick={() => {
                props.sendChat();
                autoScroll();
              }}
              className="bg-gray-50 text-2xl font-bold py-2 px-4 cursor-pointer hover:bg-gray-300 transition-all duration-150"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
