import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Armazena a última mensagem recebida do Discord
let lastMessage = null;

// Recebe mensagem do Discord (BotGhost)
app.post("/send", (req, res) => {
    const { user, message } = req.body;

    if (!user || !message) {
        return res.json({ success: false, error: "Missing user or message" });
    }

    lastMessage = { user, message };
    console.log("Mensagem recebida:", lastMessage);

    res.json({ success: true });
});

// Minecraft busca a mensagem
app.get("/get", (req, res) => {
    res.json(lastMessage);
    lastMessage = null; // limpa depois de entregar
});

// Inicia a API
app.listen(3000, () => {
    console.log("🌐 Horizon Chat API rodando na porta 3000");
});
