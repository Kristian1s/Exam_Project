// profile.js

function toggleProfileForm() {
  const wrapperProfile = document.querySelector('.wrapperProfileForm');
  const body = document.body;

  const currentDisplay = getComputedStyle(wrapperProfile).display;
  wrapperProfile.style.display = currentDisplay === 'none' ? 'block' : 'none';
  body.classList.toggle('modal-open');
}

function submitProfileForm(event) {
  event.preventDefault();
  const form = document.getElementById('profileForm');
  const formData = new FormData(form);

  fetch('/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      FormData: Object.fromEntries(formData),
    }),
  })
    .then((response) => {
      console.log('Form submitted successfully');
      form.reset();
      const wrapperProfile = document.querySelector('.wrapperProfileForm');
      wrapperProfile.style.display = 'none';
      document.body.classList.remove('modal-open');
      refreshPage();
    })
    .catch((error) => {
      console.error('Error submitting form:', error);
    });
}

function refreshPage() {
  setTimeout(() => {
    location.reload();
  }, 50);
}

function initializeProfilePage() {
  const toggleProfileBtn = document.getElementById('toggleProfileBtn');
  const avatarSelect = document.getElementById('avatar');

  toggleProfileBtn.addEventListener('click', toggleProfileForm);
  avatarSelect.addEventListener('change', handleAvatarChange);
}

function handleAvatarChange(event) {
  const selectedAvatar = event.target.value;
  const avatarOptions = document.getElementsByClassName('avatar-option');

  for (let i = 0; i < avatarOptions.length; i++) {
    avatarOptions[i].style.display = 'none';
  }

  if (selectedAvatar) {
    const selectedOption = document.getElementById(
      `avatar-option-${selectedAvatar}`
    );
    selectedOption.style.display = 'block';
  }
}


export { initializeProfilePage, submitProfileForm, refreshPage, toggleProfileForm };
