let isAdmin = localStorage.getItem("admin") === "true";

function uploadImage() {
  const username = document.getElementById("username").value.trim();
  const title = document.getElementById("title").value.trim();
  const file = document.getElementById("imageInput").files[0];

  if (!username || !title || !file) {
    alert("Please fill all fields and choose an image.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const imageData = e.target.result;
    const post = { username, title, imageData };

    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    displayPosts();
  };
  reader.readAsDataURL(file);
}

function deletePost(index) {
  if (!isAdmin) return;

  let posts = JSON.parse(localStorage.getItem("posts")) || [];
  posts.splice(index, 1);
  localStorage.setItem("posts", JSON.stringify(posts));

  displayPosts();
}

function displayPosts() {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  const posts = JSON.parse(localStorage.getItem("posts")) || [];

  posts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${post.imageData}" alt="Monster Image">
      <h3>${post.title}</h3>
      <p>Posted by ${post.username}</p>
      ${isAdmin ? `<button onclick="deletePost(${index})" class="delete-btn">Delete</button>` : ""}
    `;
    gallery.appendChild(card);
  });
}

window.onload = function () {
  displayPosts();
};
