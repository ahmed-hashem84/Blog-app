import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// السماح بالوصول من الـ React App
app.use(cors());

app.get("/api/news", async (req, res) => {
  try {
    const { q, category, pageSize, country } = req.query;

    const NEWS_API_KEY = process.env.NEWS_API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&pageSize=${
      pageSize || 6
    }&country=${country || "us"}&category=${category || "technology"}&q=${
      q || ""
    }`;

    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching data from NewsAPI:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
