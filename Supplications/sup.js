document.addEventListener("DOMContentLoaded", () => {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const sectionsContainer = document.getElementById('supplications');

            data.sections.forEach(section => {
                const sectionDiv = document.createElement('div');
                sectionDiv.classList.add('collapsible');

                const headerDiv = document.createElement('div');
                headerDiv.classList.add('collapsible-header');
                headerDiv.innerHTML = `<span class="title">${section.title}</span>`;
                
                headerDiv.addEventListener('click', () => {
                    const contentUl = sectionDiv.querySelector('.collapsible-content');
                    contentUl.style.display = contentUl.style.display === 'none' ? 'block' : 'none';
                });

                sectionDiv.appendChild(headerDiv);

                const contentUl = document.createElement('ul');
                contentUl.classList.add('collapsible-content');
                contentUl.style.display = 'none'; // Initially hide the content

                section.supplications.forEach(supplication => {
                    const li = document.createElement('li');
                    li.classList.add('supplication-item');
                    li.innerHTML = `
                        <span class="supplication-number">${supplication.number}</span>
                        <span class="supplication-text">${supplication.text}</span>
                        <span class="supplication-source">${supplication.source}</span>
                        <span class="supplication-benefit">${supplication.benefit}</span>
                        <div class="supplication-buttons">
                            <button class="btn-copy" onclick="copySupplication('${supplication.pureThikr}')" title="نسخ"><img src="Assets/Btns/copy.svg" alt="نسخ"></button>
                            <button class="btn-pure-thikr" onclick="openThikrWindow('${supplication.id}')" title="ذكر خالص"><img src="Assets/Btns/benefits.svg" alt="ذكر خالص"></button>
                            <button class="btn-explanation" onclick="openExplanationWindow('${supplication.id}')" title="توضيح"><img src="Assets/Btns/source.svg" alt="توضيح"></button>
                        </div>
                    `;
                    contentUl.appendChild(li);
                });

                sectionDiv.appendChild(contentUl);
                sectionsContainer.appendChild(sectionDiv);
            });
        })
        .catch(error => console.error('Error fetching the supplications:', error));
});

// Function to copy the pureThikr text to the clipboard
function copySupplication(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.sections.flatMap(section => section.supplications).find(item => item.id === id);
            if (supplication) {
                navigator.clipboard.writeText(supplication.pureThikr)
                    .then(() => alert('تم نسخ الذكر الخالص إلى الحافظة!'))
                    .catch(error => console.error('Error copying text:', error));
            }
        })
        .catch(error => console.error('Error fetching the supplication:', error));
}


function openThikrWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.supplications.find(item => item.id === id);
            if (supplication) {
                const thikrWindow = window.open('', 'ThikrWindow', 'width=600,height=400');
                thikrWindow.document.write(`
                    <html>
                    <head>
                        <link rel="stylesheet" href="thikr-window.css">
                        <title>ذكر خالص</title>
                    </head>
                    <body class="thikr-window">
                        <h2>ذكر خالص</h2>
                        <p>${supplication.pureThikr}</p>
                        <button onclick="window.close()">إغلاق</button>
                    </body>
                    </html>
                `);
                thikrWindow.document.close();
            }
        })
        .catch(error => {
            console.error('Error fetching the supplication:', error);
        });
}

function openExplanationWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.supplications.find(item => item.id === id);
            if (supplication) {
                const explanationWindow = window.open('', 'ExplanationWindow', 'width=600,height=400');
                explanationWindow.document.write(`
                    <html>
                    <head>
                        <link rel="stylesheet" href="thikr-window.css">
                        <title>توضيح</title>
                    </head>
                    <body class="thikr-window">
                        <h2>توضيح</h2>
                        <p>${supplication.explanation}</p>
                        <button onclick="window.close()">إغلاق</button>
                    </body>
                    </html>
                `);
                explanationWindow.document.close();
            }
        })
        .catch(error => {
            console.error('Error fetching the supplication:', error);
        });
}


