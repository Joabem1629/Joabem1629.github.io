function openWindow(templateId) {
    if (document.querySelector(`#${templateId}-window`)) {
        return; 
    }

    const template = document.getElementById(templateId);
    const content = template.content.cloneNode(true);

    const windowElement = document.createElement('div');
    windowElement.classList.add('popup-window');
    windowElement.style.left = `${Math.random() * (window.innerWidth - 300)}px`;
    windowElement.style.top = `${Math.random() * (window.innerHeight - 200)}px`;
    windowElement.appendChild(content);

    const closeButton = windowElement.querySelector('.close-button');
    closeButton.onclick = () => {
        windowElement.remove();
    };

    document.body.appendChild(windowElement);

    let isDragging = false;
    let offsetX, offsetY;

    function bringToFront() {
        windowElement.style.zIndex = Date.now(); 
    }

    windowElement.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowElement.offsetLeft;
        offsetY = e.clientY - windowElement.offsetTop;
        windowElement.style.cursor = 'move';
        bringToFront(); 
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            windowElement.style.left = `${e.clientX - offsetX}px`;
            windowElement.style.top = `${e.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        windowElement.style.cursor = 'default';
    });
}

document.querySelectorAll('.popout').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const templateId = 'win-' + this.id.replace('btn-', ''); 
        openWindow(templateId);
    });
});
