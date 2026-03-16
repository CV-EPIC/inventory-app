import { Client } from "pg";

exports.handler = async (event) => {

if(!event.body){
 return {
  statusCode:200,
  body:"ImportCSV function ready"
 };
}

let body;

try{
 body = JSON.parse(event.body);
}catch(err){
 return{
  statusCode:400,
  body:JSON.stringify({error:"Format JSON tidak valid"})
 }
}

const table = body.table;
const data = body.data;

if(!data || data.length === 0){
 return{
  statusCode:400,
  body:JSON.stringify({error:"data kosong"})
 }
}

const client = new Client({
 connectionString: process.env.DATABASE_URL,
 ssl:{ rejectUnauthorized:false }
});

await client.connect();

try{

for(const row of data){
if(row.qty <= 0){
 continue;
}
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

return{
 statusCode:200,
 body:JSON.stringify({success:true})
}

}catch(err){

return{
 statusCode:500,
 body:JSON.stringify({error:err.message})
}

}

};