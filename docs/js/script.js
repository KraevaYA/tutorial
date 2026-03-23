// ========== ОБЩИЕ ФУНКЦИИ ДЛЯ ВСЕХ СТРАНИЦ ==========

// Подсветка активного пункта меню
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    document.querySelectorAll('.nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        }
    });
});

// ========== ФУНКЦИИ ДЛЯ СТРАНИЦЫ С РЕШЕНИЕМ ==========

// ВАЖНО: Замените эти ID на реальные ID ячеек из вашего ноутбука
// Откройте ноутбук в nbviewer, найдите ID ячеек и вставьте их сюда
const taskAnchors = {
    1: '#cell-1',  // Задание 1
    2: '#cell-2',  // Задание 2
    3: '#cell-3',  // Задание 3
    4: '#cell-4',  // Задание 4
    5: '#cell-5',  // Задание 5
    6: '#cell-6',  // Задание 6
    7: '#cell-7',  // Задание 7
    8: '#cell-8',  // Задание 8
    9: '#cell-9'   // Задание 9
};

const taskTitles = {
    1: 'Задание 1: Загрузка данных',
    2: 'Задание 2: Визуализация ряда',
    3: 'Задание 3: Поиск top-k диссонансов',
    4: 'Задание 4: Первый запуск DRAG',
    5: 'Задание 5: Эксперимент с порогом r',
    6: 'Задание 6: Визуализация метрик',
    7: 'Задание 7: Запуск PD3',
    8: 'Задание 8: Сравнение DRAG и PD3',
    9: 'Задание 9: MERLIN и PALMAD'
};

const taskDescriptions = {
    1: 'Загрузите временной ряд NYC Taxi из CSV-файла и преобразуйте индекс в datetime.',
    2: 'Постройте график временного ряда с помощью функции plot_ts().',
    3: 'Найдите top-5 диссонансов длины 96 с помощью матричного профиля.',
    4: 'Запустите алгоритм DRAG с параметрами m=96, r=1.85.',
    5: 'Проведите эксперимент с разными значениями порога r от 0.5 до 5.',
    6: 'Постройте графики метрик Precision, Recall, F1 для разных r.',
    7: 'Запустите параллельную версию PD3 на GPU.',
    8: 'Сравните производительность DRAG и PD3 при разных r.',
    9: 'Найдите аномалии произвольной длины с помощью MERLIN и PALMAD.'
};

const baseUrl = 'https://nbviewer.org/github/username/repo/blob/main/solutions.ipynb';

function loadTask(taskNumber) {
    const iframe = document.getElementById('notebook-frame');
    if (!iframe) return;
    
    // Обновляем src iframe с якорем
    iframe.src = baseUrl + (taskAnchors[taskNumber] || '');
    
    // Обновляем активную кнопку
    document.querySelectorAll('.task-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.task-button')[taskNumber-1].classList.add('active');
    
    // Обновляем информацию о задании
    const taskTitleEl = document.getElementById('task-title');
    const taskDescEl = document.getElementById('task-description');
    if (taskTitleEl) taskTitleEl.textContent = taskTitles[taskNumber];
    if (taskDescEl) taskDescEl.textContent = taskDescriptions[taskNumber];
    
    // Обновляем URL без перезагрузки страницы
    const url = new URL(window.location);
    url.searchParams.set('task', taskNumber);
    window.history.pushState({}, '', url);
}

// При загрузке страницы решения проверяем параметр task в URL
if (document.getElementById('notebook-frame')) {
    window.addEventListener('load', function() {
        const urlParams = new URLSearchParams(window.location.search);
        const task = urlParams.get('task');
        if (task && taskAnchors[task]) {
            setTimeout(() => loadTask(task), 500);
        }
    });
}

// ========== КОПИРОВАНИЕ В БУФЕР ==========
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Скопировано!');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ Скопировано!');
    });
}