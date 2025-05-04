import { ChatIcon } from "../icons/ChatIcon";

export const Home = (props) => {
  // const [bot, setBot] = useState<boolean>(false);
  return (
    <div className="w-screen h-screen bg-black pt-20 flex font-mono">
      <div className="m-auto p-6 border w-150 rounded border-zinc-800 flex justify-center flex-col">
        <div className="text-gray-50 flex items-center text-4xl gap-3">
          <ChatIcon size={"size-10"} />
          ChatterSphere
        </div>
        <p className="text-gray-500 mt-1 text-xl ml-1">
          Connect, Chat, Collaborate
        </p>
        <div className="mt-5 flex justify-center">
          <button
            onClick={props.createRoom}
            className="bg-gray-50 w-full text-2xl font-bold py-2.5 cursor-pointer hover:bg-gray-300 transition-all duration-150"
          >
            Create Room
          </button>
        </div>
        <div className="flex justify-center items-center mt-4 gap-4">
          <input
            ref={props.usernameRef}
            className="text-gray-400 w-full border p-2.5 text-xl"
            type="text"
            placeholder="usernames"
          />
          <input
            ref={props.reference}
            className="text-gray-400 w-full border p-2.5 text-xl"
            type="text"
            placeholder="Enter Room Id"
          />
          <button
            onClick={props.joinRoom}
            className="bg-gray-50 text-2xl font-bold py-2 px-4 cursor-pointer hover:bg-gray-300 transition-all duration-150"
          >
            Join
          </button>
        </div>

        {props.roomStatus && (
          <div className="bg-gray-200 mt-4 flex flex-col items-center py-2">
            <div className="text-xl font-bold">Room Id</div>
            <div className="text-2xl font-bold">{props.roomId}</div>
          </div>
        )}
      </div>
    </div>
  );
};
