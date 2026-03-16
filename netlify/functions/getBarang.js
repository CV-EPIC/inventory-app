import { Client } from "pg";

exports.handler = async () => {

const client = new Client({
 connectionString: process.env.DATABASE_URL,
 ssl:{ rejectUnauthorized:false }
});

await client.connect();

const result = await client.query(`
 SELECT sku,nama_produk,stok_awal
 FROM barang
 ORDER BY nama_produk
`);

await client.end();

return{
 statusCode:200,
 body:JSON.stringify(result.rows)
};

};