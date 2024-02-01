import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

import connectDB from "./mongodb/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/post", postRoutes); // Corrigido aqui
app.use("/api/v1/dalle", dalleRoutes); // Corrigido aqui

app.get("/", async (req, res) => {
    res.send("Hello from Imagine Craft");
});

const startServer = async () => {
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, () =>
            console.log("Server has started on port http://localhost:8080")
        );
    } catch (error) {
        console.log(error);
    }
};

startServer();
