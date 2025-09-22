import express from "express";
import codigosRoutes from "./routes/codigosRoutes.js";

const app = express();

// Middleware para aceitar JSON
app.use(express.json());

// Rotas principais
app.use("/personagens", codigosRoutes);

// Rota inicial
app.get("/", (req, res) => {
  res.send("🧛 The Vampire Diaries API - Bem-vindo(a) a Mystic Falls!");
});

// Porta do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});