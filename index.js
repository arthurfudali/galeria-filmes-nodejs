import express from "express";
import multer from "multer";
const app = express();
import connection from "./config/sequelize-config.js";
import Filme from "./models/Filme.js";
app.use(express.static("public"));
app.set("view engine", "ejs");

connection.authenticate()
  .then(() => {
    console.log("Conexão com o BD feita com sucesso!");
  })
  .catch((error) => {
    console.log(error);
  });

// Criando o banco de dados se ele não existir:
connection.query(`CREATE DATABASE IF NOT EXISTS letterboxd`)
  .then(() => {
    console.log("Banco de dados está criado!");
  })
  .catch((error) => {
    console.log(error);
  });
const upload = multer({ dest: "public/uploads/" });
app.get("/", (req, res) => {
  Filme.findAll().then((filmes) => {
    res.render("index", {
      filmes: filmes,
    });
  });
});

app.post("/upload", upload.single("file"), (req,res)=>{
    const file = req.file.filename;
    const {titulo, diretor, duracao, ano} = req.body;
    Filme.create({
        titulo: titulo,
        diretor: diretor,
        duracao: duracao,
        ano: ano,
        file: file
    });
    res.redirect("/")
});

const port = 8081;
app.listen(port, (error)=>{
    if(error){
        console.log("Ocorreu um erro: "+ error)
    }else{
        console.log("Servidor iniciado em: http://localhost:"+port);
    }
});
