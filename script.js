let btnText=document.getElementById("mode-text");
let modeIcon=document.querySelector('#mode-icon');
let btnMode = document.querySelector("#btn-mode");
let inputField=document.querySelector('#input-field');
let crossBtn=document.querySelector('#cross-icon');
let Result=document.querySelector('#no-results');
let searchBtn=document.querySelector('.submit');
let profileImg=document.querySelector('#avatar');
let userName=document.querySelector('#name');
let joinDate=document.querySelector('#join-date');
let gitId=document.querySelector('#git-id');
let bio=document.querySelector('#bio');
let repo=document.querySelector('#repos');
let followers=document.querySelector('#followers');
let following=document.querySelector('#following');
let loc=document.querySelector("#location");
let webPage=document.querySelector('#webpage');
let twitter=document.querySelector('#twitter');
let company=document.querySelector('#company');
let searchbar=document.querySelector('.search-data');
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let profileContainer=document.querySelector('.info-container');
const root = document.documentElement.style;
const url = "https://api.github.com/users/";

// adding listner for theme button
let currentTheme=btnText.innerText;
function changeThemeMode()
{
    if(currentTheme=="DARK")
    {
        darkTheme();
    }
    else
    {
        lightTheme();
    }
}

btnMode.addEventListener("click",changeThemeMode);

initial();
// dark Theme setting

function darkTheme()
{
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    console.log("Current Theme: "+currentTheme);
    btnText.innerText = "LIGHT";
    modeIcon.src = "./assets/images/sun-icon.svg";
    currentTheme=btnText.innerText;
}

// light Theme setting 

function lightTheme()
{
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    console.log("Current Theme: "+currentTheme);
    btnText.innerText = "DARK";
    modeIcon.src = "./assets/images/moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    currentTheme=btnText.innerText;
}

// API CALL

async function getAPIData(userData)
{
    try{
        let res=await fetch(userData);
        let data=await res.json();
        updateProfile(data);
    }
    catch(err)
    {
        alert("API NOT FOUND "+err);
    }
}

function updateProfile(data)
{
    if(data.message!=="Not Found")
    {
        datesegments = data.created_at.split("T").shift().split("-");
        joinDate.innerText = `Joined ${datesegments[2]} ${months[datesegments[1] - 1]} ${datesegments[0]}`;
        profileImg.src=`${data.avatar_url}`;
        userName.innerText = data.name === null ? data.login : `${data.name}`;
        bio.innerText= data.bio === null ? "This Profile has No Bio" : `${data.bio}`;
        gitId.innerText=`@${data.login}`;
        gitId.href=`${data.html_url}`;
        repo.innerText= `${data.public_repos}`;
        followers.innerText=`${data.followers}`;
        following.innerText=`${data.following}`;
        loc.innerText= data.location === null ? "Not Available" : `${data.location}`;
        webPage.innerText= data.blog === "" ? "Not Available" : `${data.blog}`;
        webPage.href= data.blog=== "" ? "Not Available" : "#";
        twitter.innerText= data.twitter_username === null ? "Not Available" : `${data.twitter_username}`;
        twitter.href = data.twitter_username === null ? "#" : `https://twitter.com/${data.twitter_username}`;
        company.innerText= data.company=== null ? "Not Available" : `${data.company}`;
        searchbar.classList.toggle("active");
        profileContainer.classList.toggle("active");
    }
    else
    {
        Result.style.opacity = "1";
    }
}

// listener to input field

inputField.addEventListener("input", function () {
    Result.style.opacity = "0";
  });

inputField.addEventListener("keydown",function (e) {
      if (e.key === "Enter")
      {
        if(inputField.value !== "")
        {
            getAPIData(url+inputField.value);
        }
      }
    },
    false
  );

    //   listener to search button
  searchBtn.addEventListener("click",()=>{
        if(inputField.value!=="")
        {
            getAPIData(url+inputField.value);
        }
  })

  function initial()
  {
      getAPIData(url+"omi75");
  }