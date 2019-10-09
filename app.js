const app = require('./config/server');

var server = app.listen(3000, ()=> {
  console.log('servidor online');
});

const io = require('socket.io').listen(server);

app.set('io', io);

io.on('connection', (socket) => {
  console.log('Usuário conectou');

  socket.on('disconnect', ()=>{
    console.log('Usuário desconectou');
  })

  socket.on('msgParaServidor', (data)=>{
    /* Dialogos */
    socket.emit(
      'msgParaCliente', 
      { apelido: data.apelido, mensagem: data.mensagem }
    );
    socket.broadcast.emit(
      'msgParaCliente', 
      { apelido: data.apelido, mensagem: data.mensagem }
    );  

    /* Atualiza participantes */
    if(parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      socket.emit(
        'participantesParaClientes', 
        { apelido: data.apelido }
      );
      socket.broadcast.emit(
        'participantesParaClientes', 
        { apelido: data.apelido }
      );    
    }
    
  })
})