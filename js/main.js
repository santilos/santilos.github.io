var test = [
    {"Какой улицы <br>нет в Качканаре?":{
            "Тургенева": 0,
            "Чехова": 0,
            "Маяковского": 0,
            "Достоевского": 1
        }
    },
    {"Сколько лет <br>строилась<br> 8 школа?":
        {
            "9 лет": 0,
            "17 лет": 0,
            "24 года": 1,
            "31 год":0
        }
    },
    {"Местное название<br>круглой площадки<br>у Дворца культуры:":
        {
            "Сковородка": 1,
            "Тарелка": 0,
            "Кастрюля": 0,
            "Стакан": 0
        }
    },
    {"Стену, которая отделяет<br>4 микрорайон от улицы Свердлова, называют:":
        {
            "Качканарская стена": 0,
            "Китайская стена": 1,
            "Берлинская стена": 0,
            "Никак,<br>просто стена и всё!": 0
        }
    },
    {"Что произошло с кинотеатром «Юность»:":
        {
            "Сгорел": 0,
            "Не пережил<br>суровые 90-е": 0,
            "Стал торговым центром": 0,
            "Все варианты верны": 1
        }
    },
    {"Что находится на дне качканарского пруда?":
        {
            "Деревья":1,
            "Атлантида": 0,
            "Спанч Боб": 0,
            "Да, ничего такого… <br>рыбка да раки":0
        }
    },
    {"Что такое «валик»?":
        {
            "Строительный инструмент":0,
            "Разновидность подушки":0,
            "Сокращенное имя Валентин":0,
            "Поселок<br>под Качканаром":1
        }
    },
    {"Как переводится название буддийского монастыря<br>«Шад Тчуп Линг»?":
        {
            "Место практики и реализации":1,
            "Место красоты и вдохновения":0,
            "Место свободы и любви":0,
            "Место встречи<br>изменить нельзя":0
        }
    },
    {"Что находится с обратной стороны горы Качканар?":
        {
            "Край света":0,
            "Просто лес":0,
            "Деревня Косья":1,
            "Город Лесной":0
        }
    },
    {"Как называется паблик с самыми красивыми фото качканара?":
        {
            'Моя провинция<br><div id="vk_groups"></div>':1
        }
    }
];

var specials = {};

var question = 0;
var result = 0;
var isSpecial = false;

// Заполняем прогресс
for (var i = 0; i < test.length; i++) {
    $('.progress').append('<li class="progress__item">'+(i+1)+'</li>');
}
$('.progress__item').eq(0).addClass('progress__item_active');

$('.app').hide();
$('.splashscreen__close').on('click', function(event) {
    event.preventDefault();

    $('.splashscreen').hide();

    if(isMobile) {
        $('.app').show();
    } else {
        $('.preloader').show();
        setTimeout(function(){
            $('.preloader').hide();
            $('.app').show();
        }, 2000);
    }

});


// $('.preloader').show();
// setTimeout(function(){
//     $('.preloader').hide();
//     $('.app').fadeIn();
// }, 2100);


// Первый вопрос - ответы
$('.question').html(Object.keys(test[0]));

$.each(test[0][ Object.keys(test[0]) ], function(index, val) {
    $('.answers').append('<li data-is-true="'+val+'">'+ index +'</li>');
});



