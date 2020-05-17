const PITCH_CLASSES = [
    'c',    // 0
    'c#',   // 1
    'd',    // 2
    'd#',   // 3
    'e',    // 4
    'f',    // 5
    'f#',   // 6
    'g',    // 7
    'g#',   // 8
    'a',    // 9
    'a#',   // t
    'b',    // e
]

const TRICHORDAL_ARRAY = [
    ['f#', 'a', 'f'], ['g#', 'e', 'g'], ['c#', 'a#', 'd'], ['b', 'd#', 'c'],  // P
    ['c', 'd#', 'b'], ['d', 'a#', 'c#'], ['g', 'e', 'g#'], ['f', 'a', 'f#'],  // RP
    ['c#', 'a#', 'd'], ['b', 'd#', 'c'], ['f#', 'a', 'f'], ['g#', 'e', 'g'],  // I7P
    ['g', 'e', 'g#'], ['f', 'a', 'f#'], ['c', 'd#', 'b'], ['d', 'a#', 'c#'],  // RI7P
    ['g#', 'e', 'g'], ['f#', 'a', 'f'], ['b', 'd#', 'c'], ['c#', 'a#', 'd'],  // Q
    ['d', 'a#', 'c#'], ['c', 'd#', 'b'], ['f', 'a', 'f#'], ['g', 'e', 'g#'],  // RQ
    ['b', 'd#', 'c'], ['c#', 'a#', 'd'], ['g#', 'e', 'g'], ['f#', 'a', 'f'],  // I7Q
    ['f', 'a', 'f#'], ['g', 'e', 'g#'], ['d', 'a#', 'c#'], ['c', 'd#', 'b'],  // RI7Q
]

let currNote = ''
let currTrichord = []

function randomIntUpTo(max) {
    return Math.floor(Math.random() * Math.floor(max))
}

function randomIntFromRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expireNote(array, note) {
    return array.filter(trichord => !trichord.includes(note) && trichord.length > 0)
}

function buildSequence() {
    const seq = []
    let remainingTrichords = TRICHORDAL_ARRAY.map(x => x)

    while ( remainingTrichords.length ) {
        // Randomly pick trichord
        const randomIndex = randomIntUpTo(remainingTrichords.length)
        console.log('random index', randomIndex, 'remainingTrichords length', remainingTrichords.length)
        currTrichord = remainingTrichords[randomIndex]

        // Play next note in trichord
        currNote = currTrichord[0]
        console.log(remainingTrichords, currNote)
        seq.push(currNote)

        // Remove note from trichord
        currTrichord = currTrichord.filter((note, index) => index !== 0);
        remainingTrichords = expireNote(remainingTrichords, currNote)

        // Add remaining trichord notes back into array
        if (currTrichord.length) remainingTrichords.push(currTrichord)
    }
    console.log(seq)

    return seq.map(note => note.toUpperCase());
}
