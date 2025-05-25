const filterList = document.querySelectorAll(".filterList > .li");

filterList.forEach((element) => {
  element.addEventListener("click", function () {
    const imgF = this.querySelector('.imgF');
    if (imgF) {
      imgF.classList.toggle('imgFF');
    }
    const animeList = this.querySelector(".animeList");
    if (animeList) {
      if (animeList.style.display === "block") {
        animeList.style.display = "none";
      } else {
        document
          .querySelectorAll(".animeList")
          .forEach((item) => (item.style.display = "none"));
        animeList.style.display = "block";
      }
    }
  });
});

const eventsStore = [
  {
    title: "INFJ Personality Type - Coffee Shop Meet & Greet",
    description: "Being an INFJ",
    date: new Date(2024, 2, 23, 15),
    image:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format& fit=crop & ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D % 201037w ",
    type: "Offline",
    attendees: 99,
    category: "Hobbies and Passions",
    distance: "50 km",
  },
  {
    title:
      "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and CustomerExperience",
    description: "New York AI Users",
    date: new Date(2024, 2, 23, 11, 30),
    image:
      "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format & fit=crop & ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D ",
    type: "Offline",
    attendees: 43,
    category: "Technology",
    distance: "25 km",
  },
  {
    title: "Book 40+ Appointments Per Month Using AI and Automation",
    description: "New Jersey Business Network",
    date: new Date(2024, 2, 16, 14),
    image:
      "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format & fit=crop & ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D",
    type: "Online",
    category: "Technology",
    distance: "10 km",
  },
  {
    title: "Dump writing group weekly meetup",
    description: "Dump writing group",
    date: new Date(2024, 2, 13, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto = format & fit=crop & ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D",
    type: "Online",
    attendees: 77,
    category: "Business",
    distance: "100 km",
  },
  {
    title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
    description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto = format & fit=crop & ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D",
    type: "Online",
    attendees: 140,
    category: "Social Activities",
    distance: "75 km",
  },
  {
    title: "All Nations - Manhattan Missions Church Bible Study",
    description: "Manhattan Bible Study Meetup Group",
    date: new Date(2024, 2, 14, 11),
    image:
      "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto = format & fit=crop & ixlib=rb - 4.0.3 & ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA % 3D % 3D",
    type: "Offline",
    category: "Health and Wellbeing",
    distance: "15 km",
  },
];

function filteredEvents(arr) {
  const section2Filter = document.getElementById("section2Filter");
  section2Filter.innerHTML = ''
  arr.forEach((item) => {
    const boxEvent = document.createElement("div");
    boxEvent.classList.add("boxEvent");
    const foto = document.createElement("img");
    foto.setAttribute("src", item.image);
    foto.classList.add("foto");
    const content = document.createElement("div");
    content.classList.add("content");
    const postTitle = document.createElement("h3");
    postTitle.classList.add('postTitle')
    postTitle.textContent = item.title;
    const datum = document.createElement("p");
    datum.classList.add('datum')
    datum.textContent = item.date.toISOString().split('T')[0];
    const attendees = document.createElement("p");
    attendees.textContent = item.attendees;
    attendees.classList.add('postAttendees')
    const postCategory = document.createElement("p");
    postCategory.classList.add('postCategory')
    postCategory.textContent = item.category;
    const postDistance = document.createElement("p");
    postDistance.textContent = item.distance;
    postDistance.classList.add('postDistance')
    content.append(
      datum,
      postTitle,
      postCategory,
      postDistance,
      attendees,
    );
    boxEvent.append(foto, content);
    section2Filter.appendChild(boxEvent);
  });
}
filteredEvents(eventsStore);

const activeFilters = {
  type: null,
  category: null,
  distance: null
};

function myFunForEvents() {
  const neededFilter = this.textContent.trim(); 

  document.querySelectorAll('.filterList > .li').forEach(li => li.classList.remove('active-filter'));

  this.classList.add('active-filter');

  const selectedLabel = this.closest('.li').querySelector('.selectedFilterLabel');
  if (selectedLabel) {
    selectedLabel.textContent = neededFilter; 
  }

  if (eventsStore.some(item => item.type === neededFilter)) {
    activeFilters.type = neededFilter;
  } else if (eventsStore.some(item => item.category === neededFilter)) {
    activeFilters.category = neededFilter;
  } else if (eventsStore.some(item => item.distance === neededFilter)) {
    activeFilters.distance = neededFilter;
  }

  const filteredArray = eventsStore.filter((item) => {
    let isValid = true;

    if (activeFilters.type) {
      isValid = isValid && item.type === activeFilters.type;
    }

    if (activeFilters.category) {
      isValid = isValid && item.category === activeFilters.category;
    }

    if (activeFilters.distance) {
      isValid = isValid && item.distance === activeFilters.distance;
    }

    return isValid;
  });

  filteredEvents(filteredArray);
}

document.querySelectorAll('.animeList li').forEach((li) => {
  li.addEventListener('click', myFunForEvents);
});

document.getElementById('resetFilters').addEventListener('click', function () {
  location.reload()
 
  document.querySelectorAll('.filterList > .li').forEach(li => li.classList.remove('active-filter'));
  activeFilters.type = null;
  activeFilters.category = null;
  activeFilters.distance = null;

  filteredEvents(eventsStore);
});
