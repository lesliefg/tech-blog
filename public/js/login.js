//Function to login to the website
const loginFormHandler = async (event) => {
  event.preventDefault();

  //Variables for login form
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#pwd').value.trim();

  if (username && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/user/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, go to users profile else send failed login alert
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

//Function to signup to the website
const signupFormHandler = async (event) => {
  event.preventDefault();

  //Variables for the signup form
  const name = document.querySelector('#signupName').value.trim();
  const username = document.querySelector('#signupUsername').value.trim();
  const email = document.querySelector('#signupEmail').value.trim();
  const password = document.querySelector('#signupPwd').value.trim();

  if (name && username && email && password) {
    const response = await fetch('/api/user/', {
      method: 'POST',
      body: JSON.stringify({ name, username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#login')
  .addEventListener('click', loginFormHandler);

document
  .querySelector('#signup')
  .addEventListener('click', signupFormHandler);
