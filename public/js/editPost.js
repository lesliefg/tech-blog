const newPostHandler = async (event) => {
  event.preventDefault();

  // Collect values from new post form here
  const postTitle = document.querySelector('#title').value.trim();
  const postContent = document.querySelector('#content').value.trim();
  const postId = document.querySelector('#postId').value.trim();
  // const username = document.querySelector('#username').value.trim();

  if (postTitle && postContent) {
    //Sent POST request to the API endpoint
    const response = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ postTitle, postContent }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(response);
      //If successful, redirect browser to the homepage
      document.location.replace('/profile');
      alert('Post edited');
    }
  } else {
    alert('Must input title and content to post!');
  }
};

const handleDeletePost = async (event) => {
  event.preventDefault();
  // collect needed data from front end. Selects value of data attribute 'postID'
  const id = document.querySelector('#postId').value.trim();
  const response = await fetch(`/api/post/${id}` , {
    method: 'DELETE'
  });

  if (response.ok) {
    //if successful, redirect browser to home page
    document.location.replace('/');
    alert('Post successfully deleted!');
  }
};

const cancelHandler = async () => {
  document.location.replace('/');
};

// add event listener to buttons
document.querySelector('#save').addEventListener('click', newPostHandler);
document.querySelector('#delete').addEventListener('click', handleDeletePost);
document.querySelector('#cancel').addEventListener('click', cancelHandler);
