import { Client } from "pg";

export default async function handler(req,res){

const {table,data} = req.body;

if(!data || data.length===0){
 return res.status(400).json({error:"data kosong"});
}

const client = new Client({
 connectionString:process.env.DATABASE_URL,
 ssl:{rejectUnauthorized:false}
});

await client.connect();

try{

for(const row of data){

const keys = Object.keys(row);
const values = Object.values(row);
const params = keys.map((_,i)=>"$"+(i+1));

const query = `
INSERT INTO ${table} (${keys.join(",")})
VALUES (${params.join(",")})
`;

await client.query(query,values);

}

await client.end();

res.status(200).json({success:true});

}catch(err){

res.status(500).json({error:err.message});

}

}