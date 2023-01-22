const { Configuration, OpenAIApi } = require("openai");

configuration = null
openai = null

module.exports = class ThemeGenerator {

    defaultOptions = {
        textCompletionPrompt: 'Human: Write me a prompt for Dalle2 art generator that is based on the 80s',
        colorGenerationPrompt: 'Give me a color scheme representing the 1980s in the United States. give me the colors in Hex Values and give me 8 colors, the first 3 I can use for a background and the other 5 for styling'
    }

    constructor(options) {
        // Initialize properties and state
        this.openAIKey = options.openAIKey;
        this.textCompletionPrompt = options.textCompletionPrompt || this.defaultOptions.textCompletionPrompt;
        this.colorGenerationPrompt = options.colorGenerationPrompt || this.defaultOptions.colorGenerationPrompt;
        this.imagePrompt = ''
        this.generatedImageUrl = ''
    }

    async start() {
        configuration = new Configuration({
            apiKey: this.openAIKey,
        });
        openai = new OpenAIApi(configuration)
        const prompt = await this.createImagePrompt()
        const imageUrl = await this.createImage()
        const hexValues = await this.generateColors()
        const colors = this.createColorDictionary(hexValues)
        
        const themeData = {
            colors: colors,
            imageUrl: imageUrl,
            prompt: prompt
        }
        return themeData
        
    }

    async createImagePrompt() {
        return new Promise( async (resolve, reject) => {
        try {
            const response = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: this.textCompletionPrompt,
                temperature: 1,
                max_tokens: 500,
                top_p: 1,
                frequency_penalty: 0,
                presence_penalty: 0.6,
                stop: [" Human:", " AI:"],
              });
    
            this.imagePrompt = response.data.choices[0].text.replace(/^[\n\s\t]*|[\n\s\t]*$/g, '');
            resolve(this.imagePrompt)
        } catch(err) {
            reject(err)
        }
    })
        
    }
    
    // Define class methods
    async createImage() {
        return new Promise( async (resolve, reject) => {
        try {
            const response = await openai.createImage({
                prompt: this.imagePrompt,
                n: 1,
                size: "1024x1024", //Possible options 256x256, 512x512, or 1024x1024
              });

            this.generatedImageUrl = response.data.data[0].url;
            resolve(this.generatedImageUrl)
        } catch(err) {
            reject(err)
        }
    })
    }

    async generateColors() {
        return new Promise( async (resolve, reject) => {
            try {
                const response = await openai.createCompletion({
                    model: "text-davinci-003",
                    prompt: this.colorGenerationPrompt,
                    temperature: 0.9,
                    max_tokens: 500,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0.6,
                    stop: [" Human:", " AI:"],
                });

                let hexValues = response.data.choices[0].text.match(/\#[0-9A-Fa-f]{6}/g);
                console.log(hexValues);
                resolve(hexValues)
            } catch(err) {
                reject(err)
            }
        })
    }

    createColorDictionary(colorArray) {
        var colorDictionary = {}
        colorDictionary.primary = colorArray[0]
        colorDictionary.secondary = colorArray[1]
        colorDictionary.tertiary = colorArray[2]
        colorDictionary.one = colorArray[3]
        colorDictionary.two = colorArray[4]
        colorDictionary.three = colorArray[5]
        colorDictionary.four = colorArray[6]
        colorDictionary.five = colorArray[7]
        return colorDictionary
    }
}