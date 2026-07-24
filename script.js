"use strict";

const tasks = [
    {
        id: "nif",
        title: "Get your NIF",
        shortTitle: "NIF",
        description:
            "Secure your Portuguese tax identification number.",
        icon: "📄",
        image: "alex_nif.png",
        achievement: "Portuguese Paperwork Apprentice",
        celebration:
            "Your first official Portugal mission is complete!",
        rewardIcon: "🍪",
        reward: "Have a cookie"
    },
    {
        id: "bank",
        title: "Open your Portuguese bank account",
        shortTitle: "Bank Account",
        description:
            "Set up your Portuguese bank account for the move.",
        icon: "🏦",
        image: "alex_bank.png",
        achievement: "Money Master",
        celebration:
            "Your Portuguese finances are officially taking shape.",
        rewardIcon: "🍺",
        reward: "Have a well-earned beer"
    },
    {
        id: "police",
        title: "Obtain your police certificate",
        shortTitle: "Police Certificate",
        description:
            "Get the certificate required for your visa application.",
        icon: "📜",
        image: "alex_police_check.png",
        achievement: "Officially Approved",
        celebration:
            "The police certificate is complete. Another document defeated!",
        rewardIcon: "🐟",
        reward: "Have fish and chips"
    },
    {
        id: "insurance",
        title: "Arrange your health insurance",
        shortTitle: "Health Insurance",
        description:
            "Make sure you have the required health cover.",
        icon: "🩺",
        image: "alex_health_insurance.png",
        achievement: "Adventure Protected",
        celebration:
            "You are covered and ready for the adventure ahead.",
        rewardIcon: "🎬",
        reward: "Watch The Devil Wears Prada"
    },
    {
        id: "accommodation",
        title: "Secure your accommodation",
        shortTitle: "Accommodation",
        description:
            "Find and confirm your new home in Portugal.",
        icon: "🔑",
        image: "alex_keys.png",
        achievement: "Home Sweet Home",
        celebration:
            "You now have somewhere in Portugal to call home.",
        rewardIcon: "🍕",
        reward: "Have a cheat day"
    },
    {
        id: "visa",
        title: "Receive your D7 visa",
        shortTitle: "D7 Visa",
        description:
            "Complete the application and receive your approved visa.",
        icon: "🛂",
        image: "alex_d7.png",
        achievement: "Portugal Approved",
        celebration:
            "The D7 visa is approved. Your new life is becoming real!",
        rewardIcon: "🍽️",
        reward: "Choose your favourite dinner"
    },
    {
        id: "dogs",
        title: "Settle the dogs into their new home",
        shortTitle: "Dogs Settled",
        description:
            "Make sure the Springer Spaniels are happy and settled in England.",
        icon: "🐶",
        image: "alex_dogs.png",
        achievement: "Springer Spaniel Superhero",
        celebration:
            "The dogs are safe, happy and settled in their new home.",
        rewardIcon: "🚶‍♀️",
        reward: "Mum walks the dogs"
    },
    {
        id: "party",
        title: "Have your leaving party",
        shortTitle: "Leaving Party",
        description:
            "Celebrate with your friends and family before you leave.",
        icon: "🥳",
        image: "alex_party.png",
        achievement: "Farewell Legend",
        celebration:
            "The leaving party is complete. Memories made and hugs given!",
        rewardIcon: "🍸",
        reward: "Have your favourite party drink"
    },
    {
        id: "flights",
        title: "Book your flights",
        shortTitle: "Flights",
        description:
            "Book the flight that takes you from England to Portugal.",
        icon: "✈️",
        image: "alex_plane.png",
        achievement: "Portugal Bound",
        celebration:
            "The flight is booked. The countdown has officially begun!",
        rewardIcon: "🍿",
        reward: "Have a film night with snacks"
    }
];

const alexImages = [
    "alex.png",
    "alex_nif.png",
    "alex_bank.png",
    "alex_police_check.png",
    "alex_health_insurance.png",
    "alex_keys.png",
    "alex_d7.png",
    "alex_dogs.png",
    "alex_party.png",
    "alex_plane.png",
    "alex_beach.png"
];

const storageKey = "yourPortugalJourneyV3";
const totalDistanceMiles = 1650;

const taskList =
    document.getElementById("taskList");

const journeyTrack =
    document.getElementById("journeyTrack");

