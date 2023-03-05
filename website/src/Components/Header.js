import React from "react";

function Header() {
  return (
    <React.Fragment>
      <i class="bi bi-list mobile-nav-toggle d-xl-none"></i>

      <header id="header">
        <div class="d-flex flex-column">
          <div class="profile">
            <img src="../assets/img/profile-img.jpg" alt="" class="img-fluid rounded-circle" />
            <h1 class="text-light">
              <a href="index.html">Alex Smith</a>
            </h1>
          </div>

          <nav id="navbar" class="nav-menu navbar">
            <ul>
              <li>
                <a href="/" class="nav-link scrollto active">
                  <i class="bx bx-home"></i> <span>Home</span>
                </a>
              </li>
              <li>
                <a href="/Apply" class="nav-link scrollto">
                  <i class="bx bx-user"></i> <span>Apply</span>
                </a>
              </li>
              <li>
                <a href="/claim" class="nav-link scrollto">
                  <i class="bx bx-file-blank"></i> <span>Claim</span>
                </a>
              </li>
              <li>
                <a href="/profile" class="nav-link scrollto">
                  <i class="bx bx-book-content"></i> <span>My Profile</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Header;
