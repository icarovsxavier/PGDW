
/* Header e Footer */

function includeHTML() {
    const elements = document.querySelectorAll('[include-html]');
    elements.forEach((element) => {
        const file = element.getAttribute('include-html');
        if (file) {
            fetch(file)
                .then((response) => response.text())
                .then((html) => {
                    element.innerHTML = html;
                    element.removeAttribute('include-html');
                    includeHTML();
                });
        }
    });
}
document.addEventListener('DOMContentLoaded', includeHTML);
