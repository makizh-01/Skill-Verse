// ===== SKILL SIMULATOR APP =====
(function () {
    'use strict';

    // State
    let progress = JSON.parse(localStorage.getItem('sv_sim_progress') || '{}');
    let currentModule = null;
    let currentLessonIdx = 0;
    let scenarioAnswered = false;
    let quizAnswers = {};

    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    document.addEventListener('DOMContentLoaded', () => {
        renderModules();
        updateOverallProgress();
        initEvents();
        // Add SVG gradient definition
        const svg = document.querySelector('.overall-progress-ring svg');
        if (svg) {
            const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
            defs.innerHTML = '<linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#6c5ce7"/><stop offset="100%" stop-color="#06b6d4"/></linearGradient>';
            svg.insertBefore(defs, svg.firstChild);
        }
        // Hamburger
        const ham = $('#hamburger');
        if (ham) ham.addEventListener('click', () => $('#nav-links').classList.toggle('active'));
    });

    // ===== RENDER MODULES =====
    function renderModules() {
        const grid = $('#sim-module-grid');
        grid.innerHTML = SIM_MODULES.map(m => {
            const completed = getModuleCompletedCount(m.id);
            const total = m.lessons.length;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
            const status = pct === 100 ? 'Completed ✓' : pct > 0 ? 'In Progress' : 'Not Started';
            return `<div class="sim-module-card" data-module="${m.id}">
                <div class="module-card-icon">${m.icon}</div>
                <div class="module-card-title">${m.title}</div>
                <div class="module-card-desc">${m.desc}</div>
                <div class="module-card-meta">
                    <div class="module-meta-item"><i class="fas fa-clock"></i> ${m.duration}</div>
                    <div class="module-meta-item"><i class="fas fa-book-open"></i> ${m.totalLessons} Lessons</div>
                </div>
                <div class="module-progress-bar"><div class="module-progress-fill" style="width:${pct}%"></div></div>
                <div class="module-progress-label">${status} — ${pct}%</div>
                <div class="module-card-action">${pct === 100 ? 'Review Module' : pct > 0 ? 'Continue' : 'Start Module'} <i class="fas fa-arrow-right"></i></div>
            </div>`;
        }).join('');

        grid.querySelectorAll('.sim-module-card').forEach(card => {
            card.addEventListener('click', () => openModule(card.dataset.module));
        });
    }

    // ===== OPEN MODULE =====
    function openModule(moduleId) {
        currentModule = SIM_MODULES.find(m => m.id === moduleId);
        if (!currentModule) return;

        // Find first incomplete lesson or start at 0
        const completed = getModuleCompletedLessons(moduleId);
        currentLessonIdx = 0;
        for (let i = 0; i < currentModule.lessons.length; i++) {
            if (!completed.includes(currentModule.lessons[i].id)) {
                currentLessonIdx = i;
                break;
            }
        }

        $('#modules-view').style.display = 'none';
        $('#lesson-view').style.display = 'block';
        renderLessonNav();
        loadLesson(currentLessonIdx);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== LESSON NAVIGATION =====
    function renderLessonNav() {
        const nav = $('#lesson-nav-bar');
        const completed = getModuleCompletedLessons(currentModule.id);
        nav.innerHTML = currentModule.lessons.map((l, i) => {
            const isActive = i === currentLessonIdx;
            const isDone = completed.includes(l.id);
            return `<button class="lesson-nav-item ${isActive ? 'active' : ''} ${isDone ? 'completed' : ''}" data-idx="${i}">
                ${i + 1}. ${l.title}
            </button>`;
        }).join('');

        nav.querySelectorAll('.lesson-nav-item').forEach(item => {
            item.addEventListener('click', () => {
                currentLessonIdx = parseInt(item.dataset.idx);
                loadLesson(currentLessonIdx);
                renderLessonNav();
            });
        });

        // Breadcrumb
        $('#sim-breadcrumb').innerHTML = `
            <a href="#" id="bc-modules">All Modules</a>
            <span class="sep">›</span>
            <a href="#" id="bc-module">${currentModule.icon} ${currentModule.title}</a>
            <span class="sep">›</span>
            <span>${currentModule.lessons[currentLessonIdx].title}</span>
        `;
        $('#bc-modules').addEventListener('click', (e) => { e.preventDefault(); backToModules(); });
        $('#bc-module').addEventListener('click', (e) => { e.preventDefault(); loadLesson(0); renderLessonNav(); });
    }

    // ===== LOAD LESSON =====
    function loadLesson(idx) {
        currentLessonIdx = idx;
        const lesson = currentModule.lessons[idx];
        scenarioAnswered = false;
        quizAnswers = {};

        // Show theory, hide others
        $('#phase-theory').style.display = 'block';
        $('#phase-scenario').style.display = 'none';
        $('#phase-quiz').style.display = 'none';

        // Theory
        $('#theory-title').textContent = lesson.title;
        $('#theory-content').innerHTML = formatTheory(lesson.theory);

        // Scenario
        $('#scenario-situation').textContent = lesson.scenario.situation;
        renderScenarioOptions(lesson.scenario.options);
        $('#scenario-feedback').style.display = 'none';
        $('#start-quiz-btn').style.display = 'none';

        // Quiz
        renderQuiz(lesson.quiz);
        $('#quiz-results').style.display = 'none';
        $('#submit-quiz-btn').style.display = 'inline-flex';
        $('#next-lesson-btn').style.display = 'none';

        renderLessonNav();
        window.scrollTo({ top: $('#lesson-view').offsetTop - 100, behavior: 'smooth' });
    }

    function formatTheory(text) {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n• /g, '\n<br>• ')
            .replace(/\n- /g, '\n<br>— ')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');
    }

    // ===== SCENARIO =====
    function renderScenarioOptions(options) {
        const container = $('#scenario-options');
        const letters = ['A', 'B', 'C', 'D'];
        container.innerHTML = options.map((opt, i) => `
            <div class="scenario-option" data-idx="${i}">
                <span class="opt-letter">${letters[i]}</span>
                <span>${opt.text}</span>
            </div>
        `).join('');

        container.querySelectorAll('.scenario-option').forEach(el => {
            el.addEventListener('click', () => {
                if (scenarioAnswered) return;
                selectScenarioOption(parseInt(el.dataset.idx), options);
            });
        });
    }

    function selectScenarioOption(idx, options) {
        scenarioAnswered = true;
        const selected = options[idx];
        const bestIdx = options.reduce((best, opt, i) => opt.score > options[best].score ? i : best, 0);

        $$('.scenario-option').forEach((el, i) => {
            el.classList.add('disabled');
            if (i === idx) el.classList.add('selected');
            if (i === bestIdx) el.classList.add('correct');
            if (i === idx && i !== bestIdx) el.classList.add('wrong');
        });

        const fb = $('#scenario-feedback');
        const scoreClass = selected.score >= 3 ? 'good' : selected.score >= 2 ? 'okay' : 'poor';
        const scoreLabel = selected.score >= 3 ? '⭐ Excellent Choice!' : selected.score >= 2 ? '👍 Good Attempt' : '⚠️ Not Ideal';
        const stars = '★'.repeat(selected.score) + '☆'.repeat(3 - selected.score);
        fb.className = `scenario-feedback ${scoreClass}`;
        fb.innerHTML = `<div class="fb-score">${scoreLabel} <span style="color:${selected.score >= 3 ? '#10B981' : selected.score >= 2 ? '#F59E0B' : '#EF4444'}">${stars}</span></div><p>${selected.feedback}</p>`;
        fb.style.display = 'block';
        $('#start-quiz-btn').style.display = 'inline-flex';
    }

    // ===== QUIZ =====
    function renderQuiz(questions) {
        const container = $('#quiz-container');
        container.innerHTML = questions.map((q, qi) => `
            <div class="quiz-question-card" data-qi="${qi}">
                <div class="quiz-q-header">
                    <span class="quiz-q-number">${qi + 1}</span>
                    <span class="quiz-q-text">${q.q}</span>
                </div>
                <div class="quiz-options">
                    ${q.options.map((opt, oi) => `
                        <div class="quiz-option" data-qi="${qi}" data-oi="${oi}">
                            <span class="opt-radio"></span>
                            <span>${opt}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');

        container.querySelectorAll('.quiz-option').forEach(el => {
            el.addEventListener('click', () => {
                const qi = parseInt(el.dataset.qi);
                const oi = parseInt(el.dataset.oi);
                quizAnswers[qi] = oi;
                // Update selection visuals
                container.querySelectorAll(`.quiz-option[data-qi="${qi}"]`).forEach(o => o.classList.remove('selected'));
                el.classList.add('selected');
            });
        });
    }

    function submitQuiz() {
        const lesson = currentModule.lessons[currentLessonIdx];
        const questions = lesson.quiz;
        let correct = 0;

        questions.forEach((q, qi) => {
            const userAnswer = quizAnswers[qi];
            $$('.quiz-option').forEach(el => {
                if (parseInt(el.dataset.qi) === qi) {
                    el.classList.add('disabled');
                    if (parseInt(el.dataset.oi) === q.correct) el.classList.add('correct-answer');
                    if (parseInt(el.dataset.oi) === userAnswer && userAnswer !== q.correct) el.classList.add('wrong-answer');
                }
            });
            if (userAnswer === q.correct) correct++;
        });

        const total = questions.length;
        const pct = Math.round((correct / total) * 100);
        const scoreClass = pct === 100 ? 'perfect' : pct >= 70 ? 'good' : pct >= 50 ? 'okay' : 'poor';
        const msg = pct === 100 ? 'Perfect score! 🎉' : pct >= 70 ? 'Great job! Keep it up!' : pct >= 50 ? 'Not bad, review the theory.' : 'Needs improvement. Re-read the lesson.';

        $('#quiz-results').innerHTML = `
            <div class="quiz-score-display ${scoreClass}">${correct}/${total}</div>
            <div class="quiz-message">${msg}</div>
        `;
        $('#quiz-results').style.display = 'block';
        $('#submit-quiz-btn').style.display = 'none';
        $('#next-lesson-btn').style.display = 'inline-flex';

        // Mark lesson completed
        markLessonCompleted(currentModule.id, lesson.id);
        renderLessonNav();
        updateOverallProgress();
    }

    // ===== NEXT LESSON =====
    function goToNextLesson() {
        if (currentLessonIdx < currentModule.lessons.length - 1) {
            currentLessonIdx++;
            loadLesson(currentLessonIdx);
        } else {
            showCompletionModal();
        }
    }

    // ===== COMPLETION MODAL =====
    function showCompletionModal() {
        const completed = getModuleCompletedCount(currentModule.id);
        const total = currentModule.lessons.length;
        const pct = Math.round((completed / total) * 100);

        $('#completion-message').textContent = `You've completed all ${total} lessons in ${currentModule.title}!`;
        $('#completion-stats').innerHTML = `
            <div class="completion-stat">
                <div class="completion-stat-value">${completed}/${total}</div>
                <div class="completion-stat-label">Lessons Done</div>
            </div>
            <div class="completion-stat">
                <div class="completion-stat-value">${pct}%</div>
                <div class="completion-stat-label">Complete</div>
            </div>
            <div class="completion-stat">
                <div class="completion-stat-value">${currentModule.icon}</div>
                <div class="completion-stat-label">${currentModule.title.split(' ')[0]}</div>
            </div>
        `;
        $('#completion-modal').classList.add('active');
    }

    // ===== PROGRESS =====
    function markLessonCompleted(moduleId, lessonId) {
        if (!progress[moduleId]) progress[moduleId] = [];
        if (!progress[moduleId].includes(lessonId)) {
            progress[moduleId].push(lessonId);
            localStorage.setItem('sv_sim_progress', JSON.stringify(progress));
            showToast('Lesson completed! ✓', 'success');
        }
    }

    function getModuleCompletedLessons(moduleId) {
        return progress[moduleId] || [];
    }

    function getModuleCompletedCount(moduleId) {
        return (progress[moduleId] || []).length;
    }

    function updateOverallProgress() {
        let totalLessons = 0;
        let completedLessons = 0;
        SIM_MODULES.forEach(m => {
            totalLessons += m.lessons.length;
            completedLessons += getModuleCompletedCount(m.id);
        });
        const pct = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

        // Update ring
        const ring = $('#ring-fill');
        if (ring) {
            const circumference = 2 * Math.PI * 52; // r=52
            ring.style.strokeDasharray = circumference;
            ring.style.strokeDashoffset = circumference - (circumference * pct / 100);
        }
        $('#ring-label').textContent = pct + '%';
        $('#progress-text').textContent = completedLessons === 0
            ? 'Start your first module to track progress'
            : `${completedLessons} of ${totalLessons} lessons completed`;
    }

    function resetProgress() {
        if (confirm('Reset all simulation progress? This cannot be undone.')) {
            progress = {};
            localStorage.removeItem('sv_sim_progress');
            renderModules();
            updateOverallProgress();
            backToModules();
            showToast('Progress reset', 'info');
        }
    }

    // ===== NAVIGATION =====
    function backToModules() {
        currentModule = null;
        $('#modules-view').style.display = 'block';
        $('#lesson-view').style.display = 'none';
        $('#completion-modal').classList.remove('active');
        renderModules();
        updateOverallProgress();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ===== TOAST =====
    function showToast(message, type = 'info') {
        const container = $('#toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.style.cssText = 'padding:14px 20px;background:var(--bg-secondary);border:1px solid var(--border-color);border-radius:12px;display:flex;align-items:center;gap:10px;font-size:0.9rem;box-shadow:0 16px 64px rgba(0,0,0,0.5);animation:toastIn 0.3s ease;min-width:280px;border-left:3px solid ' + (type === 'success' ? '#10B981' : '#06B6D4');
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}" style="color:${type === 'success' ? '#10B981' : '#06B6D4'};font-size:1.1rem"></i><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
    }

    // ===== EVENTS =====
    function initEvents() {
        $('#start-scenario-btn').addEventListener('click', () => {
            $('#phase-theory').style.display = 'none';
            $('#phase-scenario').style.display = 'block';
            window.scrollTo({ top: $('#phase-scenario').offsetTop - 100, behavior: 'smooth' });
        });

        $('#start-quiz-btn').addEventListener('click', () => {
            $('#phase-scenario').style.display = 'none';
            $('#phase-quiz').style.display = 'block';
            window.scrollTo({ top: $('#phase-quiz').offsetTop - 100, behavior: 'smooth' });
        });

        $('#submit-quiz-btn').addEventListener('click', () => {
            const lesson = currentModule.lessons[currentLessonIdx];
            const totalQ = lesson.quiz.length;
            const answered = Object.keys(quizAnswers).length;
            if (answered < totalQ) {
                showToast(`Please answer all ${totalQ} questions`, 'info');
                return;
            }
            submitQuiz();
        });

        $('#next-lesson-btn').addEventListener('click', goToNextLesson);
        $('#back-to-modules-btn').addEventListener('click', backToModules);
        $('#reset-progress-btn').addEventListener('click', resetProgress);

        $('#completion-modal').addEventListener('click', (e) => {
            if (e.target === $('#completion-modal')) backToModules();
        });
    }
})();
