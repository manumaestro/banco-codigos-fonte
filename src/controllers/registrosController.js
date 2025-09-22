import registros from "../models/dados.js";


// ✅ Buscar todos os registros
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
    return res.status(404).json({
      message: "Registro não encontrado! ❌"
    });
  }

  res.status(200).json(registro);
};

// ✅ Criar novo registro
export const create = (req, res) => {
  const{ id, nome, linguagem, autor, licenca, estrelas, forks, categoria, dataAtualizacao } = req.body;

  if (!id || !nome || !linguagem || !autor || licenca || !estrelas || !forks || !categoria || !dataAtualizacao) {
    return res.status(400).json({
      message: "Preencha todos os campos! 📜"
    });
  }


//Número de estrelas não pode ser negativo
  if (estrelas < 0) {
    return res.status(400).json({ message: "O número de estrelas não pode ser negativo" });
  }

  // Nome do projeto deve ter pelo menos 2 caracteres
  if (grupo.toLowerCase() === "2 caracteres" === true) {
    return res.status(400).json({
      message: "O nome do projeto deve ter pelo menos 2 caracteres"
    });
  }

  const novoRegistro = {
    id: registros.length + 1,
    id,
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
    message: "Novo registro adicionado com sucesso! ",
    personagem: nonoRegistro
  });
};

// ✅ Atualizar registros existentes
export const update = (req, res) => {
  const id = parseInt(req.params.id);
  const { id, nome, linguagem, autor, licenca, estrelas, forks, categoria, dataAtualizacao } = req.body;

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser um número válido."
    });
  }

  const registroExiste = registros.find(p => p.id === id);
  if (!registroExiste) {
    return res.status(404).json({
      success: false,
      message: `O registro com o id: ${id} não existe.`
    });
  }

  const registrosAtualizados = registros.map(registro =>
    registro.id === id
      ? {
          ...id,
          ...(nome && { nome }),
          ...(linguagem && { linguagem }),
          ...(autor && { autor }),
          ...(licenca && { licenca }),
          ...(estrelas && { estrelas }),
          ...(forks && { forks }),
          ...(categoria && { categoria }),
          ...(dataAtualizacao && { dataAtualizacao }),
        }
      : registro
  );

  registros.splice(0, registros.length, ...registrosAtualizados);

  const registrosAtualizados = registros.find(p => p.id === id);
  res.status(200).json({
    success: true,
    message: "Registros atualizados com sucesso",
    registro: registrosAtualizados
  });
};

// ✅ Remover registros
export const remove = (req, res) => {
  const { id } = req.params;

  if (isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "O id deve ser válido"
    });
  }

  const idParaApagar = parseInt(id);
  const registrosParaRemover = registros.find(p => p.id === idParaApagar);

  if (!registrosParaRemover) {
    return res.status(404).json({
      success: false,
      message: "Registro não encontrado"
    });
  }

  const registrosFiltrados = registros.filter(p => p.id !== idParaApagar);
  registros.splice(0, registros.length, ...registrosFiltrados);

  return res.status(200).json({
    success: true,
    message: "O registro foi removido com sucesso! 🗑️"
  });
};
