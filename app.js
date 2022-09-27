
const card = document.querySelector('.card');
const adviceText = document.querySelector('.advice-text');
const adviceNum = document.querySelector('.advice-number');
const button = document.querySelector('.btn-round');


async function getAdvice() {
    const API_URL = "https://api.adviceslip.com/advice";
    
    try {
        // Making an API call (request) and getting the response back
        const response = await fetch(API_URL);
        // Parsing the response to JSON format before return
        return response.json();
    } catch (error) {
        card.removeChild(adviceText);
        card.removeChild(adviceNum);
        card.classList.remove('card-advice');
        // for user
        const paragraph = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = 'Something went wrong!';
        paragraph.textContent = "Can't generate a new piece of advice...";
        paragraph.appendChild(strong);
        card.appendChild(paragraph);
        card.insertBefore(paragraph, card.firstChild);
        
        // for dev
        console.log(error);
    }
}

async function renderAdvice() {
    const data = await getAdvice();

    const id = data.slip.id;
    const advice = data.slip.advice;
    // let { id, advice } = data.slip;

    adviceText.textContent = advice;
    adviceNum.textContent = 'Advice #' + id;
}

// generate & render first piece of advice
renderAdvice();

// generate & render new piece of advice on button click
button.addEventListener('click', renderAdvice);
