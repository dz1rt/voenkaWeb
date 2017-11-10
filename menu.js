
//настройки анимаций
var sec = 1.5 * 1000; //время анимации
var checked_menu = true; //меню закрыто
var top_menu = parseFloat($('nav').css("top"));
var checked_doc = true;
var checked_about = true;
var checked_gloss = true;
var checked_cont = true;
var checked_theme = true;
var what_theme = '0';
var anim_in = "easeOutQuart";
var anim_out = "easeInOutCubic";

$(document).ready(function() {
//=====[ Меняем размер картинок ]=====//
for (var i=0; i<6; i++)
{
	var heightParent = 0;
	var parent = $(".theme-"+(i+1));
	var heightNameTheme = 0;
	var nameTheme = $(".name-theme");
	var heightDescriptionTheme = 46;
	var descriptionTheme = $(".description-theme");
	var heightThemeInTheme = 0;
	var themeInTheme = $(".theme-in-theme");
	var _images = $(".img-theme");
	
	heightParent = $(parent[0]).height();
	heightNameTheme = $(nameTheme[i]).outerHeight();
	heightDescriptionTheme = $(descriptionTheme[i]).outerHeight();
	heightThemeInTheme = $(themeInTheme[i]).outerHeight();
	var tmp = heightParent-(heightNameTheme+heightDescriptionTheme+heightThemeInTheme+15);
	if (i==4) 
	{
		$(_images[i]).css("padding-top", '0');
		tmp += 15;
	}
	if (tmp<=0)
		{
			$(_images[i]).attr('height', 0);
		}
	else
		{
			$(_images[i]).attr('height', tmp);
		}
}
});
//=====[ Меняем размер картинок ]=====//

//после создания страницы
//$(document).ready(function(){
//    $('body').css("background", //"url(img/background/1.jpg)");
//});

$('.name-menu').click( function () {
    var max_blur = 5; //блюр видео
    var sec_2 = sec/(max_blur*2); //время на создание эффекта
    
	//если меню закрыто
    if (checked_menu) {        
        checked_menu = false;
        $('nav').animate({top: 0}, sec, 'easeInOutQuart'); //двигаем вниз
        
        //плавно меняем блюр
        var i = 0;
        var interval = setInterval ( function () {
            $('video').css("filter", 'blur('+i+'px)');
            $('main').css("filter", 'blur('+i+'px)');
            i++;
            if (i==max_blur)
                clearInterval(interval);
        }, sec_2*1.7);
        
        /*/после задержки 
        setTimeout(function () {
            //двигаем нужные блоки
            $('.doc').animate({left: "80%"}, sec);
            $('.about').animate({left: "20%"}, sec);
        }, sec);     */  
        //===[ Если не главная страница ]===//
		var _title = document.title; //название страницы
		var numPage = 0;
		if (_title == "Военная история | О предмете | Тема 1") {numPage=1;}
		if (_title == "Военная история | О предмете | Тема 2") {numPage=2;}
		if (_title == "Военная история | О предмете | Тема 3") {numPage=3;}
		if (_title == "Военная история | О предмете | Тема 4") {numPage=4;}
		if (_title == "Военная история | О предмете | Тема 5") {numPage=5;}
		if (_title == "Военная история | О предмете | Тема 6") {numPage=6;}
		if (numPage)
		{
			moveAbout();
			setTimeout( function() {
				moveCont();
				moveTheme(numPage);
			}, sec);
		}
		//===[ Если не главная страница ]===//
    } else {
        checked_menu = true;
        /*$('.doc').animate({left: "150%"}, sec);
        $('.about').animate({left: "-50%"}, sec);*/
        
        
        
        if (!checked_gloss || !checked_cont) {
            setTimeout(function () {
                //двигаем нужные блоки
                $('nav').animate({top: top_menu}, sec, 'easeInOutQuart');
            
                var i = max_blur;
                var interval = setInterval ( function () {
                    $('video').css("filter", 'blur('+i+'px)');
                    $('main').css("filter", 'blur('+i+'px)');
                i--;
                if (i==0) {
                    $('video').css("filter", 'blur('+0+'px)');
                    $('main').css("filter", 'blur('+0+'px)');
                    clearInterval(interval);       
                } 
                }, sec_2);
            }, sec); 
            
        } else {
            //двигаем нужные блоки
            $('nav').animate({top: top_menu}, sec, 'easeInOutQuart');
            
            var i = max_blur;
            var interval = setInterval ( function () {
                $('video').css("filter", 'blur('+i+'px)');
                $('main').css("filter", 'blur('+i+'px)');
                i--;
                if (i==0) {
                    $('video').css("filter", 'blur('+0+'px)');
                    $('main').css("filter", 'blur('+0+'px)');
                    clearInterval(interval);       
                }                   
            }, sec_2);
        }
        
        if (!checked_doc) {
             moveDoc();
        }
        
        if (!checked_about) {
            if (!checked_gloss) {
                moveGloss();
            }
            moveAbout();
        }
    }
});

