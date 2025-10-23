fetch('artworks.json')
  .then(response => {
    if (!response.ok) throw new Error('Failed to load artworks.json');
    return response.json();
  })
  .then(data => {
    const map = {
      'Painting': 'painting-list',
      'Drawing': 'drawing-list',
      'Ceramics': 'ceramics-list'
    };

    Object.keys(map).forEach(category => {
      const listEl = document.getElementById(map[category]);
      if (!listEl) return; 

      const items = data[category] || [];
      items.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.src || '#';
        a.textContent = item.title;
        li.appendChild(a);
        listEl.appendChild(li);
      });
    });
  })
  .catch(err => {
    console.error('Error loading artworks:', err);
  });
