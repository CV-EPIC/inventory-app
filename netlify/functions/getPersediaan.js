import { Client } from "pg";

exports.handler = async () => {

const client = new Client({
 connectionString:process.env.DATABASE_URL,
 ssl:{rejectUnauthorized:false}
});

await client.connect();

const result = await client.query(`
SELECT
b.sku,
b.nama_produk,
b.stok_awal,

COALESCE(SUM(pb.qty),0) as stok_masuk,
COALESCE(SUM(pj.qty),0) as stok_keluar,

b.stok_awal
+ COALESCE(SUM(pb.qty),0)
- COALESCE(SUM(pj.qty),0) as stok

FROM barang b

LEFT JOIN pembelian pb
ON pb.sku=b.sku

LEFT JOIN penjualan pj
ON pj.sku=b.sku

GROUP BY
b.sku,
b.nama_produk,
b.stok_awal

ORDER BY b.nama_produk
`);

await client.end();

return{
 statusCode:200,
 body:JSON.stringify(result.rows)
}

};