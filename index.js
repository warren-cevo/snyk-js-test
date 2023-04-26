// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true })
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'snyk-test',
    password: 'password'
});

// Declare a route
fastify.get('/', async (request, reply) => {
    const results = await connection.promise().query(
        'SELECT * FROM `users` WHERE id=' + request.query.userId
    );

    return { results: results[0] }
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