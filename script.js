"use strict";

const tasks = [
    {
        id: "nif",
        title: "Get NIF",
        description: "Secure your Portuguese tax identification number.",
        icon: "📄",
        reward: {
            icon: "🏅",
            title: "Portuguese Paperwork Apprentice",
            message: "The first official step is complete. Alex is now in the Portuguese system!"
        }
    },
    {
        id: "bank",
        title: "Open bank account",
        description: "Set up a Portuguese bank account for the move.",
        icon: "🏦",
        reward: null
    },
    {
        id: "police",
        title: "Obtain police certificate",
        description: "Get the required police certificate for the visa application.",
        icon: "📜",
        reward: null
    },
    {
        id: "insurance",
        title: "Arrange health insurance",
        description: "Make sure Alex has the required health cover.",
        icon: "🩺",
        reward: {
            icon: "🛡️",
            title: "Adventure Protected",
            message: "Health insurance is sorted. Alex is covered for the journey ahead."
        }
    },
    {
        id: "accommodation",
        title: "Secure accommodation",
        description: "Find and confirm Alex's new home in Portugal.",
        icon: "🏠",
        reward: {
            icon: "🔑",
            title: "A Portuguese Home",
            message: "Alex has somewhere to call home when he reaches Portugal."
        }
    },
    {
        id: "visa",
        title: "Receive D7 visa",
        description: "Complete the application and receive the approved D7 visa.",
        icon: "🛂",
        reward: {
            icon: "🌟",
            title: "Visa Warrior",
            message: "The D7 visa is complete. Portugal is officially becoming real!"
        }
    },
    {
        id: "dogs",
        title: "Settle the dogs into their new home",
        description: "Make sure the Springer Spaniels are happy and settled in England.",
        icon: "🐶",
        reward: {
            icon: "🐾",
            title: "Springer Spaniel Superhero",
            message: "The dogs are safe, happy and settled in their new home in England."
        }
    },
    {
        id: "party",
        title: "Have the leaving party",
        description: "Celebrate the adventure with friends and family before departure.",
        icon: "🥳",
        reward: {
            icon: "🎊",
            title: "One Last British Bash",
            message: "The leaving party is complete. Memories made, hugs given and adventure pending!"
        }
    },
    {
        id: "flights",
        title: "Book flights",
        description: "Book the flight that takes Alex from England to Portugal.",
        icon: "✈️",
        reward: {
            icon: "🎟️",
            title: "Portugal Bound",
            message: "The flight is booked. The countdown to Portugal has officially begun!"
        }
    }
];

const totalDistanceMiles = 1650;
const storageKey = "alexPortugalJourneyV2";

const taskList = document.getElementById("taskList");
const journeyTrack = document.getElementById("journeyTrack");
const alexTraveller = document.getElementById("alexTraveller");

const progressFill = document.getElementById("progressFill");
const progressPercentage = document.getElementById("progressPercentage");
const journeyPercentage = document.getElementById("journeyPercentage");
const progressCount = document.getElementById("progressCount");
const progressMessage = document.getElementById("progressMessage");
const distanceRemaining = document.getElementById("distanceRemaining");
const progressBar = document.querySelector(".progress-bar");

const nextRewardContent = document.getElementById("nextRewardContent");
const finalDestination = document.getElementById("finalDestination");

const rewardModal = document.getElementById("rewardModal");
const rewardIcon = document.getElementById("rewardIcon");
const rewardTitle = document.getElementById("rewardTitle");
const rewardMessage = document.getElementById("rewardMessage");
const closeRewardButton = document.getElementById("closeRewardButton");

const resetButton = document.getElementById("resetButton");
const confettiCanvas = document.getElementById("confettiCanvas");

let taskState = loadTaskState();
let previousCompletedCount = getCompletedCount();

function createDefaultState() {
    return Object.fromEntries(
        tasks.map(task => [task.id, false])
    );
}

