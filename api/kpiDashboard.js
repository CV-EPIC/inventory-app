import { Client } from "pg";

exports.handler = async () => {

const client = new Client({
 connectionString: process.env.DATABASE_URL,
 ssl:{ rejectUnauthorized:false }
});

try{

await client.connect();

const totalProduk = await client.query(`
SELECT COUNT(*) FROM barang
`);

const totalStok = await client.query(`
SELECT SUM(stok_awal) FROM barang
`);

const stokTipis = await client.query(`
SELECT COUNT(*) FROM barang WHERE stok_awal < 10
`);

const penjualan = await client.query(`
SELECT COALESCE(SUM(qty),0)
FROM penjualan
WHERE DATE_TRUNC('month',tanggal) = DATE_TRUNC('month',CURRENT_DATE)
`);

await client.end();

return{
 statusCode:200,
 body:JSON.stringify({
  totalProduk: totalProduk.rows[0].count,
  totalStok: totalStok.rows[0].sum,
  stokTipis: stokTipis.rows[0].count,
  penjualan: penjualan.rows[0].coalesce
 })
};

}catch(err){

return{
 statusCode:500,
 body:JSON.stringify({error:err.message})
};

}

};