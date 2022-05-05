window.addEventListener('DOMContentLoaded', () => {

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
});