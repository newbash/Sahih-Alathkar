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
                    const id = Object.keys(supplication)[0]; // Get the key (ID)
                    const suppData = supplication[id]; // Get the supplication data

                    const li = document.createElement('li');
                    li.classList.add('supplication-item');
                    li.innerHTML = `
                        <span class="supplication-number">${suppData.number}</span>
                        <span class="supplication-text">${suppData.text}</span>
                        <span class="supplication-source">${suppData.source}</span>
                        <span class="supplication-benefit">${suppData.benefit}</span>
                        <div class="supplication-buttons">
                            <button class="btn-pure-thikr" onclick="openThikrWindow('${id}')" title="ذكر خالص"><img src="Assets/Btns/benefits.svg" alt="ذكر خالص"></button>
                            <button class="btn-explanation" onclick="openExplanationWindow('${id}')" title="توضيح"><img src="Assets/Btns/source.svg" alt="توضيح"></button>
                            <button class="btn-full-thikr" onclick="openFullThikrWindow('${id}')" title="الذكر الكامل"><img src="Assets/Btns/full-thikr.svg" alt="الذكر الكامل"></button>
                            <button class="btn-copy" onclick="copySupplication('${id}')" title="نسخ"><img src="Assets/Btns/copy.svg" alt="نسخ"></button>
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

// Function to open a Thikr window with the pure Thikr text
function openThikrWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.sections[0].supplications.find(supp => Object.keys(supp)[0] === id)[id];
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

// Function to open an Explanation window
function openExplanationWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.sections[0].supplications.find(supp => Object.keys(supp)[0] === id)[id];
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

// Function to copy the pure Thikr text to the clipboard
function copySupplication(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.sections[0].supplications.find(supp => Object.keys(supp)[0] === id)[id];
            if (supplication) {
                navigator.clipboard.writeText(supplication.pureThikr)
                    .then(() => {
                        alert('تم نسخ الذكر إلى الحافظة!');
                    })
                    .catch(error => {
                        console.error('Error copying text:', error);
                    });
            }
        })
        .catch(error => {
            console.error('Error fetching the supplication:', error);
        });
}

// Function to open a Full Thikr window with number, text, source, and explanation
function openFullThikrWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.sections[0].supplications.find(supp => Object.keys(supp)[0] === id)[id];
            if (supplication) {
                const fullThikrWindow = window.open('', 'FullThikrWindow', 'width=600,height=600');
                fullThikrWindow.document.write(`
                    <html>
                    <head>
                        <link rel="stylesheet" href="thikr-window.css">
                        <title>الذكر الكامل</title>
                    </head>
                    <body class="thikr-window">
                        <h2>الذكر الكامل</h2>
                        <p><strong>الرقم:</strong> ${supplication.number}</p>
                        <p><strong>الذكر:</strong> ${supplication.text}</p>
                        <p><strong>المصدر:</strong> ${supplication.source}</p>
                        <p><strong>التوضيح:</strong> ${supplication.explanation}</p>
                        <button onclick="window.close()">إغلاق</button>
                    </body>
                    </html>
                `);
                fullThikrWindow.document.close();
            }
        })
        .catch(error => {
            console.error('Error fetching the supplication:', error);
        });
}
