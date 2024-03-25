let paymentCardOption:HTMLElement|null;
let paymentCardForm:HTMLElement|null;
let paymentLoadingContainer:HTMLElement|null;
let pymentLoginContent:HTMLElement|null;
let paymentHeaderText:HTMLElement|null;
let procceedButton:HTMLElement|null;
let proceedButtonContainer:HTMLElement|null;
let payNowButtonContainer:HTMLElement|null;
let paymentSucccess:HTMLElement|null;
document.addEventListener('DOMContentLoaded', function() {
     paymentCardOption=document.getElementById("payment-card-option");
     paymentCardForm=document.getElementById("payment-card-form-content");
     paymentSucccess=document.getElementById("payment-success");
     paymentLoadingContainer=document.getElementById("payment-loading-container");
     pymentLoginContent=document.getElementById("payment-login-content");
     paymentHeaderText=document.getElementById("payment-header");
     procceedButton=document.getElementById("proceed-button");
     proceedButtonContainer=document.getElementById("proceed-button-container");
     payNowButtonContainer=document.getElementById("pay-now-button-container");

     procceedButton.onclick=proceedButtonClick;
     hideAllElements();
     paymentHeaderText.innerText="";
     pymentLoginContent.style.display="block";
     proceedButtonContainer.style.display="block";
}, false);
 

function proceedButtonClick(event){
    hideAllElements();
    paymentCardOption.style.display="block"
    payNowButtonContainer.style.display="flex";
    paymentHeaderText.innerText="But T Shirt";
}

async function paymentCardOptionClicked(){
    this.hideAllElements();
    paymentLoadingContainer.style.display="block";
    await sleep(1000);
    this.hideAllElements();
    paymentCardForm
    .style.display="block";
    payNowButtonContainer.style.display="flex";
    paymentHeaderText.innerText="But T Shirt";

}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms));
}

async function payNowButtonClick(){
    this.hideAllElements();
    paymentLoadingContainer.style.display="block";
    await fetch("http://localhost:8123/payments/add_payment",{
        method:"POST",
        body:JSON.stringify({
            "card":document.querySelector("input[placeholder='Card Number']"),
            "expiry":document.querySelector("input[placeholder='Expiry']"),
            "cvv":document.querySelector("input[placeholder='CVV']")
        })
    },);
    this.hideAllElements();
    paymentSucccess.style.display="flex";
}

function hideAllElements(){
    paymentCardOption.style.display="none"
     paymentCardForm.style.display="none";
     paymentSucccess.style.display="none";
     paymentLoadingContainer.style.display="none";
     pymentLoginContent.style.display="none"
     payNowButtonContainer.style.display="none"
     proceedButtonContainer.style.display="none"
}
