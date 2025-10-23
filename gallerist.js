fetch('artworks.json')
    .then(response => response.json())
    .then(data => {
    document.getElementById('gallerist');
    data.forEach(item => {
        const gallerist = document.createElement('li');
        gallerist.textContent = item.title;
        gallerist.appendChild(listItem);
    });
});