import { useEffect, useRef, useState } from "react";

export default function AutoScrollDiv() {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);

  const scrollRef = useRef<HTMLDivElement>(null);

  // Function to auto-scroll to the bottom
  

  useEffect(() => {
    scrollToBottom(); // Auto-scroll on component mount & content updates
  }, [items]);

  return (
    <div className="flex flex-col items-center p-4">
      {/* Scrollable Div */}
      <div
        ref={scrollRef}
        className="w-64 h-40 overflow-auto border p-2 space-y-2"
      >
        {items.map((item, index) => (
          <div key={index} className="bg-gray-200 p-2 rounded">
            {item}
          </div>
        ))}
      </div>

      {/* Button to Add Content */}
      <button
        onClick={() => setItems([...items, `New Item ${items.length + 1}`])}
        className="mt-2 p-2 bg-blue-500 text-white rounded"
      >
        Add More Content
      </button>
    </div>
  );
}
