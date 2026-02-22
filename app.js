document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    const themeBtn = document.getElementById('theme-btn');

    // State
    let currentModule = 'roadmap';
    let progress = JSON.parse(localStorage.getItem('llm_progress') || {});
    let notes = JSON.parse(localStorage.getItem('llm_notes') || {});
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

    function updateProgressBar() {
        const totalItems = Object.keys(ROADMAP_DATA).reduce((sum, key) => sum + ROADMAP_DATA[key].length, 0);
        const completedItems = Object.values(progress).filter(Boolean).length;
        const percentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

        progressFill.style.width = percentage + '%';
        progressPercent.innerText = percentage + '%';
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
        localStorage.setItem('llm_notes', JSON.stringify(notes));
    };

    window.showQuiz = (topic) => {
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
            background: var(--card-bg); border: 2px solid var(--accent); padding: 2rem;
            border-radius: 16px; z-index: 1000; max-width: 500px; width: 90%;
            box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        `;

        const quizContent = getQuizContent(topic);

        modal.innerHTML = `
            <h2 style="margin-bottom: 1rem;">Active Recall: ${topic}</h2>
            <div style="margin-bottom: 1.5rem; color: var(--text-secondary); line-height: 1.6;">
                ${quizContent}
            </div>
            <button class="btn btn-primary" onclick="this.parentElement.remove()">Got it!</button>
        `;
        document.body.appendChild(modal);

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.7); z-index: 999;
        `;
        overlay.onclick = () => { modal.remove(); overlay.remove(); };
        document.body.appendChild(overlay);
    };

    function getQuizContent(topic) {
        const quizzes = {
            "Linear Algebra": "1. What is a Basis? <br>2. How do you interpret Matrix Multiplication geometrically?<br>3. What do Eigenvalues represent in a transformation?",
            "Self-Attention Mechanism": "1. Why do we scale the dot product by √d_k?<br>2. Difference between Softmax(QK^T) and masked attention?<br>3. Why are Q, K, and V necessary instead of just one matrix?",
            "Llama": "1. What is RoPE (Rotary Positional Embeddings)?<br>2. Difference between Pre-Norm and Post-Norm?<br>3. How does SwiGLU improve performance over ReLU?",
            "Backprop": "1. State the Multivariable Chain Rule.<br>2. Why does vanishing gradient happen in deep networks?<br>3. How does Batch Normalization mitigate gradient issues?"
        };
        return quizzes[topic] || "1. Explain this concept in your own words.<br>2. How would you implement this from scratch?<br>3. What is the biggest limitation of this approach?";
    }

    function render() {
        mainContent.innerHTML = '';
        const data = ROADMAP_DATA[currentModule];

        if (currentModule === 'roadmap') renderRoadmap(data);
        else if (currentModule === 'planner') renderPlanner(data);
        else if (currentModule === 'papers') renderPapers(data);
        else renderCategorized(data);

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
            section.innerHTML = `<div class="stage-title"><h2>${stageName}</h2></div><div class="grid"></div>`;
            const grid = section.querySelector('.grid');

            stages[stageName].forEach((item, idx) => {
                const id = `roadmap-${stageName}-${idx}`.replace(/\s+/g, '-');
                grid.innerHTML += createCard({
                    tag: item.Topic,
                    title: item.Deliverable,
                    desc: item.Goal,
                    links: [
                        { text: 'Watch', url: item.Link, primary: true },
                        { text: '💻 Code', url: item.Implementation, title: 'Implementation' }
                    ],
                    id
                });
            });
            mainContent.appendChild(section);
        });
    }

    function renderPapers(data) {
        mainContent.innerHTML = `<div class="grid"></div>`;
        const grid = mainContent.querySelector('.grid');
        data.forEach((item, idx) => {
            const id = `paper-${idx}`;
            grid.innerHTML += createCard({
                tag: item.Category,
                title: item.Title,
                desc: `${item.Author} (${item.Year}) - ${item.Goal}`,
                links: [
                    { text: 'Scholar', url: item.Link, primary: true },
                    { text: '📄 PDF', url: `https://arxiv.org/pdf/${item.Link.split('/').pop()}`, title: 'Download PDF' }
                ],
                id
            });
        });
    }

    function renderPlanner(data) {
        mainContent.innerHTML = `<div class="grid"></div>`;
        const grid = mainContent.querySelector('.grid');
        data.forEach((item, idx) => {
            grid.innerHTML += createCard({
                tag: item.Week,
                title: item.Topic,
                desc: item.Focus,
                links: [
                    { text: 'Plan', url: item.Action, primary: true }
                ],
                id: `planner-${idx}`
            });
        });
    }

    function renderCategorized(data) {
        mainContent.innerHTML = `<div class="grid"></div>`;
        const grid = mainContent.querySelector('.grid');
        data.forEach((item, idx) => {
            const keys = Object.keys(item);
            grid.innerHTML += createCard({
                tag: item[keys[0]],
                title: item[keys[1]],
                desc: item[keys[2]] || '',
                links: item[keys[3]] ? [{ text: 'View', url: item[keys[3]], primary: true }] : [],
                id: `gen-${currentModule}-${idx}`
            });
        });
    }

    function createCard(opts) {
        const isChecked = progress[opts.id];
        const noteText = notes[opts.id] || '';

        let linksHtml = opts.links.map(l =>
            l.primary ?
                `<a href="${l.url}" target="_blank" class="btn btn-primary" style="flex:1; text-align:center;">${l.text}</a>` :
                `<a href="${l.url}" target="_blank" class="btn-icon" title="${l.title || ''}">${l.text}</a>`
        ).join('');

        return `
            <div class="card stagger-fade">
                <span class="card-tag">${opts.tag}</span>
                <h3 class="card-title">${opts.title}</h3>
                <p class="card-desc">${opts.desc}</p>
                <div class="card-actions">
                    ${linksHtml}
                    <button class="btn-icon" onclick="toggleNote('${opts.id}')" title="Notes">📝</button>
                    <button class="btn-icon" onclick="showQuiz('${opts.tag}')" title="Quiz">💡</button>
                    <div class="progress-checkbox ${isChecked ? 'checked' : ''}" onclick="toggleProgress('${opts.id}')"></div>
                </div>
                <textarea id="note-${opts.id}" class="note-area ${noteText ? 'visible' : ''}" 
                    placeholder="Reflections on this topic..." 
                    oninput="updateNote('${opts.id}', this.value)">${noteText}</textarea>
            </div>
        `;
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
