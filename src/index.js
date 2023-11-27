let selectedElement = null,
    offsetX = 0,
    offsetY = 0,
    originalParent = null,
    isProject = false;
let isDragging = false;

function getRandomColor() {
    let color = 'rgba(';
    for (let i = 0; i < 3; i++) {
        color += `${Math.floor(Math.random() * 256)},`;
    }
    color += '0.5)'; // 50% opacity
    return color;
}

function makeElementDraggable(element, isProj) {
    element.addEventListener('mousedown', function (e) {
        if (!isProj) {
            e.stopPropagation(); // Prevent event from bubbling to the project if it's a card
        }

        if (isDragging) {
            return; // Don't start dragging if another element is already being dragged
        }

        selectedElement = element;
        isProject = isProj;
        offsetX = e.clientX - element.getBoundingClientRect().left;
        offsetY = e.clientY - element.getBoundingClientRect().top;
        originalParent = element.parentElement;
        isDragging = false;

        element.style.cursor = 'grabbing';
        element.style.zIndex = 1000;
    });

    element.addEventListener('mouseup', function () {
        finalizeDragging();
    });
}

document.addEventListener('mousemove', function (e) {
    if (selectedElement && !isDragging) {
        selectedElement.style.position = 'absolute';
        document.body.appendChild(selectedElement);
        isDragging = true;
    }

    if (isDragging) {
        selectedElement.style.left = `${e.clientX - offsetX}px`;
        selectedElement.style.top = `${e.clientY - offsetY}px`;
    }
});

document.addEventListener('mouseup', finalizeDragging);

function finalizeDragging() {
    if (selectedElement && isDragging) {
        selectedElement.style.cursor = 'grab';
        selectedElement.style.zIndex = 'auto';

        if (!isProject) {
            const droppedInProject = dropCardToProject(selectedElement);
            if (!droppedInProject) {
                // If the card is not dropped in a project, update its position
                const rect = selectedElement.getBoundingClientRect();
                selectedElement.style.position = 'absolute';
                document.body.appendChild(selectedElement);
                selectedElement.style.left = `${rect.left}px`;
                selectedElement.style.top = `${rect.top}px`;

                // Remove the project name from the card
                removeProjectNameFromCard(selectedElement);
            }
        }

        selectedElement = null;
        isProject = false;
        isDragging = false;
    }
}

function removeProjectNameFromCard(card) {
    const projectNameElement = card.querySelector('.project-name');
    if (projectNameElement) {
        projectNameElement.textContent = '';
    }

    // Reset the background color
    card.style.backgroundColor = '#F0f0f0'; // 50% opacity
}

function dropProject(project) {
    const rect = project.getBoundingClientRect();
    project.style.position = 'absolute';
    document.body.appendChild(project);
    project.style.left = `${rect.left}px`;
    project.style.top = `${rect.top}px`;
}

function dropCardToProject(card) {
    const projects = document.querySelectorAll('.project');
    let droppedInProject = false;

    projects.forEach((project) => {
        const projectRect = project.getBoundingClientRect();
        if (
            card.getBoundingClientRect().top < projectRect.bottom &&
            card.getBoundingClientRect().right > projectRect.left &&
            card.getBoundingClientRect().bottom > projectRect.top &&
            card.getBoundingClientRect().left < projectRect.right
        ) {
            project.appendChild(card);
            card.style.position = 'static';
            updateCardWithProjectName(card, project.id);
            droppedInProject = true;

            const projectColor = window.getComputedStyle(project).backgroundColor;
            card.style.backgroundColor = projectColor;
        }
    });

    return droppedInProject;
}

function updateCardWithProjectName(card, projectName) {
    card.querySelector('.project-name').textContent = projectName;
}

function addNewCard() {
    console.log("working");
    const newTodoText = document.getElementById('new-todo').value.trim();
    const newTodoDate = document.getElementById('new-date-todo').value.trim();
    if (!newTodoText) {
        alert('To-Do name cannot be empty');
        return;
    }

    const newCard = document.createElement('div');
    newCard.classList.add('draggable-card');
    newCard.innerHTML = `<div class="card-name">${newTodoText}</div><div class="card-date">${newTodoDate}</div><div class="project-name"></div>`;
    newCard.style.position = 'absolute';
    newCard.style.left = '10px';
    newCard.style.top = `${document.getElementById('card-container').childNodes.length * 100
        }px`;

    document.getElementById('card-container').appendChild(newCard);
    makeElementDraggable(newCard, false);

    document.getElementById('new-todo').value = '';
}

function addNewProject() {
    const projectName = document.getElementById('new-project-name').value.trim();
    if (!projectName) {
        alert('Project name cannot be empty');
        return;
    }

    const newProject = document.createElement('div');
    newProject.classList.add('project');
    newProject.id = projectName.replace(/\s+/g, '-').toLowerCase();
    newProject.innerHTML = `<h3>${projectName}</h3>`;
    newProject.style.backgroundColor = getRandomColor();
    document.getElementById('project-container').appendChild(newProject);

    makeElementDraggable(newProject, true);

    document.getElementById('new-project-name').value = '';
}

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.draggable-card');
    cards.forEach((card) => makeElementDraggable(card, false));

    const projects = document.querySelectorAll('.project');
    projects.forEach((project) => makeElementDraggable(project, true));
});

// Your existing JavaScript code goes here

// Event listeners for buttons
document.getElementById('todo-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form submission and page refresh
    addNewCard();
});


document.getElementById('create-project-button').addEventListener('click', function () {
    addNewProject();
});