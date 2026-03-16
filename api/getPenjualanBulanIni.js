import { Client } from "pg";

export default async function handler(req,res){

const client = new Client({
 connectionString:process.env.DATABASE_URL,
 ssl:{rejectUnauthorized:false}
});

await client.connect();

try{

const result = await client.query(`
SELECT
COALESCE(SUM(qty),0) AS total
FROM penjualan
WHERE EXTRACT(MONTH FROM tanggal) = $1
AND EXTRACT(YEAR FROM tanggal) = $2
`,[bulan,tahun]);

await client.end();

res.status(200).json(result.rows[0]);

}catch(err){

res.status(500).json({error:err.message});

}

}