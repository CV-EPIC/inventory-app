const { Client } = require("pg");

exports.handler = async () => {

const client = new Client({
connectionString: process.env.DATABASE_URL,
ssl: { rejectUnauthorized: false }
});

await client.connect();

const sales = await client.query(`
SELECT SUM(qty*harga) as total_sales
FROM penjualan
WHERE tanggal = CURRENT_DATE
`);

const trx = await client.query(`
SELECT COUNT(*) as total_transaksi
FROM penjualan
WHERE tanggal = CURRENT_DATE
`);

const qty = await client.query(`
SELECT SUM(qty) as total_qty
FROM penjualan
WHERE tanggal = CURRENT_DATE
`);

await client.end();

return {
statusCode:200,
body:JSON.stringify({
sales: sales.rows[0].total_sales || 0,
transaksi: trx.rows[0].total_transaksi || 0,
qty: qty.rows[0].total_qty || 0
})
};

};