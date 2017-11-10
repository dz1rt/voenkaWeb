var name = ""; //ФИО
var vzvod = ""; //номер взвода
var isNamed = false; //не введены имя и взвод
var numQuestion = 1; //номер вопроса
var answers = []; //ответы
var maxNumTest = 1; //максимум вопросов
var mQuest = {
	//вопросы
	question: [
		"Вопрос 1",
		"Вопрос 2",
		"Вопрос 3",
		"Вопрос 4",
		"Вопрос 5",
		"Вопрос 6",
		"Вопрос 7",
		"Вопрос 8",
		"Вопрос 9",
		"Вопрос 10"
	],
	//ответы
	answer: [
		"1",
		"1",
		"1",
		"1",
		"1",
		"1",
		"1",
		"1",
		"1",
		"1",
	]
}; //список вопросов

$(document).ready(function() {
	maxNumTest = mQuest["question"].length;
	LoadTest();
});
				  
//загрузка теста
function LoadTest()
{
	window.document.getElementById('NumQuestion').innerHTML = numQuestion+'/'+maxNumTest;
	
	window.document.getElementById('Question').innerHTML = "Вопрос:<hr>"+mQuest["question"][numQuestion-1];
}
	
//сохраняем значения
function SaveData()
{
	window.document.getElementById('errorName').innerHTML = "";
	name = $('#Name').val();
	vzvod = $('#Vzvod').val();
	if (name != "" && vzvod != "")
	{
		$('#Name').attr('disabled', 'true');
		$('#Vzvod').attr('disabled', 'true');
		$('#SaveButtonName').remove();
		isNamed = true;
	}
	else
	{
		window.document.getElementById('errorName').innerHTML = "Не введены ФИО или номер взвода."
	}
}

function NextQuestion()
{
	//было название
	if (isNamed)
	{
		//пока есть вопросы
		if (numQuestion <= maxNumTest)
		{
			//собираем ответы
			var answerBox = window.document.getElementsByClassName("checkBox");
			var _tmp = "";
			for (var i = 0; i < 4; i++)
			{
				if (answerBox[i].checked)
				{
					_tmp += (i+1).toString();
				}
			}
			for (var i = 0; i < 4; i++)
			{
				answerBox[i].checked = false;
			}
			answers[numQuestion] = _tmp;
			numQuestion++; //следующий вопрос
			if (numQuestion<=maxNumTest)
			{
				window.document.getElementById('Question').innerHTML = "Вопрос:<hr>"+mQuest["question"][numQuestion-1];
			}
			//если вопрос последний
			if (numQuestion > maxNumTest)
			{
				window.document.getElementById('NumQuestion').innerHTML = maxNumTest+'/'+maxNumTest;
				$('#SaveButton').attr('value', 'Результаты');
				
			}
			//если еще есть вопросы
			else
			{
				window.document.getElementById('NumQuestion').innerHTML = numQuestion+'/'+maxNumTest;
				
			}
			
		}
		if ($('#SaveButton').attr('value') == "Результаты")
		{
			$('#SaveButton').remove();
			window.document.getElementById('Result').innerHTML ="<hr>Результаты:<br>Полученные ответы:<br>";
			for (var i = 1; i <= maxNumTest; i++)
			{			window.document.getElementById('Result').innerHTML += answers[i]+"<br>";
			}
			//сверяем данные
			var ball = 0;
			for (var i=1; i<=maxNumTest; i++)
			{
				if (answers[i] == mQuest.answer[i-1])
				{
					ball++;
				}
			}
			window.document.getElementById('Result').innerHTML += "Правильных ответов:<br>"+ball.toString();
			//оценивание
			var percent = 100*ball/maxNumTest;
			if (percent<50)
			{
				window.document.getElementById('Result').innerHTML += "<br>Оценка: 2";
			}
			else if (percent<60)
			{
				window.document.getElementById('Result').innerHTML += "<br>Оценка: 3";
			}
			else if (percent<90)
			{
				window.document.getElementById('Result').innerHTML += "<br>Оценка: 4";
			}
			else
			{
				window.document.getElementById('Result').innerHTML += "<br>Оценка: 5";
			}
			window.document.getElementById('Result').innerHTML += "<br>Выполнил: "+name+"<br>Взвод: "+vzvod;
		}
	}
	else
	{
		window.document.getElementById('errorName').innerHTML = "Не введены ФИО или номер взвода."
	}
}