// Действие по клику на ответ
$('.answers').on('click', 'li', function(e) {
    e.preventDefault();
    isSpecial = false;

    var isTrue = parseInt($(this).data('is-true'));

    // Прибавляем баллы за ответ
    result = result + isTrue;

    // Если это был последний вопрос — выведем результат
    if (question == test.length-1) {
        showResult();
        return;
    }

    if (isTrue) {
        $(this).addClass('answer_true');
    } else {
        $(this).addClass('answer_false');
    }


    var nextQuestion = question+1;

    console.log(question, $(this).index());

    if(question === 5 && $(this).index() == 2){
        isSpecial = true;
        $('.answers, .question').hide();
        $('.special').html('<img src="images/specials/spongebob.png" class="special__picture">').show();
        setTimeout(function(){
            $('.special').hide();
        }, 4000);
    }

    if(question === 7 && $(this).index() == 3){
        isSpecial = true;
        $('.answers, .question').hide();
        $('.special').html('<img src="images/specials/cat.png" class="special__picture" style="height:280px;margin-top:80px">').show();
        setTimeout(function(){
            $('.special').hide();
        }, 4000);
    }

    if(question === 0 && $(this).index() !== 3){
        isSpecial = true;
        $('.answers, .question').hide();

        if($(this).index() === 0){
            $('.special').html('<img src="images/specials/turgenev.png" class="special__picture">').show();
        } else if($(this).index() === 1){
            $('.special').html('<img src="images/specials/chehov.png" class="special__picture">').show();
        } else if($(this).index() === 2){
            $('.special').html('<img src="images/specials/mayakovsky.png" class="special__picture">').show();
        }

        setTimeout(function(){
            $('.special').hide();
        }, 4000);
    }

    var delay = (isSpecial? 4500: 500);


    // Анимация
    $('main').delay(delay).fadeOut(function(){
        $('.progress__item').removeClass('progress__item_active');
        //$('.progress li').eq(question).addClass('archive');

        // Next question
        $('.progress__item').eq(nextQuestion).addClass('progress__item_active');

        $('.question').html(Object.keys(test[nextQuestion]));

        $('.answers li').remove();
        $.each(test[nextQuestion][ Object.keys(test[nextQuestion]) ], function(index, val) {
            $('.answers').append('<li data-is-true="'+val+'">'+ index +'</li>');
        });

        if(nextQuestion == 9) {
            VK.Widgets.Group("vk_groups", {mode: 3, width: "300"}, 62858261);
            console.log(nextQuestion);
        }

        if(!isMobile){
            $('body').css('background-image', 'url("./images/questions/'+(nextQuestion+1)+'.png")');
        } else {
            $('body').css('background-image', 'url("./images/mobile-questions/'+(nextQuestion+1)+'.png")');
        }

        $('main').fadeIn();
        $('.answers, .question').show();
    });


    question = nextQuestion;
});


function showResult(){
    $('main').hide();
    $('.results').css('display','flex');
    $('.results__number').text(result);

    if(result < 4) {
        $('.results__subheader').text('Критический уровень');
        $('.results__description').html('<p>Да уж... Печально. Если ты житель Качканара, то тебе должно быть стыдно. На твоём фоне даже мигранты из Средней Азии выглядят более эрудированными. Прости, друг, но ты не имеешь морального права называть себя качканарцем. По крайней мере пока.</p>');
    } else if (result >=4 && result < 7) {
        $('.results__subheader').text('Средний уровень');
        $('.results__description').html('<p>Ну, не сказать, что ты уж прям красавчик, однако некоторые вещи о Качканаре всё же знаешь (если, конечно, не тыкал наугад).</p><p style="font-size:25px;">Рекомендуем пройти тест ещё раз и провести работу над ошибками. Законспектируй вопросы, в которых допустил ошибки, и повторяй каждый вечер перед сном. Следуя данной инструкции, ты сможешь со временем повысить уровень своих знаний о родном городе.</p>');
    } else if (result >= 7 && result < 10) {
        $('.results__subheader').text('Высокий уровень');
        $('.results__description').html('<p>А ты не плох! Пусть и не ответил правильно на все вопросы, но твёрдую четвёрку всё же заработал. Не забывай, что хоть твой уровень и выше среднего, тебе по-прежнему есть куда стремиться. Оттачивай свои знания о Качканаре, подписывайся на <img src="images/znaj.png" alt="Знай"> и будь счастлив!</p>');
    } else {
        $('.results__subheader').text('Уровень: мудрец');
        $('.results__description').html('<p>Блеск! Ты правильно ответил на все вопросы! Далеко не каждый житель города может похвастаться такими знаниями! Обязательно опубликуй результат теста на своей стене - пусть твои друзья знают, насколько ты крут. </p><p style="font-size:25px;">Без всяких шуток, ты по праву заслужил звание «Настоящий Качканарец»!</p>');
    }

    $('.share-wrapper').html(VK.Share.button({
        url: "https://vk.com/app5753070_-46359936",
        title: "Я качканарец на "+result+" из 10. Оцени свои знания, пройди тест!",
        description: "",
        image: 'https://pp.vk.me/c638216/v638216702/174b6/VX6UMZhRZ7w.jpg',
        noparse: true
    },{
        type: "custom",
        text: '<img src="./images/share.png">'
    }));
}


// Прелоад
for (var i = 1; i <= test.length; i++) {
    $("<img />").attr("src", 'images/questions/' + i + '.png');
}




