let headerDivs = document.querySelectorAll("header .head");
let main = document.querySelector("main");
let ayaText = document.querySelector(".aya-text");
let ayaName = document.querySelector(".aya-name");
// #################Audio Selectors##############################
let makeAudio = document.querySelector(".currentAudio");
let playBtn = document.querySelector(".play");
let next = document.querySelector(".next");
let prev = document.querySelector(".prev");
let changeAudio = document.querySelector(".change-audio .aya-select");
let numSelect = document.querySelector(".change-audio .number-select");
let generateBtn = document.querySelector(".generate .btn-generate");
let generateDiv = document.querySelector(".generate");
let clChangeAudio = document.querySelector(".cl-div");
// let generateAnimation = document.querySelector(".lds-facebook");
let secChangeAudio = document.querySelector(".change-audio");
// let changeBtn = document.querySelector(".change");
let nextSurah = document.querySelector(".next-surah");
// ###################Volume Selectors##############################
let controlBtns = document.querySelector("main .control");
let volumeBtn = document.querySelector(".change-volume");
let volumeDiv = document.querySelector(".volume");
let volumeInput = document.querySelector(".volume form input");
// #################################################
let backgroundEffect = document.querySelector(".black-background");
let randomBackground = document.querySelector(".background");
let allRandom = document.querySelectorAll(".random-img img");
let loadingAnimation = document.querySelector(".lds-ring");
let ayaDetails = document.querySelector(".aya-details");
// #################Hadith Selectors#########################
let hadithBtn = document.querySelector("header .hadith");
let hadithSelect = document.querySelectorAll(".hadith .hadith-select p");
let hadithDetails = document.querySelector(".hadith-details");
let hadithAnimation = document.querySelector(".hadith-back");
// ####################Setting Selectors#########################
let mainSelect = document.querySelector(".select-shikh select");
let selectOptions = document.querySelectorAll("select option");
let settingBtn = document.querySelector(".settingBtn");
let settingDiv = document.querySelector(".setting");

let changeBackground = document.querySelector(".chn-background");
// #################Azkar Selectors##########################
let azkarBtn = document.querySelector("header .azkar");
let azkarDiv = document.querySelector(".azkar .azkar-content");
let morningAzkar = document.querySelector(".azkar .azkar-title .morning");
let morningAndEvening = document.querySelector(".morning-evening");
let closeAzkar = document.querySelector(".cl-azkar");
let morningAz = document.querySelector(".btns .b-morning");
let nightAz = document.querySelector(".btns .b-night");
let allAz = document.querySelectorAll(".btns p");
let azkarContent = document.querySelector(".az-content");
let nightAzkar = document.querySelector(".night-content");
// ###############Adaia Selctors##############################
let adaiaQuranBtn = document.querySelector(".adaia-quran");
let adaiaDiv = document.querySelector(".adaia");
let clAdaia = document.querySelector(".adaia .cl-adia");
let adaiaContent = document.querySelector(".adaia-content");
// ###############Tsabih Selectors#############################
let tsabihBtn = document.querySelector(".tsabihTitle");
let tsabihDiv = document.querySelector(".tsabih");
let clTsabih = document.querySelector(".cl-tsabih");
let tsabihContent = document.querySelector(".tsabih-content");

// ########################################
let isPlay = false;
let mainContent = document.querySelector(".aya-text");
let changeAyaBtn, randomBack, regex;

function showEffect() {
  backgroundEffect.classList.add("active");
}
function removeEffect() {
  backgroundEffect.classList.remove("active");
}

ayaName.onclick = function () {
  secChangeAudio.classList.add("active");
  // backgroundEffect.classList.add("active");
  showEffect();
};
clChangeAudio.onclick = function () {
  secChangeAudio.classList.remove("active");
  removeEffect();
};
randomBackground.style.backgroundImage = "";

changeBackground.onclick = function () {
  randomBack = allRandom[Math.floor(Math.random() * allRandom.length)];
  randomBackground.style.backgroundImage = "";
  regex = randomBack.src.toString().replace(/http:\/\/127.0.0.1:5500/gi, "..");
  randomBackground.style.backgroundImage = `url(${regex})`;
};

randomBack = allRandom[Math.floor(Math.random() * allRandom.length)];

regex = randomBack.src.toString().replace(/http:\/\/127.0.0.1:5500/gi, "..");
randomBackground.style.backgroundImage = `url(${regex})`;

