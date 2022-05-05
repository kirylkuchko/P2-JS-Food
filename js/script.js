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
});