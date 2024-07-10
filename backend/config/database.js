import { Sequelize } from "sequelize";

const db = new Sequelize('laporan_perbaikan', 'root', '', {
    host: 'localhost',
    dialect:'mysql',
})

export default db;