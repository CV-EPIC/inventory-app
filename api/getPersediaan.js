import { Client } from "pg";

export default async function handler(req,res){

const bulan = req.query.bulan || new Date().getMonth()+1;
const tahun = req.query.tahun || new Date().getFullYear();

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

COALESCE(SUM(pb.qty),0) AS stok_masuk,
COALESCE(SUM(pj.qty),0) AS stok_keluar,

b.stok_awal
+ COALESCE(SUM(pb.qty),0)
- COALESCE(SUM(pj.qty),0) AS stok

FROM barang b

LEFT JOIN pembelian pb
ON pb.sku=b.sku
AND EXTRACT(MONTH FROM pb.tanggal)=$1
AND EXTRACT(YEAR FROM pb.tanggal)=$2

LEFT JOIN penjualan pj
ON pj.sku=b.sku
AND EXTRACT(MONTH FROM pj.tanggal)=$1
AND EXTRACT(YEAR FROM pj.tanggal)=$2

GROUP BY
b.sku,
b.nama_produk,
b.stok_awal
ORDER BY b.sku
`,[bulan,tahun]);

await client.end();

res.status(200).json(result.rows);

}