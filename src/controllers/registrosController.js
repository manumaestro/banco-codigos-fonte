import registros from "../models/dados.js";

export const getAll = (req, res) => {
  let resultado = registros;

  const { linguagem, categoria, licenca, estrelasMin, } = req,query;

  if (linguagem) {
    resultado = resuldado.filter(r => r.linguagem.toLowerCase() === linguagem.toLowerCase());
  }
  if (categoria) {
    resultado = resuldado.filter(r => r.categoria.toLowerCase() === categoria.toLowerCase());
  }
  if (licenca) {
    resultado = resuldado.filter(r => r.licenca.toLowerCase() === licenca.toLowerCase());
  }
  if (estrelasMin) {
    resultado = resuldado.filter(r => r.estrelas >= parseInt(estrelasMin));
  }
  
  res.status(200).json({
    total: resultado.length,
    registros: resultado
  })
};

export const getAll = (req, res) => {
  res.status(200).json({
    total: registros.length,
    registros
  });
};

// ✅ Buscar por ID

export const getById = (req, res) => {
  const id = parseInt(req.params.id);
  const registro = registros.find(p => p.id === id);

  if (!registro) {
    return res.status (404).json({ message: "Registro não encontrado!"});
  }

  res.status(200).json(registro);
};

  export const create = (req, res) => {
    const { nome, linguagem ,autor, licenca, estrelas, forks, categoria, dataAtualizacao } = req.body;
  }
  
  if (!nome || !linguagem|| !autor || !licenca || estrelas == null || forks == null || !categoria || !dataAtualizacao) {
    return res.status(400).json({ message: "Preencha todos os campos!"});
  }
  
  const novoRegistro = {
    id: registros.length + 1,
    nome,
    linguagem,
    autor,
    licenca,
    forks,
    categoria,
    dataAtualizacao
  };
  
  registros.push(novoRegistro);
  
  res.status(201).json({
    message: "Novo registro adicionado com sucesso!",
    registro: novoRegistro
  });
};


  const registro = registros.find(r => r.id === id);
  if (!registro) {
    return res.status(404).json({ messae: "Registro com id ${id} não encontrado"});
  }

  if (estrelas != null && estrelas < 0) {
    return res.status(400).json({ message: "O número de estrelas não pode ser negativo!"})
  }

  if (nome && nome.trim().length < 2) {
    return res.status(400).json({ message: "O nome do projeto deve ter pelo menos 2 caracteres"});
  }

  registro.nome = nome ?? registro.nome;
  registro.linguagem = linguagem ?? registro.linguagem;
  registro.autor = autor ?? registro.autor;
  registro.licenca = licenca ?? registro.licenca;
  registro.estrelas = estrelas ?? registro.estrelas;
  registro.forks = forks ?? registro.forks;
  registro.categorias = categorias ?? registro.categorias;
  registro.dataAtualizacao = dataAtualizacao ?? registro.dataAtualizacao;

  res.status(200).json({
    message: "Registro atualizado com sucesso!",
    registro
  });

  // Remover Registros

export const remove = (req, res) => {
  const id  = parseInt(req.params.id);

  const index = registros.findIndex(r => r.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Registro não encontrado!"});
  }

  registros.splice(index, 1);

  res.status(200).json({
    message: "Registro removido ocm sucesso"
  });
};