$('.doc').click( function () {
    moveDoc();
    if (!checked_about) {
        if (!checked_gloss) {
            moveGloss();
        }
        moveAbout();
    }
});

$('.about').click( function () {
    moveAbout();
    if (!checked_doc) {
        moveDoc();
    }
});

$('.about-3').click( function () {
    moveGloss();
    if (!checked_cont) {
        moveCont();
    }
});

$('.about-1').click( function () {
    moveCont();
    if (!checked_gloss) {
        moveGloss();
    }
	closeTheme();
});

$('.cont-1').click( function () {
	moveTheme('1');
});

$('.cont-2').click( function () {
	moveTheme('2');
});

$('.cont-3').click( function () {
	moveTheme('3');
});

$('.cont-4').click( function () {
	moveTheme('4');
});

$('.cont-5').click( function () {
	moveTheme('5');
});

$('.cont-6').click( function () {
	moveTheme('6');
});

//движение документов
function moveDoc () {
    if (checked_doc) {
        $('.doc-1').animate({left: "80%"}, sec, anim_in);
        $('.doc-2').animate({left: "80%"}, sec, anim_in);
        $('.doc-3').animate({left: "80%"}, sec, anim_in);
    } else {
        $('.doc-1').animate({left: "150%"}, sec, anim_out);
        $('.doc-2').animate({left: "160%"}, sec, anim_out);
        $('.doc-3').animate({left: "170%"}, sec, anim_out);
    }
    checked_doc=!checked_doc;
}

//движение О предмете
function moveAbout () {
    if (checked_about) {
        $('.about-1').animate({left: "20%"}, sec, anim_in);
        $('.about-2').animate({left: "20%"}, sec, anim_in);
        $('.about-3').animate({left: "20%"}, sec, anim_in);
        $('.about-4').animate({left: "20%"}, sec, anim_in);
        $('.about-5').animate({left: "20%"}, sec, anim_in);
        $('.about-6').animate({left: "20%"}, sec, anim_in);
        $('.about-7').animate({left: "20%"}, sec, anim_in);
    } else {
        $('.about-1').animate({left: "-50%"}, sec, anim_out);
        $('.about-2').animate({left: "-60%"}, sec, anim_out);
        $('.about-3').animate({left: "-70%"}, sec, anim_out);
        $('.about-4').animate({left: "-80%"}, sec, anim_out);
        $('.about-5').animate({left: "-90%"}, sec, anim_out);
        $('.about-6').animate({left: "-100%"}, sec, anim_out);
        $('.about-7').animate({left: "-110%"}, sec, anim_out);
		closeTheme ();
        if (!checked_gloss) {
            moveGloss();
        }
        if (!checked_cont) {
            moveCont();
        }
    }
    checked_about=!checked_about;
}

//движение Глоссарий
function moveGloss () {
    if (checked_gloss) {
        $('.gloss-1').animate({top: "54%"}, sec, anim_in);
        $('.gloss-2').animate({top: "61%"}, sec, anim_in);
        $('.gloss-3').animate({top: "68%"}, sec, anim_in);
        $('.gloss-4').animate({top: "75%"}, sec, anim_in);
        $('.gloss-5').animate({top: "82%"}, sec, anim_in);
		$('.about-3').css("border", "3px solid #1e90ff");
    } else {
        $('.gloss-1').animate({top: "110%"}, sec, anim_out);
        $('.gloss-2').animate({top: "117%"}, sec, anim_out);
        $('.gloss-3').animate({top: "124%"}, sec, anim_out);
        $('.gloss-4').animate({top: "131%"}, sec, anim_out);
        $('.gloss-5').animate({top: "138%"}, sec, anim_out);
		$('.about-3').css("border", "3px solid #fff");
    }
	closeTheme();
    checked_gloss=!checked_gloss;
}

