/**
 * BEIGE MODEL MANAGEMENT — SHORTLIST PERSISTENCE MODULE
 * Manages client shortlist selections in localStorage without external tracking.
 */

const SHORTLIST_STORAGE_KEY = 'beige-model-shortlist-v1';

// Talent database registry for quick client lookup and shortlist rendering
export const TALENT_REGISTRY = {
  'ada': {
    id: 'ada',
    name: 'Ada',
    category: 'Commercial · Beauty · Editorial',
    image: 'assets/images/models/ada-editorial-01.jpg',
    credits: '@beautybydii, @zarelle_beauty'
  },
  'aisha': {
    id: 'aisha',
    name: 'Aisha',
    category: 'Editorial · High Glamour',
    image: 'assets/images/models/aisha-editorial-01.jpg',
    credits: '@finessedbysb, @beatbyab'
  },
  'anastasia': {
    id: 'anastasia',
    name: 'Anastasia',
    category: 'Runway · Editorial',
    image: 'assets/images/models/anastasia-editorial-01.jpg',
    credits: '@glam_drop, @mola_glamz'
  },
  'belle': {
    id: 'belle',
    name: 'Belle',
    category: 'Beauty · Editorial',
    image: 'assets/images/models/belle-beauty-01.jpg',
    credits: '@mola_glamz, @chee'
  },
  'becky': {
    id: 'becky',
    name: 'Becky',
    category: 'Commercial · Beauty',
    image: 'assets/images/models/becky-commercial-01.jpg',
    credits: '@bernardbeautyglam, @tbb'
  },
  'debby': {
    id: 'debby',
    name: 'Debby',
    category: 'Commercial · Bridal Beauty',
    image: 'assets/images/models/debby-commercial-01.jpg',
    credits: '@dojesignature, @prettyfacesbyolivia'
  },
  'ruth': {
    id: 'ruth',
    name: 'Ruth',
    category: 'Commercial Hair · Beauty',
    image: 'assets/images/models/ruth-commercial-01.jpg',
    credits: '@hairceptional.c'
  }
};

/**
 * Retrieve current saved IDs from localStorage
 * @returns {string[]} Array of saved model IDs
 */
export function getShortlist() {
  try {
    const raw = localStorage.getItem(SHORTLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(id => TALENT_REGISTRY[id]) : [];
  } catch (e) {
    console.warn('Could not read shortlist from localStorage:', e);
    return [];
  }
}

/**
 * Save IDs to localStorage and trigger change listeners
 * @param {string[]} ids 
 */
export function setShortlist(ids) {
  const unique = [...new Set(ids)].filter(id => TALENT_REGISTRY[id]);
  try {
    localStorage.setItem(SHORTLIST_STORAGE_KEY, JSON.stringify(unique));
  } catch (e) {
    console.warn('Could not write shortlist to localStorage:', e);
  }
  dispatchShortlistUpdate(unique);
  renderShortlistUI();
}

/**
 * Toggle model presence in shortlist
 * @param {string} modelId 
 * @returns {boolean} True if now added, false if removed
 */
export function toggleShortlist(modelId) {
  if (!TALENT_REGISTRY[modelId]) return false;
  const current = getShortlist();
  const index = current.indexOf(modelId);
  let updated;
  let isAdded;
  if (index > -1) {
    updated = current.filter(id => id !== modelId);
    isAdded = false;
  } else {
    updated = [...current, modelId];
    isAdded = true;
  }
  setShortlist(updated);
  return isAdded;
}

/**
 * Clear all shortlisted models
 */
export function clearShortlist() {
  setShortlist([]);
}

function dispatchShortlistUpdate(ids) {
  window.dispatchEvent(new CustomEvent('shortlist:updated', { detail: { ids, count: ids.length } }));
}

/**
 * Render shortlist drawer and synchronize button states across document
 */
export function renderShortlistUI() {
  const ids = getShortlist();

  // Update header badges
  document.querySelectorAll('.shortlist-count-badge').forEach(el => {
    el.textContent = ids.length;
  });

  // Update save buttons on cards
  document.querySelectorAll('[data-shortlist-btn]').forEach(btn => {
    const id = btn.getAttribute('data-model-id');
    const isSaved = ids.includes(id);
    btn.setAttribute('aria-pressed', String(isSaved));
    btn.textContent = isSaved ? '✓' : '＋';
    const model = TALENT_REGISTRY[id];
    const name = model ? model.name : 'talent';
    btn.setAttribute('aria-label', `${isSaved ? 'Remove' : 'Add'} ${name} ${isSaved ? 'from' : 'to'} shortlist`);
  });

  // Render items inside dialog
  const itemsContainer = document.getElementById('shortlistItems');
  if (itemsContainer) {
    if (ids.length === 0) {
      itemsContainer.innerHTML = '<p class="shortlist-empty">You have not saved any talent yet. Click the ＋ button on any model portrait to build your shortlist.</p>';
    } else {
      itemsContainer.innerHTML = ids.map(id => {
        const item = TALENT_REGISTRY[id];
        return `
          <div class="shortlist-row">
            <img src="${item.image}" alt="${item.name}" loading="lazy">
            <div>
              <strong>${item.name}</strong>
              <small>${item.category}</small>
            </div>
            <button type="button" data-remove-id="${id}" aria-label="Remove ${item.name} from shortlist">Remove</button>
          </div>
        `;
      }).join('');

      itemsContainer.querySelectorAll('[data-remove-id]').forEach(btn => {
        btn.addEventListener('click', () => {
          const toRemove = btn.getAttribute('data-remove-id');
          toggleShortlist(toRemove);
        });
      });
    }
  }
}

// Initialize listeners on DOMContentLoaded
export function initShortlist() {
  const dialog = document.getElementById('shortlistDialog');
  const openBtn = document.getElementById('shortlistOpen');
  const closeBtn = document.getElementById('shortlistClose');
  const clearBtn = document.getElementById('clearShortlist');

  if (openBtn && dialog) {
    openBtn.addEventListener('click', () => dialog.showModal());
  }

  if (closeBtn && dialog) {
    closeBtn.addEventListener('click', () => dialog.close());
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', clearShortlist);
  }

  if (dialog) {
    dialog.addEventListener('click', e => {
      if (e.target === dialog) dialog.close();
    });
  }

  // Delegated click handler for model cards
  document.addEventListener('click', e => {
    const btn = e.target.closest('[data-shortlist-btn]');
    if (btn) {
      const modelId = btn.getAttribute('data-model-id');
      if (modelId) {
        toggleShortlist(modelId);
      }
    }
  });

  // Initial render
  renderShortlistUI();
}
