module.exports = app => {
  const contacts = require('../controllers/contact.controller.js');

  let router = require('express').Router();

  // incluir contato
  router.post('/', contacts.incluir);

  // retornar todos contatos
  router.get("/", contacts.buscarTodos);

  // retorna um contato pelo id
  router.get("/:id", contacts.buscarUm);

  // atualizar contato pela id
  router.put("/:id", contacts.atualizar);

  // remover contato pelo id
  router.delete("/:id", contacts.remover);

  // remover todos os contatos
  router.delete("/", contacts.removerTodos);

  app.use('/api/contatos', router);
}