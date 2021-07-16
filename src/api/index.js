import axios from "axios";
import dotenv from "dotenv";

export const translate = async (from, to, text) => {
    dotenv.config();

    const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
            "content-type": "application/json",
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
        },
        data: { q: text, source: from, target: to },
    };

    try {
        const { data } = await axios.request(options);
        console.log(data);
        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getLanguages = async () => {
    const options = {
        method: "GET",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2/languages",
        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
        },
    };

    try {
        const {
            data: { languages },
        } = await axios.request(options);
        return languages;
    } catch (error) {
        console.log(error);
    }
};
