const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



module.exports = {
	name: 'image',
	description: 'AI image generation',
	async execute(message, args){
        let image_url = null
        let error = null
        try{
            const response = await openai.createImage({
                prompt: `${message.content.slice(7, message.content.length)}`,
                n: 1,
                size: "1024x1024",
              });
              image_url = response.data.data[0].url;
              error = response
            
        } catch(e){
            error = e.response.data.error.message
        }

        message.channel.send(image_url || error)
        
        ;
	},
};
