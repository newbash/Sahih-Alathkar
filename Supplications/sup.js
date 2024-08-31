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

                // Adding the title and arrow dynamically
                headerDiv.innerHTML = `
                    <span class="title">${section.title}</span>
                    <span class="arrow">▶</span>
                `;

                const arrow = headerDiv.querySelector('.arrow');

                headerDiv.addEventListener('click', () => {
                    const contentUl = sectionDiv.querySelector('.collapsible-content');
                    
                    if (contentUl.style.display === 'none') {
                        contentUl.style.display = 'block';
                        arrow.innerHTML = '▼'; // Arrow down when section is open
                    } else {
                        contentUl.style.display = 'none';
                        arrow.innerHTML = '▶'; // Arrow right when section is closed
                    }
                });

                sectionDiv.appendChild(headerDiv);

                const contentUl = document.createElement('ul');
                contentUl.classList.add('collapsible-content');
                contentUl.style.display = 'none'; // Initially hide the content

                section.supplications.forEach(supplicationData => {
                    const supplicationId = Object.keys(supplicationData)[0]; // Get the supplication ID
                    const supplication = supplicationData[supplicationId]; // Get the supplication object

                    const li = document.createElement('li');
                    li.classList.add('supplication-item');
                    li.innerHTML = `
                        <span class="supplication-number">${supplication.number}</span>
                        <span class="supplication-text">${supplication.text}</span>
                        <span class="supplication-source">${supplication.source}</span>
                        <span class="supplication-benefit">${supplication.benefit}</span>
                        <div class="supplication-buttons">
                            <button class="btn-pure-thikr" onclick="openThikrWindow('${supplicationId}')" title="ذكر خالص"><img src="Assets/Btns/benefits.svg" alt="ذكر خالص"></button>
                            <button class="btn-explanation" onclick="openExplanationWindow('${supplicationId}')" title="توضيح"><img src="Assets/Btns/source.svg" alt="توضيح"></button>
                            <button class="btn-full-thikr" onclick="openFullThikrWindow('${supplicationId}')" title="الذكر الكامل"><img src="Assets/Btns/full-thikr.svg" alt="الذكر الكامل"></button>
                            <button class="btn-copy" onclick="copySupplication('${supplicationId}')" title="نسخ"><img src="Assets/Btns/copy.svg" alt="نسخ"></button>
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


// Function to open the full Thikr window
function openFullThikrWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.sections.flatMap(section => section.supplications).map(supp => supp[id]).find(Boolean);
            if (supplication) {
                const content = `
                    <h2>الذكر الكامل</h2>
                    <p><strong>الرقم:</strong> ${supplication.number}</p>
                    <p><strong>الذكر:</strong> ${supplication.pureThikr}</p>
                    <p><strong>المصدر:</strong> ${supplication.source}</p>
                    <p><strong>التوضيح:</strong> ${supplication.explanation}</p>
                    `;
                openModal(content);
            }
        })
        .catch(error => console.error('Error fetching the supplication:', error));
}

// Function to copy the pure Thikr text to the clipboard
function copySupplication(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.sections.flatMap(section => section.supplications).map(supp => supp[id]).find(Boolean);
            if (supplication) {
                navigator.clipboard.writeText(supplication.pureThikr)
                    .then(() => alert('تم نسخ النص إلى الحافظة!'))
                    .catch(error => console.error('Error copying text:', error));
            }
        })
        .catch(error => console.error('Error fetching the supplication:', error));
}

// Close the modal when the user clicks outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        closeModal();
    }
}

// Close the modal when the user clicks the "close" button
document.querySelector('.close').addEventListener('click', closeModal);
