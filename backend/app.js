// const ThemeGenerator = require('./index')
const ThemeGenerator = require('oai-theme-generator')
const cors = require('cors')
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs')
require('dotenv').config({path:__dirname+'/.env'})
const fileName = __dirname+'/template_data.json'

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "./dist")));

// const imageGenerationPrompt = 'Human: Write me a prompt for an AI art generator. Write a prompt that is based on the emo punk rock phase of the early 2000s era in the united states'
// const colorGenerationPrompt = 'Human: Give me a color scheme representing the early 2000s era emo punk rock phase in the United States. give me the colors in Hex Values and give me 8 colors, the first 3 I can use for a background and the other 5 for styling'

// const imageGenerationPrompt = 'Human: Write me a prompt for an AI art generator. Write a prompt that is based on the roaring 1920s era in the united states'
// const colorGenerationPrompt = 'Human: Give me a color scheme representing the roaring 1920s era in the United States. give me the colors in Hex Values and give me 8 colors, the first 3 I can use for a background and the other 5 for styling'

// const imageGenerationPrompt = 'Human: Write me a prompt for an AI art generator. Write a prompt that is based on the 1800s classical era in the europe'
// const colorGenerationPrompt = 'Human: Give me a color scheme representing the 1800s classical era in Europe. give me the colors in Hex Values and give me 8 colors, the first 3 I can use for a background and the other 5 for styling'

// const imageGenerationPrompt = 'Human: Write me a prompt for an AI art generator. Write a prompt that is based on woodstock music festival in 1969.'
// const colorGenerationPrompt = 'Human: Give me a color scheme representing Woodstock music festival in 1969. give me the colors in Hex Values and give me 8 colors, the first 3 I can use for a background and the other 5 for styling'

// const imageGenerationPrompt = 'Human: Write me a prompt for an AI art generator. Write a prompt that is based on the rise of the internet in the 1990s.'
// const colorGenerationPrompt = 'Human: Give me a color scheme representing the rise of the internet in the 1990s. give me the colors in Hex Values and give me 8 colors, the first 3 I can use for a background and the other 5 for styling'

const imageGenerationPrompt = 'Human: Write me a prompt for an AI art generator. Write a prompt that is based on prohibition and gangsters of chicago.'
const colorGenerationPrompt = 'Human: Give me a color scheme representing prohibition and gangsters of chicago. give me the colors in Hex Values and give me 8 colors, the first 3 I can use for a background and the other 5 for styling'


const options = {
    openAIKey: process.env.OPENAI_API_KEY,
    imageGenerationPrompt: imageGenerationPrompt,
    colorGenerationPrompt: colorGenerationPrompt
}


const saveThemeData = (themeData) => {
    console.log(fileName)
    var createStream = fs.createWriteStream(`${fileName}`);
    const stringifiedObject = JSON.stringify(themeData)
    createStream.write(stringifiedObject);
    createStream.end();
}

const tg = new ThemeGenerator(options)

app.get('/api/theme/get', async (req, res) => {
    fs.readFile(`${fileName}`, 'utf8', (err, data) => {
        if (err) {
            const themeData = {
                colors: { 
                    primary: '#FFFFFF',
                    secondary: '#000000',
                    tertiary: '#333333', 
                    one: '#F44336',
                    two: '#9C27B0',
                    three: '#3F51B5',
                    four: '#4CAF50',
                    five: '#FFC107'
                },
                imageUrl: '',
                prompt: '',
            }
            saveThemeData(themeData)
            res.status(200).send(themeData)
        } else {
            res.status(200).send(data)
        }
    })
});

app.get('/api/theme/generate', async (req, res) => {
    const themeData = await tg.start()
    saveThemeData(themeData)
    res.send(200).status("New theme generated")
});

app.get('/', async (req,res) => {
    console.log("REACHING ENDPOINT")
    res.sendFile(path.join(__dirname, "./dist/index.html"));
})

console.log('PATH: '+__dirname+'/.env')
console.log(process.env.PORT)
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});



