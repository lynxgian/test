const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received from app.get");
  response.sendStatus(200);
});
global.server= {};


const { Client, Collection } = require("discord.js");
const { config } = require("dotenv");
const client = new Client({
    disableEveryone: false,
    fetchAllMembers: true,
    disabledEvents: ["TYPING_START"]
});


//there is an error with clear //


client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();
client.categorychars = new Collection();
client.loadchannels = new Collection();
client.levelsmap = new Collection();
client.developerstr = "27gamerYT#6969"
client.developer;
//whats left to do 


let guild = client.guilds.first();
config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});


//CHANGE PREFIX HERE!!

client.prefix = "-";



//Add new plugins here when you create more.



client.canales = {verification:"verification",//x
          bienvenidas:"welcome",
          despedidas:"welcome",
          reglas:"rules",
          anuncios:"announcements",
          comandosbot:"bot-commands",
          privadosalbot:"bot-privates",
          tickets:"tickets",
          ticketslog:"tickets-log",
          ticketscategory: "❓| Tickets",
          logs:"logs",//x
          incidentlogs:"incident-logs",
          levelup: "level-up"
         }
client.colors = {red:"#e6381e",
              green:"#28ba18",
              online:"#47E510",
              main:"#4269f5",
              mainerror:"#ba1809",
              eightball:"#00000",
              welcome:"#4269f5",
              bye:"#1e386b",
              fun:{eightball:"#00000"
                  },
              tickets:{open:"#47E510",
                       close:"#6FD106",
                       solve:"E5B410"},
              moderation:{kick: "#3160f9",
                          ban:"#ba1809",
                          mute:"#ffbf00",
                          warn:"#ff7b00",
                          clear:"#e569bc",
                          unban:"#e05757",
                          unmute:"#fcdb79",
                          swearing:"#b642f4",
                          vetado:"#f44242",
                          perdonado:"#41f443"},
              gamble:{error:"#ba1809",
                      cooldown:"#E5B410",
                      lose:"#ba1809",
                      win:"#47E510"},
              dm:{sent:"#E5B410",
                  log:"#00ffe9"},
              ping:{good:"#47E510",
                    medium:"#E5B410",
                    bad:"#ba1809"},
              shop:{error:"#ba1809",
                    shop:"#E5B410",
                    sent:"#47E510"},
              banner:{new:"#E5B410"},
              trivia:{start:"#2562C6"}
             }

//JUST EDIT UNTIL HERE!!!


const { ErelaClient } = require("erela.js");
 
// Initialize the Discord.js Client instance and an array of nodes for Erela.js.
const nodes = [{
    host: "69.123.153.47",
    port: 25568,
    password: "youshallnotpasses",
}]
 
// Ready event fires when the Discord.js client is ready.
// Use once so it only fires once.
client.once("ready", () => {
    console.log("I am ready!")
    // Initializes an Erela client with the Discord.js client and nodes.
    client.music = new ErelaClient(client, nodes);
    // Listens to events.
    client.music.on("nodeConnect", node => console.log("New node connected"));
    client.music.on("nodeError", (node, error) => console.log(`Node error: ${error.message}`));
    client.music.on("trackStart", (player, track) => player.textChannel.send(`Now playing: ${track.title}`))
    client.music.on("queueEnd", player => {
        player.textChannel.send("Queue has ended.")
        client.music.players.destroy(player.guild.id);
    });
});

client.on("error",err=>{
  console.log(`Error event fired:`)
  console.log(err)
});
client.on("ready",()=>{
  let event = client.events.get("ready")
  if(event)event.run(client)
})
client.on("message",async message =>{
  let event = client.events.get("message")
  if(event)event.run(client,message);
});


client.categorychars.set("other","💊");

client.categorychars.set("music","🎵");
client.categorychars.set("info","📚");
console.log("❤ Your sexy love bot is online ❤")
client.login(process.env.TOKEN)//The token for the bot.