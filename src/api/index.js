import axios from "axios";

export const translate = async (from, to, text) => {
    var options = {
        method: "GET",
        url: "https://translated-mymemory---translation-memory.p.rapidapi.com/api/get",
        params: {
            q: text,
            langpair: `${from}|${to}`,
            de: "a@b.c",
            onlyprivate: "0",
            mt: "1",
        },
        headers: {
            "x-rapidapi-key": process.env.RAPIDAPI_KEY,
            "x-rapidapi-host":
                "translated-mymemory---translation-memory.p.rapidapi.com",
        },
    };

    try {
        const {
            data: {
                responseData: { translatedText },
            },
        } = await axios.request(options);
        console.log(translatedText);
        return translatedText;
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
