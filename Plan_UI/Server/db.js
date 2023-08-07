const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "Sahba12",
    host: "localhost",
    port: 5432,
    database: "margoplan"
});

const createDatabase = async (margoplan) => {
    const checkDbQuery = `
        SELECT 1
        FROM pg_database
        WHERE datname = $1
    `;
    const createDbQuery = `
        CREATE DATABASE ${margoplan}
    `;

    try {
        const { rows } = await pool.query(checkDbQuery, [margoplan]);

        if (rows.length === 0) {
            await pool.query(createDbQuery);
            return 'Database created successfully';
        } else {
            return 'Database already exists';
        }
    } catch (error) {
        console.error('Error creating database:', error);
        throw error;
    }
};

const createTable = async (margoplan) => {
    const createTableQuery = `
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            first_name VARCHAR(240) NOT NULL,
            last_name VARCHAR(240) NOT NULL,
            company VARCHAR(240) NOT NULL,
            address_ VARCHAR(500) NOT NULL,
            mobile_no VARCHAR(50) NOT NULL,
            email VARCHAR(240) NOT NULL,
            password_ VARCHAR(240) NOT NULL
        );
    `;

    try {
        // Close the existing pool
        await pool.end();

        // Create a new pool instance with the updated database
        const newPool = new Pool({
            user: "postgres",
            password: "Sahba12",
            host: "localhost",
            port: 5432,
            database: newDatabase
        });

        await newPool.query(createTableQuery);
        console.log('Table created successfully');

        // Reassign the new pool instance to the original variable
        Object.assign(pool, newPool);
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
};

const switchDatabase = async (newDatabase) => {
    try {
        // Close the existing pool
        await pool.end();

        // Create a new pool instance with the updated database
        const newPool = new Pool({
            user: "postgres",
            password: "Sahba12",
            host: "localhost",
            port: 5432,
            database: newDatabase
        });

        // Reassign the new pool instance to the original variable
        Object.assign(pool, newPool);

        console.log(`Switched to database: ${newDatabase}`);
    } catch (error) {
        console.error('Error switching database:', error);
        throw error;
    }
};

// Example usage
createDatabase('margoplan')
    .then((result) => {
        // Switch to the newly created database
        if (result === 'Database created successfully') {
            createTable('margoplan'); // Create the table in the new database
        } else if (result === 'Database already exists') {
            switchDatabase('margoplan');
        }
    })
    .catch((error) => {
        console.error('Error creating database:', error);
        throw error; // Handle error
    });

module.exports = pool;

