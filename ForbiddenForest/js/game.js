function getEquation() {
    Math.floor((Math.random() * 4) + 1);
    if (number == 1) {
       // addition problem 
        num1 = Math.floor((Math.random() * 50) + 1);
        num2 = Math.floor((Math.random() * 50) + 1);
        equation = num1.toString() + ' plus ' + num2.toString();
        answer = num1+num2;
    }else if (number == 2) {
       // subtraction problem 
        num1 = Math.floor((Math.random() * 50) + 1);
        num2 = Math.floor((Math.random() * 50) + 1);
        equation = Math.max(num1,num2).toString + ' minus ' +  Math.min(num1,num2).toString;
        answer = Math.max(num1,num2)-Math.min(num1,num2);
    }else if (number == 3) {
        num1 = Math.floor((Math.random() * 15) + 1);
        num2 = Math.floor((Math.random() * 15) + 1);
        equation = num1.toString() + ' multiplied by ' + num2.toString();
        answer = num1 * num2;
    }else {
        num1 = Math.floor((Math.random() * 15) + 1);
        answer = Math.floor((Math.random() * 15) + 1);
        num2 = num1 * answer;
        equation = num2.toString + ' divided by ' + num1.toString();
    } return equation, answer;
}