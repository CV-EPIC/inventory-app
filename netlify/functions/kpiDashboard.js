const { Client } = require("pg");

exports.handler = async () => {

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

try {

  await client.connect();

  const result = await client.query(`
    SELECT 
      COALESCE(SUM(qty),0) as total_produk
    FROM penjualan
  `);

  await client.end();

  return {
    statusCode: 200,
    body: JSON.stringify({
      produk: result.rows[0].total_produk
    })
  };

} catch (err) {

  return {
    statusCode: 500,
    body: JSON.stringify({
      error: err.message
    })
  };

}
};