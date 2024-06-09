var container = document.querySelector(".container");
container.addEventListener('click', function(event) {
    if (event.target.tagName === "BUTTON") {
        if(event.target.textContent!='=')
        document.querySelector("textarea").value += event.target.textContent;
    }
});

var prefix = ""; 
var stack = [];
var postfix="";
function cal() {
    prefix = document.querySelector("textarea").value;
    console.log(prefix)
    pre_to_pos();
    console.log(postfix)
    pos_eval();
}

function pre_to_pos() {
    for (let i = 0; i < prefix.length; i++) {
        if (!isNaN(parseInt(prefix[i]))) {
            postfix += prefix[i]; 
        } else {
            while (stack.length > 0 && priority(prefix[i]) <= priority(stack[stack.length - 1])) {
                postfix += stack.pop();
            }
            stack.push(prefix[i]); 
        }
    }
    while (stack.length > 0) {
        postfix += stack.pop();
}
}
function priority(val) {
    if (val === '/' || val === '*') {
        return 1;
    } else if (val === '+' || val === '-') {
        return 0;
    }
}

function pos_eval() {
    var stack = [];
    for (var i = 0; i < postfix.length; i++) {
        var token = postfix[i];
        if (!isNaN(parseInt(token))) { 
            stack.push(parseInt(token));
        } else {
            var operand2 = stack.pop();
            var operand1 = stack.pop();
            var result;
            switch (token) {
                case '+':
                    result = operand1 + operand2;
                    break;
                case '-':
                    result = operand1 - operand2;
                    break;
                case '*':
                    result = operand1 * operand2;
                    break;
                case '/':
                    result = operand1 / operand2;
                    break;
                default:
                    console.log("Invalid operator");
                    return;
            }
            stack.push(result);
        }
    }
    var finalResult = stack.pop();
    document.querySelector("textarea").value = finalResult;
} 


document.querySelector("#calc").addEventListener('click', cal);
