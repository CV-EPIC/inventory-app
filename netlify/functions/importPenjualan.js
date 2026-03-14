const { Client } = require("pg");

exports.handler = async (event) => {

let data = [];

try {
data = JSON.parse(event.body || "[]");
} catch (err) {
return {
statusCode: 400,
body: JSON.stringify({ error: "JSON tidak valid" })
};
}

if (!Array.isArray(data) || data.length === 0) {
return {
statusCode: 400,
body: JSON.stringify({ error: "Data kosong" })
};
}

const client = new Client({
connectionString: process.env.DATABASE_URL,
ssl: { rejectUnauthorized: false }
});

try {

await client.connect();

for (const row of data){

await client.query(
`INSERT INTO penjualan (tanggal,no_po,outlet,sku,qty)
VALUES ($1,$2,$3,$4,$5)`,
[
new Date(row.tanggal),
row.no_po,
row.outlet,
row.sku,
parseInt(row.qty) || 0
]
);

}


await client.end();

return {
statusCode: 200,
body: JSON.stringify({ message: "Import berhasil" })
};

} catch (err) {

return {
statusCode: 500,
body: JSON.stringify({ error: err.message })
};

}

};