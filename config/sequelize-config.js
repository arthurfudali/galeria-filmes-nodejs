import { Sequelize } from "sequelize";

const connection = new Sequelize({
    dialect:'mysql',
    host:'localhost',
    username:'root',
    password:'',
    // a linha 'database' é comentada so na primeira execução da aplicação pois o banco ainda nao esta criado
    database: 'letterboxd', 
    timezone: '-03:00'
});
export default connection;