const alexTraveller =
    document.getElementById("alexTraveller");

const alexTravellerImage =
    document.getElementById("alexTravellerImage");

const progressFill =
    document.getElementById("progressFill");

const progressPercentage =
    document.getElementById("progressPercentage");

const journeyPercentage =
    document.getElementById("journeyPercentage");

const progressCount =
    document.getElementById("progressCount");

const progressMessage =
    document.getElementById("progressMessage");

const progressBar =
    document.getElementById("progressBar");

const distanceRemaining =
    document.getElementById("distanceRemaining");

const nextRewardContent =
    document.getElementById("nextRewardContent");

const rewardCabinet =
    document.getElementById("rewardCabinet");

const finalDestination =
    document.getElementById("finalDestination");

const resetButton =
    document.getElementById("resetButton");

const rewardModal =
    document.getElementById("rewardModal");

const rewardIcon =
    document.getElementById("rewardIcon");

const rewardTitle =
    document.getElementById("rewardTitle");

const achievementName =
    document.getElementById("achievementName");

const rewardMessage =
    document.getElementById("rewardMessage");

const rewardCharacterImage =
    document.getElementById("rewardCharacterImage");

const realRewardIcon =
    document.getElementById("realRewardIcon");

const realRewardText =
    document.getElementById("realRewardText");

const closeRewardButton =
    document.getElementById("closeRewardButton");

const confettiCanvas =
    document.getElementById("confettiCanvas");

let taskState = loadProgress();
let previousCompletedCount = getCompletedCount();

function createDefaultState() {
    return Object.fromEntries(
        tasks.map(task => [task.id, false])
    );
}

function loadProgress() {
    try {
        const stored = localStorage.getItem(storageKey);

        if (!stored) {
            return createDefaultState();
        }

        return {
            ...createDefaultState(),
            ...JSON.parse(stored)
        };
    } catch (error) {
        console.warn(
            "Saved progress could not be loaded.",
            error
        );

        return createDefaultState();
    }
}

function saveProgress() {
    try {
        localStorage.setItem(
            storageKey,
            JSON.stringify(taskState)
        );
    } catch (error) {
        console.warn(
            "Progress could not be saved.",
            error
        );
    }
}

function getCompletedCount() {
    return tasks.filter(
        task => taskState[task.id]
    ).length;
}

function renderApp() {
    renderTasks();
    renderJourney();
    updateProgress();
    updateCharacter();
    updateNextReward();
    renderRewardCabinet();
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskLabel =
            document.createElement("label");

        taskLabel.className = "task";

        if (taskState[task.id]) {
            taskLabel.classList.add(
                "task--complete"
            );
        }

        taskLabel.innerHTML = `
            <span class="task-number">
                ${index + 1}
            </span>

            <span
                class="task-icon"
                aria-hidden="true"
            >
                ${task.icon}
            </span>

            <span class="task-copy">
                <strong>${task.title}</strong>
                <small>${task.description}</small>
            </span>

            <span class="task-reward-preview">
                ${task.rewardIcon}
                ${task.reward}
            </span>

            <input
                type="checkbox"
                data-task-id="${task.id}"
                aria-label="${task.title}"
                ${taskState[task.id] ? "checked" : ""}
            >

            <span
                class="custom-checkbox"
                aria-hidden="true"
            >
                ✓
            </span>
        `;

        taskList.appendChild(taskLabel);
    });

    taskList
        .querySelectorAll('input[type="checkbox"]')
        .forEach(checkbox => {
            checkbox.addEventListener(
                "change",
                handleTaskChange
            );
        });
}

function handleTaskChange(event) {
    const checkbox = event.currentTarget;
    const taskId = checkbox.dataset.taskId;

    const task = tasks.find(
        item => item.id === taskId
    );

    const wasComplete = taskState[taskId];

    taskState[taskId] = checkbox.checked;

    saveProgress();

    if (checkbox.checked && !wasComplete) {
        celebrateTask(task, checkbox);
    } else {
        previousCompletedCount =
            getCompletedCount();
    }

    renderApp();
}

