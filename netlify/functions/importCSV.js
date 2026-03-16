import { Client } from "pg";

exports.handler = async (event) => {

const body = JSON.parse(event.body);

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