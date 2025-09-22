import registros from "../models/dados.js";

// 📌 Buscar todos os registros (com filtros)
export const getAll = (req, res) => {
  let resultado = registros;

  const { linguagem, categoria, licenca, estrelasMin } = req.query;

  if (linguagem) {
    resultado = resultado.filter(r => r.linguagem.toLowerCase() === linguagem.toLowerCase());
  }
  if (categoria) {
    resultado = resultado.filter(r => r.categoria.toLowerCase() === categoria.toLowerCase());
  }
  if (licenca) {
    resultado = resultado.filter(r => r.licenca.toLowerCase() === licenca.toLowerCase());
  }
  if (estrelasMin) {
    resultado = resultado.filter(r => r.estrelas >= parseInt(estrelasMin));
  }

  res.status(200).json({
    total: resultado.length,
    registros: resultado
  });
};

// 📌 Buscar por ID
export const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const registro = registros.find(p => p.id === id);

  if (!registro) {
    return res.status(404).json({ message: "Registro não encontrado! ❌" });
  }

  res.status(200).json(registro);
};

// 📌 Criar novo registro
export const create = (req, res) => {
  const { nome, linguagem, autor, licenca, estrelas, forks, categoria, dataAtualizacao } = req.body;

  if (!nome || !linguagem || !autor || !licenca || estrelas == null || forks == null || !categoria || !dataAtualizacao) {
    return res.status(400).json({ message: "Preencha todos os campos! 📜" });
  }

  if (estrelas < 0) {
    return res.status(400).json({ message: "O número de estrelas não pode ser negativo 🚫⭐" });
  }

  if (nome.trim().length < 2) {
    return res.status(400).json({ message: "O nome do projeto deve ter pelo menos 2 caracteres" });
  }

  const novoRegistro = {
    id: registros.length + 1,
    nome,
    linguagem,
    autor,
    licenca,
    estrelas,
    forks,
    categoria,
    dataAtualizacao
  };

  registros.push(novoRegistro);

  res.status(201).json({
    message: "Novo registro adicionado com sucesso! 🎉",
    registro: novoRegistro
  });
};

// 📌 Atualizar registro existente
export const update = (req, res) => {
  const id = parseInt(req.params.id);
  const { nome, linguagem, autor, licenca, estrelas, forks, categoria, dataAtualizacao } = req.body;

  const registro = registros.find(r => r.id === id);
  if (!registro) {
    return res.status(404).json({ message: `Registro com id ${id} não encontrado ❌` });
  }

  if (estrelas != null && estrelas < 0) {
    return res.status(400).json({ message: "O número de estrelas não pode ser negativo 🚫⭐" });
  }

  if (nome && nome.trim().length < 2) {
    return res.status(400).json({ message: "O nome do projeto deve ter pelo menos 2 caracteres" });
  }

  registro.nome = nome ?? registro.nome;
  registro.linguagem = linguagem ?? registro.linguagem;
  registro.autor = autor ?? registro.autor;
  registro.licenca = licenca ?? registro.licenca;
  registro.estrelas = estrelas ?? registro.estrelas;
  registro.forks = forks ?? registro.forks;
  registro.categoria = categoria ?? registro.categoria;
  registro.dataAtualizacao = dataAtualizacao ?? registro.dataAtualizacao;

  res.status(200).json({
    message: "Registro atualizado com sucesso! ✅",
    registro
  });
};

// 📌 Remover registro
export const remove = (req, res) => {
  const id = parseInt(req.params.id);

  const index = registros.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Registro não encontrado ❌" });
  }

  registros.splice(index, 1);

  res.status(200).json({
    message: "Registro removido com sucesso! 🗑️"
  });
};



import express from "express";
import { getAll, getById, create, update, remove } from "../controllers/registrosController.js";

const router = express.Router();

router.get("/", getAll);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.delete("/:id", remove);

export default router;


import express from "express";
import registrosRoutes from "./routes/registrosRoutes.js";

const app = express();
app.use(express.json());

app.use("/registros", registrosRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Servidor funcionando! Repositório para organização de projetos de código aberto.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});


