window.addEventListener('DOMContentLoaded', () => {
    
    // Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
            tabsContent = document.querySelectorAll('.tabcontent'),
            tabsParent = document.querySelector('.tabheader__items');
    
    function hideTabContent() {
        //hide all content of tab
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        //remove active class of header at side menu
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    //show content of one tab by index, default i value is 0 (ES6)
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    //evListener for toggle tabs content by click items in side menu 
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        //condition to avoid toggling when clicking not on header
        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if(target == item) {
                    hideTabContent();
                    showTabContent(i); 
                }
            });
        }
    });
    
    // Timer

    const deadLine = '2022-05-07';

    //foo calculate difference of actual time and deadline
    function getTimeRemaining(endTime) {
        const t = Date.parse(endTime) - Date.parse(new Date());
        let days, hours, minutes, seconds;

        if(t <= 0){
            days = 0; 
            hours = 0; 
            minutes = 0; 
            seconds = 0;
        } else {
            days = Math.floor(t / (1000 * 60 * 60 * 24));
            hours = Math.floor(t / (1000 * 60 * 60) % 24);
            minutes = Math.floor((t / 1000 / 60) % 60);
            seconds = Math.floor((t / 1000) % 60);
        }

        //key and value atomaticle assign ES6
        return {
            'total': t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    //function for zero below single digits
    function getZero(num) {
        if(num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000); //updating timer function call every second 

        updateClock(); //function call for avoid 1s delay in timeInterval on first iteration

        //actualization timer by difference of actual time and deadline
        function updateClock() {
            const t = getTimeRemaining(endTime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            //stopper for timeInterval
            if(t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadLine);

    //Modal 

    const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');
    
    //show modal
    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId); //stopper for timeInterval if user oppend modal himself
    }

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', () => {
            openModal();
        });
    });

    //close modal
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalCloseBtn.addEventListener('click', () => {
        closeModal();
    });
    
    //close modal if click not on modal window
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    //close modal if click Esc key
    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    //automatization of showing modal
    //const modalTimerId = setTimeout(openModal, 5000);
    
    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight - 1) { //-1 px for fixing bag whith calling function
                openModal();
                removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Card by using classes
    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render(){
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(item => element.classList.add(item));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>`;
            this.parent.append(element);
        }
    }

    new MenuCard(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        14,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        21,
        '.menu .container',
        'menu__item'
    ).render();

    //Forms
    const forms = document.querySelectorAll('form');

    const msg = {
        loading: 'Загрузка',
        success: 'Спасибо! Мы скоро с вами свяжемся',
        failure: 'Что-то пошло не так, попробуйте еще раз'
    };

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            //added massege with status in form
            const statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            statusMessage.textContent = msg.loading;
            form.append(statusMessage);
            
            //conect with server
            const request  = new XMLHttpRequest();
            request.open('POST', 'server.php');

            //////////Standart server request
            //request.setRequestHeader('Content-type', 'multipart/form-data'); - Dont needed with form
            const formData = new FormData(form);
            request.send(formData);
            //////////

            //////////JSON server request
/*             request.setRequestHeader('Content-type', 'application/json');
            const formData = new FormData(form);

            const obj = {};
            formData.forEach(function(value, key) {
                obj[key] = value;
            });
            
            const json = JSON.stringify(obj);
            request.send(json); */
            ///////////

            //post data
            request.addEventListener('load', ()=> {
                if (request.status === 200) {
                    console.log(request.response);
                    statusMessage.textContent = msg.success;
                    form.reset();
                    setTimeout(() => {
                        statusMessage.remove();
                    }, 2000);
                } else {
                    statusMessage.textContent = msg.failure;
                }
            });
        });
    }

    //func POST for every field in form
    forms.forEach(item => {
        postData(item);
    });
});