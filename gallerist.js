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

function closeAllDropdowns() {
  const dropdowns = document.querySelectorAll(".dropdown-content");
  for (let i = 0; i < dropdowns.length; i++) {
    dropdowns[i].classList.remove('show');
  }
}

function toggleDropdown(event) {
  const dropdownContent = event.target.nextElementSibling;
  
  // Check if the clicked dropdown is already open
  const isAlreadyOpen = dropdownContent.classList.contains('show');

  // Close all other dropdowns
  closeAllDropdowns();

  // If the clicked dropdown was not already open, toggle it open
  if (!isAlreadyOpen) {
    dropdownContent.classList.toggle('show');
  }
}

// Add an event listener to the window to close dropdowns when clicking outside
window.addEventListener('click', function(event) {
  if (!event.target.matches('.dropdown-toggle')) {
    closeAllDropdowns();
  }
});
