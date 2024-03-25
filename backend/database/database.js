import mysql2 from 'mysql2';

const sqlPool=mysql2.createPool(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'payment_table'
    }
);


export async function addToPayment(card,expiry,cvv){
   try{
    const result=sqlPool.execute(
        "INSERT INTO `payment_table` (`id`, `card`, `expiry`, `cvv`) VALUES (?, ?, ?, ?);",[
            generateId(),card,expiry,cvv
        ]
    );
    console.log(result);
   }catch(e){
    console.log(e);
   }
}

function generateId(){
    const random=(min,max)=>Math.floor(Math.random()*(max-min))+min;
    return random(100000000,999999999);    
}
