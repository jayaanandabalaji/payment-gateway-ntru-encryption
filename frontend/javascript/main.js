var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var paymentCardOption;
var paymentCardForm;
var paymentLoadingContainer;
var pymentLoginContent;
var paymentHeaderText;
var procceedButton;
var proceedButtonContainer;
var payNowButtonContainer;
var paymentSucccess;
document.addEventListener('DOMContentLoaded', function () {
    paymentCardOption = document.getElementById("payment-card-option");
    paymentCardForm = document.getElementById("payment-card-form-content");
    paymentSucccess = document.getElementById("payment-success");
    paymentLoadingContainer = document.getElementById("payment-loading-container");
    pymentLoginContent = document.getElementById("payment-login-content");
    paymentHeaderText = document.getElementById("payment-header");
    procceedButton = document.getElementById("proceed-button");
    proceedButtonContainer = document.getElementById("proceed-button-container");
    payNowButtonContainer = document.getElementById("pay-now-button-container");
    procceedButton.onclick = proceedButtonClick;
    hideAllElements();
    paymentHeaderText.innerText = "";
    pymentLoginContent.style.display = "block";
    proceedButtonContainer.style.display = "block";
}, false);
function proceedButtonClick(event) {
    hideAllElements();
    paymentCardOption.style.display = "block";
    payNowButtonContainer.style.display = "flex";
    paymentHeaderText.innerText = "But T Shirt";
}
function paymentCardOptionClicked() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.hideAllElements();
                    paymentLoadingContainer.style.display = "block";
                    return [4 /*yield*/, sleep(1000)];
                case 1:
                    _a.sent();
                    this.hideAllElements();
                    paymentCardForm
                        .style.display = "block";
                    payNowButtonContainer.style.display = "flex";
                    paymentHeaderText.innerText = "But T Shirt";
                    return [2 /*return*/];
            }
        });
    });
}
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function payNowButtonClick() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    this.hideAllElements();
                    paymentLoadingContainer.style.display = "block";
                    return [4 /*yield*/, fetch("http://localhost:8123/payments/add_payment", {
                            method: "POST",
                            body: JSON.stringify({
                                "card": document.querySelector("input[placeholder='Card Number']"),
                                "expiry": document.querySelector("input[placeholder='Expiry']"),
                                "cvv": document.querySelector("input[placeholder='CVV']")
                            })
                        })];
                case 1:
                    _a.sent();
                    this.hideAllElements();
                    paymentSucccess.style.display = "flex";
                    return [2 /*return*/];
            }
        });
    });
}
function hideAllElements() {
    paymentCardOption.style.display = "none";
    paymentCardForm.style.display = "none";
    paymentSucccess.style.display = "none";
    paymentLoadingContainer.style.display = "none";
    pymentLoginContent.style.display = "none";
    payNowButtonContainer.style.display = "none";
    proceedButtonContainer.style.display = "none";
}
