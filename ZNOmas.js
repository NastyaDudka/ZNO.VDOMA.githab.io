var img1 = new Image();
img1.src = "img/test5.png";
let img2 = new Image();
img2.src = "img/test6.png";
let img3 = new Image();
img3.src = "img/test7.png";
let img4 = new Image();
img4.src = "img/test8.png";
let img5 = new Image();
img5.src = "img/test9.png";
let quest = [img1, img2, img3, img4, img5];
let right_answer = [a4, a4, a1, a3, a4];
let num_img = 0;
let num_ans = 0;
let sum = 0;
document.body.appendChild(quest[num_img]);
btn.addEventListener("click", fnc);
        function fnc(){
            document.body.removeChild(quest[num_img]);
            num_img++;
            document.body.appendChild(quest[num_img]);
        }
btn.addEventListener("click", fnc1);
function fnc1(){
    console.log(a1.checked);
    console.log(a2.checked);
    console.log(a3.checked);
    console.log(a4.checked);
    console.log(a5.checked);
    if (right_answer[num_ans].checked){
        alert("Правильный ответ");
        sum++;
    } else {
        alert("Неверный ответ");
    }
    num_ans++;
if (num_ans == right_answer.length){
    document.body.remove(table);
    alert("Всего баллов:" + sum);
}
}