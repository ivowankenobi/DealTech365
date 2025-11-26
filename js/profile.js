// Profile Edit Form Handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('editProfileForm');
  const messageDiv = document.getElementById('formMessage');

  // Load saved profile data from localStorage
  loadProfileData();

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const profileData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      bio: formData.get('bio'),
      interests: formData.getAll('interests')
    };

    // Save to localStorage
    localStorage.setItem('userProfile', JSON.stringify(profileData));

    // Show success message
    messageDiv.className = 'form-message success';
    messageDiv.textContent = '✓ Perfil actualizado correctamente';

    // Hide message after 3 seconds
    setTimeout(() => {
      messageDiv.className = 'form-message';
      messageDiv.textContent = '';
    }, 3000);

    console.log('Profile saved:', profileData);
  });

  function loadProfileData() {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profileData = JSON.parse(savedProfile);

      // Fill form with saved data
      document.getElementById('name').value = profileData.name || '';
      document.getElementById('email').value = profileData.email || '';
      document.getElementById('phone').value = profileData.phone || '';
      document.getElementById('bio').value = profileData.bio || '';

      // Check saved interests
      if (profileData.interests) {
        profileData.interests.forEach(interest => {
          const checkbox = document.querySelector(`input[value="${interest}"]`);
          if (checkbox) checkbox.checked = true;
        });
      }
    }
  }
});
