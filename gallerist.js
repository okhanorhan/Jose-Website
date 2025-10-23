document.addEventListener('DOMContentLoaded', () => {
    fetch('artworks.json') 
        .then(response => response.json())
        .then(data => {
            const galleristList = document.getElementById('gallerist');
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = item.title;
                galleristList.appendChild(listItem);
            });
        })
            .catch(error => console.error('Error fetching JSON:', error));
    });