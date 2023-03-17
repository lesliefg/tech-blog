const handleDeletePost = async (event) => {

  event.preventDefault();

  // collect needed data from front end. Selects value of data attribute 'postID'
  const id = document.querySelector('[postId]').getAttribute('postId');

  const response = await fetch(`/api/post/${id}` , {
    method: 'DELETE'
  });

  if (response.ok) {
    document.location.replace('/');
    alert('Post successfully deleted!');
  }
};

document.querySelector('#deletePost').addEventListener('click', handleDeletePost);