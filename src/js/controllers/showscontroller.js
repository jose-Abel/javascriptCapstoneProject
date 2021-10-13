import NetworkCall from '../helpers/networkcall.js';
import LikesControllers from './likescontroller.js';

export default class ShowController {
  constructor(moviesArray) {
    this.moviesArray = moviesArray;
    this.likesControllers = new LikesControllers();
  }

  fetchRange(start = 1, end = 50) {
    const networkCall = new NetworkCall();
    while (start < end) {
      const response = networkCall.getRequest(`shows/${start}`);
      response
        .then((result) => {
          const movie = JSON.parse(result);
          this.moviesArray.push(movie);

          const divHolder = document.createElement('div');
          divHolder.className = 'col-md-4 mt-2';
          if (movie.image) {
            divHolder.innerHTML = `<div class="card">
          <div class="card-body">
            <div class="card-img-actions">
              <img
                src="${movie.image.original}"
                class="card-img img-fluid"
                width="348"
                height="241"
                alt=""
              />
            </div>
          </div>
          <div class="card-body bg-light text-center">
            <div class="mb-2 row">
              <div class="col-md-6">
                <h6 class="font-weight-semibold mb-2">
                  <a href="#" class="text-default mb-2" data-abc="true">${movie.name}</a>
                </h6>
              </div>
              <div class="col-md-6">
                <h6 class="font-weight-semibold mb-2">
                 
                    <i class="fa fa-heart love" id="likes${movie.id}" ></i>
                    <small id="likes${movie.id}_count">0 likes</small>
              
                </h6>
              </div>
            </div>
            <button id=${movie.id} type="button" class="mt-3 btn btn-info comment-button" data-bs-toggle="modal" data-bs-target="#commentsPage">
              <i class="fa fa-comments mr-4"></i> Comments
            </button>
            <button type="button" class="mt-3 btn btn-secondary">
              <i class="fas fa-ticket-alt mr-4"></i> Reservations
            </button>
          </div>
        </div>`;
          }
          this.likesControllers.getLikes().then((res) => {
            let obj = res.find((o) => o.item_id === movie.id);
            if (obj != null) {
              const likeCount = document.getElementById(`likes${movie.id}_count`);
              const [currentLike, keep] = likeCount.innerHTML.split(' ');
              let intVal = parseInt(obj.likes);
              likeCount.innerHTML = `${intVal} ${keep}`;
            }
          });

          document.getElementById('cardHolder').appendChild(divHolder);
          const likeLiterner = document.getElementById(`likes${movie.id}`);
          likeLiterner.addEventListener('click', (e) => {
            this.sendLikes(movie.id, `likes${movie.id}`);
          });
        })
        .catch((error) => {
          throw new Error(error);
        });

      start += 1;
    }
    new LikesControllers().getLikes();
  }

  sendLikes(movieID, id) {
    const likeController = new LikesControllers();
    const response = likeController.sendLike(movieID);
    response
      .then((res) => {
        const likeCount = document.getElementById(`${id}_count`);
        const [currentLike, keep] = likeCount.innerHTML.split(' ');
        let intVal = parseInt(currentLike);
        likeCount.innerHTML = `${intVal + 1} ${keep}`;
      })
      .catch((er) => {
        console.log(er);
      });
  }
}