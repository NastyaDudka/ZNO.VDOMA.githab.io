var img1 = new Image();
img1.src = "matematika_2016_5.png";
let img2 = new Image();
img2.src = "1_matematika_2016_6.png";
let img3 = new Image();
img3.src = "matematika_2016_12.png";
let img4 = new Image();
img4.src = "matematika_2016_13.png";
let quest = [img1, img2, img3, img4];
let right_answer = [a4, a5, a4, a1]
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
    if (right_answer[num_ans].checked){
        alert("Right answer");
        sum++;
    } else {
        alert("Wrong answer");
    }
    num_ans++;
if (num_ans == right_answer.length){
    document.body.remove(tab);
    alert("Правильных ответов : " + sum);
}
}