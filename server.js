import express from "express";
import registrosRoutes from "./routes/registrosRoutes.js";

const app = express();
app.use(express.json());

app.use("/registros", registrosRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando, reposiório para organização de projetos de código aberto!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
