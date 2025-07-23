document.addEventListener('DOMContentLoaded', () => {
    const widgets = document.querySelectorAll('.widget');
    const touchbarPreview = document.getElementById('touchbar-preview');
    const propertiesContent = document.getElementById('properties-content');
    let draggedItem = null;
    let selectedWidget = null;

    widgets.forEach(widget => {
        widget.addEventListener('dragstart', (e) => {
            draggedItem = e.target;
            setTimeout(() => {
                e.target.style.display = 'none';
            }, 0);
        });

        widget.addEventListener('dragend', (e) => {
            setTimeout(() => {
                draggedItem.style.display = 'block';
                draggedItem = null;
            }, 0);
        });
    });

    touchbarPreview.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    touchbarPreview.addEventListener('dragenter', (e) => {
        e.preventDefault();
        touchbarPreview.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    });

    touchbarPreview.addEventListener('dragleave', (e) => {
        touchbarPreview.style.backgroundColor = 'transparent';
    });

    touchbarPreview.addEventListener('drop', (e) => {
        e.preventDefault();
        touchbarPreview.style.backgroundColor = 'transparent';
        if (draggedItem) {
            const newWidget = draggedItem.cloneNode(true);
            newWidget.style.display = 'inline-block';
            touchbarPreview.appendChild(newWidget);
            selectWidget(newWidget);
        }
    });

    function selectWidget(widget) {
        if (selectedWidget) {
            selectedWidget.classList.remove('selected');
        }
        selectedWidget = widget;
        selectedWidget.classList.add('selected');
        showProperties(selectedWidget);
    }

    function showProperties(widget) {
        const type = widget.dataset.type;
        propertiesContent.innerHTML = '';

        const typeLabel = document.createElement('h3');
        typeLabel.textContent = type;
        propertiesContent.appendChild(typeLabel);

        if (type === 'staticButton') {
            const titleLabel = document.createElement('label');
            titleLabel.textContent = 'Title:';
            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.value = widget.textContent;
            titleInput.addEventListener('input', (e) => {
                widget.textContent = e.target.value;
            });
            propertiesContent.appendChild(titleLabel);
            propertiesContent.appendChild(titleInput);

            const backgroundLabel = document.createElement('label');
            backgroundLabel.textContent = 'Background Color:';
            const backgroundInput = document.createElement('input');
            backgroundInput.type = 'color';
            backgroundInput.value = widget.style.backgroundColor;
            backgroundInput.addEventListener('input', (e) => {
                widget.style.backgroundColor = e.target.value;
            });
            propertiesContent.appendChild(backgroundLabel);
            propertiesContent.appendChild(backgroundInput);

            const animationLabel = document.createElement('label');
            animationLabel.textContent = 'Animation:';
            const animationInput = document.createElement('input');
            animationInput.type = 'text';
            animationInput.value = widget.dataset.animation || '';
            animationInput.addEventListener('input', (e) => {
                widget.dataset.animation = e.target.value;
                widget.style.animation = e.target.value;
            });
            propertiesContent.appendChild(animationLabel);
            propertiesContent.appendChild(animationInput);

            const bgUrlLabel = document.createElement('label');
            bgUrlLabel.textContent = 'Background Image URL:';
            const bgUrlInput = document.createElement('input');
            bgUrlInput.type = 'text';
            bgUrlInput.value = widget.dataset.bgUrl || '';
            bgUrlInput.addEventListener('input', (e) => {
                widget.dataset.bgUrl = e.target.value;
                widget.style.backgroundImage = `url(${e.target.value})`;
            });
            propertiesContent.appendChild(bgUrlLabel);
            propertiesContent.appendChild(bgUrlInput);

            const bgAnimationLabel = document.createElement('label');
            bgAnimationLabel.textContent = 'Background Animation:';
            const bgAnimationInput = document.createElement('input');
            bgAnimationInput.type = 'text';
            bgAnimationInput.value = widget.dataset.bgAnimation || '';
            bgAnimationInput.addEventListener('input', (e) => {
                widget.dataset.bgAnimation = e.target.value;
                widget.style.backgroundAnimation = e.target.value;
            });
            propertiesContent.appendChild(bgAnimationLabel);
            propertiesContent.appendChild(bgAnimationInput);
        }
    }

    touchbarPreview.addEventListener('click', (e) => {
        if (e.target.classList.contains('widget')) {
            selectWidget(e.target);
        }
    });

    const generateJsonButton = document.getElementById('generate-json');
    generateJsonButton.addEventListener('click', () => {
        const widgetsInPreview = touchbarPreview.querySelectorAll('.widget');
        const json = [];
        widgetsInPreview.forEach(widget => {
            const type = widget.dataset.type;
            const widgetJson = {
                type: type
            };
            if (type === 'staticButton') {
                widgetJson.title = widget.textContent;
                widgetJson.background = widget.style.backgroundColor;
                widgetJson.animation = widget.dataset.animation;
                widgetJson.bgUrl = widget.dataset.bgUrl;
                widgetJson.bgAnimation = widget.dataset.bgAnimation;
            }
            json.push(widgetJson);
        });
        const jsonString = JSON.stringify(json, null, 2);
        alert(jsonString);
    });
});
