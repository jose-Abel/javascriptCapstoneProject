import NetworkCall from '../helpers/networkcall.js';

class CommentsPage {
  URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/rVSJynvv1XHTg5vxDiSj/comments';

  constructor(shows, btn) {
    [this.show] = shows.moviesArray.filter((show) => show.id === +btn.id);
    this.networkCall = new NetworkCall(this.URL);
  }

  render() {
    const template = `<div class="popup-section">
        <div class="header">
          <img src="${this.show.image.medium}">

          <h1>${this.show.name}</h1>

          <div class="show-data">
            <span class="show-status"><b>Status:</b> ${this.show.status}</span>
            <div id="genres"></div>
            <span class="rating"><b>Rating:</b> ${this.show.rating.average}</span>
	        ${this.show.summary}
	    
          </div>
        </div>

        <div class="comments-container">
          <h2>Comments 10</h2>

          <div id="comments-box">
          
          </div>

        </div>

        <div class="add-comment-container">
          <h2>Add a comment</h2>

          <form class="form add-comment-form">
		  
	        <input type="text" placeholder="Your name" id="user-element" class="input-elements form-control">

            <textarea placeholder="Your comments" id="comment-message" class="form-control" rows="5"></textarea>

            <button type="button" class="btn btn-primary commentPopup-button">Comment</button>
		  
          </form>
        
	    </div>

      </div>`;

    const commentsPage = document.getElementById('commentsPage');
    const modalBody = commentsPage.querySelector('.modal-body');
    modalBody.innerHTML = template;

    const genresDiv = document.getElementById('genres');
    const span = document.createElement('span');
    span.innerHTML = '<b>Genre: <b>';
    
    this.show.genres.forEach((genre, index) => {
      span.innerHTML += `${genre}`;

      if (index !== this.show.genres.length - 1) {
        span.innerHTML += ', ';
      }
    });

    genresDiv.appendChild(span);

    this.getAllComments();
  }

  getAllComments() {
	const commentsBox = document.getElementById("comments-box");
    
    commentsBox.innerHTML = "";

	const response = this.networkCall.getRequestWithOptions(`?item_id=${this.show.id}`);

	response.then((result) => {

		if(result.length){
		  const comments = result;

          comments.forEach((comment) => {
             const template = `
			  <p>
			   <span>${comment.creation_date} </span>
			   <span>${comment.username} </span>
			   <span>${comment.comment} </span>
			  </p>
		      `;

		     commentsBox.innerHTML += `${template}`;

          })
		 }
	}).catch(error => {
		throw new Error(error);
    })
  }

  sendComment() {
	const userInput = document.getElementById('user-element');
  	const commentInput = document.getElementById('comment-message');
	
	if(userInput.value && commentInput.value) {
	  const response = this.networkCall.postRequestWithOptions(this.show.id, userInput.value, commentInput.value)
      .then(result => {
          userInput.value = "";
           
          commentInput.value = "";

          this.getAllComments();
      }) 
    }
  }
}

export default CommentsPage;
