/* // For the moment do not need this code as it has been implemented into the multiple options directly
const { Events } = require("discord.js");


module.exports = {
    name: Events.MessageCreate,
    once: false,
    execute(message) { // can read every msg sent to server
       

        // Check if the message author is the bot itself, and if so, return to avoid replying (was initially having a infinite loop issue before because of this)
        if (message.author.id === message.client.user.id) return;

        const contentInLowercase = message.content.toLowerCase(); // Convert the message content to lowercase for case-insensitive matching
        let count = 0;
        let multipleSentences = false; // will detect if its just one sentence or multiple sentences

        for (let i = 0; i<contentInLowercase.length; i++){
            const currentChar = contentInLowercase[i];
            if (currentChar == 'a' || currentChar == 'e' || currentChar == 'i' || currentChar == 'o' || currentChar == 'u'){
                count++;
            }
            if (currentChar == '.' && contentInLowercase[i+1]!= null){
                multipleSentences = true;
            }
        }

        if (count>0){
            if (multipleSentences == false){
            message.reply("Fun fact: Your sentence used " + count + " vowel letter(s)!");   
            }
            else{
                message.reply("Fun fact: Your sentences used " + count + " vowel letter(s)!");   
            }
        } 

        
    }

   
     
}
*/