// makeAudio.volume = 0;
headerDivs.forEach((div) => {
  div.addEventListener("click", (e) => {
    headerDivs.forEach((ele) => ele.classList.remove("active"));
    e.currentTarget.classList.add("active");
  });
});
document.addEventListener("click", (e) => {
  if (e.target.className == "container") {
    // secChangeAudio.classList.remove("active");
    volumeBtn.classList.remove("active");
    hadithBtn.classList.remove("active");
    azkarBtn.classList.remove("active");
  }
  if (e.target.classList.contains("black-background")) {
    secChangeAudio.classList.remove("active");
    removeEffect();
    tsabihDiv.classList.remove("active");

    // backgroundEffect.classList.remove("active");
    adaiaDiv.classList.remove("active");
    hadithDetails.classList.remove("active");
    settingDiv.classList.remove("active");
    morningAndEvening.classList.remove("active");
  }
  if (e.target.tagName == "HEADER") {
    volumeDiv.classList.remove("active");
    hadithBtn.classList.remove("active");
    azkarBtn.classList.remove("active");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.code == "Space") {
    tooglePlay();
  } else if (e.code == "ArrowLeft") {
    prev.click();
  } else if (e.code == "ArrowRight") {
    next.click();
  }
});
// getSurah();

let aya, audio;

function checkIcon() {
  playBtn.className = "fa-solid fa-pause play";
  isPlay = true;
}
function tooglePlay() {
  if (isPlay) {
    makeAudio.pause();
    isPlay = false;
    playBtn.className = "fa-solid fa-play play";
  } else {
    makeAudio.play();
    isPlay = true;
    playBtn.className = "fa-solid fa-pause play";
  }
}

let testIndex, getIndx, getAyaIndx;
let saveContent = [];
singleSura();
let currentAya, nameOfAya, selectShikName, selectInd, myIndx;
let shikhName = "alafasy";

