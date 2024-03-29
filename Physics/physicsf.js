const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 2),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Вы в совершенстве знаете тему", 6)
];

//Массив с вопросами
const questions = 
[
	new Question("Укажіть ситуацію, у якій вага тіла більша за силу тяжіння, що діє на тіло.", 
	[
		new Answer("автомобіль, рухаючись рівномірно, перебуває у верхній точці опуклого мосту", 0),
		new Answer("космонавт перебуває в ракеті під час її старту з поверхні Землі", 1),
		new Answer("камінь падає з деякої висоти", 0),
		new Answer("людина починає опускатися разом із кабіною ліфта", 0)
	]),

	new Question("За якого стану речовини передавання тепла не може відбуватися за допомогою конвекції?", 
	[
		new Answer("твердий", 1),
		new Answer("рідкий", 0),
		new Answer("газоподібний", 0),
		new Answer("плазма", 0)
	]),

	new Question("Укажіть, якому кольору світла відповідають фотони з найбільшою енергією.", 
	[
		new Answer("червоному", 0),
		new Answer("жовтому", 0),
		new Answer("зеленому", 0),
		new Answer("фіолетовому", 1)
	]),

	new Question("Усю воду із широкої посудини перелили у високу вузьку порожню посудину. Якими стануть сила тиску й тиск води на дно вузької посудини після цього порівняно із силою тиску й тиском цієї води на дно широкої посудини? Уважайте, що посудини мають циліндричну форму.", 
	[
		new Answer("сила тиску не зміниться, тиск зменшиться", 0),
		new Answer("сила тиску не зміниться, тиск збільшиться", 1),
		new Answer("сила тиску збільшиться, тиск збільшиться", 0),
		new Answer("сила тиску збільшиться, тиск зменшиться", 0)
	]),

	new Question("Вологе повітря міститься в циліндрі під поршнем. Водяна пара в циліндрі може стати насиченою після", 
	[
		new Answer("ізотермічного розширення повітря", 0),
		new Answer("ізохорного охолодження повітря", 1),
		new Answer("ізобарного нагрівання повітря", 0),
		new Answer("ізохорного нагрівання повітря", 0)
	]),

	new Question("Пружною деформацією твердого тіла називають таку, що", 
	[
		new Answer("повністю зникає після припинення дії зовнішніх сил", 1),
		new Answer("частково зникає після припинення дії зовнішніх сил", 0),
		new Answer("не залежить від дії прикладених зовнішніх сил", 0),
		new Answer("не змінюється після припинення дії зовнішніх сил", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}