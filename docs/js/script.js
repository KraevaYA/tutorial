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

const taskAnchors = {
    1: '#Задание-1.-Подготовка-GPU-среды-выполнения',  // Задание 1
    2: '#Задание-2.-Загрузка-и-визуализация-ряда-NYC-Taxi',  // Задание 2
    3: '#Задание-3.-Поиск-top-k-диссонансов',  // Задание 3
    4: '#Задание-4.-Алгоритм DRAG (CPU)',  // Задание 4
    5: '#Задание-5.-Исследование-влияния-порога',  // Задание 5
    6: '#Задание-6.-Алгоритм-PD3-(GPU)',  // Задание 6
    7: '#Задание-7.-Сравнение-быстродействия-DRAG-и-PD3',  // Задание 7
    8: '#Задание-8.-Загрузка-и-визуализация-ряда-PolyTER',  // Задание 8
    9: '#Задание-9.-Алгоритм-MERLIN-(CPU)',   // Задание 9
    10: '#Задание-10.-Алгоритм-PALMAD-(GPU)',  // Задание 10
    11: '#Задание-11.-Сравнение-быстродействия-MERLIN-и-PALMAD'   // Задание 11
};

const baseUrl = 'https://nbviewer.org/github/KraevaYA/tutorial-notebook/blob/main/pct_tutorial_2026.ipynb';

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