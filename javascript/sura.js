let openBtn = document.querySelector(".open-div");
let selectSura = document.querySelector(".select-sura");
let suraContent = document.querySelector(".sura-content");
let rightBtn = document.querySelector(".rightBtn");
let leftBtn = document.querySelector(".leftBtn");
let ayaName = document.querySelector(".aya-name");
let suraText = document.querySelector(".sura-text");
let suraDetails = document.querySelector(".sura-details");
let suarAnimation = document.querySelector(".lds-ripple");
let secondAnimation = document.querySelector(".lds-dual-ring");
let pagination = document.querySelector(".sura-content .pagination");

let isClick = true;
openBtn.addEventListener("click", () => {
  if (isClick) {
    isClick = false;
    openBtn.className = "fa-solid fa-xmark open-div";
  } else {
    isClick = true;
    openBtn.className = "fa-solid fa-bars open-div";
  }
  selectSura.classList.toggle("active");
  suraContent.classList.toggle("hid");
});

// get data of sura
let makaType = "";
let ayaCount = "";
let ayaText = [];
let nameAya = "";
// let isClick;
function getData() {
  suarAnimation.classList.add("active");

  fetch("http://api.alquran.cloud/v1/quran/en.asad")
    .then((respon) => respon.json())
    .then((text) => {
      suarAnimation.classList.remove("active");
      pagination.classList.add("active");
      for (let i = 0; i < text.data.surahs.length; i++) {
        if (text.data.surahs[i].revelationType == "Meccan") {
          makaType = "مكية";
        } else {
          makaType = "مدنية";
        }
        if (text.data.surahs[i].ayahs.length <= 10) {
          ayaCount = "ايات";
        } else {
          ayaCount = "ايه";
        }
        let content = `
            <div class="aya-box" id = '${i + 1}'>
            <div class="aya-count">
              <span>${makaType} / ${
          text.data.surahs[i].ayahs.length
        } ${ayaCount}</span>
            </div>
            <p>${text.data.surahs[i].name}</p>
          </div>
        `;
        suraDetails.innerHTML += content;
        // console.log(text.data.surahs[i]);
      }
      let allAyaBox = suraDetails.querySelectorAll(".aya-box");
      setTimeout(() => {
        allAyaBox[0].click();
      }, 100);
      let ayaIndex;
      allAyaBox.forEach((sura, indx) => {
        sura.addEventListener("click", (e) => {
          selectSura.classList.remove("active");
          suraContent.classList.remove("hid");
          openBtn.className = "fa-solid fa-bars open-div";
          isClick = true;
          suraText.innerHTML = "";
          ayaName.innerHTML = "";
          secondAnimation.classList.add("active");
          if (window.screen.width > 991) {
            selectSura.scrollTo({
              top: sura.offsetTop,
              behavior: "smooth",
            });
          }

          allAyaBox.forEach((sura) => sura.classList.remove("active"));
          sura.classList.add("active");
          fetch(`https://api.alquran.cloud/v1/surah/${indx + 1}/ar.alafasy`)
            .then((text) => text.json())
            .then((result) => {
              secondAnimation.classList.remove("active");

              ayaText = [];
              // suraText.innerHTML = "";
              ayaIndex = indx;

              let ayaData = result.data.ayahs;
              for (let i = 0; i < ayaData.length; i++) {
                ayaText.push(ayaData[i].text);
              }
              let final = "";
              ayaText.forEach((ele, id) => {
                final += `${ele}<span>(${id + 1})</span>`;
              });

              let finalText = `
                <img src= 'imgs/ayastart.png'>
                <div>${final}</div>
                <img src= 'imgs/ayaend.png'>

              `;

              suraText.innerHTML = finalText;
              ayaName.innerText = result.data.name;
              rightBtn.onclick = function () {
                ayaIndex++;
                if (ayaIndex < allAyaBox.length) {
                  changeSura(ayaIndex);
                } else {
                  ayaIndex = 0;
                  changeSura(ayaIndex);
                }
              };

              leftBtn.onclick = function () {
                if (ayaIndex != 0) {
                  ayaIndex--;
                  changeSura(ayaIndex);
                } else {
                  ayaIndex = allAyaBox.length - 1;
                  changeSura(ayaIndex);
                }
              };
            });
        });
      });
      function changeSura(indx) {
        allAyaBox[indx].click();
      }
      document.addEventListener("keydown", (e) => {
        if (e.code == "ArrowRight") {
          rightBtn.click();
        } else if (e.code == "ArrowLeft") {
          leftBtn.click();
        }
      });
    });
}
getData();

// fetch("https://raw.githubusercontent.com/rn0x/Quran-Json/main/Quran.json")
//   .then((rs) => rs.json())
//   .then((result) => {
//     for (let i = 0; i < result.length; i++) {
//       console.log(result[i].ar);
//     }
//   });
