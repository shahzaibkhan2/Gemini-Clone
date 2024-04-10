import React, { useContext } from "react";
import styles from "./Major.module.css";
import { ImagesList } from "../../assets/ImagesFile";
import { GeminiContext } from "../../store/GeminiContext";

const Major = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(GeminiContext);

  return (
    <div className={`${styles.major}`}>
      <div className={`${styles.navigation}`}>
        <p className={`${styles.gemini__logo}`}>Gemini</p>
        <img src={ImagesList.client} alt="user-image" />
      </div>

      <div className={`${styles.major__container}`}>
        {!showResult ? (
          <>
            <div className={`${styles.greeting}`}>
              <p>
                <span>Hi, Shahzaib.</span>
              </p>
              <p>How may I help you today !</p>
            </div>

            <div className={`${styles.cards}`}>
              <div className={`${styles.card}`}>
                <p>What is Terminal? Explain it briefly.</p>
                <img src={ImagesList.terminal} alt="terminal-image" />
              </div>

              <div className={`${styles.card}`}>
                <p>
                  Find about all the flights timing. Be informed about the
                  latest news about flights.
                </p>
                <img src={ImagesList.flight} alt="flight-image" />
              </div>

              <div className={`${styles.card}`}>
                <p>Explore the interaction between nature and human.</p>
                <img src={ImagesList.naturePeople} alt="nature-image" />
              </div>

              <div className={`${styles.card}`}>
                <p>Find the best places for travelling and fun. Be ready !</p>
                <img src={ImagesList.explore} alt="explore-image" />
              </div>
            </div>
          </>
        ) : (
          <div className={`${styles.result}`}>
            <div className={`${styles.result__title}`}>
              <img src={ImagesList.client} alt="user-image" />
              <p className={`${styles.title__style}`}>{recentPrompt}</p>
            </div>
            <div className={`${styles.result__data}`}>
              <img src={ImagesList.geminiStar} alt="gemini-icon" />
              {loading ? (
                <div className={`${styles.loader}`}>
                  <div>Loading...</div>
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        )}

        <div className={`${styles.major__lower}`}>
          <div className={`${styles.search__box}`}>
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a Prompt Here..."
            />
            <div className={`${styles.imgs__div}`}>
              <img src={ImagesList.gallery} alt="send-image" />
              <img src={ImagesList.mic} alt="send-image" />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={ImagesList.send}
                  alt="send-image"
                />
              ) : null}
            </div>
          </div>
          <p className={`${styles.lower__info}`}>
            Gemini may give inaccurate results. Please make a final decision on
            complete knowledge.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Major;