function renderJourney() {
    journeyTrack.innerHTML = "";

    journeyTrack.appendChild(
        createJourneyNode({
            label: "Haltwhistle",
            icon: "🏡",
            complete: true,
            type: "start"
        })
    );

    tasks.forEach(task => {
        journeyTrack.appendChild(
            createJourneyNode({
                label: task.shortTitle,
                icon: task.icon,
                complete: taskState[task.id],
                type: "task"
            })
        );
    });

    journeyTrack.appendChild(
        createJourneyNode({
            label: "Portugal",
            icon: "🏖️",
            complete:
                getCompletedCount() === tasks.length,
            type: "finish"
        })
    );
}

function createJourneyNode({
    label,
    icon,
    complete,
    type
}) {
    const node =
        document.createElement("div");

    node.className =
        `journey-node journey-node--${type}`;

    if (complete) {
        node.classList.add(
            "journey-node--complete"
        );
    }

    node.innerHTML = `
        <span class="journey-dot">

            <span
                class="journey-node-icon"
                aria-hidden="true"
            >
                ${icon}
            </span>

            <span
                class="journey-check"
                aria-hidden="true"
            >
                ✓
            </span>

        </span>

        <span class="journey-label">
            ${label}
        </span>
    `;

    return node;
}

function updateProgress() {
    const completed =
        getCompletedCount();

    const percentage =
        Math.round(
            (completed / tasks.length) * 100
        );

    const remaining =
        Math.max(
            0,
            Math.round(
                totalDistanceMiles *
                (1 - completed / tasks.length)
            )
        );

    progressFill.style.width =
        `${percentage}%`;

    progressPercentage.textContent =
        `${percentage}%`;

    journeyPercentage.textContent =
        `${percentage}%`;

    progressCount.textContent =
        `${completed} of ${tasks.length} complete`;

    distanceRemaining.textContent =
        remaining.toLocaleString("en-GB");

    progressBar.setAttribute(
        "aria-valuenow",
        String(percentage)
    );

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
        return "Great start! You have officially left the starting line.";
    }

    if (completed <= 4) {
        return "The paperwork mountain is already getting smaller.";
    }

    if (completed <= 6) {
        return "You are over halfway there. Portugal is getting closer!";
    }

    if (completed <= 8) {
        return "Nearly there. It is almost time to pack your sunglasses.";
    }

    return "Quest complete. Bem-vindo a Portugal!";
}

function updateCharacter() {
    const completed =
        getCompletedCount();

    const imageIndex =
        completed === tasks.length
            ? alexImages.length - 1
            : completed;

    alexTravellerImage.src =
        alexImages[imageIndex];

    rewardCharacterImage.src =
        alexImages[imageIndex];

    const numberOfSections =
        tasks.length + 1;

    const position =
        (completed / numberOfSections) * 100;

    alexTraveller.style.left =
        `calc(${position}% - 48px)`;

    alexTraveller.classList.remove(
        "alex-traveller--hop"
    );

    requestAnimationFrame(() => {
        alexTraveller.classList.add(
            "alex-traveller--hop"
        );
    });

    alexTraveller.classList.toggle(
        "alex-traveller--arrived",
        completed === tasks.length
    );
}

function updateNextReward() {
    const nextTask = tasks.find(
        task => !taskState[task.id]
    );

    if (!nextTask) {
        nextRewardContent.innerHTML = `
            <span class="next-reward-icon">
                🏖️
            </span>

            <div>
                <strong>Beach Mode</strong>

                <p>
                    Every mission is complete.
                    Your final reward is Portugal!
                </p>
            </div>
        `;

        return;
    }

    nextRewardContent.innerHTML = `
        <span class="next-reward-icon">
            ${nextTask.rewardIcon}
        </span>

        <div>
            <strong>${nextTask.reward}</strong>

            <p>
                Complete “${nextTask.title}”
                to unlock this reward.
            </p>
        </div>
    `;
}

function renderRewardCabinet() {
    const completedTasks = tasks.filter(
        task => taskState[task.id]
    );

    if (completedTasks.length === 0) {
        rewardCabinet.innerHTML = `
            <p class="empty-cabinet">
                Your rewards will appear here
                as you complete missions.
            </p>
        `;

        return;
    }

    rewardCabinet.innerHTML =
        completedTasks
            .map(task => `
                <div class="cabinet-reward">

                    <span aria-hidden="true">
                        ${task.rewardIcon}
                    </span>

                    <div>
                        <strong>${task.reward}</strong>
                        <small>${task.achievement}</small>
                    </div>

                    <span
                        class="cabinet-tick"
                        aria-hidden="true"
                    >
                        ✓
                    </span>

                </div>
            `)
            .join("");
}

