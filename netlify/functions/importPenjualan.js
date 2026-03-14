const { Client } = require("pg");

exports.handler = async (event) => {

let data = [];

try {
  data = JSON.parse(event.body || "[]");
} catch {
  return {
    statusCode: 400,
    body: JSON.stringify({ error: "Invalid JSON" })
  };
}

const client = new Client({
connectionString: process.env.DATABASE_URL,
ssl:{rejectUnauthorized:false}
});

await client.connect();

for (const row of data){

await client.query(
`INSERT INTO penjualan (tanggal,no_po,outlet,sku,qty)
VALUES ($1,$2,$3,$4,$5)`,
[row.tanggal,row.no_po,row.outlet,row.sku,row.qty]
);

}

await client.end();

return{
statusCode:200,
body:JSON.stringify({message:"Import berhasil"})
};

};