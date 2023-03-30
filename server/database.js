const sqlite3 = require('sqlite3').verbose();

class Database{
    db
    constructor(){
         // Open a new database connection (or reuse an existing one)
        this.db = new sqlite3.Database('neonStore.db');

        // Check if the table exists (or create it if it doesn't)
        this.db.serialize(() => {
        this.db.run(`CREATE TABLE IF NOT EXISTS ITEMS (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            phone TEXT,
            image TEXT,
            width REAL,
            height REAL,
            price REAL,
            elements INTEGER
        )`);
        });

    }

    addOrder(phone, image, width, height, price, elements){
        const db = this.db
        db.serialize(() => {
           db.run('BEGIN TRANSACTION');
            db.run(`INSERT INTO ITEMS (phone, image, width, height, price, elements)
                    VALUES (?, ?, ?, ?, ?, ?)`, [phone, image, width, height, price, elements], function(err) {
            if (err) {
                console.log(err.message);
                db.run('ROLLBACK');
            } else {
                console.log(`A row has been inserted with rowid ${this.lastID}`);
                db.run('COMMIT');
                return this.lastID
            }
            });
        });
    }
       
    
    
    async select(columns, table, optional = ''){
        return new Promise((resolve, reject) => {
            this.db.all(`SELECT ${columns} FROM ${table} ${optional}`, [], function(err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
}

exports.Database = Database