const express = require('express');
const cors = require('cors');
const app = express();
const mysql = require('mysql2')
const porta = 8000;

const db = mysql.createPool({
    port: 3306,
    database: 'cadastro',
    user: 'root',
    host: 'localhost'
})

app.use(express.json())
app.use(cors())

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) { throw err }

        console.log(results)
        res.status(200).send(results)
    })
})

app.put("/users/:nome/:email/:idade", (req, res) => {
    const nome = req.params.nome;
    const email = req.params.email;
    const idade = req.params.idade;

    db.query(`INSERT INTO users (nome, email, idade) VALUES ('${nome}', '${email}', ${idade})`, (err, results) => {
        if (err) { throw err }

        console.log("INSERIDO COM SUCESSO!")
        res.status(200).send(results)
    })

    // const {nome, email, idade} = req.params
    // console.log(nome, email, idade)

})

app.post("/users/:id", (req, res) => {
    const id = req.params.id //usa-se para passar parâmetros do endereço acima
    const { nome, email, idade } = req.body //Usa-se para passar caracteristicas do objeto
    //res.status(200).send(nome) //Usado p/ verificar as infos passadas pro Axios
    db.query(`UPDATE users SET nome = '${nome}' WHERE id = ${id}`, (err, results) => {
        if(err){throw err}

        res.status(200).send(results)
    })
})

app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    db.query(`DELETE FROM users WHERE id = ${id}`, (err, results) => {
        if (err) { throw err }

        console.log("DELETADO COM SUCESSO!")
        res.status(200).send(results)
    })
})

app.listen(porta, () => {
    console.log(`Rodando na porta ${porta}!`)
})