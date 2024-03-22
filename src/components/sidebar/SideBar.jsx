import React, { useContext, useState } from "react";
import styles from "./SideBar.module.css";
import { ImagesList } from "../../assets/ImagesFile";
import { GeminiContext } from "../../store/GeminiContext";

const SideBar = () => {
  const [menuExtend, setMenuExtend] = useState(false);
  const { prevPrompts, setRecentPrompt, onSent, newChat } =
    useContext(GeminiContext);

  const loadPrevPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    onSent(prompt);
  };

  return (
    <div className={`${styles.sidebar}`}>
      <div className={`${styles.upper}`}>
        <img
          onClick={() => setMenuExtend((prevValue) => !prevValue)}
          className={`${styles.menu}`}
          src={ImagesList.menu}
          alt="menu"
        />
        <div onClick={() => newChat()} className={`${styles.new__chat}`}>
          <img src={ImagesList.add} alt="new-chat" />
          {menuExtend ? <p>New Chat</p> : null}
        </div>
        {menuExtend ? (
          <div className={`${styles.recent}`}>
            <p className={`${styles.recent__title}`}>Recent</p>
            {prevPrompts.map((prompt, index) => {
              return (
                <div
                  onClick={() => loadPrevPrompt(prompt)}
                  className={`${styles.recent__entry}`}
                >
                  <img src={ImagesList.chatInfo} alt="chat-icon" />
                  <p>{prompt.slice(0, 18)}...</p>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className={`${styles.lower}`}>
        <div className={`${styles.lower__item} ${styles.recent__entry}`}>
          <img src={ImagesList.help} alt="help" />
          {menuExtend ? <p>Help</p> : null}
        </div>

        <div className={`${styles.lower__item} ${styles.recent__entry}`}>
          <img src={ImagesList.history} alt="history" />
          {menuExtend ? <p>Activity</p> : null}
        </div>

        <div className={`${styles.lower__item} ${styles.recent__entry}`}>
          <img src={ImagesList.settings} alt="settings" />
          {menuExtend ? <p>Settings</p> : null}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