if (window.localStorage.getItem("quran-sound")) {
  let getData = JSON.parse(localStorage.getItem("quran-sound"));
  shikhName = getData.value;
  selectShikName = getData.name;
  selectOptions.forEach((ele) => {
    if (ele.innerText.trim() == selectShikName) {
      ele.selected = true;
    }
  });
}
let optionsSura, optionsNumber, idNextAya, checkIndex, secIndx;
function singleSura() {
  loadingAnimation.classList.add("active");
  fetch("https://api.alquran.cloud/v1/surah")
    .then((result) => result.json())
    .then((text) => {
      for (let sura in text.data) {
        // console.log(text.data[sura]);
        changeAudio.innerHTML += `
          <option id ='${text.data[sura].number}'> 
          (${text.data[sura].number})</span>${text.data[sura].name}
          </option>
          
        `;
      }

      let suraId, ayaCount, idSura, indxSura;
      function genLoop(num) {
        numSelect.innerHTML = "";
        for (let i = 1; i <= num; i++) {
          numSelect.innerHTML += `
            <option>${i}</option>
          `;
        }
        optionsNumber = numSelect.querySelectorAll("option");
      }
      optionsSura = changeAudio.querySelectorAll("option");

      changeAudio.addEventListener("change", () => {
        suraId = changeAudio.options[changeAudio.selectedIndex].id;
        ayaCount = text.data[suraId - 1].numberOfAyahs;
        genLoop(ayaCount);
      });

      let randomNumber = Math.floor(Math.random() * 114);
      optionsSura.forEach((option, indx) => {
        if (indx == randomNumber) {
          option.selected = true;
          suraId = option.id;
          ayaCount = text.data[suraId - 1].numberOfAyahs;
          genLoop(ayaCount);
          setTimeout(() => {
            generateBtn.click();
          }, 10);
        }
      });

      generateBtn.onclick = function () {
        idSura = changeAudio.options[changeAudio.selectedIndex].id;
        indxSura = numSelect.value - 1;
        fetch(`https://api.alquran.cloud/v1/surah/${idSura}/ar.${shikhName}`)
          .then((result) => result.json())
          .then((text) => {
            aya = [];
            audio = [];
            loadingAnimation.classList.remove("active");
            secChangeAudio.classList.remove("active");
            removeEffect();
            backgroundEffect.classList.remove("active");
            controlBtns.classList.add("active");
            ayaText.classList.add("active");
            ayaDetails.classList.add("active");

            let verses = text.data.ayahs;
            verses.forEach((vers) => {
              aya.push(vers.text);
              audio.push(vers.audio);
            });
            let ayaIndex;
            ayaIndex = indxSura;
            getIndx = +idSura;
            myIndx = ayaIndex;
            secIndx = +idSura;
            // checkIndex = indxSura;
            testIndex = 0;
            changeSurah(ayaIndex);
            function changeSurah(indx) {
              makeAudio.src = audio[indx];
              ayaText.innerHTML = `${aya[indx]}`;
              checkIndex = indx + 1;
              optionsSura[getIndx - 1].selected = true;
              optionsNumber.forEach((option, id) => {
                if (id == indx) {
                  option.selected = true;
                }
              });
            }
            changeCounter(ayaIndex + 1);
            function changeCounter(count) {
              ayaName.innerHTML = `
                        <span class="number-aya">(${text.data.numberOfAyahs}/${count})</span>
                        <span class="name-aya">${text.data.name} </span>
                        `;
              currentAya = count;
            }

            makeAudio.addEventListener("ended", () => {
              ayaIndex++;
              if (ayaIndex < audio.length) {
                changeSurah(ayaIndex);
                changeCounter(ayaIndex + 1);
              }
              myIndx = ayaIndex;
            });
            isPlay = true;
            checkIcon();
            playBtn.onclick = function () {
              tooglePlay();
            };

            next.onclick = function () {
              checkIcon();
              if (ayaIndex < audio.length - 1) {
                ayaIndex++;
                changeSurah(ayaIndex);
                changeCounter(ayaIndex + 1);

                myIndx = ayaIndex;
              }
            };

            prev.onclick = function () {
              checkIcon();
              if (ayaIndex != 0) {
                ayaIndex--;
                myIndx = ayaIndex;

                changeSurah(ayaIndex);
                changeCounter(ayaIndex + 1);
              }
            };
          });
      };
      function nextAya() {
        getIndx++;
        if (getIndx != 115) {
          optionsSura[getIndx - 1].selected = "selected";
          optionsNumber[0].selected = "selected";
          suraId = changeAudio.options[changeAudio.selectedIndex].id;
          ayaCount = text.data[suraId - 1].numberOfAyahs;
          genLoop(ayaCount);
          setTimeout(() => {
            generateBtn.click();
          }, 100);
        } else {
          optionsSura[0].selected = "selected";
          optionsNumber[0].selected = "selected";
          suraId = changeAudio.options[changeAudio.selectedIndex].id;
          ayaCount = text.data[suraId - 1].numberOfAyahs;
          genLoop(ayaCount);
          setTimeout(() => {
            generateBtn.click();
          }, 100);
        }
      }
      next.addEventListener("click", () => {
        if (checkIndex == ayaCount) {
          nextAya();
        }
      });
      makeAudio.addEventListener("ended", () => {
        if (checkIndex == ayaCount) {
          nextAya();
        }
      });

      function prevAya() {
        getIndx--;
        if (getIndx != 0) {
          optionsSura[getIndx - 1].selected = "selected";
          suraId = changeAudio.options[changeAudio.selectedIndex].id;
          ayaCount = text.data[suraId - 1].numberOfAyahs;
          genLoop(ayaCount);
          setTimeout(() => {
            optionsNumber[optionsNumber.length - 1].selected = "selected";
            generateBtn.click();
          }, 100);
        } else {
          optionsSura[optionsSura.length - 1].selected = "selected";
          suraId = changeAudio.options[changeAudio.selectedIndex].id;
          ayaCount = text.data[suraId - 1].numberOfAyahs;
          genLoop(ayaCount);
          setTimeout(() => {
            optionsNumber[optionsNumber.length - 1].selected = "selected";
            generateBtn.click();
          }, 100);
        }
      }
      prev.addEventListener("click", () => {
        if (checkIndex == 1) {
          prevAya();
        }
      });

      mainSelect.addEventListener("input", () => {
        shikhName = mainSelect.value;
        selectShikName = mainSelect.options[mainSelect.selectedIndex].text;
        // add shikh name to local storage
        let readSound = {
          name: selectShikName,
          value: shikhName,
        };
        localStorage.setItem("quran-sound", JSON.stringify(readSound));
        // console.log(mainSelect.options[mainSelect.selectedIndex].value);

        fetch(`https://api.alquran.cloud/v1/surah/${secIndx}/ar.${shikhName}`)
          .then((response) => response.json())
          .then((data) => {
            aya = [];
            audio = [];
            let verses = data.data.ayahs;
            function changeCounter(count) {
              ayaName.innerHTML = `
              <span class="number-aya">(${data.data.numberOfAyahs}/${count})</span>
              <span class="name-aya">${data.data.name} </span>
              `;
            }

            verses.forEach((vers) => {
              aya.push(vers.text);
              audio.push(vers.audio);
            });

            changeCounter(myIndx + 1);
            changeSurah(myIndx);
            // isPlay = true;
            function changeSurah(indx) {
              makeAudio.src = audio[indx];
              ayaText.innerHTML = `${aya[indx]}`;
              isPlay = true;
              tooglePlay();
            }
          });
      });
    });
}
// start hadith section