function loadTaskState() {
    try {
        const storedState = JSON.parse(
            localStorage.getItem(storageKey)
        );

        return {
            ...createDefaultState(),
            ...(storedState || {})
        };
    } catch (error) {
        console.warn("Saved progress could not be loaded.", error);
        return createDefaultState();
    }
}

function saveTaskState() {
    localStorage.setItem(
        storageKey,
        JSON.stringify(taskState)
    );
}

function getCompletedCount() {
    return tasks.filter(task => taskState[task.id]).length;
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const label = document.createElement("label");

        label.className = "task";
        label.dataset.taskId = task.id;

        if (taskState[task.id]) {
            label.classList.add("task--complete");
        }

        label.innerHTML = `
            <span class="task-number">${index + 1}</span>

            <span class="task-icon" aria-hidden="true">
                ${task.icon}
            </span>

            <span class="task-copy">
                <strong>${task.title}</strong>
                <small>${task.description}</small>
            </span>

            ${
                task.reward
                    ? `
                        <span class="task-reward">
                            Reward
                        </span>
                    `
                    : ""
            }

            <input
                type="checkbox"
                data-task-id="${task.id}"
                ${taskState[task.id] ? "checked" : ""}
                aria-label="${task.title}"
            >

            <span class="custom-checkbox" aria-hidden="true">
                ✓
            </span>
        `;

        taskList.appendChild(label);
    });

    const checkboxes = taskList.querySelectorAll(
        'input[type="checkbox"]'
    );

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener(
            "change",
            handleTaskChange
        );
    });
}

function renderJourney() {
    journeyTrack.innerHTML = "";

    const startNode = createJourneyNode({
        label: "Haltwhistle",
        icon: "🏡",
        complete: true,
        type: "start"
    });

    journeyTrack.appendChild(startNode);

    tasks.forEach(task => {
        const node = createJourneyNode({
            label: task.title,
            icon: task.icon,
            complete: taskState[task.id],
            type: "task",
            taskId: task.id
        });

        journeyTrack.appendChild(node);
    });

    const portugalNode = createJourneyNode({
        label: "Portugal",
        icon: "🏖️",
        complete: getCompletedCount() === tasks.length,
        type: "finish"
    });

    journeyTrack.appendChild(portugalNode);
}

function createJourneyNode({
    label,
    icon,
    complete,
    type,
    taskId = ""
}) {
    const node = document.createElement("div");

    node.className = `journey-node journey-node--${type}`;

    if (complete) {
        node.classList.add("journey-node--complete");
    }

    if (taskId) {
        node.dataset.taskId = taskId;
    }

    node.innerHTML = `
        <span class="journey-dot">
            <span class="journey-node-icon" aria-hidden="true">
                ${icon}
            </span>

            <span class="journey-check" aria-hidden="true">
                ✓
            </span>
        </span>

        <span class="journey-label">
            ${label}
        </span>
    `;

    return node;
}

function handleTaskChange(event) {
    const checkbox = event.currentTarget;
    const taskId = checkbox.dataset.taskId;
    const wasComplete = taskState[taskId];

    taskState[taskId] = checkbox.checked;
    saveTaskState();

    const task = tasks.find(item => item.id === taskId);

    if (checkbox.checked && !wasComplete) {
        celebrateTask(task, checkbox);
    }

    renderApp();
}

function celebrateTask(task, checkbox) {
    const rectangle = checkbox.getBoundingClientRect();

    launchConfetti(
        rectangle.left + rectangle.width / 2,
        rectangle.top + rectangle.height / 2
    );

    document.body.classList.add("celebrating");

    window.setTimeout(() => {
        document.body.classList.remove("celebrating");
    }, 650);

    if (task.reward) {
        window.setTimeout(() => {
            showReward(task.reward);
        }, 500);
    }

    const newCompletedCount = getCompletedCount();

    if (
        newCompletedCount === tasks.length &&
        previousCompletedCount !== tasks.length
    ) {
        window.setTimeout(() => {
            showFinalCelebration();
        }, task.reward ? 1700 : 700);
    }

    previousCompletedCount = newCompletedCount;
}

