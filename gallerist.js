fetch('artworks.json')
  .then(r => { if (!r.ok) throw new Error('Failed to load artworks.json'); return r.json(); })
  .then(data => init(data))
  .catch(err => console.error('Error loading artworks:', err));

function init(data){
  const map = { Painting: 'painting-list', Drawing: 'drawing-list', Ceramics: 'ceramics-list' };
  const state = {
    data,
    order: Object.fromEntries(Object.keys(map).map(k => [k, (data[k]||[]).map((_,i)=>i)])),
    cur: { cat: Object.keys(map).find(k => (data[k]||[]).length) || 'Painting', idx: 0 }
  };

  Object.keys(map).forEach(cat => {
    const listEl = document.getElementById(map[cat]);
    if (!listEl) return;
    const items = data[cat] || [];
    listEl.innerHTML = '';
    items.forEach((item, i) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = item.title || 'Untitled';
      a.dataset.category = cat;
      a.dataset.index = i;
      a.addEventListener('click', e => {
        e.preventDefault();
        state.cur.cat = cat;
        state.cur.idx = i;
        render();
        highlightActive();
      });
      li.appendChild(a);
      listEl.appendChild(li);
    });
  });

  const $img = document.querySelector('.artworkDisplay');
  const $title = document.getElementById('title');
  const $size = document.getElementById('size');
  const $medium = document.getElementById('medium');

  function getCurrent(){
    const arr = state.data[state.cur.cat] || [];
    if (!arr.length) return null;
    const i = ((state.cur.idx % arr.length) + arr.length) % arr.length;
    state.cur.idx = i;
    return arr[i];
  }

  function render(){
    const item = getCurrent();
    if (!item || !$img) return;
    $img.src = item.src;
    $img.alt = item.title || 'Artwork';
    if ($title) $title.textContent = item.title || 'Untitled';
    if ($size) $size.textContent = item.dimensions || '';
    if ($medium) $medium.textContent = item.medium || '';
  }

  function highlightActive(){
    document.querySelectorAll('.CatItem a.active').forEach(a => a.classList.remove('active'));
    const sel = `.CatItem a[data-category="${state.cur.cat}"][data-index="${state.cur.idx}"]`;
    const a = document.querySelector(sel);
    if (a) a.classList.add('active');
  }

  function next(){
    const arr = state.data[state.cur.cat] || [];
    if (!arr.length) return;
    state.cur.idx = (state.cur.idx + 1) % arr.length;
    render(); highlightActive();
  }

  function prev(){
    const arr = state.data[state.cur.cat] || [];
    if (!arr.length) return;
    state.cur.idx = (state.cur.idx - 1 + arr.length) % arr.length;
    render(); highlightActive();
  }

  window.nextBtn = next;
  window.prevBtn = prev;

  render();
  highlightActive();
}

/* dropdowns */
function closeAllDropdowns(){ document.querySelectorAll('ol.show').forEach(el => el.classList.remove('show')); }
function toggleDropdown(event){
  if (event && event.preventDefault) event.preventDefault();
  const trigger = event?.currentTarget || event?.target;
  if (!trigger) return;
  const dropdownContent = trigger.nextElementSibling;
  if (!dropdownContent) return;
  const wasOpen = dropdownContent.classList.contains('show');
  closeAllDropdowns();
  if (!wasOpen) dropdownContent.classList.add('show');
}
window.addEventListener('click', e => { if (e.target.closest('.NavList')) return; closeAllDropdowns(); });
window.toggleDropdown = toggleDropdown;
