const express = require("express");
const app = express();
const path = require("path");
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.send('Home') // we dont use send to send a big file or html
  res.render("home");
});

app.get("/rolldice", (req, res) => {
  const num = Math.floor(Math.random() * 6) + 1;
  res.render("rolldice", { num });
});

app.get("/ig/:username", (req, res) => {
  // followers list
  const { username } = req.params;
  const instaData = require("./data.json");
  let accountFound = false; 

  for (let i = 0; i < instaData.length; i++) {
    if (instaData[i].username === username) {
      res.render("instagram", { data: instaData[i] });
      accountFound = true;
      break; 
    }
  }
  if (!accountFound) {
    // Render the "No Account Found" page if no account matches the username
    res.render("error");
  }

  // for(let i =0; i<instaData.length; i++){
  //   if(instaData[i].user.username === username){
  //     res.render("instagram", {data: instaData[i] });
  //     console.log(instaData[i]);
  //   }
  // }
});

// If we want to run our server from outside of the main directory which is EJS so this will still work as this will find all files in views folder
app.set("views", path.join(__dirname, "/views"));

// If rount not found
app.get("*", (req, res) => {
  res.send("Page that you requested is not found");
});

// When server is running
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
