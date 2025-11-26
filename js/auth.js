// Firebase Authentication and Favorites Sync System

class AuthSystem {
  constructor() {
    this.currentUser = null;
    this.db = null;
    this.unsubscribeAuth = null;
    this.init();
  }

  init() {
    // Check if Firebase is loaded
    if (typeof firebase === 'undefined') {
      console.error('Firebase not loaded');
      return;
    }

    // Initialize Firestore
    if (firebase.firestore) {
      this.db = firebase.firestore();
    }

    // Listen to auth state changes
    this.unsubscribeAuth = firebase.auth().onAuthStateChanged(user => {
      this.handleAuthStateChange(user);
    });
  }

  handleAuthStateChange(user) {
    this.currentUser = user;

    if (user) {
      // User is signed in
      this.onUserSignedIn(user);
    } else {
      // User is signed out
      this.onUserSignedOut();
    }

    // Update UI
    this.updateUserUI();
  }

  async onUserSignedIn(user) {
    console.log('User signed in:', user.email);

    // Sync favorites from localStorage to Firestore
    await this.syncFavoritesToCloud();

    // Load favorites from Firestore
    await this.loadFavoritesFromCloud();
  }

  onUserSignedOut() {
    console.log('User signed out');

    // Keep favorites in localStorage but don't sync
    this.updateUserUI();
  }

  updateUserUI() {
    const userStatus = document.getElementById('userStatus');
    if (!userStatus) return;

    if (this.currentUser) {
      // Show user info and logout button
      userStatus.innerHTML = `
        <div class="user-info">
          <span class="user-email">${this.currentUser.email}</span>
          <button class="btn ghost small" onclick="authSystem.signOut()">Cerrar sesión</button>
        </div>
      `;
    } else {
      // Show login button
      userStatus.innerHTML = `
        <button class="btn primary" onclick="authSystem.showAuthModal(true)">Iniciar sesión</button>
      `;
    }
  }

  showAuthModal(isLogin = true) {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authTitle');
    const toggleText = document.getElementById('toggleAuthMode');
    const submitBtn = document.getElementById('authSubmitBtn');

    if (!modal) return;

    if (isLogin) {
      title.textContent = 'Iniciar sesión';
      toggleText.textContent = '¿No tienes cuenta? Regístrate';
      submitBtn.textContent = 'Iniciar sesión';
    } else {
      title.textContent = 'Crear cuenta';
      toggleText.textContent = '¿Ya tienes cuenta? Inicia sesión';
      submitBtn.textContent = 'Crear cuenta';
    }

    modal.dataset.mode = isLogin ? 'login' : 'register';
    modal.style.display = 'flex';

    // Clear form
    document.getElementById('authForm').reset();
    document.getElementById('authError').textContent = '';
  }

  hideAuthModal() {
    const modal = document.getElementById('authModal');
    if (modal) {
      modal.style.display = 'none';
    }
  }

  async handleAuthSubmit(email, password) {
    const modal = document.getElementById('authModal');
    const isLogin = modal.dataset.mode === 'login';
    const errorEl = document.getElementById('authError');

    try {
      if (isLogin) {
        await firebase.auth().signInWithEmailAndPassword(email, password);
      } else {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
      }

      this.hideAuthModal();
      this.showNotification('¡Bienvenido! Tus favoritos se sincronizarán automáticamente.', 'success');
    } catch (error) {
      let message = 'Error al autenticar';

      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Este email ya está registrado';
          break;
        case 'auth/invalid-email':
          message = 'Email inválido';
          break;
        case 'auth/weak-password':
          message = 'La contraseña debe tener al menos 6 caracteres';
          break;
        case 'auth/user-not-found':
          message = 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          message = 'Contraseña incorrecta';
          break;
        default:
          message = error.message;
      }

      errorEl.textContent = message;
    }
  }

  async signOut() {
    try {
      await firebase.auth().signOut();
      this.showNotification('Has cerrado sesión correctamente', 'info');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }

  // Favorites sync methods
  async syncFavoritesToCloud() {
    if (!this.currentUser || !this.db) return;

    // Get favorites from localStorage
    const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    if (localFavorites.length === 0) return;

    try {
      // Save to Firestore
      await this.db.collection('users').doc(this.currentUser.uid).set({
        email: this.currentUser.email,
        favorites: localFavorites,
        lastSync: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });

      console.log('Favorites synced to cloud');
    } catch (error) {
      console.error('Error syncing favorites:', error);
    }
  }

  async loadFavoritesFromCloud() {
    if (!this.currentUser || !this.db) return;

    try {
      const doc = await this.db.collection('users').doc(this.currentUser.uid).get();

      if (doc.exists) {
        const data = doc.data();
        const cloudFavorites = data.favorites || [];

        // Merge with local favorites
        const localFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        const mergedFavorites = [...new Set([...localFavorites, ...cloudFavorites])];

        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(mergedFavorites));

        // Update UI if favorites are displayed (with delay to ensure DOM is ready)
        setTimeout(() => {
          if (typeof updateFavoriteButtons === 'function') {
            updateFavoriteButtons();
          }
        }, 200);

        console.log('Favorites loaded from cloud');
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  }

  async saveFavorite(asin) {
    if (!this.currentUser || !this.db) return;

    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');

    try {
      await this.db.collection('users').doc(this.currentUser.uid).update({
        favorites: favorites,
        lastSync: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (error) {
      console.error('Error saving favorite:', error);
    }
  }

  showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 10000;
      animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease-out';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize auth system
let authSystem;

document.addEventListener('DOMContentLoaded', () => {
  // Wait for Firebase to be ready
  if (typeof firebase !== 'undefined') {
    authSystem = new AuthSystem();
  } else {
    console.warn('Firebase not loaded, auth system disabled');
  }
});

// CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }

  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .user-email {
    font-size: 0.9rem;
    color: var(--text-secondary);
  }

  .btn.small {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }
`;
document.head.appendChild(style);
