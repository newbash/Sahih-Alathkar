function openThikrWindow(id) {
    fetch('supplications.json')
        .then(response => response.json())
        .then(data => {
            const supplication = data.supplications.find(item => item.id === id);
            if (supplication) {
                // Create a new window for displaying the Thikr
                const thikrWindow = window.open('', 'ThikrWindow', 'width=400,height=300');
                
                // Write HTML content to the new window
                thikrWindow.document.write(`
                    <html>
                    <head>
                        <link rel="stylesheet" href="thikr-window.css">
                        <title>ذكر خالص</title>
                    </head>
                    <body>
                        <h2>ذكر خالص</h2>
                        <p>${supplication.text}</p>
                        <button onclick="window.close()">إغلاق</button>
                    </body>
                    </html>
                `);

                // Close the document to complete the write process
                thikrWindow.document.close();
            }
        })
        .catch(error => {
            console.error('Error fetching the supplication:', error);
        });
}
