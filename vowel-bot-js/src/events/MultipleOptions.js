const { Client, IntentsBitField } = require("discord.js");
const client = new Client({intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, IntentsBitField.Flags.MessageContent]});

let replyToMentionOnly = true; // Default behavior: Reply only to @ mentions

client.once("ready", () => {
  console.log("Bot is ready!");
});

client.on("messageCreate", async (message) => {
  if (message.author.bot) return; // Ignore messages from other bots


  // Check if the message starts with the bot's prefix (e.g., "!")
   if (message.content.startsWith("!")) {
    // Handle commands here
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "replymode") {
      // Handle the "!replymode" command to change the bot's reply mode
      if (args.length > 0 && args[0].toLowerCase() === "all") {
        replyToMentionOnly = false; // Set reply mode to reply to all messages
        message.channel.send("VowelsBot will now reply to all messages!");
      } else if (args.length > 0 && args[0].toLowerCase() === "mention") {
        replyToMentionOnly = true; // Set reply mode to reply only to @ mentions
        message.channel.send("VowelsBot will now reply only to messages with @ mention.");
      } else {
        message.channel.send("Invalid arguments. Use `!replymode all` or `!replymode mention`.");
      }
    }
  } else {
    // Normal message handling
    if (!replyToMentionOnly || message.mentions.has(client.user.id)) {
      // Bot should reply either to all messages or messages with @ mention
       // Check if the message author is the bot itself, and if so, return to avoid replying (was initially having a infinite loop issue before because of this)
       if (message.author.id === message.client.user.id) return;

       const contentInLowercase = message.content.toLowerCase(); // Convert the message content to lowercase for case-insensitive matching
       let countAll = 0;
       // will also add functionality to show the count of each individual letter
       let countA = 0;
       let countE = 0;
       let countI = 0;
       let countO = 0;
       let countU = 0;
       let multipleSentences = false; // will detect if its just one sentence or multiple sentences

       for (let i = 0; i<contentInLowercase.length; i++){
           const currentChar = contentInLowercase[i];
           if (currentChar == 'a' || currentChar == 'e' || currentChar == 'i' || currentChar == 'o' || currentChar == 'u'){
               countAll++;
               if (currentChar == 'a') countA++;
               if (currentChar == 'e') countE++;
               if (currentChar == 'i') countI++;
               if (currentChar == 'o') countO++;
               if (currentChar == 'u') countU++;
           }
           if (currentChar == '.' && contentInLowercase[i+1]!= null){
               multipleSentences = true;
           }
       }

       if (countAll>0){
           if (multipleSentences == false){
           message.reply("Fun fact: Your sentence used " + countAll + " vowel letter(s)! \n Details: A:"+countA+" E:"+countE+" I:"+countI+" O:"+countO+" U:"+countU);   
           }
           else{
               message.reply("Fun fact: Your sentences used " + countAll + " vowel letter(s)! \n Details: A:"+countA+" E:"+countE+" I:"+countI+" O:"+countO+" U:"+countU);   
           }
       } 
  }
}
}
);

client.login(process.env.TOKEN);
