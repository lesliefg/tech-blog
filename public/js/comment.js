const newCommentHandler = async (event) => {
  event.preventDefault();

  // Collect values from new comment here
  const comment_text = document.querySelector('#comment').value.trim();
  const post_id = document.querySelector('#title').getAttribute('postId');
  // const username = document.querySelector('#username').value.trim();

  if (comment_text && post_id) {
    //Sent POST request to the API endpoint
    const response = await fetch('api/comment', {
      method: 'PUT',
      body: JSON.stringify({ comment_text, post_id }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      console.log(response);
      //If successful, redirect browser to the homepage
      document.location.replace(`/post/${postId}`);
      alert('Post edited');
    }
  } else {
    alert('You\ll need to type a comment to add one!');
  }
};

const clearHandler = async () => {
  document.querySelector('#comment').value = '';
};

// add event listener to buttons
document.querySelector('#save').addEventListener('click', newCommentHandler);
document.querySelector('#cancel').addEventListener('click', clearHandler);
