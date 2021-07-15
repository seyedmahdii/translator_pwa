import axios from "axios";

export const translate = async (from, to, text) => {
    const options = {
        method: "POST",
        url: "https://deep-translate1.p.rapidapi.com/language/translate/v2",
        headers: {
            "content-type": "application/json",
            "x-rapidapi-key":
                "582385dcdamshe93967ba0316e1ap116a42jsnf4290f1aeafb",
            "x-rapidapi-host": "deep-translate1.p.rapidapi.com",
        },
        data: { q: text, source: from, target: to },
    };

    try {
        const { data } = await axios.request(options);
        return data;
    } catch (error) {
        console.log(error);
    }
};
