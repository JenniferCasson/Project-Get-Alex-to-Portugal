const checkboxes = document.querySelectorAll(
    '.task input[type="checkbox"]'
);

const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const traveller = document.getElementById('traveller');
const message = document.getElementById('message');

function saveProgress() {
    const taskStates = Array.from(checkboxes).map(
        checkbox => checkbox.checked
    );

    localStorage.setItem(
        'portugalTasks',
        JSON.stringify(taskStates)
    );
}

function loadProgress() {
    const savedTasks = JSON.parse(
        localStorage.getItem('portugalTasks')
    );

    if (!savedTasks) {
        return;
    }

    checkboxes.forEach((checkbox, index) => {
        checkbox.checked = savedTasks[index] ?? false;
    });
}

function updateProgress() {
    const completed = Array.from(checkboxes).filter(
        checkbox => checkbox.checked
    ).length;

    const total = checkboxes.length;
    const percentage = Math.round((completed / total) * 100);

    progressFill.style.width = `${percentage}%`;
    progressText.textContent =
        `${completed} of ${total} completed — ${percentage}%`;

    const maximumMovement =
        document.querySelector('.journey').clientWidth - 100;

    traveller.style.left =
        `${maximumMovement * (percentage / 100)}px`;

    if (percentage === 100) {
        traveller.textContent = '🏖️';
        message.textContent =
            'You made it to Portugal! Parabéns! 🇵🇹';
    } else if (percentage >= 75) {
        traveller.textContent = '✈️';
        message.textContent =
            'Nearly there — Portugal is getting closer!';
    } else if (percentage >= 40) {
        traveller.textContent = '🧳';
        message.textContent =
            'Great progress. Keep moving!';
    } else if (percentage > 0) {
        traveller.textContent = '🚶';
        message.textContent =
            'Mais perto — one step closer!';
    } else {
        traveller.textContent = '🧍';
        message.textContent =
            'Your Portugal journey starts here!';
    }

    saveProgress();
}

loadProgress();
updateProgress();

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
});

window.addEventListener('resize', updateProgress);
