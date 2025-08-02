/* 
 - Create a CRD application (CRUD without update) using json-server or another API
 - Use fetch and async/await to interact with the API
 - Use a form to create/post new entities
 - Build a way for users to delete entities
 - Include a way to get entities from the API and display them
 - You do NOT need update, but you can add it if you'd like
 - Use Bootstrap and/or CSS to style your project
 */

 /*
 What do I need to do for my API
  1. I need to fetch the API
  2. I need to be able to add a comment
  3. I need to be able to add a comment
  4. I need to be able to delete the last comment

  ======================================================
 */

  const API_URL = "https://jsonplaceholder.typicode.com/comments";

  const commentContainer = document.querySelector(".container");
  const deleteButton = document.getElementById("deleteBtn");
  
  //Fetch API
  async function callComments() {
    const res = await fetch(`${API_URL}?_limit=6`);
    const comments = await res.json();
    console.log(comments);
    comments.forEach(comment => addCommentsToDOM(comment));
  }
  
  // Add API to container
  function addCommentsToDOM(comment) {
    const commentDiv = document.createElement("div");
    commentDiv.classList.add("comment");
    commentDiv.setAttribute("data-id", comment.id);
    commentDiv.innerHTML = `
      <text id="idNum">${comment.id}.</text>
      <text>${comment.body}</text>
    `;

    commentContainer.appendChild(commentDiv);
  }
  
  // Delete last comment
  deleteButton.addEventListener("click", async () => {
    const comments = commentContainer.querySelectorAll(".comment");
  
    if (comments.length === 0) {
      console.log("No comments to delete.");
      return;
    }
  
    const lastComment = comments[comments.length - 1];
    const lastId = lastComment.getAttribute("data-id");
  
    const res = await fetch(`${API_URL}/${lastId}`, { method: "DELETE" });
    const result = await res.json();
    console.log("Server responded to DELETE:", result);
  
    // Remove from DOM
    lastComment.remove();
  });
  
  callComments();