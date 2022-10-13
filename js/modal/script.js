"use strict";

document.addEventListener('DOMContentLoaded', function () { // Обработчик события, который запускает функцию только когда структура страницы загружена

    const modalTrigger = document.querySelectorAll('[data-modal]'), // Переменная = селектор кнопки вызова окна
          modal = document.querySelector('.modal'), // Переменная = селектор модального окна
          modalCloseBtn = document.querySelector('[data-close]'); // Переменная = селектор кнопки закрытия окна

    modalTrigger.forEach(btn => { // Для каждой кнопки открытия окна
        btn.addEventListener('click', openModal); // Обработчик, при клике, запускает функцию открытия окна
    });

    function closeModal() { // Функция закрытия окна
        modal.classList.add('hide'); // Добавляем к селектору окна класс hide
        modal.classList.remove('show'); // Убираем с селектора окна класс show
        document.body.style.overflow = ''; // Снимаем со страницы (body) запрет на прокрутку
    }

    function openModal() { // Функция открытия окна
        modal.classList.add('show'); // Добавляем к селектору окна класс show
        modal.classList.remove('hide'); // Убираем с селектора окна класс hide
        document.body.style.overflow = 'hidden'; // Запрещаем странице (body) прокрутку на фоне
        clearInterval(modalTimerId); // Очищаем интервал автооткрытия окна (функция объявлена ниже)
    }

    modalCloseBtn.addEventListener('click', closeModal); // При клике на кнопку закрытия окна, обработчик запускает соответствующую функцию

    modal.addEventListener('click', (e) => { // Обработчик следит за кликом по элементу
        if (e.target === modal) { // Если клик был имено по селектору .modal (это подложка), то
            closeModal(); // запускается функция закрытия окна
        }
    });

    document.addEventListener('keydown', (e) => { // Обработчик следит за нажатием клавиши на клавиатуре
        if (e.code === "Escape" && modal.classList.contains('show')) { // Если была нажата клавиша escape и если селектор окна содержит класс show (т.е. показывается), то
            closeModal(); // запускается функция закрытия окна
        }
    });

    const modalTimerId = setTimeout(openModal, 3000); // Функция авто открытия окна через какое-то время. Присваиваем переменную, чтобы вверху можно было этот интервал сбросить/отключить.

    function showModalByScroll() { // Функция отображения окна при скролле до конца страницы
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) { // Если сумма оставшейся вверху высоты страницы и высота отображаемого сейчас больше или равна высоте всей страницы, то
            openModal(); // запускается функция открытия окна
            window.removeEventListener('scroll', showModalByScroll); // Отключаем обработчик, который следит за скроллом страницы и внизу открывает окно
        }
    }
    window.addEventListener('scroll', showModalByScroll); // Обработчик следит за скроллом в окне и запускает функцию отображения окна при скролле до конца страницы

});