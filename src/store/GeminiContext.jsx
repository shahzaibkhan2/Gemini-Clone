import { createContext, useState } from "react";
import runChat from "../config/GeminiApi";

export const GeminiContext = createContext();

const GeminiContextProvider = ({ children }) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayParagraph = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prevWord) => prevWord + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;
    if (prompt !== undefined) {
      response = await runChat(prompt);
      setRecentPrompt(prompt);
    } else {
      setPrevPrompts((prev) => [...prev, input]);
      setRecentPrompt(input);
      response = await runChat(input);
    }
    let responseArray = response.split("**");
    let newResponse = "";

    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i];
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>";
      }
    }

    let finalResponse = newResponse.split("*").join("</br>");
    let delayFinalResponse = finalResponse.split(" ");
    for (let i = 0; i < delayFinalResponse.length; i++) {
      const nextWord = delayFinalResponse[i];
      delayParagraph(i, nextWord + " ");
    }
    setLoading(false);
    setInput("");
  };

  const handleonEnter = async (event) => {
    if (event.key === "Enter") {
      onSent(input);
      setInput("");
    }
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    recentPrompt,
    setRecentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
    handleonEnter,
  };

  return (
    <GeminiContext.Provider value={contextValue}>
      {children}
    </GeminiContext.Provider>
  );
};

export default GeminiContextProvider;
