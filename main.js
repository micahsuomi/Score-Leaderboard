const form = document.querySelector('.form');
const wrapper = document.querySelector('.players-wrapper');
const firstNameInput = document.querySelector('.first-name__input');
const lastNameInput = document.querySelector('.last-name__input');
const scoreInput = document.querySelector('.score-input');
const addPlayerBtn = document.querySelector('.add-player__btn');
const warning = document.querySelector('.warning');


form.addEventListener('submit', (e) => {
    e.preventDefault();
})

const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() +1;
    let currentYear = date.getFullYear();
    let currentHour = date.getHours();
    let currentMinutes = date.getMinutes();
    let fullDate =`${day}/${month}/${currentYear} ${currentHour}:${currentMinutes}`;


const players = [

    {
        firstName: 'Johanna',
        lastName: 'Lamu',
        date: fullDate,
        score: 70,
        
    },
    {
        firstName: 'Michele',
        lastName: 'Zucca',
        date: fullDate,
        score: 50,
        
    },
    {
        firstName: 'Aurora',
        lastName: 'Zucca',
        date: fullDate,
        score: 65,
        
    },
    {
        firstName: 'Asabeneh',
        lastName: 'Yetayeh',
        date: fullDate,
        score: 85,
        
    }
    
]


const createNode = (e) => {
    return document.createElement(e);
}


const sortPlayersByScore = () => {
    players.sort((a, b) => {
        if(a.score > b.score) return -1;
        if(a.score < b.score) return 1;
        return 0
        
    })
    console.log(players)
}

const addPlayer = () => {
    players.push({
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        date: fullDate,
        score: scoreInput.value

    })
}

 addPlayerBtn.addEventListener('click', validate = () => {
     let pattern1 = /^[A-Zaz]+$/ig
     let pattern2 = /^[0-9]+$/

     //validates inputs
    if (firstNameInput.value.length === 0 || lastNameInput.value.length === 0 || scoreInput.value.length === 0) {
        warning.textContent = 'Please fill all inputs'
    } 
    else if (!firstNameInput.value.match(pattern1) || !lastNameInput.value.match(pattern1)) {
        warning.textContent = 'Please input only letters';
        warning.style.color = 'red';

    } else if (!scoreInput.value.match(pattern2)){ 
        warning.textContent = 'Please input a score only in digits';
        warning.style.color = 'red';

    }  else {
        
        warning.textContent = '';
        addPlayer()
        console.log(players)
        displayPlayers();
    }

   
 

})


const displayPlayers = () => {
    wrapper.textContent = '';
    sortPlayersByScore();
    for(const player of players) {
        let {firstName, lastName, date, score} = player;
        
        let playerContainer = createNode('div');
        playerContainer.setAttribute('class', 'player-container');
        let playerDetails = createNode('div')
        let playerFirstName = createNode('p');
        let playerLastName = createNode('p');
        let playerDate = createNode('p');
        let playerScore = createNode('p');

        let deleteAddScoresContainer = createNode('div');
        let deleteIconBtn = createNode('i');
        let increaseScoreBtn = createNode('button');
        let decreaseScoreBtn = createNode('button');
        playerDetails.setAttribute('class', 'player');
        deleteIconBtn.setAttribute('class', 'fas fa-trash-alt'); 
        playerFirstName.textContent = firstName;
        playerLastName.textContent = lastName;
        playerDate.textContent = date;
        playerScore.textContent = score;
        playerScore.setAttribute('class', 'score');

        increaseScoreBtn.textContent = '+5';
        decreaseScoreBtn.textContent = '-5';
        increaseScoreBtn.setAttribute('class', 'btn-score btn-score-plus');
        decreaseScoreBtn.setAttribute('class', 'btn-score btn-score-minus');
        deleteAddScoresContainer.setAttribute('class', 'delete-add-remove');

        playerDetails.append(playerFirstName, playerLastName, playerDate);
        deleteAddScoresContainer.append(deleteIconBtn, increaseScoreBtn, decreaseScoreBtn);
        playerContainer.append(playerDetails, playerScore, deleteAddScoresContainer);
        wrapper.append(playerContainer);

        increaseScoreBtn.addEventListener('click', () => addScore(player));
        decreaseScoreBtn.addEventListener('click', () => decreaseScore(player));
        deleteIconBtn.addEventListener('click', () => removePlayer(player)); 
        

    }
  


}

const removePlayer = (player) => {
   console.log(player)
   const index = players.indexOf(player);
   console.log(index)
    if (index !== -1) {
        players.splice(index, 1);

    }   
    displayPlayers()
    
}

const addScore = (player) => {
    const index = players.indexOf(player);
    if (index !== -1) {
        players[index].score += 5;

    }
    displayPlayers();
 
}

const decreaseScore = (player) => {
    const index = players.indexOf(player);
    if (index !== -1) {
        players[index].score -= 5;

    }
    displayPlayers();
 
}


displayPlayers(players);


