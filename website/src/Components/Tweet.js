//This card is only compatible with the homepage Card Componenet, other compatiblity test has not been done

function Tweet({ title, text, hour, min, sec, winner, amount, id }) {
  return (
    <div class="card mb-3" id={id}>
      <div class="row g-0">
        <div class="col-md-2" id="image-container">
          <img
            src="../assets/img/profile-img.jpg"
            class="img-fluid rounded-start homepage-icon"
            alt="..."
          />
        </div>
        <div class="col-md-10">
          <div class="card-body">
            <h5 class="card-title">@{title}</h5>
            <p class="card-text">{text}</p>
            <div class="row g-0">
              <div class="col-md-3">Reward</div>
              <div class="col-md-3">Time</div>
              <div class="col-md-3">Winners</div>
              <div class="col-md-3"></div>
            </div>
            <div class="row g-0">
              <div class="col-md-3">${winner}</div>
              <div class="col-md-3">
                {hour}h {min}m <span class="seconds"> {sec}s </span>
              </div>
              <div class="col-md-3">{amount}</div>
              <div class="col-md-3">
                <button type="button" class="btn btn-primary">
                  Enter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tweet;
