import { Configuration, OpenAIApi } from "openai";
import { NextApiRequest, NextApiResponse } from "next";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const tagging = async (req: NextApiRequest, res: NextApiResponse) => {

    const title = req.body.prompt.title;
    const artist = req.body.prompt.artist;

    const options = [
        "Example: 'rock, pop, alternative, indie, alternative rock'",
        "Try to categorize the tracks into either 'ambience' or 'music', but not both",
        "Refrain from using more than one word per tag",
        "do not add special characters to tags like # or @",
        "translate tags to english.",
    ]
    
    const prompt = 'Please create a raw string without formatting of 5 tags for the given track title: "' + title + '" by "' + artist + '". ' + options.join('. ')

    const response = await openai.createCompletion({
        model: "gpt-3.5-turbo-0301",
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 256,
    });

    console.log(response.data.choices[0].text);

    res.status(200).json(response);
}

export default tagging;
