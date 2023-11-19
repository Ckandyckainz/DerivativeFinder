// func = function
// der = derivative
// exp = expression
// paren = parenthesis

let funcInput = document.getElementById("funcinput");
let takeDerButton = document.getElementById("takederbutton");
let derOutput = document.getElementById("deroutput");

// (x+1)+(x+2)
// ((2*(x^2))+(3*(x^(1/4))))+1
class Exp{
    constructor(string){
        let callStack = []
        let exp = splitByParenNested([string])[0];
        while (callStack.length > 0) {
            let callStackItem = callStack[callStack.length-1];
            callStack.splice(callStack.length-1, 1);
            splitByParenNested(callStackItem);
        }
        console.log(exp);
        
        function splitByParenNested(array){
            for (let i=0; i<array.length; i++) {
                array[i] = splitByParen(array[i]);
                if (Array.isArray(array[i])) {
                    callStack.push(array[i]);
                }
            }
            return array;
        }

        function splitByParen(str){
            let openIndex;
            let closeIndex;
            let opens = 0;
            let closes = 0;
            for (let i=0; i<str.length && closeIndex == undefined; i++) {
                if (str[i] == "(") {
                    opens ++;
                    if (opens == 1) {
                        openIndex = i;
                    }
                } else if (str[i] == ")") {
                    closes ++;
                    if (opens == closes) {
                        closeIndex = i;
                    }
                }
            }
            let toReturn;
            if (opens == 0) {
                toReturn = str;
            } else {
                toReturn = [
                    str.slice(0, openIndex),
                    str.slice(openIndex+1, closeIndex),
                    str.slice(closeIndex+1, str.length)
                ];
            }
            return toReturn;
        }
    }
}

takeDerButton.addEventListener("click", ()=>{
    derOutput.innerText = takeDer(funcInput.value);
});

function takeDer(func){
    new Exp(func);
    return "f '(x) = ";
}