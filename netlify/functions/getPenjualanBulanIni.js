import { Client } from "pg";

exports.handler = async () => {

const client = new Client({
 connectionString:process.env.DATABASE_URL,
 ssl:{rejectUnauthorized:false}
});

await client.connect();

const result = await client.query(`
SELECT
COALESCE(SUM(qty),0) AS total
FROM penjualan
WHERE DATE_TRUNC('month',tanggal)
=
DATE_TRUNC('month',CURRENT_DATE)
`);

await client.end();

return{
 statusCode:200,
 body:JSON.stringify(result.rows[0])
}

};