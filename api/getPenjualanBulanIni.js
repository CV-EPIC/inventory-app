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
WHERE DATE_TRUNC('month',tanggal)
=
DATE_TRUNC('month',CURRENT_DATE)
`);

await client.end();

res.status(200).json(result.rows[0]);

}catch(err){

res.status(500).json({error:err.message});

}

}