// func = function
// der = derivative
// exp = expression

let funcInput = document.getElementById("funcinput");
let takeDerButton = document.getElementById("takederbutton");
let derOutput = document.getElementById("deroutput");

class ExpPart{
    constructor(exp, expPartIn, id, func, args){
        this.exp = exp;
        this.expPartIn = expPartIn;
        this.id = id;
        this.func = func;
        this.args = args;
    }
    appendNewExpPart(argIndex, func, args){
        let newExpPart = new ExpPart(this.exp, this, this.exp.expPartCounter, func, args);
        this.exp.expPartCounter ++;
        this.args[argIndex] = newExpPart;
    }
}

// (3x^4*1/2)/3rt(4x)
class Exp{
    constructor(string){
        this.expPart0 = new ExpPart(this, this, 0, "N/A", []);
        this.expPartCounter = 1;
        let doing = "";
        let expPartOn = this.expPart0;
        let expPartArgOn = 0;
        let c = 0;
        let num = "";
        let numBefore = false;
        while (c < string.length) {
            if (string.charCodeAt(c) >= 48 && string.charCodeAt(c) <= 57) {
                num += string[c];
                numBefore = true;
            } else if (numBefore && string[c] == "x") {
                expPartOn.appendNewExpPart(expPartArgOn, "*", [num, "x"]);
                expPartOn = expPartOn.args[expPartArgOn];
                expPartArgOn = 1;
            } else if (string[c] == "^") {
                expPartOn.appendNewExpPart(expPartArgOn, "^", [expPartOn.args[expPartArgOn]]);
                expPartOn = expPartOn.args[expPartArgOn];
                expPartArgOn = 1;
                doing = "^";
            } else if (numBefore && doing == "^") {
                
            }
            c ++;
        }
        console.log(this.expPart0.args[0]);
    }
}

takeDerButton.addEventListener("click", ()=>{
    derOutput.innerText = takeDer(funcInput.value);
});

function takeDer(func){
    new Exp(func);
    return "f '(x) = ";
}