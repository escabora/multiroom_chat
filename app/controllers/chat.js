module.exports.iniciaChat = (application, req, res) => {

  const dadosForm = req.body;
  req.assert('apelido','Nome ou apelido é obrigatório!').notEmpty();
  req.assert('apelido','Nome ou apelido deve conter entre 3 e 15 caracteres.').len(3,15);

  const erros = req.validationErrors();

  if(erros) {
    res.render('index', {validacao: erros} );
    return;
  }

  //recupera variavel io declarada no app.js com app.set() do express
  application.get('io').emit(
    'msgParaCliente',
    {apelido: dadosForm.apelido, mensagem: ' acabou de entrar no chat'}
  )



  res.render('chat', {dadosform: dadosForm});
}
