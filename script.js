const cards = document.querySelector(".cards");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;

const brands = [
    { name: "Nike", slogan: "Just Do It" , imageSrc: 'images/Nike.png'},
    { name: "Apple", slogan: "Think Different" , imageSrc: 'images/Apple.png'},
    { name: "Adidas", slogan: "Impossible is Nothing" , imageSrc: 'images/Adidas.png'},
    { name: "McDonalds", slogan: "I'm Lovin' It" , imageSrc: 'images/McDonalds.png'},
    { name: "Coca-Cola", slogan: "Open Happiness" , imageSrc: 'images/Coca-Cola.png'},
    { name: "Microsoft", slogan: "Empowering Us All" , imageSrc: 'images/Microsoft.png'},
    { name: "Amazon", slogan: "Work Hard. Have Fun. Make History." , imageSrc: 'images/Amazon.png'},
    { name: "Starbucks", slogan: "To inspire and nurture the human spirit" , imageSrc: 'images/Starbucks.png'},
    { name: "Netflix", slogan: "See What's Next" , imageSrc: 'images/Netflix.png'},
    { name: "Google", slogan: "Don't be evil" , imageSrc: 'images/Google.png'},
    { name: "Disney", slogan: "The happiest place on earth" , imageSrc: 'images/Disney.png'},
    { name: "Pepsi", slogan: "That's What I Like" , imageSrc: 'images/Pepsi.png'},
    { name: "Samsung", slogan: "Do What You Can't" , imageSrc: 'images/Samsung.png'},
    { name: "Toyota", slogan: "Let's Go Places" , imageSrc: 'images/Toyota.png'},
    { name: "IKEA", slogan: "The Wonderful Everyday" , imageSrc: 'images/IKEA.png'},
    { name: "Spotify", slogan: "Music for Everyone" , imageSrc: 'images/Spotify.png'},
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function adjustFontSize(element) {
    const maxLength = 15; // Change this based on your requirement
    const baseFontSize = 14; // The default font-size you'd want

    if (element.textContent.length > maxLength) {
        const adjustedSize = baseFontSize * (maxLength / element.textContent.length);
        element.style.fontSize = `${adjustedSize}px`;
    } else {
        element.style.fontSize = `${baseFontSize}px`;
    }
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";

    shuffleArray(brands);
    // Double the brands since we have names and slogans
    let doubledBrands = [...brands, ...brands];

    cards.innerHTML = ""; // Clear existing cards

    doubledBrands.forEach((brand, i) => {
        const card = document.createElement("li");
        card.classList.add("card");
        const frontView = document.createElement("div");
        frontView.classList.add("view", "front-view");
        frontView.innerHTML = '<img src="images/que_icon.svg" alt="icon">';

        const backView = document.createElement("div");
        backView.classList.add("view", "back-view");

        const brandText = document.createElement('div');
        brandText.className = "brand-text";
        if (i < brands.length) {
            let brandImage = document.createElement('img');
            brandImage.src = brand.imageSrc;
            brandImage.alt = brand.name;
            backView.appendChild(brandImage);
            brandText.textContent = brand.name;
            adjustFontSize(brandText);
        } else {
            brandText.textContent = brand.slogan;
            adjustFontSize(brandText);
        }
        backView.appendChild(brandText);
        
        // backView.textContent = i < brands.length ? brand.name : brand.slogan;
        // backView.innerHTML = 'class="view back-view"'+ i < brands.length ? `<img src="images/${brand.name}.png" alt="icon">` : brand.slogan;

        card.appendChild(frontView);
        card.appendChild(backView);
        card.addEventListener("click", flipCard);
        cards.appendChild(card);
    });

    function shuffleContents(array) {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          
          // Swap the entire back view content, which may contain text or images
          const temp = array[i].querySelector('.back-view').innerHTML;
          array[i].querySelector('.back-view').innerHTML = array[j].querySelector('.back-view').innerHTML;
          array[j].querySelector('.back-view').innerHTML = temp;
        }
        
        return array;
      }
      
      // Shuffle the list items
      const liList = cards.querySelectorAll("li");
      const shuffledLiList = shuffleContents(liList);
      cards.innerHTML = ""; // Clear existing cards
      
      // Add the shuffled list items back to the ul element
      for (const cardli of shuffledLiList) {
        cards.appendChild(cardli);
      }
      



}

function flipCard({ target: clickedCard }) {
    const backView = clickedCard.closest(".card").querySelector(".back-view");

    if (cardOne !== backView && !disableDeck) {
        backView.parentElement.classList.add("flip");
        if (!cardOne) {
            return cardOne = backView;
        }
        cardTwo = backView;
        disableDeck = true;
        matchCards(cardOne.textContent, cardTwo.textContent);
    }
}

function matchCards(brand1, brand2) {
    const isNameAndSlogan = brands.some(brand => (brand.name === brand1 && brand.slogan === brand2) || (brand.name === brand2 && brand.slogan === brand1));

    if (isNameAndSlogan) {
        matched++;
        if (matched === 16) { // 16 matches for 32 cards
            // TODO: displayVictorySign();, hideVictorySign(); and restart game when user clicks on the victory sign
            // displayVictorySign();
            const victorySign = document.querySelector('.victory-sign');
            victorySign.style.display = 'block';
        }
        cardOne.parentElement.removeEventListener("click", flipCard);
        cardTwo.parentElement.removeEventListener("click", flipCard);
        cardOne = cardTwo = null;
        disableDeck = false;
    } else {
        setTimeout(() => {
            cardOne.parentElement.classList.add("shake");
            cardTwo.parentElement.classList.add("shake");
        }, 400);

        setTimeout(() => {
            cardOne.parentElement.classList.remove("shake", "flip");
            cardTwo.parentElement.classList.remove("shake", "flip");
            cardOne = cardTwo = null;
            disableDeck = false;
        }, 1200);
    }
}

shuffleCard();
