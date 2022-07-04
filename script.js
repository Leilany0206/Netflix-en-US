let popular = "https://api.themoviedb.org/3/movie/popular";
let romance = "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=10749";
let crime = "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=80";
let animation = "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=16";
let history = "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=36";
let music = "https://api.themoviedb.org/3/discover/movie?api_key=af1b76109560756a2450b61eff16e738&with_genres=10402";

let changeLogo = document.getElementById("changeLogo");
let searchInput = document.getElementById("searchInput");
let searchPage = document.getElementById("searchPage");
let searchPageInt = document.getElementById("searchPageInt");
let searchPageText = document.getElementById("searchPageText");
let billboardContainer = document.getElementById("billboardContainer");
let billboardTitle = document.getElementById("billboardTitle");
let billboardDesc = document.getElementById("billboardDesc");
let infoBtn = document.getElementById("infoBtn");
let moviePage = document.getElementById("moviePage");
let moviePageTitle = document.getElementById("moviePageTitle");
let moviePageDesc = document.getElementById("moviePageDesc");
let moviePageInt = document.getElementById("moviePageInt");
let moviePageActor = document.getElementById("moviePageActor");
let actorPageMovies = document.getElementById("actorPageMovies");
let popularBox = document.getElementById("popular");
let romanceBox = document.getElementById("romance");
let crimeBox = document.getElementById("crime");
let animationBox = document.getElementById("animation");
let historyBox = document.getElementById("history");
let musicBox = document.getElementById("music");

// NETFLIX ICON AND MEDIA QUERIES
function mediaLogo(x) {
  if (x.matches) { 
    changeLogo.src = "https://www.edigitalagency.com.au/wp-content/uploads/Netflix-N-Symbol-logo-red-transparent-RGB-png.png";
  } else {
    changeLogo.src = "https://1000marken.net/wp-content/uploads/2021/01/Netflix-logo.png"
  }
}

let x = window.matchMedia("(max-width: 576px)")
mediaLogo(x) 
x.addListener(mediaLogo);

// CUT DESCRIPTION 
function cut(str, number) {
  return str.split(" ").splice(0, number).join(" ");
}

function count(str) {
  const arr = str.split(' ');

  return arr.filter(word => word !== '').length;
}

// Search

searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    search()
  }
});

