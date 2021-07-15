import React from "react";
import "./App.css";
import { translate } from "./api/index";

function App() {
    const search = async (event) => {
        const {
            data: {
                translations: { translatedText },
            },
        } = await translate("en", "fa", "hello baby");
        console.log(translatedText);
    };

    return (
        <div>
            <h1>translate</h1>
        </div>
    );
}

export default App;
