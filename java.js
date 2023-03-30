const score = document.querySelector('.score');
const bases = document.querySelectorAll('.base');
const frogs = document.querySelectorAll('.frog');

let result = 0;
let laatstePositie;
let tijdOver = false;

// Function om te kiezen op welk blad een frog tevoorschijn komt
function randomBase(bases) {
    const base = bases[Math.floor(Math.random() * bases.length)];
    
    if (base == laatstePositie) { // Als de nieuwe base zelfde is als de vorige,
        return randomBase(bases); // dan zoek een nieuwe base
    }
    laatstePositie = base;        // Update de laatste positie
    return base;
}

// Function die een willekeurige tijd geeft tussen een minimum en maximum
function randomTime(min, max) {
    return Math.round(Math.random()*(max - min) + min);
}

// Function die bepaalt voor hoe lang de nieuwe frog tevoorschijn komt
function tijdOmhoog() {
    const base = randomBase(bases)       // Zoek nieuwe locatie voor frog
    const time = randomTime(1100, 1500); // Frog blijft tussen 1.1 en 1.5 sec omhoog
    base.classList.add('kikker');
    setTimeout(() => {                  // Nadat time voorbij is (randomTime)
        base.classList.remove('kikker');    // Gaat de frog omlaag
        if(!tijdOver) {                 // Als het spel nog bezig is,
            tijdOmhoog();               // Herhaalt deze functie zichzelf
        }
    }, time);
}

//  Zodra de start button wordt geklikt moet het spel starten
function startSpel() {
    score.textContent = 'Score: 0';          // De scoreboard wordt gereset
    tijdOver = false;                        // De tijd is nog niet voorbij
    result = 0;                              // Player score wordt gereset
    tijdOmhoog();                            // Begin met eerste frog
    setTimeout(() => tijdOver = true, 10000) // Dit is hoe lang het spel gaat duren (10 sec)
}

// Als de frog wordt geklikt krijgt de speler een punt en wordt de frog weggehaald
function puntenKrijgen() {
    result++;
    this.parentNode.classList.remove('kikker');
    score.textContent = 'Score: ' + result;
}

// Elke frog krijgt een event listener, om aan te geven wanneer erop wordt geklikt
frogs.forEach(frog => frog.addEventListener('click', puntenKrijgen));