function search() {
  let inputOriginal = searchInput.value
  let input = "&query=" + inputOriginal
  let searchLink = `https://api.themoviedb.org/3/search/movie?api_key=af1b76109560756a2450b61eff16e738${input}`

  const searchMovie = async () => {
    try {
      const response = await axios.get(searchLink, {
        params: {
          language: "en-US",
        },
      });

      let aux = response.data.results;
      let auxMessage = "";
      console.log(aux)

      if (response.status === 200) {
        if (aux.length === 0) {
          searchPage.style.visibility = "visible";
          auxMessage += `<h2>Sorry, "${inputOriginal}" is currently unavailable in our catalog</h2>`
          searchPageText.innerHTML = auxMessage;
        } else {
          searchPage.style.visibility = "hidden";
          // auxMessage += `<h2>"${inputOriginal}" forma parte del catálogo en este momento :)</h2>`
          // searchPageText.innerHTML = auxMessage;

          showMovie(`${aux[0].id}`)
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  searchMovie();
}

// EVENT CLOSE LOGO
function closeWindow(box) {
  console.log(box);
  box.style.visibility = "hidden";
}

// EVENT ACTOR MOVIES
function actor(id) {
  // let actorMovies = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=e2463b079580c4d4aed3af119a1e0c2e`;
  let actorMovies = `https://api.themoviedb.org/3/discover/movie?api_key=e2463b079580c4d4aed3af119a1e0c2e&with_people=${id}&sort_by=popularity.desc`
  actorPage.style.visibility = "visible";
  moviePage.style.visibility = "hidden";

  const getSetActor = async () => {
    try {
      const response = await axios.get(actorMovies, {
        params: {
          language: "en-US",
        },
      });

      // let aux = response.data.cast;
      let aux = response.data.results;
      let auxMovie = "";
      console.log(aux.length)

      if (response.status === 200) {
        let auxMax = 5;

        if (x.matches) {
          auxMax = 6
        } else {auxMax = 5}

        for (let i = 0; i < auxMax && i < aux.length && i < 10; i++) {
          if(aux[i].poster_path !== null) {
          auxMovie += `<div class="movieActor" id=${aux[i].id} onclick="showMovie(${aux[i].id})"><img src="https://image.tmdb.org/t/p/w500${aux[i].poster_path}" class="posterActor" alt=""></div>`;
          actorPageMovies.innerHTML = auxMovie;
          } else {auxMax += 1}
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  getSetActor();
}

//EVENT MOVE ARROW
function moveArrowRight(cNumber) {
  cNumber.scrollLeft += cNumber.offsetWidth;
}

function moveArrowLeft(cNumber) {
  cNumber.scrollLeft -= cNumber.offsetWidth;
}

// EVENT CLICK MOVIE SHOW
function showMovie(id) {
  moviePage.style.visibility = "visible";
  actorPage.style.visibility = "hidden";

  let show = `https://api.themoviedb.org/3/movie/${id}?api_key=e2463b079580c4d4aed3af119a1e0c2e`;

  const getSet = async () => {
    try {
      const response = await axios.get(show, {
        params: {
          language: "en-US",
        },
      });

      let aux = response.data;
      let auxTitle = "";
      let auxDesc = "";
      console.log(aux.title);

      if (response.status === 200) {
        auxTitle += `${aux.title}`;
        moviePageTitle.innerHTML = auxTitle;

        if (count(`${aux.overview}`) > 90) {
          auxDesc += cut(`${aux.overview}`, 90) + " ...";
        } else {
          auxDesc += `${aux.overview}`
        }

        moviePageDesc.innerHTML = auxDesc;

        // auxImg += `<div id="moviePageImg">AHHHHHH</div>`;
        // let moviePageImg = document.getElementById("moviePageImg");
        // moviePageImg.style.backgroundImage=`"url(https://image.tmdb.org/t/p/w1280${aux.backdrop_path})"`;
        // moviePageInt.innerHTML = auxImg;

        if(aux.backdrop_path !== null) {
          moviePageInt.style.backgroundImage=`url(https://image.tmdb.org/t/p/w1280${aux.backdrop_path})`;
        } else {
          moviePageInt.style.backgroundImage=`url(https://image.tmdb.org/t/p/w1280${aux.poster_path})`;
          moviePageInt.style.backgroundPositionY = "center";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  let cast = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=e2463b079580c4d4aed3af119a1e0c2e&language=en-US`;

  const getSetCast = async () => {
    try {
      const response = await axios.get(cast, {
        params: {
          language: "en-US",
        },
      });

      let aux = response.data.cast;
      let auxActor = "";
      console.log(aux);

      if (response.status === 200) {
        for (let i = 0; i < 5; i++) {
          if (aux[i].known_for_department == "Acting") {
            auxActor += `<span class="castMember" onclick="actor(${aux[i].id})">${aux[i].name}, </span>`;
          }
        }
        let auxActorFinal = `<span>more...</span>`;

        console.log(auxActor)
        moviePageActor.innerHTML = auxActor + auxActorFinal;
      }

    } catch (error) {
      console.log(error);
    }
  };

  getSet(); 
  getSetCast();
}

// BILLBOARD
const setBillboard = async () => {
  try {
    const response = await axios.get(popular, {
      params: {
        api_key: "e2463b079580c4d4aed3af119a1e0c2e",
        language: "en-US",
      },
    });

    let aux = response.data.results;
    let auxTitle = "";
    let auxDesc = "";

    if (response.status === 200) {
      infoBtn.setAttribute("onclick", `showMovie(${aux[0].id})`);

      if (aux[0].backdrop_path !== null) {
        billboardContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${aux[0].backdrop_path})`;
      } else {
        billboardContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${aux[0].poster_path})`;
      }

      auxTitle += `${aux[0].title}`;
      billboardTitle.innerHTML = auxTitle;

      if (count(`${aux[0].overview}`) > 90) {
        auxDesc += cut(`${aux[0].overview}`, 90) + " ...";
      } else {
        auxDesc += `${aux[0].overview}`;
      }

      billboardDesc.innerHTML = auxDesc;

    }
  } catch (error) {
    console.log(error);
  }
};

setBillboard();

// CAROUSEL MOVIES
const getMovies = async (type, box) => {
  try {
    const response = await axios.get(type, {
      params: {
        api_key: "e2463b079580c4d4aed3af119a1e0c2e",
        language: "en-US",
      },
    });

    let aux = response.data.results;
    let auxMovie = "";

    if (response.status === 200) {
      for (let i = 0; i < 15; i++) {
        if (aux[i].backdrop_path !== null) {
        auxMovie += `<div class="movie" id=${aux[i].id} onclick="showMovie(${aux[i].id})"><img src="https://image.tmdb.org/t/p/w500${aux[i].backdrop_path}" class="poster" alt=""></div>`;
        box.innerHTML = auxMovie;
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

getMovies(popular, popularBox);
getMovies(romance, romanceBox);
getMovies(crime, crimeBox);
getMovies(animation, animationBox);
getMovies(history, historyBox);
getMovies(music, musicBox);

/* METODO CON THEN
axios.get("https://api.themoviedb.org/3/movie/popular?api_key=e2463b079580c4d4aed3af119a1e0c2e")
.then((response) => {
    console.log(response.data.results)
})
.catch((error) => {
    console.log(error)
});
*/