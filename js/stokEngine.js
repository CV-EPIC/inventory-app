function hitungStok(produk, pembelian, penjualan){

return produk.map(item=>{

const beli = pembelian
.filter(p=>p.sku === item.sku)
.reduce((a,b)=>a + b.qty,0)

const jual = penjualan
.filter(p=>p.sku === item.sku)
.reduce((a,b)=>a + b.qty,0)

const stok = item.stok_awal + beli - jual

return {
...item,
pembelian: beli,
penjualan: jual,
stok: stok
}

})

}

const produk = [
{sku:"100001", nama:"Biru L", stok_awal:17},
{sku:"100002", nama:"Biru M", stok_awal:14}
]

const pembelian = [
{sku:"100001", qty:10},
{sku:"100001", qty:5},
{sku:"100002", qty:7}
]

const penjualan = [
{sku:"100001", qty:4},
{sku:"100002", qty:2}
]

const hasil = hitungStok(produk,pembelian,penjualan)

console.log(hasil)