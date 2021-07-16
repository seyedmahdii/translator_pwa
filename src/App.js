import React, { useEffect, useState } from "react";
import "./App.css";
import { getLanguages, translate } from "./api/index";

import { IconButton } from "@material-ui/core";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";
import FileCopyRoundedIcon from "@material-ui/icons/FileCopyRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";

function App() {
    const [languages, setLanguages] = useState([
        { language: "en", name: "english" },
        { language: "fa", name: "farsi" },
        { language: "es", name: "espanish" },
    ]);
    const [sourceLan, setSourceLan] = useState("en");
    const [targetLan, setTargetLan] = useState("fa");
    const [text, setText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const fetchTranslatedText = async () => {
        const data = await translate(sourceLan, targetLan, "hello baby");
        console.log(data);
        // console.log(translatedText);
    };

    const fetchLanguages = async () => {
        const languages = await getLanguages();
        setLanguages(languages);
        console.log(languages);
    };

    useEffect(() => {
        // fetchLanguages();
    }, []);

    return (
        <div className="container">
            <main className="content">
                <header className="header">
                    <div className="source-lan__wrapper">
                        <select
                            onChange={(e) => setSourceLan(e.target.value)}
                            className="lan__select source-lan"
                        >
                            {languages?.map((language, index) => {
                                return (
                                    <option
                                        value={language.language}
                                        key={index}
                                        className="lan__option"
                                    >
                                        {language.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="header__swap">
                        <SwapHorizRoundedIcon className="swap-icon" />
                    </div>

                    <div className="target-lan__wrapper">
                        <select
                            onChange={(e) => setTargetLan(e.target.value)}
                            className="lan__select target-lan"
                        >
                            {languages.map((language, index) => {
                                return (
                                    <option
                                        value={language.language}
                                        key={index}
                                        className="lan__option"
                                    >
                                        {language.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </header>

                <div className="body">
                    <div className="box">
                        <textarea
                            name="source"
                            className="box__input"
                            placeholder={`Enter text (${sourceLan})`}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        ></textarea>

                        <div className="box__footer">
                            <IconButton onClick={() => setText("")}>
                                <DeleteOutlineRoundedIcon className="footer-icon" />
                            </IconButton>
                            <IconButton
                                onClick={() =>
                                    navigator.clipboard.writeText(text)
                                }
                            >
                                <FileCopyRoundedIcon className="footer-icon" />
                            </IconButton>
                        </div>
                    </div>

                    {translatedText && (
                        <div className="box">
                            <h2 className="box__result">{translatedText}</h2>

                            <div className="box__footer">
                                <IconButton
                                    onClick={() =>
                                        alert(
                                            "This option will be here soon :)"
                                        )
                                    }
                                >
                                    <VolumeUpRoundedIcon className="footer-icon" />
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            "translated Text"
                                        )
                                    }
                                >
                                    <FileCopyRoundedIcon className="footer-icon" />
                                </IconButton>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default App;
