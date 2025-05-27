const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/joke", async (req, res) => {
    const { firstName, lastName } = req.body;

    try {
        const response = await axios.get(`https://v2.jokeapi.dev/joke/Any?firstName=${firstName}&lastName=${lastName}&blacklistFlags=nsfw,religious,political,racist,sexist,explicit`);
        const jokeData = response.data;

        res.render("joke", { joke: jokeData });
    } catch (error) {
        console.error("API Error:", error.message);
        res.render("joke", { joke: { error: "Не вдалося отримати жарт 😢" } });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
