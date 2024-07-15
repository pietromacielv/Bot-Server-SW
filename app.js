const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const bot = require("./bot");
const embedController = require("./controllers/embedController");
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post("/generate-embed", embedController.generateEmbed);



bot.on("ready", async () => {
  console.log("Ready!");
});

bot.connect();
