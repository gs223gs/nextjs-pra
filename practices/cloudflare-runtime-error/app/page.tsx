"use client";

import { useState } from "react";

export default function Home() {
  const [getResponse, setGetResponse] = useState<string>("");
  const [postResponse, setPostResponse] = useState<string>("");
  const [inputData, setInputData] = useState<string>("");

  const handleGetRequest = async () => {
    try {
      const response = await fetch("/api/hello");
      const data = await response.json();
      setGetResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setGetResponse(`Error: ${error}`);
    }
  };

  const handlePostRequest = async () => {
    try {
      const response = await fetch("/api/hello", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputData }),
      });
      const data = await response.json();
      setPostResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      setPostResponse(`Error: ${error}`);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">API Route Test</h1>
        
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">GET Request</h2>
            <button
              onClick={handleGetRequest}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Send GET Request
            </button>
            {getResponse && (
              <pre className="p-4 bg-gray-100 rounded text-sm overflow-auto">
                {getResponse}
              </pre>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold">POST Request</h2>
            <input
              type="text"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              placeholder="Enter data to send"
              className="px-3 py-2 border rounded"
            />
            <button
              onClick={handlePostRequest}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Send POST Request
            </button>
            {postResponse && (
              <pre className="p-4 bg-gray-100 rounded text-sm overflow-auto">
                {postResponse}
              </pre>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
