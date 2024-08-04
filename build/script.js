document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector(".menu-btn");
  const menu = document.querySelector(".menu");
  const navItems = document.querySelectorAll(".nav-item");

  let showMenu = false;

  menuBtn.addEventListener("click", () => {
    if (!showMenu) {
      menuBtn.classList.add("close");
      menu.classList.remove("hidden");
      navItems.forEach((item) => item.classList.add("show"));
      showMenu = true;
    } else {
      menuBtn.classList.remove("close");
      menu.classList.add("hidden");
      navItems.forEach((item) => item.classList.remove("show"));
      showMenu = false;
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const slideUpElements = document.querySelectorAll(".slide-up");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("slide-up-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  slideUpElements.forEach((element) => {
    observer.observe(element);
  });
});

const apiKey = "e217596a";

const popularMovies = [
  "Inception",
  "The Dark Knight",
  "Interstellar",
  "The Matrix",
  "Titanic",
  "The Godfather",
  "Pulp Fiction",
  "Fight Club",
];

const searchMovie = async () => {
  const movieTitle = document.getElementById("movieInput").value;
  const response = await fetch(
    `http://www.omdbapi.com/?apikey=${apiKey}&t=${movieTitle}`
  );
  const data = await response.json();
  displayMovie(data);
};

const displayMovie = (movie) => {
  const movieContainer = document.getElementById("movieContainer");
  let ratings = "";
  if (movie.Ratings && movie.Ratings.length > 0) {
    ratings = movie.Ratings.map(
      (rating) =>
        `<p class="text-blue-500"><strong>${rating.Source}:</strong> ${rating.Value}</p>`
    ).join("");
  } else {
    ratings = '<p class="text-blue-500">No reviews available</p>';
  }
  movieContainer.innerHTML = `
        <div class="movie bg-gray-800 p-4 rounded-lg shadow-lg">
            <img src="${movie.Poster}" alt="${movie.Title} poster" class="float-left mr-4 w-1/3 rounded-lg">
            <div>
                <h2 class="text-2xl font-bold text-blue-500">${movie.Title}</h2>
                <p><strong>Year:</strong> ${movie.Year}</p>
                <p><strong>Genre:</strong> ${movie.Genre}</p>
                <p><strong>Plot:</strong> ${movie.Plot}</p>
                <div class="reviews mt-4">
                    <h3 class="text-xl font-bold text-blue-500">Reviews:</h3>
                    ${ratings}
                </div>
            </div>
        </div>
    `;
};

const loadPopularMovies = async () => {
  const popularMoviesContainer = document.getElementById("popularMovies");
  popularMoviesContainer.innerHTML = "";

  for (const title of popularMovies) {
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${apiKey}&t=${title}`
    );
    const movie = await response.json();
    const movieElement = document.createElement("div");
    movieElement.classList.add(
      "movie",
      "bg-gray-800",
      "p-4",
      "rounded-lg",
      "shadow-lg",
      "cursor-pointer"
    );
    movieElement.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title} poster" class="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer">
            <h3 class="text-xl font-bold">${movie.Title}</h3>
            <p><strong>Year:</strong> ${movie.Year}</p>
            <p><strong>Genre:</strong> ${movie.Genre}</p>
        `;
    movieElement.addEventListener("click", () => displayMovie(movie));
    popularMoviesContainer.appendChild(movieElement);
  }
};

window.onload = loadPopularMovies;
