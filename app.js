// ===== SKILLVERSE APP =====
(function () {
    'use strict';

    // State
    let savedCourses = JSON.parse(localStorage.getItem('sv_saved') || '[]');
    let currentDomain = 'all';
    let visibleCount = 12;
    const COURSES_PER_PAGE = 12;

    // DOM cache
    const $ = (s) => document.querySelector(s);
    const $$ = (s) => document.querySelectorAll(s);

    // ===== INIT =====
    document.addEventListener('DOMContentLoaded', () => {
        initPageState();
        renderDomains();
        renderCompanies();
        populateFilters();
        renderCourses();
        updateBookmarkCount();
        initNavbar();
        initSearch();
        initHeroAnimations();
        initScrollAnimations();
        initEventListeners();
    });

    // ===== NAVBAR =====
    function initNavbar() {
        const navbar = $('#navbar');
        if (!navbar) return;

        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 40);
            const btn = $('#back-to-top');
            if (btn) btn.classList.toggle('visible', window.scrollY > 600);
        });

        const hamburger = $('#hamburger');
        const navLinks = $('#nav-links');
        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
        }

        $$('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks) navLinks.classList.remove('active');
            });
        });

        const backToTop = $('#back-to-top');
        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }

    // ===== SEARCH =====
    function initSearch() {
        const toggle = $('#search-toggle');
        const container = $('#search-bar-container');
        const input = $('#global-search');
        const results = $('#search-results');

        if (!toggle || !container || !input || !results) return;

        toggle.addEventListener('click', () => {
            container.classList.toggle('active');
            if (container.classList.contains('active')) input.focus();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                container.classList.remove('active');
                results.classList.remove('active');
                input.value = '';
            }
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                container.classList.add('active');
                input.focus();
            }
        });
        input.addEventListener('input', () => {
            const q = input.value.toLowerCase().trim();
            if (q.length < 2) { results.classList.remove('active'); return; }
            const matches = COURSES.filter(c =>
                c.title.toLowerCase().includes(q) ||
                c.tags.some(t => t.toLowerCase().includes(q)) ||
                getCompany(c.company).name.toLowerCase().includes(q) ||
                getDomain(c.domain).name.toLowerCase().includes(q)
            ).slice(0, 6);
            if (matches.length === 0) {
                results.innerHTML = '<div class="search-result-item"><span style="color:var(--text-muted)">No results found</span></div>';
            } else {
                results.innerHTML = matches.map(c => {
                    const comp = getCompany(c.company);
                    return `<div class="search-result-item" data-id="${c.id}">
                        <i class="${comp.icon}" style="color:${comp.color};font-size:1.2rem;width:24px;text-align:center"></i>
                        <div>
                            <div style="font-weight:600;font-size:0.9rem">${highlightText(c.title, q)}</div>
                            <div style="font-size:0.75rem;color:var(--text-muted)">${comp.name} · ${getDomain(c.domain).name}</div>
                        </div>
                    </div>`;
                }).join('');
            }
            results.classList.add('active');
            results.querySelectorAll('.search-result-item[data-id]').forEach(item => {
                item.addEventListener('click', () => {
                    openModal(parseInt(item.dataset.id));
                    container.classList.remove('active');
                    results.classList.remove('active');
                    input.value = '';
                });
            });
        });
    }

    function highlightText(text, query) {
        const regex = new RegExp(`(${query})`, 'gi');
        return text.replace(regex, '<span style="color:var(--accent-2);font-weight:700">$1</span>');
    }

    // ===== RENDER DOMAINS =====
    function renderDomains() {
        const grid = $('#domain-grid');
        if (!grid) return;

        const allCard = `<div class="domain-card active" data-domain="all">
            <div class="domain-card-icon">🌟</div>
            <div class="domain-card-name">All Domains</div>
            <div class="domain-card-count">${COURSES.length} courses</div>
        </div>`;
        grid.innerHTML = allCard + DOMAINS.map(d => {
            const count = COURSES.filter(c => c.domain === d.id).length;
            return `<div class="domain-card" data-domain="${d.id}">
                <div class="domain-card-icon">${d.icon}</div>
                <div class="domain-card-name">${d.name}</div>
                <div class="domain-card-count">${count} courses</div>
            </div>`;
        }).join('');

        grid.querySelectorAll('.domain-card').forEach(card => {
            card.addEventListener('click', () => {
                grid.querySelectorAll('.domain-card').forEach(c => c.classList.remove('active'));
                card.classList.add('active');
                currentDomain = card.dataset.domain;
                const target = currentDomain === 'all'
                    ? 'courses.html'
                    : `courses.html?domain=${encodeURIComponent(currentDomain)}`;
                window.location.href = target;
            });
        });
    }

    // ===== RENDER COMPANIES =====
    function renderCompanies() {
        const grid = $('#companies-grid');
        if (!grid) return;

        grid.innerHTML = COMPANIES.map(c => {
            const count = COURSES.filter(course => course.company === c.id).length;
            return `<div class="company-card" data-company="${c.id}">
                <div class="company-card-top">
                    <div class="company-logo" style="background:${c.bg};color:${c.color}">
                        <i class="${c.icon}"></i>
                    </div>
                    <div>
                        <div class="company-name">${c.name}</div>
                        <div class="company-courses-count">${count} free courses</div>
                    </div>
                </div>
                <div class="company-desc">${c.desc}</div>
                <a href="${c.url}" target="_blank" rel="noopener" class="company-link">
                    Visit Platform <i class="fas fa-arrow-right"></i>
                </a>
            </div>`;
        }).join('');
    }

    // ===== POPULATE FILTERS =====
    function populateFilters() {
        const companySelect = $('#company-filter');
        const chips = $('#filter-chips');
        const levelFilter = $('#level-filter');
        const sortFilter = $('#sort-filter');

        if (!companySelect || !chips || !levelFilter || !sortFilter) return;

        COMPANIES.forEach(c => {
            companySelect.innerHTML += `<option value="${c.id}">${c.name}</option>`;
        });

        chips.innerHTML = `<button class="filter-chip active" data-filter="all"><i class="fas fa-th-large"></i> All</button>`;
        chips.innerHTML += `<button class="filter-chip" data-filter="featured"><i class="fas fa-star"></i> Featured</button>`;
        chips.innerHTML += `<button class="filter-chip" data-filter="non-tech"><i class="fas fa-briefcase"></i> Non-Technical Domains</button>`;
        DOMAINS.filter(d => d.category !== 'non-tech').slice(0, 6).forEach(d => {
            chips.innerHTML += `<button class="filter-chip" data-filter="${d.id}">${d.icon} ${d.name}</button>`;
        });
        chips.querySelectorAll('.filter-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                chips.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
                chip.classList.add('active');
                visibleCount = COURSES_PER_PAGE;
                renderCourses();
            });
        });
        companySelect.addEventListener('change', () => { visibleCount = COURSES_PER_PAGE; renderCourses(); });
        levelFilter.addEventListener('change', () => { visibleCount = COURSES_PER_PAGE; renderCourses(); });
        sortFilter.addEventListener('change', () => renderCourses());
    }

    // ===== RENDER COURSES =====
    function renderCourses() {
        const grid = $('#course-grid');
        const noRes = $('#no-results');
        const loadMore = $('#load-more-container');
        const companyFilter = $('#company-filter');
        const levelFilter = $('#level-filter');
        const sortFilter = $('#sort-filter');

        if (!grid || !noRes || !loadMore || !companyFilter || !levelFilter || !sortFilter) return;

        let filtered = [...COURSES];
        // Domain from domain section
        if (currentDomain !== 'all') filtered = filtered.filter(c => c.domain === currentDomain);
        // Filter chip
        const chipFilter = $('.filter-chip.active')?.dataset.filter;
        if (chipFilter && chipFilter !== 'all') {
            if (chipFilter === 'featured') filtered = filtered.filter(c => c.featured);
            else if (chipFilter === 'non-tech') {
                const ntIds = DOMAINS.filter(d => d.category === 'non-tech').map(d => d.id);
                filtered = filtered.filter(c => ntIds.includes(c.domain));
            }
            else filtered = filtered.filter(c => c.domain === chipFilter);
        }
        // Company filter
        const companyVal = companyFilter.value;
        if (companyVal !== 'all') filtered = filtered.filter(c => c.company === companyVal);
        // Level filter
        const levelVal = levelFilter.value;
        if (levelVal !== 'all') filtered = filtered.filter(c => c.level === levelVal);
        // Sort
        const sortVal = sortFilter.value;
        if (sortVal === 'rating') filtered.sort((a, b) => b.rating - a.rating);
        else if (sortVal === 'duration-asc') filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        else if (sortVal === 'duration-desc') filtered.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
        else filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

        if (filtered.length === 0) {
            grid.innerHTML = '';
            noRes.style.display = 'block';
            loadMore.style.display = 'none';
            return;
        }
        noRes.style.display = 'none';

        const visible = filtered.slice(0, visibleCount);
        grid.innerHTML = visible.map(c => createCourseCard(c)).join('');
        loadMore.style.display = visibleCount < filtered.length ? 'block' : 'none';

        // Card events
        grid.querySelectorAll('.course-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (e.target.closest('.course-bookmark')) return;
                openModal(parseInt(card.dataset.id));
            });
        });
        grid.querySelectorAll('.course-bookmark').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleSave(parseInt(btn.dataset.id));
            });
        });
    }

    function createCourseCard(c) {
        const comp = getCompany(c.company);
        const isSaved = savedCourses.includes(c.id);
        return `<div class="course-card" data-id="${c.id}">
            <div class="course-card-header">
                <div class="course-company">
                    <div class="course-company-icon" style="background:${comp.bg};color:${comp.color}">
                        <i class="${comp.icon}"></i>
                    </div>
                    <div>
                        <div class="course-company-label">${comp.name}</div>
                        <div class="course-company-name">${getDomain(c.domain).name}</div>
                    </div>
                </div>
                <button class="course-bookmark ${isSaved ? 'saved' : ''}" data-id="${c.id}" title="${isSaved ? 'Remove from saved' : 'Save course'}">
                    <i class="fas fa-bookmark"></i>
                </button>
            </div>
            <div class="course-card-body">
                <div class="course-title">${c.title}</div>
                <div class="course-desc">${c.desc}</div>
                <div class="course-tags">${c.tags.map(t => `<span class="course-tag">${t}</span>`).join('')}</div>
            </div>
            <div class="course-card-footer">
                <div class="course-meta">
                    <div class="course-meta-item"><i class="fas fa-clock"></i> ${c.duration}</div>
                    <div class="course-meta-item"><i class="fas fa-star"></i> ${c.rating}</div>
                </div>
                <span class="course-level ${c.level.toLowerCase()}">${c.level}</span>
            </div>
        </div>`;
    }

    // ===== MODAL =====
    function openModal(id) {
        const modalHeader = $('#modal-header');
        const modalBody = $('#modal-body');
        const modal = $('#course-modal');
        if (!modalHeader || !modalBody || !modal) return;

        const c = COURSES.find(x => x.id === id);
        if (!c) return;
        const comp = getCompany(c.company);
        const dom = getDomain(c.domain);
        const isSaved = savedCourses.includes(c.id);

        modalHeader.innerHTML = `
            <div class="course-company" style="margin-bottom:16px">
                <div class="course-company-icon" style="background:${comp.bg};color:${comp.color};width:48px;height:48px;font-size:1.3rem">
                    <i class="${comp.icon}"></i>
                </div>
                <div>
                    <div class="course-company-label" style="font-size:1rem">${comp.name}</div>
                    <div class="course-company-name">${dom.icon} ${dom.name}</div>
                </div>
            </div>
            <h2 style="font-size:1.5rem;font-weight:800;line-height:1.3">${c.title}</h2>`;

        modalBody.innerHTML = `
            <p class="course-desc" style="margin:16px 0;font-size:0.95rem;line-height:1.7;color:var(--text-secondary)">${c.desc}</p>
            <div class="modal-tags">${c.tags.map(t => `<span class="modal-tag">${t}</span>`).join('')}</div>
            <div class="modal-meta">
                <div class="modal-meta-item"><i class="fas fa-clock"></i> ${c.duration}</div>
                <div class="modal-meta-item"><i class="fas fa-star"></i> ${c.rating} Rating</div>
                <div class="modal-meta-item"><i class="fas fa-signal"></i> ${c.level}</div>
                <div class="modal-meta-item"><i class="fas fa-certificate"></i> Free Certificate</div>
            </div>
            <div class="modal-actions">
                <a href="${c.url}" target="_blank" rel="noopener" class="btn-primary btn-lg" style="text-decoration:none">
                    <span>Start Learning</span> <i class="fas fa-external-link-alt"></i>
                </a>
                <button class="btn-glass btn-lg" id="modal-save" data-id="${c.id}">
                    <i class="fas fa-bookmark"></i>
                    <span>${isSaved ? 'Saved' : 'Save Course'}</span>
                </button>
            </div>`;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        $('#modal-save')?.addEventListener('click', () => {
            toggleSave(c.id);
            const isSavedNow = savedCourses.includes(c.id);
            $('#modal-save').innerHTML = `<i class="fas fa-bookmark"></i><span>${isSavedNow ? 'Saved' : 'Save Course'}</span>`;
        });
    }

    function closeModal() {
        const modal = $('#course-modal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // ===== SAVED COURSES =====
    function toggleSave(id) {
        const idx = savedCourses.indexOf(id);
        if (idx > -1) {
            savedCourses.splice(idx, 1);
            showToast('Course removed from saved', 'info');
        } else {
            savedCourses.push(id);
            showToast('Course saved!', 'success');
        }
        localStorage.setItem('sv_saved', JSON.stringify(savedCourses));
        updateBookmarkCount();
        renderCourses();
    }

    function updateBookmarkCount() {
        const bookmarkCount = $('#bookmark-count');
        if (bookmarkCount) bookmarkCount.textContent = savedCourses.length;
    }

    function openSidebar() {
        const body = $('#sidebar-body');
        const sidebar = $('#saved-sidebar');
        const overlay = $('#sidebar-overlay');
        if (!body || !sidebar || !overlay) return;

        if (savedCourses.length === 0) {
            body.innerHTML = `<div class="sidebar-empty">
                <i class="fas fa-bookmark"></i>
                <h3>No saved courses</h3>
                <p style="font-size:0.85rem;margin-top:8px">Click the bookmark icon on any course to save it here</p>
            </div>`;
        } else {
            body.innerHTML = savedCourses.map(id => {
                const c = COURSES.find(x => x.id === id);
                if (!c) return '';
                const comp = getCompany(c.company);
                return `<div class="saved-course-item">
                    <div class="course-company-icon" style="background:${comp.bg};color:${comp.color};width:36px;height:36px;font-size:0.9rem;border-radius:8px;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                        <i class="${comp.icon}"></i>
                    </div>
                    <div class="saved-course-info">
                        <div class="saved-course-title">${c.title}</div>
                        <div class="saved-course-company">${comp.name} · ${c.duration}</div>
                    </div>
                    <button class="saved-course-remove" data-id="${c.id}" title="Remove"><i class="fas fa-times"></i></button>
                </div>`;
            }).join('');
            body.querySelectorAll('.saved-course-remove').forEach(btn => {
                btn.addEventListener('click', () => {
                    toggleSave(parseInt(btn.dataset.id));
                    openSidebar(); // refresh
                });
            });
        }
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }

    function closeSidebar() {
        const sidebar = $('#saved-sidebar');
        const overlay = $('#sidebar-overlay');
        if (sidebar) sidebar.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
    }

    // ===== TOAST =====
    function showToast(message, type = 'info') {
        const container = $('#toast-container');
        if (!container) return;
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i><span>${message}</span>`;
        container.appendChild(toast);
        setTimeout(() => { toast.style.opacity = '0'; toast.style.transform = 'translateX(20px)'; setTimeout(() => toast.remove(), 300); }, 3000);
    }

    // ===== HERO ANIMATIONS =====
    function initHeroAnimations() {
        const counters = $$('[data-count]');
        if (!counters.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(el => observer.observe(el));
    }

    function animateCounter(el) {
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const start = performance.now();
        function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
            el.textContent = Math.floor(target * eased);
            if (progress < 1) requestAnimationFrame(update);
            else el.textContent = target;
        }
        requestAnimationFrame(update);
    }

    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const animElements = $$('.domain-card, .course-card, .company-card, .stat-card, .step-card, .page-link-card');
        if (!animElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        animElements.forEach((el, i) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = `opacity 0.6s ease ${i % 6 * 0.08}s, transform 0.6s ease ${i % 6 * 0.08}s`;
            observer.observe(el);
        });
    }

    // ===== EVENT LISTENERS =====
    function initEventListeners() {
        $('#modal-close')?.addEventListener('click', closeModal);
        $('#course-modal')?.addEventListener('click', (e) => { if (e.target === $('#course-modal')) closeModal(); });

        $('#btn-bookmark')?.addEventListener('click', openSidebar);
        $('#sidebar-close')?.addEventListener('click', closeSidebar);
        $('#sidebar-overlay')?.addEventListener('click', closeSidebar);

        $('#load-more-btn')?.addEventListener('click', () => {
            visibleCount += COURSES_PER_PAGE;
            renderCourses();
        });

        $('#explore-courses-btn')?.addEventListener('click', () => {
            window.location.href = 'courses.html';
        });
        $('#get-started-btn')?.addEventListener('click', () => {
            window.location.href = 'courses.html';
        });
        $('#watch-demo-btn')?.addEventListener('click', () => {
            window.location.href = 'impact.html';
        });

        // Keyboard
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { closeModal(); closeSidebar(); }
        });
    }

    function initPageState() {
        const params = new URLSearchParams(window.location.search);
        const domainParam = params.get('domain');
        if (domainParam && DOMAINS.some(domain => domain.id === domainParam)) {
            currentDomain = domainParam;
        }
    }

    // ===== HELPERS =====
    function getCompany(id) { return COMPANIES.find(c => c.id === id) || {}; }
    function getDomain(id) { return DOMAINS.find(d => d.id === id) || {}; }
})();