//движение Содержание дисциплины
function moveCont () {
    if (checked_cont) {
        $('.cont-1').animate({top: "40%"}, sec, anim_in);
        $('.cont-2').animate({top: "47%"}, sec, anim_in);
        $('.cont-3').animate({top: "54%"}, sec, anim_in);
        $('.cont-4').animate({top: "61%"}, sec, anim_in);
        $('.cont-5').animate({top: "68%"}, sec, anim_in);
        $('.cont-6').animate({top: "75%"}, sec, anim_in);
        $('.cont-7').animate({top: "82%"}, sec, anim_in);
		$('.about-1').css("border", "3px solid #1e90ff");
    } else {
        $('.cont-1').animate({top: "110%"}, sec, anim_out);
        $('.cont-2').animate({top: "117%"}, sec, anim_out);
        $('.cont-3').animate({top: "124%"}, sec, anim_out);
        $('.cont-4').animate({top: "131%"}, sec, anim_out);
        $('.cont-5').animate({top: "138%"}, sec, anim_out);
        $('.cont-6').animate({top: "145%"}, sec, anim_out);
        $('.cont-7').animate({top: "152%"}, sec, anim_out);
		$('.about-1').css("border", "3px solid #fff");
    }
    checked_cont=!checked_cont;
}

function moveTheme (num) {
	if (what_theme != num) {
		$('.theme-'+num).animate({top: "40%"}, sec, anim_in);
		if (what_theme!='0') {
				$('.theme-'+what_theme).animate({top: "110%"}, sec, anim_out);
				$('.cont-'+what_theme).css("border", "3px solid #fff");
		}
		what_theme = num;
		$('.cont-'+num).css("border", "3px solid #1e90ff");
	} else {
		$('.theme-'+num).animate({top: "110%"}, sec, anim_out);
		$('.cont-'+num).css("border", "3px solid #fff");
		what_theme = '0';
	}
}

function closeTheme () {
	for (var i=1; i<=6; i++) {
		$('.theme-'+i).animate({top: "110%"}, sec, anim_out);
		$('.cont-'+i).css("border", "3px solid #fff");
	}
	what_theme = '0';
}

/*/сразу после загрузки
$(document).ready(function(){
    $('.doc').fitText(1.2);
});*/

