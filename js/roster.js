/**
 * BEIGE MODEL MANAGEMENT — MODEL DISCOVERY CONTROLLER
 * Instant category filtering, real-time search, count updates & empty states.
 */
(function () {
  'use strict';

  function initRoster() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const searchInput = document.getElementById('modelSearchInput');
    const cards = document.querySelectorAll('.roster-card');
    const countDisplay = document.getElementById('modelVisibleCount');
    const emptyState = document.getElementById('rosterEmptyState');
    const resetBtn = document.getElementById('resetRosterBtn');

    if (!cards.length) return;

    let activeFilter = 'all';
    let searchQuery = '';

    function applyFilters() {
      let visibleCount = 0;

      cards.forEach(card => {
        const categories = (card.getAttribute('data-category') || '').toLowerCase();
        const name = (card.getAttribute('data-name') || '').toLowerCase();

        const matchesFilter = (activeFilter === 'all') || categories.includes(activeFilter);
        const matchesSearch = !searchQuery || name.includes(searchQuery) || categories.includes(searchQuery);

        if (matchesFilter && matchesSearch) {
          card.classList.remove('hidden');
          card.classList.add('visible');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });

      if (countDisplay) {
        countDisplay.textContent = visibleCount;
      }

      if (emptyState) {
        emptyState.style.display = (visibleCount === 0) ? 'block' : 'none';
      }
    }

    // Filter button clicks
    filterTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        activeFilter = this.getAttribute('data-filter') || 'all';
        applyFilters();
      });
    });

    // Real-time search input
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        searchQuery = this.value.trim().toLowerCase();
        applyFilters();
      });
    }

    // Reset button
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        activeFilter = 'all';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        filterTabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-filter') === 'all'));
        applyFilters();
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRoster);
  } else {
    initRoster();
  }
})();
