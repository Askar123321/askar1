
const allQuestions = {
    sql: [
        {
            question: "Что делает команда SELECT в SQL?",
            options: ["Удаляет таблицу", "Извлекает данные", "Обновляет запись", "Создаёт базу данных"],
            answer: "Извлекает данные"
        },
        {
            question: "Какой оператор используется для сортировки результатов?",
            options: ["ORDER BY", "GROUP BY", "HAVING", "SORT"],
            answer: "ORDER BY"
        },
        {
            question: "Как объединить строки двух таблиц на основе общего поля?",
            options: ["UNION", "JOIN", "MERGE", "APPEND"],
            answer: "JOIN"
        },
        {
            question: "Какие типы JOIN бывают в SQL?",
            options: ["INNER, OUTER, LEFT, RIGHT", "ONLY, FULL, PART", "UPPER, LOWER", "FIRST, LAST"],
            answer: "INNER, OUTER, LEFT, RIGHT"
        },
        {
            question: "Как удалить все записи из таблицы, но сохранить саму таблицу?",
            options: ["DROP", "DELETE", "TRUNCATE", "REMOVE"],
            answer: "TRUNCATE"
        },
        {
            question: "Что делает команда INSERT INTO?",
            options: ["Удаляет таблицу", "Добавляет новую запись", "Создает индекс", "Переименовывает таблицу"],
            answer: "Добавляет новую запись"
        }
    ],
    theory: [
        {
            question: "Что такое СУБД?",
            options: ["Система управления базами данных", "Язык запросов", "Тип данных", "Программа для рисования"],
            answer: "Система управления базами данных"
        },
        {
            question: "Что такое нормализация?",
            options: ["Упорядочивание данных для предотвращения аномалий", "Создание резервной копии", "Обновление данных", "Сжатие таблиц"],
            answer: "Упорядочивание данных для предотвращения аномалий"
        },
        {
            question: "Что такое первичный ключ?",
            options: ["Уникальный идентификатор записи", "Поле с датой", "Тип данных", "Связь таблиц"],
            answer: "Уникальный идентификатор записи"
        },
        {
            question: "Что такое внешний ключ?",
            options: ["Поле, ссылающееся на другой столбец", "Первичный ключ", "Текстовый тип данных", "Резервная копия"],
            answer: "Поле, ссылающееся на другой столбец"
        },
        {
            question: "Что означает ACID в контексте транзакций?",
            options: ["Atomicity, Consistency, Isolation, Durability", "Automatic, Consistent, Indexed, Duplicated", "Active, Closed, Inserted, Deleted", "None"],
            answer: "Atomicity, Consistency, Isolation, Durability"
        },
        {
            question: "Что такое реляционная модель данных?",
            options: ["Модель, основанная на таблицах", "Модель, основанная на деревьях", "Файловая система", "Операционная система"],
            answer: "Модель, основанная на таблицах"
        }
    ]
};

let username = "";
let currentCategory = "";
let shuffledQuestions = [];
let timer;
let timeLeft = 0;

function authorize() {
    username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (!username || password !== "000") {
        alert("Қате аты немесе құпиясөз!");
        return;
    }

    document.getElementById("login-screen").style.display = "none";
    document.getElementById("settings-screen").style.display = "block";
}

function startQuiz() {
    currentCategory = document.getElementById("category").value;
    const questionCount = parseInt(document.getElementById("questionCount").value);
    let questions = [...allQuestions[currentCategory]];
    shuffledQuestions = questions.sort(() => 0.5 - Math.random()).slice(0, questionCount);

    document.getElementById("settings-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";
    document.getElementById("welcome").innerText = username + ", тестке сәттілік!";

    const form = document.getElementById("quizForm");
    form.innerHTML = "";

    shuffledQuestions.forEach((q, i) => {
        const div = document.createElement("div");
        div.className = "question";
        div.innerHTML = `<p><b>${i + 1}. ${q.question}</b></p>` +
            q.options.map(opt => `
            <label><input type="radio" name="q${i}" value="${opt}" required> ${opt}</label><br>`
            ).join("");
        form.appendChild(div);
    });

    timeLeft = Math.ceil(questionCount / 60) * 360;
    startTimer();
}

function submitQuiz() {
    let score = 0;
    shuffledQuestions.forEach((q, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === q.answer) {
            score++;
        }
    });

    document.getElementById("quiz-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "block";
    document.getElementById("result").innerText = `Сіз ${score} / ${shuffledQuestions.length} дұрыс жауап бердіңіз.`;

    localStorage.setItem("quiz_result_" + username, score);
    document.getElementById("saved").innerText = `(Сіздің нәтижеңіз сақталды: ${score})`;
    clearInterval(timer);
}

function startTimer() {
    const timerDiv = document.getElementById("timer");
    timer = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDiv.innerText = "Уақыт: " + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Уақытыңыз аяқталды!");
            submitQuiz();
        }
    }, 1000);
}