function celebrateTask(task, checkbox) {
    const rectangle =
        checkbox.getBoundingClientRect();

    launchConfetti(
        rectangle.left +
        rectangle.width / 2,
        rectangle.top +
        rectangle.height / 2,
        110
    );

    document.body.classList.add(
        "celebrating"
    );

    window.setTimeout(() => {
        document.body.classList.remove(
            "celebrating"
        );
    }, 750);

    window.setTimeout(() => {
        showReward(task);
    }, 500);

    const completed =
        getCompletedCount();

    if (
        completed === tasks.length &&
        previousCompletedCount !== tasks.length
    ) {
        window.setTimeout(() => {
            showFinalCelebration();
        }, 1900);
    }

    previousCompletedCount = completed;
}

function showReward(task) {
    rewardIcon.textContent =
        task.rewardIcon;

    rewardTitle.textContent =
        "Mission complete!";

    achievementName.textContent =
        task.achievement;

    rewardMessage.textContent =
        task.celebration;

    realRewardIcon.textContent =
        task.rewardIcon;

    realRewardText.textContent =
        task.reward;

    rewardCharacterImage.src =
        task.image;

    rewardModal.hidden = false;

    requestAnimationFrame(() => {
        rewardModal.classList.add(
            "modal--visible"
        );
    });

    launchConfetti(
        window.innerWidth / 2,
        window.innerHeight / 3,
        150
    );

    closeRewardButton.focus();
}

function closeReward() {
    rewardModal.classList.remove(
        "modal--visible"
    );

    window.setTimeout(() => {
        rewardModal.hidden = true;
    }, 250);
}

function showFinalCelebration() {
    launchConfetti(
        window.innerWidth / 2,
        window.innerHeight / 2,
        300
    );

    window.setTimeout(() => {
        finalDestination.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 450);
}

function resetJourney() {
    const confirmed =
        window.confirm(
            "Are you sure you want to reset your entire Portugal journey?"
        );

    if (!confirmed) {
        return;
    }

    taskState = createDefaultState();
    previousCompletedCount = 0;

    saveProgress();
    renderApp();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
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
            event.target.classList.contains(
                "modal-backdrop"
            )
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
    resetJourney
);

/* Confetti */

const confettiContext =
    confettiCanvas.getContext("2d");

let confettiPieces = [];
let confettiAnimationFrame = null;

function resizeConfettiCanvas() {
    const ratio =
        window.devicePixelRatio || 1;

    confettiCanvas.width =
        window.innerWidth * ratio;

    confettiCanvas.height =
        window.innerHeight * ratio;

    confettiCanvas.style.width =
        `${window.innerWidth}px`;

    confettiCanvas.style.height =
        `${window.innerHeight}px`;

    confettiContext.setTransform(
        ratio,
        0,
        0,
        ratio,
        0,
        0
    );
}

function launchConfetti(
    originX,
    originY,
    amount = 100
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

    for (
        let index = 0;
        index < amount;
        index += 1
    ) {
        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            3 +
            Math.random() *
            8;

        confettiPieces.push({
            x: originX,
            y: originY,

            width:
                5 +
                Math.random() *
                7,

            height:
                3 +
                Math.random() *
                6,

            colour:
                colours[
                    Math.floor(
                        Math.random() *
                        colours.length
                    )
                ],

            velocityX:
                Math.cos(angle) *
                speed,

            velocityY:
                Math.sin(angle) *
                speed -
                4,

            gravity:
                0.11 +
                Math.random() *
                0.08,

            rotation:
                Math.random() *
                Math.PI,

            rotationSpeed:
                (Math.random() - 0.5) *
                0.3,

            life:
                95 +
                Math.random() *
                55
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

    confettiPieces =
        confettiPieces.filter(
            piece => piece.life > 0
        );

    confettiPieces.forEach(piece => {
        piece.x +=
            piece.velocityX;

        piece.y +=
            piece.velocityY;

        piece.velocityY +=
            piece.gravity;

        piece.velocityX *=
            0.992;

        piece.rotation +=
            piece.rotationSpeed;

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
        updateCharacter();
    }
);

resizeConfettiCanvas();
renderApp();
