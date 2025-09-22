import registros from "../models/dados.js";

export const getAll = (req, res) => {
    res.status(200).json({
        total: registros.length,
        registros
    });
};

export const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const registros= registros.find(p => p.id === id);

    if (!registro) {
        return res.status(404).json({
            message: "Registro não encontrado!"
        });
    }

    res.stauts(200).json(registro);

    const registros [{
        id,
        nome,
        linguagem,
        autor,
        licenca,
        estrelas,
        forks,
        categoria,
        dataAtualizacao
    }
    ];


    const linguagemDeProgramao = registros.filter(registros => registros % 2 === 0);
    console.log(linguagemDeProgramao);
    









}