function renderApp() {
    renderTasks();
    renderJourney();
    updateProgress();
    updateAlexPosition();
    updateNextReward();
}

function updateProgress() {
    const completed = getCompletedCount();
    const percentage = Math.round(
        (completed / tasks.length) * 100
    );

    const remainingMiles = Math.max(
        0,
        Math.round(
            totalDistanceMiles * (1 - percentage / 100)
        )
    );

    progressFill.style.width = `${percentage}%`;

    progressPercentage.textContent = `${percentage}%`;
    journeyPercentage.textContent = `${percentage}%`;

    progressCount.textContent =
        `${completed} of ${tasks.length} complete`;

    progressBar.setAttribute(
        "aria-valuenow",
        String(percentage)
    );

    distanceRemaining.textContent =
        remainingMiles.toLocaleString("en-GB");

    progressMessage.textContent =
        getProgressMessage(completed);

    finalDestination.classList.toggle(
        "final-destination--unlocked",
        completed === tasks.length
    );
}

function getProgressMessage(completed) {
    if (completed === 0) {
        return "Every adventure begins with one small step.";
    }

    if (completed <= 2) {
        return "Great start. Alex has officially left the starting line!";
    }

    if (completed <= 4) {
        return "The paperwork mountain is getting smaller.";
    }

    if (completed <= 6) {
        return "More than halfway there. Portugal is getting closer!";
    }

    if (completed <= 8) {
        return "Nearly there. It is almost time to pack the sunglasses.";
    }

    return "Quest complete. Bem-vindo a Portugal!";
}

function updateAlexPosition() {
    const completed = getCompletedCount();
    const totalPositions = tasks.length + 1;

    const percentagePosition =
        (completed / totalPositions) * 100;

    alexTraveller.style.left =
        `calc(${percentagePosition}% - 36px)`;

    alexTraveller.classList.remove("alex-traveller--hop");

    requestAnimationFrame(() => {
        alexTraveller.classList.add("alex-traveller--hop");
    });

    alexTraveller.classList.toggle(
        "alex-traveller--arrived",
        completed === tasks.length
    );
}

function updateNextReward() {
    const nextRewardTask = tasks.find(
        task => !taskState[task.id] && task.reward
    );

    if (!nextRewardTask) {
        nextRewardContent.innerHTML = `
            <span class="reward-preview-icon">🏖️</span>

            <div>
                <strong>Beach Mode</strong>

                <p>
                    Complete every mission to unlock Portugal.
                </p>
            </div>
        `;

        return;
    }

    nextRewardContent.innerHTML = `
        <span class="reward-preview-icon">
            ${nextRewardTask.reward.icon}
        </span>

        <div>
            <strong>${nextRewardTask.reward.title}</strong>

            <p>
                Complete “${nextRewardTask.title}” to unlock it.
            </p>
        </div>
    `;
}

function showReward(reward) {
    rewardIcon.textContent = reward.icon;
    rewardTitle.textContent = reward.title;
    rewardMessage.textContent = reward.message;

    rewardModal.hidden = false;

    requestAnimationFrame(() => {
        rewardModal.classList.add("modal--visible");
    });

    launchConfetti(
        window.innerWidth / 2,
        window.innerHeight / 3,
        130
    );

    closeRewardButton.focus();
}

function closeReward() {
    rewardModal.classList.remove("modal--visible");

    window.setTimeout(() => {
        rewardModal.hidden = true;
    }, 250);
}

function showFinalCelebration() {
    launchConfetti(
        window.innerWidth / 2,
        window.innerHeight / 2,
        250
    );

    finalDestination.scrollIntoView({
        behaviour: "smooth",
        block: "center"
    });

    window.setTimeout(() => {
        showReward({
            icon: "🇵🇹",
            title: "Welcome to Portugal!",
            message:
                "Alex has completed every mission. It is officially time for the beach and a well-earned cocktail!"
        });
    }, 900);
}

