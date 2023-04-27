// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mysql = require('mysql2');

const password = 'password';
const secret = "secret";

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'snyk-test',
    password
});

const AWS_ACCESS_KEY_ID="AKIAJWY3D3GJ6N4UTEST"
const AWS_SECRET_ACCESS_KEY="CmeRfzYcE2lD1z8AeKkM1E4j9G4fW8o5H2xLTEST"

// Declare a route
fastify.get('/', async (request, reply) => {
    const results = await connection
        .promise()
        .query('SELECT * FROM `users` WHERE id=' + request.query.userId);

    return { results: results[0] }
})

// Declare a secret route
fastify.get('/secret', async (request, reply) => {
    while (true) {
        console.log(request.query.username)
    }

    return {
        status: 200,
    };
})

// Run the server!
const start = async () => {
    try {
        await fastify.listen({ port: 3000 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()