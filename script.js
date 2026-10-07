let internships = [];

fetch('data.json')
  .then(response => response.json())
  .then(data => {
    internships = Array.isArray(data) ? data : (data.internships || []);
    renderCards(internships);
  })
  .catch(err => console.error("Error loading JSON:", err));

const container = document.getElementById('internshipContainer');
const searchInput = document.getElementById('searchInput');
const domainFilter = document.getElementById('domainFilter');

function renderCards(data) {
  if (!container) return;
  container.innerHTML = '';
  
  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.style.cssText = 'border: 1px solid #ccc; padding: 15px; margin: 10px 0; border-radius: 8px; background: #fff;';
    card.innerHTML = `
      <h3>${item.title || item.role || 'Internship Role'}</h3>
      <p><strong>Domain:</strong> ${item.domain || 'N/A'}</p>
      <p><strong>Location:</strong> ${item.location || 'N/A'} (${item.mode || 'N/A'})</p>
      <p><strong>Openings:</strong> ${item.openings || 'N/A'}</p>
      <p><strong>Skills:</strong> ${Array.isArray(item.skills) ? item.skills.join(', ') : (item.skills || 'N/A')}</p>
    `;
    container.appendChild(card);
  });
}

function filterData() {
  const query = searchInput ? searchInput.value.toLowerCase() : '';
  const selectedDomain = domainFilter ? domainFilter.value : 'all';

  const filtered = internships.filter(item => {
    const titleMatch = (item.title || item.role || '').toLowerCase().includes(query);
    const domainMatch = selectedDomain === 'all' || item.domain === selectedDomain;
    return titleMatch && domainMatch;
  });

  renderCards(filtered);
}

if (searchInput) searchInput.addEventListener('input', filterData);
if (domainFilter) domainFilter.addEventListener('change', filterData);