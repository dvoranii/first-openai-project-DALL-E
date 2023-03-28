const express = require("express");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 3000;

require("dotenv").config();

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  const api_key = process.env.OPENAI_API_KEY;
  const api_url = "https://api.openai.com/v1/images/generations";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${api_key}`,
  };

  const prompt = "realistic image of a dog wearing sunglasses";
  const model = "image-alpha-001";
  const size = "512x512";
  const response_format = "url";

  axios
    .post(
      api_url,
      {
        prompt: prompt,
        model: model,
        size: size,
        response_format: response_format,
      },
      { headers: headers }
    )
    .then((response) => {
      const image_url = response.data.data[0].url;
      res.render("image", { image_url: image_url });
    })
    .catch((error) => {
      console.log(
        "Error:",
        error.response ? error.response.data : error.message
      );
      res.status(500).send("An error occurred");
    });
});

app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
