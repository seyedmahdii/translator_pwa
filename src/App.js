import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import { getLanguages, translate } from "./api/index";

import { IconButton } from "@material-ui/core";
import SwapHorizRoundedIcon from "@material-ui/icons/SwapHorizRounded";
import FileCopyRoundedIcon from "@material-ui/icons/FileCopyRounded";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import VolumeUpRoundedIcon from "@material-ui/icons/VolumeUpRounded";
import TranslateRoundedIcon from "@material-ui/icons/TranslateRounded";

function App() {
    const [languages, setLanguages] = useState();
    const [sourceLan, setSourceLan] = useState("en");
    const [targetLan, setTargetLan] = useState("en");
    const [text, setText] = useState("");
    const [translatedText, setTranslatedText] = useState("");

    const sourceSelectRef = useRef(null);
    const targetSelectRef = useRef(null);

    const fetchTranslatedText = async () => {
        const data = await translate(sourceLan, targetLan, text);
        console.log(data);
        setTranslatedText(data);
        // console.log(translatedText);
    };

    const fetchLanguages = async () => {
        const languages = await getLanguages();
        setLanguages(languages);
        console.log(languages);
    };

    const swapLanguages = (val1, val2) => {
        const t = val1;
        setSourceLan(val2);
        setTargetLan(t);

        for (let i, j = 0; (i = sourceSelectRef.current.options[j]); j++) {
            if (i.value === targetLan) {
                sourceSelectRef.current.selectedIndex = j;
                break;
            }
        }

        for (let i, j = 0; (i = targetSelectRef.current.options[j]); j++) {
            if (i.value === sourceLan) {
                targetSelectRef.current.selectedIndex = j;
                break;
            }
        }
    };

    useEffect(() => {
        fetchLanguages();
    }, []);

    return (
        <div className="container">
            <main className="content">
                <header className="header">
                    <div className="source-lan__wrapper">
                        <select
                            onChange={(e) => setSourceLan(e.target.value)}
                            className="lan__select source-lan"
                            ref={sourceSelectRef}
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
                        <IconButton
                            onClick={() => swapLanguages(sourceLan, targetLan)}
                        >
                            <SwapHorizRoundedIcon className="swap-icon" />
                        </IconButton>
                    </div>

                    <div className="target-lan__wrapper">
                        <select
                            onChange={(e) => setTargetLan(e.target.value)}
                            className="lan__select target-lan"
                            ref={targetSelectRef}
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
                            <IconButton
                                onClick={() => setText("")}
                                title="Clear"
                            >
                                <DeleteOutlineRoundedIcon className="footer-icon" />
                            </IconButton>
                            <IconButton
                                onClick={() =>
                                    navigator.clipboard.writeText(text)
                                }
                                title="Copy"
                            >
                                <FileCopyRoundedIcon className="footer-icon" />
                            </IconButton>

                            {text && (
                                <IconButton
                                    onClick={() => fetchTranslatedText()}
                                    title="Translate"
                                >
                                    <TranslateRoundedIcon className="footer-icon" />
                                </IconButton>
                            )}
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
                                    title="Read Result"
                                >
                                    <VolumeUpRoundedIcon className="footer-icon" />
                                </IconButton>
                                <IconButton
                                    onClick={() =>
                                        navigator.clipboard.writeText(
                                            translatedText
                                        )
                                    }
                                    title="Copy"
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
