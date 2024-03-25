import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getFirestore, Timestamp, FieldValue, Filter } from 'firebase-admin/firestore';
// import firebaseAccountCredentials from './payment-gateway.json' assert { type: "json" }
import express from 'express';
import ntru from 'ntru-legacy';

const router=express.Router()

router.post("/add_payment",async(req,res)=>{
    const card=req.body.card;
    const expiry=req.body.expiry;
    const cvv=req.body.cvv;
    await addToPayment(card,expiry,cvv);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("payment added successfully");
    return
})

router.get("/get_transactions",async(req,res)=>{
    const db=initFirebase();
    const transCol=db.collection('transactions');
    const data=await transCol.get();
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.send(data.docs.map(doc=>doc.data()));
})

router.get("/generate-key-pair",async(req,res)=>{
    const keyPair=await ntru.keyPair();
    res.send({
        keyPair
    });
})

function convertKeyToString(intList){
    let arr=[]
    for(const key in intList){
        arr.push(intList[key])
    }
    return arr.toString();
}

function convertStringToKey(string){
    let arr=[];
    let ind=1;
    const arr1=string.split(",");
    for(const val in arr1){
        arr.push(parseInt(arr1[val]))
    }
    return Uint8Array.from(arr);
}

async function addToPayment(card,expiry,cvv){
    const db=initFirebase();
    const merId="T03odNEnNmRSh4Kd8Ds5";
    const merCol=db.collection('merchants');
    let merchant=await merCol.doc(merId).get()
    merchant=merchant.data()
    let publicKey=merchant.publicKey;
    publicKey=convertStringToKey(publicKey);
    let privateKey=merchant.privateKey;
    privateKey=convertStringToKey(privateKey);
    const transCol=db.collection('transactions');
    const cardNo=await encryptPlainText(publicKey,card);
    const expiryEnc=await encryptPlainText(publicKey,expiry);
    const cvvEnc=await encryptPlainText(publicKey,cvv)
    transCol.add({
        amount:"1",
        time:Timestamp.now(),
        cardNo:cardNo.toString(),
        expiry:expiryEnc.toString(),
        cvv:cvvEnc.toString()
    });
}

let gdb=null;
function initFirebase(){
    if(gdb){
        return gdb;
    }
const serviceAccount = ""

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();
gdb=db;
return db;
}

async function encryptPlainText(publicKey,plainText){
    const encrypted  =await ntru.encrypt(new TextEncoder().encode(plainText), publicKey);
    return encrypted;
}

async function decryptEncrypted(privateKey,cipherText){
    const decrypted  =await ntru.decrypt(encrypted,privateKey) ;
    return new TextDecoder().decode(decrypted);
}

export default router