const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

// Fetch data using .then
fetch(apiUrl)
  .then(response => response.json())
  .then(data => renderTable(data))
  .catch(error => console.error('Error fetching data:', error));

// Fetch data using async/await
async function fetchDataAsync() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    renderTable(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Render table with data
function renderTable(data) {
  const tableBody = document.getElementById('cryptoTableBody');
  tableBody.innerHTML = '';

  data.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.id}</td>
      <td>${item.symbol}</td>
      <td>${item.current_price}</td>
      <td>${item.total_volume}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Search functionality
document.getElementById('searchInput').addEventListener('input', function() {
  const searchTerm = this.value.trim().toLowerCase();
  const rows = document.querySelectorAll('#cryptoTableBody tr');
  
  rows.forEach(row => {
    const name = row.querySelector('td:first-child').textContent.toLowerCase();
    if (name.includes(searchTerm)) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
});

// Sort functionality
let isAscending = true;
function sortData(sortBy) {
  const rows = Array.from(document.querySelectorAll('#cryptoTableBody tr'));
  const sortedRows = rows.sort((a, b) => {
    const aValue = parseFloat(a.querySelector(`[data-sort=${sortBy}]`).textContent.replace(',', ''));
    const bValue = parseFloat(b.querySelector(`[data-sort=${sortBy}]`).textContent.replace(',', ''));
    return isAscending ? aValue - bValue : bValue - aValue;
  });

  isAscending = !isAscending;
  sortedRows.forEach(row => document.getElementById('cryptoTableBody').appendChild(row));
}
