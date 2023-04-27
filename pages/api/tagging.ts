import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const tagging = async (req: NextApiRequest, res: NextApiResponse) => {

    let response;
    const { title, artist } = req.body.prompt;

    try {
        const gptResponse = await
            openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [
                    { "role": "system", "content": "You are a helpful assistant that likes to tag youtube video titles. Example: 'rock, pop, alternative, indie, alternative rock'. Try to categorize the tracks into either 'ambience', 'music' or 'standalone' Refrain from using more than one word per tag and seperate the tags by ','. Do not add special characters to tags like # or @. Translate tags to english." },
                    { "role": "user", "content": 'Please create a raw string without formatting of 5 tags for the given track title: "' + title + '" by "' + artist + '". Is it ambience or music?' },
                ]
            })
        response = gptResponse.data.choices[0];
    }
    catch (err) {
        console.log(err);
    }

    res.status(200).json(response);
}

export default tagging;
