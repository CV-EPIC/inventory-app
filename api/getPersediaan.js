import { Client } from "pg";

export default async function handler(req, res) {

const client = new Client({
 connectionString: process.env.DATABASE_URL,
 ssl: { rejectUnauthorized: false }
});

await client.connect();

try {

const result = await client.query(`
SELECT
b.sku,
b.nama_produk,
b.stok_awal,

COALESCE(SUM(pb.qty),0) AS stok_masuk,
COALESCE(SUM(pj.qty),0) AS stok_keluar,

b.stok_awal
+ COALESCE(SUM(pb.qty),0)
- COALESCE(SUM(pj.qty),0) AS stok

FROM barang b

LEFT JOIN pembelian pb
ON pb.sku = b.sku

LEFT JOIN penjualan pj
ON pj.sku = b.sku

GROUP BY
b.sku,
b.nama_produk,
b.stok_awal

ORDER BY b.sku
`);

await client.end();

res.status(200).json(result.rows);

} catch(err){

console.error(err);
res.status(500).json({error:err.message});

}

}