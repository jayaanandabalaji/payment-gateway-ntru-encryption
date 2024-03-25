let transactionsTable:HTMLElement|null;

document.addEventListener('DOMContentLoaded', function() {
    transactionsTable=document.getElementById("transactions");
    getTransactions()

}, false);

function timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  

async function getTransactions(){
    const response=await fetch("http://localhost:8123/payments/get_transactions");
    const jsonRes=await response.json();
    for(let j=0;j<jsonRes.length;j++){
        const tr=document.createElement("tr");
        for(let i=0;i<4;i++){
            const td=document.createElement("td");
            if(i==0){
                td.innerText=(i+1).toString();
            }
            else if(i==1){
                td.innerText=timeConverter(jsonRes[j]["time"]["_seconds"])
            }else if(i==2){
                td.innerText=jsonRes[j]["amount"].toString()
            }else{
                if(j+1==jsonRes.length){
                    td.innerText="Recurring"
                }else{
                    td.innerText="One-Time"
                }
            }
            
            tr.appendChild(td);
            
        }
        transactionsTable.appendChild(tr);
    }
}