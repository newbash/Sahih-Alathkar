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

                section.supplications.forEach(supp => {
                    const supplicationKey = Object.keys(supp)[0]; // Get the ID
                    const supplication = supp[supplicationKey]; // Get the supplication object

                    const li = document.createElement('li');
                    li.classList.add('supplication-item');
                    li.innerHTML = `
                        <span class="supplication-number">${supplication.number}</span>
                        <span class="supplication-text">${supplication.text}</span>
                        <span class="supplication-source">${supplication.source}</span>
                        <span class="supplication-benefit">${supplication.benefit}</span>
                        <div class="supplication-buttons">
                            <button class="btn-pure-thikr" onclick="openThikrWindow('${supplicationKey}')" title="ذكر خالص"><img src="Assets/Btns/benefits.svg" alt="ذكر خالص"></button>
                            <button class="btn-explanation" onclick="openExplanationWindow('${supplicationKey}')" title="توضيح"><img src="Assets/Btns/source.svg" alt="توضيح"></button>
                            <button class="btn-full-thikr" onclick="openFullThikrWindow('${supplicationKey}')" title="الذكر الكامل"><img src="Assets/Btns/full-thikr.svg" alt="الذكر الكامل"></button>
                            <button class="btn-copy" onclick="copySupplication('${supplicationKey}')" title="نسخ"><img src="Assets/Btns/copy.svg" alt="نسخ"></button>
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

// Function to open the modal and inject content
function openModal(content) {
    const modal = document.getElementById("myModal");
    const modalBody = document.getElementById("modalBody");
    modalBody.innerHTML = content;
    modal.style.display = "block";

    // Attach event listener to the close button inside the modal
    document.querySelector('.close').addEventListener('click', closeModal);
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}

// Function to open a Thikr window with the pure Thikr text
function openThikrWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = findSupplicationById(data, id);
            if (supplication) {
                const content = `
                    <h2>ذكر خالص</h2>
                    <p>${supplication.pureThikr}</p>
                `;
                openModal(content);
            }
        })
        .catch(error => console.error('Error fetching the supplication:', error));
}

// Function to open an Explanation window
function openExplanationWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = findSupplicationById(data, id);
            if (supplication) {
                const content = `
                    <h2>توضيح</h2>
                    <p>${supplication.explanation}</p>
                `;
                openModal(content);
            }
        })
        .catch(error => console.error('Error fetching the supplication:', error));
}

// Function to open the full Thikr window
function openFullThikrWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = findSupplicationById(data, id);
            if (supplication) {
                const content = `
                    <h2>الذكر الكامل</h2>
                    <p><strong>الرقم:</strong> ${supplication.number}</p>
                    <p><strong>الذكر:</strong> ${supplication.text}</p>
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
            const supplication = findSupplicationById(data, id);
            if (supplication) {
                navigator.clipboard.writeText(supplication.pureThikr)
                    .then(() => alert('تم نسخ النص إلى الحافظة!'))
                    .catch(error => console.error('Error copying text:', error));
            }
        })
        .catch(error => console.error('Error fetching the supplication:', error));
}

// Utility function to find a supplication by ID
function findSupplicationById(data, id) {
    for (const section of data.sections) {
        for (const supp of section.supplications) {
            if (supp[id]) {
                return supp[id];
            }
        }
    }
    return null;
}

// Close the modal when the user clicks outside the modal content
window.onclick = function(event) {
    const modal = document.getElementById("myModal");
    if (event.target === modal) {
        closeModal();
    }
}