/*
//нажимаем на кнопку меню
var checked = false; //не нажата
var checked_doc = true; //не нажаты документы
var checked_about = true; //не нажата кнопка о предмете
var checked_gloss = true; //не нажат Глоссарий
var checked_cont = true; //не нажат Содержание дисциплины
//настройки
var sec = 0.5 * 1000; //время анимации

$('.logo-menu').click(function () {
    checked = !checked;
	if (checked) {
        //кнопка Главная
        $('.main').css("left", parseFloat($('.logo-menu').css("left")) - parseFloat($('.main').css("width"))-25);
        $('.main').css("top", parseFloat($('body').css("height"))+50);
        
        //кнопка О предмете
        $('.about').css("top", parseFloat($('.logo-menu').css("top"))-parseFloat($('.logo-menu').css("height"))-25);
        $('.about').css("left", parseInt($('body').css("width"))+50);
    
        /*---[ отдел руководящих документов ]---*/
        
        //расположения
        /*
        //кнопка Руководящие документы
        $('.doc').css("left", parseFloat($('.main').css("left")));
        $('.doc').css("top", -parseInt($('.doc').css("height"))-50);

        /*---[ конец отдела руководящих документов ]---
        
        //затемняем фон
		$('.back-menu').animate({"opacity": 0.9}, sec);
        
        //двигаем вверх Главную до позиции Меню
		$('.main').animate({top: parseInt($('.logo-menu').css("top"))}, sec);
        
        //двигаем вправо О предмете до позиции Меню
		$('.about').animate({left: parseInt($('.logo-menu').css("left"))-parseInt($('.logo-menu').css("width"))-25}, sec);
        
        //двигаем вниз документы до позиции Меню
		$('.doc').animate({top: parseInt($('.logo-menu').css("top"))-parseInt($('.logo-menu').css("height"))*2-50}, sec);
	} else {
        
        //возвращаем назад Главную
        $('.main').animate({top: parseInt($('body').css("height"))+50}, sec);
        
        //возвращаем назад О предмете
        $('.about').animate({left: parseInt($('body').css("width"))+50}, sec);
        
        //возвращаем назад Руководящие документы
        $('.doc').animate({top: -parseInt($('.doc').css("height"))-50}, sec);
        
         //фон светлее фон
		$('.back-menu').animate({"opacity": 0}, sec);
        
        if (!checked_about) {
            back_about();
            checked_about = true;
        }
        if (!checked_doc) {
            back_doc();
            checked_doc=true;
        }
        if (!checked_gloss) {
            back_gloss();
            checked_gloss=true;
        }
        if (!checked_cont) {
            back_cont();
            checked_cont=true;
        }
	}
});


//открываем подпункт документов
$('.doc').mouseenter(function() {
	if (checked_doc) {
        back_cont();
        checked_cont=true;
        checked_doc=false;
        back_gloss();
        checked_gloss=true;
        back_about();
        checked_about=true;
        //кнопка Квалификационные требования
        $('.doc-1').css("left", parseFloat($('.doc').css("left"))-parseFloat($('.doc-1').css("width"))-25);
        $('.doc-1').css("top", parseInt($('body').css("height"))+25);
        
        //кнопка Учебная программа
        $('.doc-2').css("left", -parseFloat($('.doc-2').css("width"))-25);
        $('.doc-2').css("top", parseFloat($('.doc').css("top"))+parseFloat($('.doc-2').css("height"))+15);
        
        //кнопка Тематический план
        $('.doc-3').css("left", parseFloat($('.doc-1').css("left")));
        $('.doc-3').css("top", -parseInt($('.doc-3').css("height"))*3-100);
        
        //двигаем вниз документы до позиции Меню
		$('.doc-1').animate({top: parseInt($('.logo-menu').css("top"))-parseInt($('.doc-1').css("height"))-20}, sec);
        $('.doc-2').animate({left: parseInt($('.doc-1').css("left"))}, sec);
        $('.doc-3').animate({top: parseInt($('.logo-menu').css("top"))-parseInt($('.doc-3').css("height"))*3-50}, sec);
    }
});

//открываем подпункт о предмете
$('.about').mouseenter(function() {
	if (checked_about) {
        checked_about=false;
        back_doc();
        checked_doc=true;
        //расстановка на позиции
        
        //Содержание дисциплины
        $('.about-1').css("left", parseFloat($('.about').css("left"))-parseFloat($('.about-1').css("width"))-25);
        $('.about-1').css("top", -parseFloat($('.about-1').css("height"))*3-100);
        
        //Альбом схем
        $('.about-2').css("left", -parseFloat($('.about-2').css("width"))-25);
        $('.about-2').css("top", parseFloat($('.doc').css("top"))-parseFloat($('.about-3').css("height"))-65);
        
        //Глоссарий
        $('.about-3').css("left", -parseFloat($('.about-3').css("width"))-25*10);
        $('.about-3').css("top", parseFloat($('.doc').css("top"))-50);
        
        //Видео
        $('.about-4').css("left", -parseFloat($('.about-4').css("width"))-25*20);
        $('.about-4').css("top", parseFloat($('.doc').css("top"))+parseFloat($('.about-5').css("height"))-35);
        
        //Тесты и задания
        $('.about-5').css("left", -parseFloat($('.about-5').css("width"))-25*10);
        $('.about-5').css("top", parseFloat($('.doc').css("top"))+parseFloat($('.about-5').css("height"))*2-20);
        
        //Аннотация
        $('.about-6').css("left", -parseFloat($('.about-6').css("width"))-25);
        $('.about-6').css("top", parseFloat($('.doc').css("top"))+parseFloat($('.about-6').css("height"))*3-5);
        
        //Рабочая тетрадь
        $('.about-7').css("left", parseFloat($('.about-1').css("left")));
        $('.about-7').css("top", parseFloat($('body').css("width"))+parseFloat($('.about-7').css("height"))+50);
        
        
        //двигаем все на нужные места
		$('.about-1').animate({top: parseFloat($('.doc').css("top"))-parseFloat($('.about-1').css("height"))*2-80}, sec);
        $('.about-2').animate({left: parseFloat($('.about-1').css("left"))}, sec);
        $('.about-3').animate({left: parseFloat($('.about-1').css("left"))}, sec);
        $('.about-4').animate({left: parseFloat($('.about-1').css("left"))}, sec);
        $('.about-5').animate({left: parseFloat($('.about-1').css("left"))}, sec);
        $('.about-6').animate({left: parseFloat($('.about-1').css("left"))}, sec);
        $('.about-7').animate({top: parseFloat($('.about-6').css("top"))+parseFloat($('.about-7').css("height"))+15}, sec);
    }
});

//Глоссарий
$('.about-3').mouseenter(function() {
    //расстановка на места
    if (checked_gloss) {
        back_cont();
        checked_cont = true;
        checked_gloss=false;
        //Полководцы
        $('.gloss-1').css("left", parseFloat($('.about-1').css("left"))-parseFloat($('.gloss-1').css("width"))-25);
        $('.gloss-1').css("top", -parseFloat($('.gloss-1').css("height"))-100);
        
        //Характеристики вооружения
        $('.gloss-2').css("left", -parseFloat($('.gloss-2').css("width"))-25);
        $('.gloss-2').css("top", parseFloat($('.about-3').css("top")));
        
        //Определения, термины, понятия
        $('.gloss-3').css("left", -parseFloat($('.gloss-3').css("width"))-25*10);
        $('.gloss-3').css("top", parseFloat($('.gloss-2').css("top"))+parseFloat($('.gloss-2').css("height"))+15);
        
        //Сокращения
        $('.gloss-4').css("left", -parseFloat($('.gloss-4').css("width"))-25);
        $('.gloss-4').css("top", parseFloat($('.gloss-3').css("top"))+parseFloat($('.gloss-3').css("height"))+15);
        
        //Условные обозначения
        $('.gloss-5').css("left", parseFloat($('.gloss-1').css("left")));
        $('.gloss-5').css("top", parseFloat($('body').css("width"))+parseFloat($('.gloss-5').css("height"))+50);
        
        //двигаем на позиции
        $('.gloss-1').animate({top: parseFloat($('.about-3').css("top"))-parseFloat($('.gloss-1').css("height"))-15}, sec);
        $('.gloss-2').animate({left: parseFloat($('.gloss-1').css("left"))}, sec);
        $('.gloss-3').animate({left: parseFloat($('.gloss-1').css("left"))}, sec);
        $('.gloss-4').animate({left: parseFloat($('.gloss-1').css("left"))}, sec);
        $('.gloss-5').animate({top: parseFloat($('.gloss-4').css("top"))+parseFloat($('.gloss-5').css("height"))+15}, sec);
    }
});

$('.about-1').mouseenter(function() {
   if (checked_cont) {
       back_gloss();
       checked_gloss = true;
       checked_cont = false;
       //расстановка на позиции
       
       //Тема 1
       $('.cont-1').css("left", parseFloat($('.about-1').css("left"))-parseFloat($('.cont-1').css("width"))-25);
       $('.cont-1').css("top", -parseFloat($('.cont-1').css("height"))-100);
        
       //Тема 2
       $('.cont-2').css("left", -parseFloat($('.cont-2').css("width"))-25);
       $('.cont-2').css("top", parseFloat($('.about-2').css("top")));
        
       //Тема 3
       $('.cont-3').css("left", -parseFloat($('.cont-3').css("width"))-25*10);
       $('.cont-3').css("top", parseFloat($('.cont-2').css("top"))+parseFloat($('.cont-2').css("height"))+15);
        
       //Тема 4
       $('.cont-4').css("left", -parseFloat($('.cont-4').css("width"))-25*20);
       $('.cont-4').css("top", parseFloat($('.cont-3').css("top"))+parseFloat($('.cont-3').css("height"))+15);
       
       //Тема 5
       $('.cont-5').css("left", -parseFloat($('.cont-5').css("width"))-25*10);
       $('.cont-5').css("top", parseFloat($('.cont-4').css("top"))+parseFloat($('.cont-4').css("height"))+15);
       
       //Тема 6
       $('.cont-6').css("left", -parseFloat($('.cont-5').css("width"))-25);
       $('.cont-6').css("top", parseFloat($('.cont-5').css("top"))+parseFloat($('.cont-5').css("height"))+15);
       
       //Зачет
       $('.cont-7').css("left", parseFloat($('.cont-1').css("left")));
       $('.cont-7').css("top", parseFloat($('body').css("width"))+parseFloat($('.cont-7').css("height"))+50);
       
       //двигаем
       
       //двигаем на позиции
       $('.cont-1').animate({top: parseFloat($('.about-2').css("top"))-parseFloat($('.gloss-1').css("height"))-15}, sec);
       $('.cont-2').animate({left: parseFloat($('.cont-1').css("left"))}, sec);
       $('.cont-3').animate({left: parseFloat($('.cont-1').css("left"))}, sec);
       $('.cont-4').animate({left: parseFloat($('.cont-1').css("left"))}, sec);
       $('.cont-5').animate({left: parseFloat($('.cont-1').css("left"))}, sec);
       $('.cont-6').animate({left: parseFloat($('.cont-1').css("left"))}, sec);
       $('.cont-7').animate({top: parseFloat($('.cont-6').css("top"))+parseFloat($('.cont-7').css("height"))+15}, sec);
       
   }
});

//функции возврата

function back_about() {
    //возвращаем назад Руководящие документы
    $('.about-1').animate({top: -parseFloat($('.about-1').css("height"))*3-100}, sec);
    $('.about-2').animate({left: -parseFloat($('.about-2').css("width"))-25}, sec);
    $('.about-3').animate({left: -parseFloat($('.about-3').css("width"))-25*10}, sec);
    $('.about-4').animate({left: -parseFloat($('.about-4').css("width"))-25*20}, sec);
    $('.about-5').animate({left: -parseFloat($('.about-5').css("width"))-25*10}, sec);
    $('.about-6').animate({left: -parseFloat($('.about-6').css("width"))-25}, sec);
    $('.about-7').animate({top: parseFloat($('body').css("width"))+parseFloat($('.about-7').css("height"))+50}, sec);
};

function back_doc() {
    //возвращаем назад Руководящие документы
    $('.doc-1').animate({top: parseInt($('body').css("height"))+50}, sec);
    //возвращаем назад Учебная программа
    $('.doc-2').animate({left: -parseInt($('.doc-2').css("width"))-50}, sec);
    //возвращаем назад Тематический план
    $('.doc-3').animate({top: -parseInt($('.doc-3').css("height"))*3-100}, sec);
};

function back_gloss() {
    //возвращаем назад Руководящие документы
    $('.gloss-1').animate({top: -parseFloat($('.gloss-1').css("height"))-100}, sec);
    $('.gloss-2').animate({left: -parseFloat($('.gloss-2').css("width"))-25}, sec);
    $('.gloss-3').animate({left: -parseFloat($('.gloss-3').css("width"))-25*10}, sec);
    $('.gloss-4').animate({left: -parseFloat($('.gloss-4').css("width"))-25}, sec);
    $('.gloss-5').animate({top: parseFloat($('body').css("width"))+parseFloat($('.gloss-5').css("height"))+50}, sec);
};

function back_cont() {
    //возвращаем назад Руководящие документы
    $('.cont-1').animate({top: -parseFloat($('.cont-1').css("height"))-100}, sec);
    $('.cont-2').animate({left: -parseFloat($('.cont-2').css("width"))-25}, sec);
    $('.cont-3').animate({left: -parseFloat($('.cont-3').css("width"))-25*10}, sec);
    $('.cont-4').animate({left: -parseFloat($('.cont-4').css("width"))-25*20}, sec);
    $('.cont-5').animate({left: -parseFloat($('.cont-5').css("width"))-25*10}, sec);
    $('.cont-6').animate({left: -parseFloat($('.cont-6').css("width"))-25}, sec);
    $('.cont-7').animate({top: parseFloat($('body').css("width"))+parseFloat($('.cont-7').css("height"))+50}, sec);
};

//теряем фокус меню	
/*$('nav').mouseleave(function() {
	if ($('nav').css("display")=="none")
	{
		$('nav').show(400, 'linear');
	} else {
		$('nav').hide(400, 'linear');
	}
});*/
