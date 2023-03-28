import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Axios from 'axios';
import logo from './logo.svg';
import './App.css';

import BasicModal from './components/Modal/modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#modal');

function App() {
  const [Dados, setDados] = useState([])
  const [Input, setInput] = useState({
    id: 0,
    nome: '',
    email: '',
    idade: 0
  })
  const [Nome, setNome] = useState('')
  const [NovoNome, setNovoNome] = useState('')
  const [Email, setEmail] = useState('')
  const [Idade, setIdade] = useState(0)


  Axios.get("http://localhost:8000/users")
    .then((results) => {
      //console.log(results.data)
      setDados(results.data)
    })
    .catch((error) => {
      console.log(error)
    })

  async function Inserir(nome, email, idade) {
    //console.log(Dados)

    await Axios.put(`http://localhost:8000/users/${nome}/${email}/${idade}`)
      .then((results) =>
        alert("Dados inseridos com sucesso!"))
      .catch((erro) =>
        console.log(erro))

    // console.log(`http://localhost:8000/users/${nome}/${email}/${idade}`)
  }

  async function Apagar(id) {
    await Axios.delete(`http://localhost:8000/users/${id}`)
      .then((results) => {
        alert("DADOS APAGADOS!")
      })
      .catch((erro) => {
        console.log(erro)
      })
  }

  async function Editar(id, enome, eemail, eidade) {
    await Axios.post(`http://localhost:8000/users/${id}`, { nome: `${enome}` })
      .then((results) => {
        // console.log(results)
        alert("ATUALIZADO COM SUCESSO!");
        closeModal();
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //RELACIONADO AO MODAL

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal(mid, mnome, memail, midade) {
    setInput({ id: mid, nome: mnome, email: memail, idade: midade });
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="App">
      <h1>CRUD / MySQL</h1>

      <div className='Caixainserir'>
        {/* <input placeholder='Nome' defaultValue={''} onChange={(value) => setNome(value.target.value)}></input> */}
        {/* <input placeholder='Email' defaultValue={''} onChange={(value) => setEmail(value.target.value)}></input> */}
        {/* <input placeholder='Idade' defaultValue={0} onChange={(value) => setIdade(value.target.value)}></input> */}

        <TextField id="standard-basic" label="Nome" variant="standard" defaultValue={''} onChange={(value) => setNome(value.target.value)} />
        <TextField id="standard-basic" label="Email" variant="standard" defaultValue={''} onChange={(value) => setEmail(value.target.value)} />
        <TextField id="standard-basic" label="Idade" variant="standard" type="number" defaultValue={0} onChange={(value) => setIdade(value.target.value)} />

        {/* <button onClick={() => (Inserir(Nome, Email, Idade))}>Inserir</button> */}
        <Button variant="outlined" onClick={() => (Inserir(Nome, Email, Idade))}>Inserir</Button>

        {/* <button onClick={() => (alert(Email,Idade))}>Inserir</button> */}
      </div>

      <div className='Caixadados'>
        <header className='header'>
          <text className='titulos'>Nome</text>
          <text className='titulos'>Email</text>
          <text className='titulos'>Idade</text>
          <text className='titulos'>Apagar / Editar</text>
        </header>

        <div className='conteudo'>
          {
            Dados.map((dados) => {
              return (
                <div>

                  <div className='dados'>

                    <text className='Textdados'>{dados.nome}</text>
                    {/* <input defaultValue={dados.nome} onChange={(value) => setNovoNome(value.target.value)}></input> */}
                    <text className='Textdados'>{dados.email}</text>
                    <text className='Textdados'>{dados.idade}</text>

                    <div className='Textdados'>
                      <button value={dados.id} onClick={() => (Apagar(dados.id))}>X</button>
                      {/* <button onClick={() => (Editar(dados.id, NovoNome))}>Editar</button> */}

                      <button onClick={() => openModal(dados.id, dados.nome, dados.email, dados.idade)}>Editar</button>

                    </div>

                  </div>

                  <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                  >
                    <h2 ref={(_subtitle) => (subtitle = _subtitle)}>{Input.nome}</h2>

                    <form>

                      <input defaultValue={Input.nome} onChange={(value) => setNovoNome(value.target.value)}></input>
                      <input defaultValue={Input.email} onChange={(value) => setEmail(value.target.value)}></input>
                      <input defaultValue={Input.idade} onChange={(value) => setIdade(value.target.value)}></input>

                      <button onClick={() => (Editar(Input.id, NovoNome))}>Salvar</button>
                      <button onClick={closeModal}>Cancelar</button>
                    </form>
                  </Modal>

                </div>
              )
            })
          }
        </div>

      </div>

    </div>
  );
}

//ReactDOM.render(<App />, document.getElementById('modal'));

export default App;
