const signupFormHandler = async (event) => {
    event.preventDefault();
  console.log("sign up button")
    // const  = document.querySelector('#email-signup').value.trim();
    const first_name = document.getElementById('signup-first-name').value.trim();
    const last_name = document.getElementById('signup-last-name').value.trim();
    const email = document.getElementById('signup-email').value.trim();
    const password = document.getElementById('signup-password').value.trim();
    console.log("password", password)
    
  
    if (email && password && first_name && last_name) {
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ 
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
          }),
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
  .getElementById('sign-up-button')
  .addEventListener('click', signupFormHandler);