let hadithArray = [];
hadithSelect.forEach((hadith) => {
  hadith.addEventListener("click", (e) => {
    hadithAnimation.classList.add("active");
    setTimeout(() => {
      hadithBtn.classList.remove("active");
    }, 0);
    let shikName = e.currentTarget.getAttribute("data-name");
    fetch(`https://alquranbd.com/api/hadith/${shikName}/3`)
      .then((hadith) => hadith.json())
      .then((hadText) => {
        hadithDetails.classList.add("active");
        hadithAnimation.classList.remove("active");
        // backgroundEffect.classList.add("active");
        showEffect();
        hadithDetails.scrollTo({
          top: 0,
        });

        hadithArray.splice(0, hadithArray.length);
        hadText.forEach((text) => {
          if (hadithArray.indexOf(text.hadithArabic) == -1) {
            if (text.hadithArabic.length !== 0) {
              hadithArray.push(text.hadithArabic);
            }
          }
        });

        let createDiv = "";
        hadithDetails.innerHTML = "";
        let countOfHadith = hadithArray.length;
        let h1Text = document.createElement("h1");
        let closeHadith = document.createElement("i");
        let hTitle = document.createElement("div");
        hTitle.className = "hadith-title";
        closeHadith.classList.add("fa-xmark", "fa-solid");
        closeHadith.addEventListener("click", () => {
          hadithDetails.classList.remove("active");
          removeEffect();
          // backgroundEffect.classList.remove("active");
        });
        h1Text.innerHTML = `عدد الاحاديث : ${countOfHadith}`;
        hTitle.appendChild(closeHadith);
        hTitle.appendChild(h1Text);
        // hadithDetails.appendChild(closeHadith);
        hadithDetails.appendChild(hTitle);
        let hadithMainDiv = document.createElement("div");
        hadithMainDiv.className = "hadith-container";

        hadithArray.forEach((single) => {
          createDiv = document.createElement("p");
          createDiv.innerHTML = single;
          hadithMainDiv.appendChild(createDiv);
        });
        hadithDetails.appendChild(hadithMainDiv);
      });
  });
});

// start setting section
settingBtn.addEventListener("click", () => {
  settingDiv.classList.toggle("active");
  backgroundEffect.classList.toggle("active");
});

// add volume value to loacl storage
let volm;
volumeInput.addEventListener("change", () => {
  volm = volumeInput.value / 100;
  makeAudio.volume = volumeInput.value / 100;
  localStorage.setItem("sound-volume", volm);
});
if (localStorage.getItem("sound-volume")) {
  let localItem = localStorage.getItem("sound-volume");
  makeAudio.volume = localItem;
  volumeInput.value = localItem * 100;
} else {
  makeAudio.volume = 0.5;
  volumeInput.value = 50;
}

// start azkar section
morningAzkar.addEventListener("click", () => {
  morningAndEvening.classList.add("active");
  showEffect();
  // backgroundEffect.classList.add("active");
  setTimeout(() => {
    azkarBtn.classList.remove("active");
  }, 0);
});
closeAzkar.onclick = function () {
  morningAndEvening.classList.remove("active");
  removeEffect();
  // backgroundEffect.classList.remove("active");
};
let clickAz = true;

let morningCount = 0;
let nightCount = 0;
// counter azkar morning
let counterMorning;
let morningDivCounter;
let allMorningP;
// counter azkar night
let counterNight;
let nightDivCounter;
let allNightP;
// counter tsabih
let counterTsabih;
let tsabihDivCounter;
let allTsabihP;

function morningData() {
  fetch("azkar.json")
    .then((data) => data.json())
    .then((result) => {
      result["az-morning"].forEach((morning) => {
        let content = `
        <div class= "az-main">
              <p class= 'content'>${morning.content}</p>
              <div class="az-counter"><p>${morning.count}</p> / <span>${morningCount}</span></div>
        </div>
        
      `;
        azkarContent.innerHTML += content;
        azkarContent.classList.add("active");
        // test();
        counterMorning = azkarContent.querySelectorAll(".az-counter span");
        morningDivCounter = azkarContent.querySelectorAll(".az-counter");
        allMorningP = azkarContent.querySelectorAll(".az-counter p");
      });
      mGenerateCounter();
    });
}
morningData();

