document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    const themeBtn = document.getElementById('theme-btn');

    // State
    let currentModule = 'roadmap';
    let progress = JSON.parse(localStorage.getItem('llm_progress') || '{}');
    let notes = JSON.parse(localStorage.getItem('llm_notes') || '{}');
    let currentTheme = localStorage.getItem('llm_theme') || 'dark';

    // Theme Logic
    document.body.setAttribute('data-theme', currentTheme);
    updateThemeBtn();

    themeBtn.addEventListener('click', () => {
        currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', currentTheme);
        localStorage.setItem('llm_theme', currentTheme);
        updateThemeBtn();
    });

    function updateThemeBtn() {
        themeBtn.innerText = currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
    }

    function saveProgress() {
        localStorage.setItem('llm_progress', JSON.stringify(progress));
        updateProgressBar();
    }

    function saveNotes() {
        localStorage.setItem('llm_notes', JSON.stringify(notes));
    }

    function updateProgressBar() {
        const totalItems = Object.keys(ROADMAP_DATA).reduce((sum, key) => sum + ROADMAP_DATA[key].length, 0);
        const completedItems = Object.values(progress).filter(Boolean).length;
        const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

        progressFill.style.width = `${percentage}%`;
        progressPercent.innerText = `${percentage}%`;
    }

    window.toggleProgress = (id) => {
        progress[id] = !progress[id];
        saveProgress();
        render();
    };

    window.toggleNote = (id) => {
        const area = document.getElementById(`note-${id}`);
        area.classList.toggle('visible');
    };

    window.updateNote = (id, text) => {
        notes[id] = text;
        saveNotes();
    };

    window.showQuiz = (topic) => {
        alert(`Quiz for ${topic}:\n\n1. What is the core intuition behind this?\n2. Can you explain the main formula?\n3. How does this connect to the previous stage?\n\n(Feature: Randomized active recall questions coming soon!)`);
    };

    function render() {
        mainContent.innerHTML = '';
        const data = ROADMAP_DATA[currentModule];

        if (currentModule === 'roadmap') renderRoadmap(data);
        else if (currentModule === 'planner') renderPlanner(data);
        else if (currentModule === 'papers') renderPapers(data);
        else renderGeneric(data);

        updateProgressBar();
    }

    function renderRoadmap(data) {
        const stages = {};
        data.forEach(item => {
            if (!stages[item.Stage]) stages[item.Stage] = [];
            stages[item.Stage].push(item);
        });

        Object.keys(stages).forEach(stageName => {
            const section = document.createElement('div');
            section.className = 'stage-section';
            section.innerHTML = `
                <div class="stage-title"><h2>${stageName}</h2></div>
                <div class="grid">
                    ${stages[stageName].map((item, index) => {
                const id = `roadmap-${stageName}-${index}`.replace(/\s+/g, '-');
                return createCard(item, id, item.Topic, item['Specific Video / Playlist'], item.Goal, item['Direct Link (Searchable)'], 'Watch');
            }).join('')}
                </div>
            `;
            mainContent.appendChild(section);
        });
    }

    function createCard(item, id, tag, title, desc, link, linkText) {
        const isChecked = progress[id];
        const noteText = notes[id] || '';
        const isPaper = currentModule === 'papers';

        // Build Arxiv Link for papers
        let extraLink = '';
        if (isPaper) {
            const query = encodeURIComponent(title || item.Paper);
            extraLink = `<a href="https://arxiv.org/search/?query=${query}&searchtype=all" target="_blank" class="btn-icon" title="View on ArXiv">📄</a>`;
        } else {
            // Add a code link placeholder for roadmap items
            extraLink = `<a href="https://github.com/search?q=${encodeURIComponent(title)}+implementation" target="_blank" class="btn-icon" title="View Code">💻</a>`;
        }

        return `
            <div class="card stagger-fade">
                <span class="card-tag">${tag}</span>
                <h3 class="card-title">${title || tag}</h3>
                <p class="card-desc">${desc || ''}</p>
                <div class="card-actions">
                    <a href="${link}" target="_blank" class="btn btn-primary" style="flex:1; text-align:center;">${linkText}</a>
                    ${extraLink}
                    <button class="btn-icon" onclick="toggleNote('${id}')" title="Take Notes">📝</button>
                    <button class="btn-icon" onclick="showQuiz('${title || tag}')" title="Self Quiz">💡</button>
                    <div class="progress-checkbox ${isChecked ? 'checked' : ''}" onclick="toggleProgress('${id}')"></div>
                </div>
                <textarea id="note-${id}" class="note-area ${noteText ? 'visible' : ''}" placeholder="Type your learning notes here..." oninput="updateNote('${id}', this.value)">${noteText}</textarea>
            </div>
        `;
    }

    function renderPlanner(data) {
        mainContent.innerHTML = `<h2>Study Planner</h2><div class="grid">` +
            data.map((item, index) => createCard(item, `planner-${index}`, item.Week, item.Topic, item.Focus, '#', 'View Plan')).join('') + `</div>`;
    }

    function renderPapers(data) {
        mainContent.innerHTML = `<h2>100 Paper Tracker</h2><div class="grid">` +
            data.map((item, index) => {
                const title = item.Title || item.Paper;
                const query = encodeURIComponent(title);
                return createCard(item, `paper-${index}`, item.Category || 'Research', title, item.Author, `https://scholar.google.com/scholar?q=${query}`, 'Scholar');
            }).join('') + `</div>`;
    }

    function renderGeneric(data) {
        mainContent.innerHTML = `<div class="grid">` +
            data.map((item, index) => createCard(item, `generic-${currentModule}-${index}`, Object.values(item)[0], Object.values(item)[0], Object.values(item)[1], '#', 'Action')).join('') + `</div>`;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentModule = link.dataset.module;
            render();
        });
    });

    render();
});
