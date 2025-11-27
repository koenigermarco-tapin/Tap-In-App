// Global error handling
window.addEventListener('error', (event) => {
  console.error('💥 Error:', event.error);
  showErrorToast('Something went wrong. Please refresh the page.');
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('💥 Unhandled promise rejection:', event.reason);
  showErrorToast('A background process failed. Everything else should work fine.');
});

function showErrorToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(255,107,107,0.4);
    z-index: 100000;
    animation: slideUp 0.3s ease-out;
    max-width: 300px;
  `;
  toast.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.5rem;">⚠️</span>
      <span>${message}</span>
    </div>
  `;
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from {
        transform: translateY(100px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
  
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.style.animation = 'slideUp 0.3s ease-out reverse';
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}

window.showErrorToast = showErrorToast;

