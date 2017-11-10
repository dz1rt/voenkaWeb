	var l = 1; //номер слайда
		var sections = ["0"];
		var k = 1;
		var maxSlides;
		
	//собираем данные о презентации
	function SetSections(name)
	{
		
		var _sections = $(name).attr('data-sections');
		//собираем данные по времени
		for (var i = 0; i<_sections.length; i++, k++)
		{
			var _tmp = "";
			for (var j=i; _sections[j]!=";"; j++)
			{
				_tmp += _sections[j];
			}
			sections[k] = _tmp;
			i=j;
		}
		l = $(name).attr('data-num'); //получаем текущий кадр
	}
	
	//функция отслежки времени
	function Update(name)
	{
		var video = document.getElementById(name);
		video.setAttribute('data-num', l);
		//если текущее время больше или равно, чем у следующего слайда
		if (video.currentTime >= parseFloat(sections[l])) 
		{
			l++; //выбираем время следующего слайда
			//пока меньше кадров, чем кадров в презентации идем дальше
			if (l<maxSlides)
			{
				video.pause(); //останавливаем видео
				video.setAttribute('data-num', l);
				var button = document.getElementById(name+"_play");
				button.textContent = "Далее";
				document.getElementById(name+"_num").innerHTML = l+"/"+maxSlides;
			}
			else
			{
				document.getElementById(name+"_num").innerHTML = maxSlides+"/"+maxSlides;
				var button = document.getElementById(name+"_play");
				video.pause();
				button.textContent = "Сначала";
			}
		}
		else
		{
			setTimeout(function(){
				Update(name);
			}, 0.05);
		}
	}

    function vidplay(name) {
       var video = document.getElementById(name);
       var button = document.getElementById(name+"_play");
		maxSlides = document.getElementById(name).getAttribute('data-maxslides');
		SetSections("#"+name); //обновляем данные
       if (video.paused) {
		   if(button.textContent == "Сначала")
			{
				l = 1;
				document.getElementById(name+"_num").innerHTML = l+"/"+maxSlides;
				video.setAttribute('data-num', 1); //устанавливаем текущий кадр
		        video.currentTime = 0;
				button.textContent = "Далее";
			}
		   else
		{
          video.play();
		  Update(name); //запускаем функцию
          button.textContent = "Пауза";
		}
       } else {
          video.pause();
          button.textContent = "Далее";
       }
		
    }
	
	function openFull(name, _nameButton, _nameVideo)
	{
		var video = document.getElementById(_nameVideo);
		l = 1;
		video.pause();
		var button = document.getElementById(_nameVideo+"_play");
		button.textContent = "Далее";
		maxSlides = document.getElementById(_nameVideo).getAttribute('data-maxslides');
		document.getElementById(_nameVideo+"_num").innerHTML = l+"/"+maxSlides;
		$(_nameVideo).attr('data-num', 1); //устанавливаем текущий кадр
        video.currentTime = 0; 
		if ($('.video-slide').css('display') == "none")
		{
			$(".text").css("width", "45%");
			$("."+name).clone().appendTo(".video-slide");
			$("."+name).find('#'+_nameButton).text("Свернуть");
			$(".video-slide").css("display", "block");
		}
		else
		{
			$('.video-slide').find("."+name).remove();		$("."+name).find('#'+_nameButton).text("Развернуть");
			$(".video-slide").css("display", "none");
			$(".text").css("width", "auto");
		}
		$('html').scrollTo('._'+_nameVideo, 500,  {offset: -300});
	}

	function restart(name) {
        var video = document.getElementById(name);
		l = 1;
		document.getElementById(name+"_num").innerHTML = l+"/"+maxSlides;
		$(name).attr('data-num', 1); //устанавливаем текущий кадр
        video.currentTime = 0; 
    }

    /*function skip(value) {
        var video = document.getElementById("Video");
        video.currentTime += value;
    }*/
	
	function next(name) {
		var a = document.getElementById("slides").options.selectedIndex;
		var video = document.getElementById("Video");
		video.currentTime = sections[a];
	}