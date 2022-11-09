const loginFormHandler = async (event) => {
    event.preventDefault();
    console.log("log in button")
    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();
    console.log(username, password)
    if (email && password) {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/');
      } else {
        alert('Failed to log in.');
      }
    }
  };

  document
  .querySelector('#log-in-button')
  .addEventListener('click', loginFormHandler);