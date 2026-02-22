document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // State
    let currentModule = 'roadmap';
    let progress = JSON.parse(localStorage.getItem('llm_progress') || '{}');

    function saveProgress() {
        localStorage.setItem('llm_progress', JSON.stringify(progress));
    }

    function toggleProgress(id) {
        progress[id] = !progress[id];
        saveProgress();
        render();
    }

    function render() {
        mainContent.innerHTML = '';
        const data = ROADMAP_DATA[currentModule];
        
        if (currentModule === 'roadmap') {
            renderRoadmap(data);
        } else if (currentModule === 'planner') {
            renderPlanner(data);
        } else if (currentModule === 'papers') {
            renderPapers(data);
        } else {
            renderGeneric(data);
        }
    }

    function renderRoadmap(data) {
        // Group by Stage
        const stages = {};
        data.forEach(item => {
            if (!stages[item.Stage]) stages[item.Stage] = [];
            stages[item.Stage].push(item);
        });

        Object.keys(stages).forEach(stageName => {
            const section = document.createElement('div');
            section.className = 'stage-section';
            section.innerHTML = `
                <div class="stage-title">
                    <h2>${stageName}</h2>
                </div>
                <div class="grid">
                    ${stages[stageName].map((item, index) => {
                        const id = `roadmap-${stageName}-${index}`;
                        const isChecked = progress[id];
                        return `
                            <div class="card stagger-fade" style="animation-delay: ${index * 0.05}s">
                                <span class="card-tag">${item.Topic}</span>
                                <h3 class="card-title">${item['Specific Video / Playlist'] || item.Topic}</h3>
                                <p class="card-desc">${item.Goal || ''}</p>
                                <div class="card-footer">
                                    <a href="${item['Direct Link (Searchable)']}" target="_blank" class="btn btn-primary">Watch Video</a>
                                    <div class="progress-checkbox ${isChecked ? 'checked' : ''}" onclick="toggleProgress('${id}')"></div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            `;
            mainContent.appendChild(section);
        });
    }

    function renderPlanner(data) {
        mainContent.innerHTML = `<h2>Study Planner</h2><div class="grid">` + 
        data.map((item, index) => {
            const id = `planner-${index}`;
            const isChecked = progress[id];
            return `
                <div class="card stagger-fade">
                    <span class="card-tag">${item.Week || 'Week'}</span>
                    <h3 class="card-title">${item.Topic || ''}</h3>
                    <p class="card-desc">${item.Focus || ''}</p>
                    <div class="card-footer">
                        <span>${item.Deliverable || ''}</span>
                        <div class="progress-checkbox ${isChecked ? 'checked' : ''}" onclick="toggleProgress('${id}')"></div>
                    </div>
                </div>
            `;
        }).join('') + `</div>`;
    }

    function renderPapers(data) {
        mainContent.innerHTML = `<h2>100 Paper Tracker</h2><div class="grid">` + 
        data.map((item, index) => {
            const id = `papers-${index}`;
            const isChecked = progress[id];
            return `
                <div class="card stagger-fade">
                    <span class="card-tag">${item.Category || 'Research'}</span>
                    <h3 class="card-title">${item.Title || item.Paper}</h3>
                    <p class="card-desc">${item.Author || ''}</p>
                    <div class="card-footer">
                        <a href="https://scholar.google.com/scholar?q=${encodeURIComponent(item.Title || item.Paper)}" target="_blank" class="btn btn-primary">Read</a>
                        <div class="progress-checkbox ${isChecked ? 'checked' : ''}" onclick="toggleProgress('${id}')"></div>
                    </div>
                </div>
            `;
        }).join('') + `</div>`;
    }

    function renderGeneric(data) {
        mainContent.innerHTML = `<div class="grid">` + 
        data.map((item, index) => {
            const id = `generic-${currentModule}-${index}`;
            const isChecked = progress[id];
            return `
                <div class="card stagger-fade">
                    <h3 class="card-title">${Object.values(item)[0]}</h3>
                    <p class="card-desc">${Object.values(item)[1] || ''}</p>
                    <div class="card-footer">
                        <div class="progress-checkbox ${isChecked ? 'checked' : ''}" onclick="toggleProgress('${id}')"></div>
                    </div>
                </div>
            `;
        }).join('') + `</div>`;
    }

    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            currentModule = link.dataset.module;
            render();
        });
    });

    // Handle global click for checkboxes (since they are dynamic)
    window.toggleProgress = toggleProgress;

    render();
});
