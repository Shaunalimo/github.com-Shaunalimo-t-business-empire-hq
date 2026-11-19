const menuToggle = document.querySelector('#menuToggle');
const sidebar = document.querySelector('#sidebar');

menuToggle?.addEventListener('click', () => sidebar.classList.toggle('open'));

document.querySelectorAll('.side-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    document.querySelector('.side-nav a.active')?.classList.remove('active');
    link.classList.add('active');
    sidebar.classList.remove('open');
  });
});

const now = new Date();
const dateLabel = document.querySelector('#dateLabel');
if (dateLabel) {
  dateLabel.textContent = now.toLocaleDateString('en-US', {
    weekday: 'long', day: 'numeric', month: 'long'
  }).toUpperCase();
}

const modal = document.querySelector('#actionModal');
const addAction = document.querySelector('#addAction');
const modalClose = document.querySelector('#modalClose');
const actionForm = document.querySelector('#actionForm');

function setModal(open) {
  modal.classList.toggle('open', open);
  modal.setAttribute('aria-hidden', String(!open));
  if (open) modal.querySelector('input')?.focus();
}

addAction?.addEventListener('click', () => setModal(true));
modalClose?.addEventListener('click', () => setModal(false));
modal?.addEventListener('click', (event) => {
  if (event.target === modal) setModal(false);
});

actionForm?.addEventListener('submit', (event) => {
  event.prevent(event);
  const input = actionForm.querySelector('input');
  const category = actionForm.querySelector('select').value;
  const label = document.createElement('label');
  label.innerHTML = `<input type="checkbox"><span class="checkmark"></span><span class="priority-copy"><strong>${escapeHtml(input.value)}</strong><small>${escapeHtml(category)} · Added now</small></span>`;
  document.querySelector('.priority-list')?.appendChild(label);
  input.value = '';
  setModal(false);
});

function escapeHtml(value) {
  const element = document.createElement('span');
  element.textContent = value;
  return element.innerHTML;
}

modal?.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setModal(false);
});
