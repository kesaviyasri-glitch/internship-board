let internships = [];

// Fetch data from downloaded JSON file
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    internships = data;
    renderCards(internships);
  })
  .catch(err => console.error("Error loading JSON:", err));

const container = document.getElementById('internshipContainer');
const searchInput = document.getElementById('searchInput');
const domainFilter = document.getElementById('domainFilter');
const emptyState = document.getElementById('emptyState');

function renderCards(data) {
  container.innerHTML = '';
  if (data.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.role || item.title}</h3>
      <p><strong>Company:</strong> ${item.company}</p>
      <p><strong>Domain:</strong> ${item.domain}</p>
      <p><strong>Location:</strong> ${item.location}</p>
    `;
    container.appendChild(card);
  });
}

// Search and Filter Functionality
function filterData() {
  const query = searchInput.value.toLowerCase();
  const selectedDomain = domainFilter.value;

  const filtered = internships.filter(item => {
    const matchesSearch = (item.role || item.title).toLowerCase().includes(query) ||
                          item.company.toLowerCase().includes(query);
    const matchesDomain = selectedDomain === 'all' || item.domain === selectedDomain;
    return matchesSearch && matchesDomain;
  });

  renderCards(filtered);
}

searchInput.addEventListener('input', filterData);
domainFilter.addEventListener('change', filterData);