// nao e preciso escrever as funcoes de CRUD, o mongoose ja tem elas disponiveis
// https://mongoosejs.com/docs/api/model.html

const db = require("../models");
const Contact = db.contacts;

// incluir um novo usuario
exports.incluir = (req, res) => {
  // validacao nao necessaria.
    // if (!req.body.nome || !req.body.telefone || !req.body.email) {
    //   res.status(400).send({ message: "campos não podem estar vazio!" });
    //   return;
    // }

  // criar usuario
  const contact = new Contact({
    nome: req.body.nome,
    email: req.body.email,
    telefone: req.body.telefone,
  });

  // incluir no banco de dados
  contact
    .save(contact)
    .then((conteudo) => {
      res.send(conteudo);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "erro na inclusão do contato",
      });
    });
};

// retorna todos os contatos do banco de dados
exports.buscarTodos = (req, res) => {
  const nome = req.query.nome;

  let condicao = nome
    ? { nome: { $regex: new RegExp(nome), $options: "i" } }
    : {};

  Contact.find(condicao)
    .then((conteudo) => {
      res.send(conteudo);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "erro ao buscar os contatos",
      });
    });
};

// retorna um unico contato com um id
exports.buscarUm = (req, res) => {
  const id = req.params.id;

  Contact.findById(id)
    .then((conteudo) => {
      if (!conteudo)
        res
          .status(404)
          .send({ message: "contato não encontrado com a id " + id });
      else res.send(conteudo);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "erro ao buscar contato com a id " + id });
    });
};

// atualiza um contato pelo id na request
exports.atualizar = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "para atualizar um contato os campos não podem estar vazios!",
    });
  }

  const id = req.params.id;

  Contact.findByIdAndUpdate(id, req.body, { UseFindAndModify: false })
    .then((conteudo) => {
      if (!conteudo) {
        res.status(404).send({
          message: `não foi possivel atualizar o contato com a id ${id}. pode ser que esse contato não exista.`,
        });
      } else res.send({ message: "contato atualizado!" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "erro ao atualizar contato com a id " + id,
      });
    });
};

// remove um contato pelo id na request
exports.remover = (req, res) => {
  const id = req.params.id;

  Contact.findByIdAndRemove(id)
    .then(conteudo => {
      if(!conteudo) {
        res.status(400).send({
          message: `erro ao remover contato com a id ${id}. pode ser que esse contato nao exista.`
        });
      } else {
        res.send({
          message: "contato removido!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "erro ao remover contato com a id " + id
      });
    });
};

// exclui todos os contatos do banco de dados.
exports.removerTodos = (req, res) => {
  Contact.deleteMany({})
    .then(conteudo => {
      res.send({
        message: `${conteudo.deletedCount} contatos foram removidos!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          res.message || "erro ao remover todos os contatos."
      });
    });
};
