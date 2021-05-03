const Database = require("./config");


const initDb = {
  async init() {

    const db = await Database();

    await db.exec(`
      CREATE TABLE profile (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        avatar TEXT,
        monthly_budget INT,
        hours_per_day INT,
        days_per_week INT,
        vacation_per_year INT,
        hour_value INT
      )`);

    await db.exec(`
      CREATE TABLE job (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        daily_hours INT,
        total_hours INT,
        created_at DATETIME
      )`);

    await db.run(`
      INSERT INTO profile (
        name,
        avatar,
        monthly_budget,
        hours_per_day,
        days_per_week,
        vacation_per_year
      ) VALUES (
        "Renato",
        "https://github.com/zembrani.png",
        5000,
        3,
        4,
        4
      );
    `);

    await db.run(`
      INSERT INTO job (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "Cafeteria",
        3,
        47,
        date('now')
      )
    `);
    // 1617514376018

    await db.run(`
      INSERT INTO job (
        name,
        daily_hours,
        total_hours,
        created_at
      ) VALUES (
        "Pizzaria",
        2,
        10,
        date('now')
      )
    `);

    await db.close();
  },
};

initDb.init();