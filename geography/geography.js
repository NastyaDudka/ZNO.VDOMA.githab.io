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
	new Question("Який час показує сонячний годинник?", 
	[
		new Answer("всесвітній", 0),
		new Answer("поясний", 0),
		new Answer("місцевий", 1),
		new Answer("літній", 0)
	]),

	new Question("З будь-якої точки Світового океану можна дістатися в будь-яку іншу, не перетнувши суходіл. Це доводить, що Світовий океан –", 
	[
		new Answer("найбільша водойма суходолу", 0),
		new Answer("неперервний водний простір", 1),
		new Answer("незаймана людиною акваторія", 0),
		new Answer("межа літосфери й гідросфери", 0)
	]),

	new Question("На фізичній карті України помітна така закономірність: майже всі височини й низовини, а також долини найбільших річок витягнуті з північного заходу на південний схід. Цю закономірність зумовлено", 
	[
		new Answer("особливостями поширення лесу", 0),
		new Answer("тектонічною будовою території", 1),
		new Answer("розподілом сонячної радіації", 0),
		new Answer("широтною зональністю ландшафтів", 0)
	]),

	new Question("Якщо озеро міліє і заростає, то згодом", 
	[
		new Answer("утвориться болото із шаром торфу", 1),
		new Answer("сформується артезіанський басейн", 0),
		new Answer("зміститься межа кліматичного поясу", 0),
		new Answer("виникне горбиста височинна ділянка", 0)
	]),

	new Question("У чому полягає подібність природи Українських Карпат і Кримських гір?", 
	[
		new Answer("шпилясті гірські вершини висотою понад 2 500 м", 0),
		new Answer("великі родовища руд магматичного походження", 0),
		new Answer("висотна поясність ландшафтів на схилах гір", 1),
		new Answer("густа мережа річок із льодовиковим живленням", 0)
	]),

	new Question("Функціонування невеликих заводів, що для виплавлення чорних і кольорових металів використовують лише вторинні ресурси (металобрухт), є характерним для країн ", 
	[
		new Answer("Західної Європи", 1),
		new Answer("Центральної Америки", 0),
		new Answer("Східної Африки", 0),
		new Answer("Південної Азії", 0)
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
	setTimeout(Update, 1000)
}