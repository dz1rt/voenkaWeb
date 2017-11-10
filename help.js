 var showingTooltip;

    document.onmouseover = function(e) {
      var target = e.target;

      // ВАЖНО: mouseover может сработать сразу на потомке
      // минуя родителя (при быстром движении мышью)

      // пройти вверх до первого элемента с data-tooltip
      while (target !== this) {
        var tooltip = target.getAttribute('data-tooltip');
        if (tooltip) break;
        target = target.parentNode;
      }

      if (!tooltip) return;

      // показать и запомнить подсказку
      showingTooltip = showTooltip(tooltip, target);
    }

    document.onmouseout = function() {
      // возможно такое, что mouseout сработал, а мы все еще внутри элемента (всплытие)
      // но в этом случае сразу же будет и mouseover,
      // то есть подсказка будет уничтожена и тут же показана заново
      //
      // это лишние расходы, их можно избежать дополнительными проверками
      if (showingTooltip) {
        document.body.removeChild(showingTooltip);
        showingTooltip = false;
      }

    }


    function showTooltip(text, elem) {
      var tooltipElem = document.createElement('div');
      tooltipElem.className = 'tooltip';
      tooltipElem.innerHTML = text;
      document.body.appendChild(tooltipElem);

      var coords = elem.getBoundingClientRect();

      var left = coords.left + (elem.offsetWidth - tooltipElem.offsetWidth) / 2;
      if (left < 0) left = 0; // не вылезать за левую границу экрана

      // не вылезать за верхнюю границу окна
      var top = coords.top - tooltipElem.offsetHeight - 5;
      if (top < 0) {
        top = coords.top + elem.offsetHeight + 5;
      }

      tooltipElem.style.left = left + 'px';
      tooltipElem.style.top = top + 'px';

      return tooltipElem;
    }