function resetProgress() {
    const shouldReset = window.confirm(
        "Reset Alex's entire Portugal journey?"
    );

    if (!shouldReset) {
        return;
    }

    taskState = createDefaultState();
    previousCompletedCount = 0;

    saveTaskState();
    renderApp();

    window.scrollTo({
        top: 0,
        behaviour: "smooth"
    });
}

closeRewardButton.addEventListener(
    "click",
    closeReward
);

rewardModal.addEventListener(
    "click",
    event => {
        if (
            event.target.classList.contains("modal-backdrop")
        ) {
            closeReward();
        }
    }
);

document.addEventListener(
    "keydown",
    event => {
        if (
            event.key === "Escape" &&
            !rewardModal.hidden
        ) {
            closeReward();
        }
    }
);

resetButton.addEventListener(
    "click",
    resetProgress
);

/* Confetti */

const confettiContext = confettiCanvas.getContext("2d");

let confettiPieces = [];
let confettiAnimationFrame = null;

function resizeConfettiCanvas() {
    const pixelRatio = window.devicePixelRatio || 1;

    confettiCanvas.width =
        window.innerWidth * pixelRatio;

    confettiCanvas.height =
        window.innerHeight * pixelRatio;

    confettiCanvas.style.width =
        `${window.innerWidth}px`;

    confettiCanvas.style.height =
        `${window.innerHeight}px`;

    confettiContext.setTransform(
        pixelRatio,
        0,
        0,
        pixelRatio,
        0,
        0
    );
}

function launchConfetti(
    originX,
    originY,
    amount = 90
) {
    const colours = [
        "#e63946",
        "#f4a261",
        "#f6c945",
        "#2a9d8f",
        "#1d70b7",
        "#9b5de5",
        "#ef476f",
        "#38b000"
    ];

    for (let index = 0; index < amount; index += 1) {
        const angle =
            Math.random() * Math.PI * 2;

        const speed =
            3 + Math.random() * 8;

        confettiPieces.push({
            x: originX,
            y: originY,
            width: 5 + Math.random() * 7,
            height: 3 + Math.random() * 6,
            colour:
                colours[
                    Math.floor(
                        Math.random() * colours.length
                    )
                ],
            velocityX:
                Math.cos(angle) * speed,
            velocityY:
                Math.sin(angle) * speed - 4,
            gravity:
                0.11 + Math.random() * 0.08,
            rotation:
                Math.random() * Math.PI,
            rotationSpeed:
                (Math.random() - 0.5) * 0.3,
            life:
                95 + Math.random() * 55
        });
    }

    if (!confettiAnimationFrame) {
        animateConfetti();
    }
}

function animateConfetti() {
    confettiContext.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    confettiPieces = confettiPieces.filter(
        piece => piece.life > 0
    );

    confettiPieces.forEach(piece => {
        piece.x += piece.velocityX;
        piece.y += piece.velocityY;
        piece.velocityY += piece.gravity;
        piece.velocityX *= 0.992;
        piece.rotation += piece.rotationSpeed;
        piece.life -= 1;

        confettiContext.save();

        confettiContext.translate(
            piece.x,
            piece.y
        );

        confettiContext.rotate(
            piece.rotation
        );

        confettiContext.fillStyle =
            piece.colour;

        confettiContext.fillRect(
            -piece.width / 2,
            -piece.height / 2,
            piece.width,
            piece.height
        );

        confettiContext.restore();
    });

    if (confettiPieces.length > 0) {
        confettiAnimationFrame =
            requestAnimationFrame(
                animateConfetti
            );
    } else {
        confettiAnimationFrame = null;

        confettiContext.clearRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );
    }
}

window.addEventListener(
    "resize",
    () => {
        resizeConfettiCanvas();
        updateAlexPosition();
    }
);

resizeConfettiCanvas();
renderApp();
