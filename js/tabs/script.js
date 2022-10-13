"use strict";

window.addEventListener('DOMContentLoaded', function() { // Обработчик события, который запускает функцию только когда структура страницы в окне загружена

    function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) { // Создаем общую функцию, в аргументах которой передаем основные параметры
        let tabs = document.querySelectorAll(tabsSelector), // Переменная = все ссылки/кнопки на открытие соответствующей вкладки
            tabsContent = document.querySelectorAll(tabsContentSelector), // Переменная = содержимок каждой вкладки
            tabsParent = document.querySelector(tabsParentSelector); // Переменная = родитель вкладок и ссылок на них
    
        function hideTabContent() { // Функция скрытия контента вкладок
            
            tabsContent.forEach(item => { // Для содержимого каждой вкладки
                item.classList.add('hide'); // добавляем css класс скрытия элемента
                item.classList.remove('show', 'fade'); // и убираем css класс отображения элемента
            });
    
            tabs.forEach(item => { // Для каждой ссылки на соответствующую вкладку
                item.classList.remove(activeClass); // убираем css класс активности, переданный в аргументах общей функции
            });
        }
    
        function showTabContent(i = 0) { // Функция отображения контента вкладок, в аргументах которой передается номер вкладки (по умолчанию = 0)
            tabsContent[i].classList.add('show', 'fade'); // Добавляем содержимому вкладки, соответствующей переданному номеру, css класс отображения + css класс анимации появления
            tabsContent[i].classList.remove('hide'); // Убираем и вкладки с нужным номером css класс скрытия элемента
            tabs[i].classList.add(activeClass); // Добавляем к ссылке на эту вкладку (также соответствующей номеру) css класс активности, переданный в аргументах общей функции
        }
        
        hideTabContent(); // Вызываем функцию сокрытия контента всех вкладок
        showTabContent(); // Вызываем функцию отображения определенной вкладки (так как аргумент не передан, используется значение по умолчанию = 0, то есть первая вкладка)
    
        tabsParent.addEventListener('click', function(event) { // Функция - обработчик события при клике на родителя всех вкладок и ссылок на их открытие
            const target = event.target; // Константа = объект события
            if(target && target.classList.contains(tabsSelector.slice(1))) { // Если объект, по которому был произведен клик, содержит класс ссылки на открытие вкладки (класс передан в аргументах),
                tabs.forEach((item, i) => { // то перебираем все ссылки на открытие соответствующей вкладки
                    if (target == item) { // Если объект события (клика) соответсвтует вкладке (видимо, по номеру)
                        hideTabContent(); // то скрываем содержимое всех вкладок
                        showTabContent(i); // и отображаем содержимое той вкладки, номер которой соответствует номеру нажатой ссылки (таба)
                    }
                });
            }
        });
    }
    
    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active'); // Вызываем общую функцию, в аргументах которой передаем селектор ссылок/кнопок для открытия

});