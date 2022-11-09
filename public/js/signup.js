const signupFormHandler = async (event) => {
    event.preventDefault();

    // const  = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && password && first_name && last_name) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, password, first_name, last_name }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to sign up.');
      }
    }
  };

  document
  .querySelector('.custom-signup-form')
  .addEventListener('submit', signupFormHandler);