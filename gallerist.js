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
  document.querySelectorAll("ol.show").forEach((el) => el.classList.remove("show"));
}

function toggleDropdown(event) {
  if (event && typeof event.preventDefault === "function") event.preventDefault();
  const trigger = event?.currentTarget || event?.target;
  if (!trigger) return;
  const dropdownContent = trigger.nextElementSibling;
  if (!dropdownContent) return;
  const wasOpen = dropdownContent.classList.contains("show");
  closeAllDropdowns();
  if (!wasOpen) dropdownContent.classList.add("show");
}

window.addEventListener("click", function (event) {
  if (event.target.closest(".NavList")) return;
  closeAllDropdowns();
});

window.toggleDropdown = toggleDropdown;