function mGenerateCounter() {
  morningDivCounter.forEach((span, indx) => {
    span.onclick = function () {
      let number = Number(allMorningP[indx].innerText);
      counterMorning[indx].innerText++;

      if (counterMorning[indx].innerText > number) {
        counterMorning[indx].innerText = number;
      } else if (counterMorning[indx].innerText == number) {
        span.classList.add("active");
      }
    };
  });
}
function nightData() {
  fetch("azkar.json")
    .then((data) => data.json())
    .then((result) => {
      result["az-night"].forEach((morning) => {
        let content = `
            <div class= "az-main">
                  <p class= 'content'>${morning.content}</p>
                  <div class="az-counter"><p>${morning.count}</p> / <span>${nightCount}</span></div>
            </div>
    `;
        nightAzkar.innerHTML += content;
        counterNight = nightAzkar.querySelectorAll(".az-counter span");
        nightDivCounter = nightAzkar.querySelectorAll(".az-counter");
        allNightP = nightAzkar.querySelectorAll(".az-counter p");
      });
      nGenerateCounter();
    });
}
nightData();

function nGenerateCounter() {
  nightDivCounter.forEach((span, indx) => {
    span.onclick = function () {
      let number = Number(allNightP[indx].innerText);
      counterNight[indx].innerText++;

      if (counterNight[indx].innerText > number) {
        counterNight[indx].innerText = number;
      } else if (counterNight[indx].innerText == number) {
        span.classList.add("active");
      }
    };
  });
}
allAz.forEach((p) => {
  p.addEventListener("click", () => {
    allAz.forEach((p) => p.classList.remove("active"));
    if (p.dataset.az == "morning") {
      azkarContent.classList.add("active");
      nightAzkar.classList.remove("active");
    } else {
      azkarContent.classList.remove("active");
      nightAzkar.classList.add("active");
    }
    p.classList.add("active");
  });
});

adaiaQuranBtn.addEventListener("click", () => {
  adaiaDiv.classList.add("active");
  // backgroundEffect.classList.add("active");
  showEffect();
  setTimeout(() => {
    azkarBtn.classList.remove("active");
  }, 0);
});

clAdaia.addEventListener("click", () => {
  adaiaDiv.classList.remove("active");
  removeEffect();
  // backgroundEffect.classList.remove("active");
});

function adaiaQuran() {
  fetch("azkar.json")
    .then((data) => data.json())
    .then((adaia) => {
      adaia["adaia-quran"].forEach((adaia) => {
        let content = `
          <div>
            <p class="details">${adaia.content}</p>
            <p class="a-name">﴿ ${adaia.reference} ﴾</p>
          </div>
        `;
        adaiaContent.innerHTML += content;
      });
    });
}
adaiaQuran();

// start tsabih section

tsabihBtn.addEventListener("click", () => {
  tsabihDiv.classList.add("active");
  setTimeout(() => {
    azkarBtn.classList.remove("active");
  }, 0);
  showEffect();
});
clTsabih.addEventListener("click", () => {
  tsabihDiv.classList.remove("active");
  removeEffect();
});

function getTsabihData() {
  fetch("azkar.json")
    .then((data) => data.json())
    .then((result) => {
      result["tsabih"].forEach((morning) => {
        let content = `
          <div class= "tsabih-main">
                <p class= 'content'>${morning.content}</p>
                <div class="tsabih-counter"><p>${morning.count}</p> / <span>${nightCount}</span></div>
          </div>
  `;
        tsabihContent.innerHTML += content;
        counterTsabih = tsabihContent.querySelectorAll(".tsabih-counter span");
        tsabihDivCounter = tsabihContent.querySelectorAll(".tsabih-counter");
        allTsabihP = tsabihContent.querySelectorAll(".tsabih-counter p");
      });
      tsGenerateCounter();
    });
}
function tsGenerateCounter() {
  tsabihDivCounter.forEach((span, indx) => {
    span.onclick = function () {
      let number = Number(allTsabihP[indx].innerText);
      counterTsabih[indx].innerText++;

      if (counterTsabih[indx].innerText > number) {
        counterTsabih[indx].innerText = number;
      } else if (counterTsabih[indx].innerText == number) {
        span.classList.add("active");
      }
    };
  });
}
getTsabihData();
