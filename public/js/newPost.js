const newPostHandler = async (event) => {
  event.preventDefault();

  // Collect values from new post form here
  const postTitle = document.querySelector('#title').value.trim();
  const postContent = document.querySelector('#content').value.trim();
  // const username = document.querySelector('#username').value.trim();

  if (postTitle && postContent) {
    //Sent POST request to the API endpoint
    const response = await fetch('/api/post/new', {
      method: 'POST',
      body: JSON.stringify({ postTitle, postContent }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(response);
      //If successful, redirect browser to the homepage
      document.location.replace('/');
      alert('New Post Created!');
    }
  } else {
    alert('Must input title and content to post!');
  }
};

const cancelHandler = async () => {
  document.location.replace('/');
};

// add event listener to submit button
document.querySelector('#post').addEventListener('click', newPostHandler);

document.querySelector('#cancel').addEventListener('click', cancelHandler);
