let antibiotics = {
    'vancomycin': ['MRSA', 'MSSA', 'streptococci'],
    'cefazolin': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella'],
    'cefalexin': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella'],
    'cefepime': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Pseudomonas', 'ESCAPPM', 'Neisseria gonorrhea', 'Neisseria meningitidis'],
    'ceftriaxone': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'ESCAPPM','Neisseria gonorrhea', 'Neisseria meningitidis'],
    'augmentin': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Anaerobes'],
    'unasyn': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Anaerobes'],
    'zosyn': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Pseudomonas', 'Neisseria meningitidis', 'Anaerobes', 'ESCAPPM'],
    'ertapenem': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Neisseria gonorrhea', 'Neisseria meningitidis', 'Anaerobes', 'ESCAPPM'],
    'meropenem': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Pseudomonas', 'Neisseria gonorrhea', 'Neisseria meningitidis', 'Anaerobes', 'ESCAPPM'],
    'ciprofloxacin': ['MSSA', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Pseudomonas', 'Neisseria gonorrhea', 'Neisseria meningitidis', 'ESCAPPM'],
    'levofloxacin': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Pseudomonas', 'Neisseria gonorrhea', 'Neisseria meningitidis', 'Atypicals', 'ESCAPPM'],
    'moxifloxacin': ['MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Neisseria gonorrhea', 'Neisseria meningitidis', 'Anaerobes', 'Atypicals', 'ESCAPPM'],
    'clindamycin': ['MRSA', 'MSSA', 'streptococci', 'Anaerobes'],
    'gentamicin': ['E. coli', 'Proteus mirabilis', 'Klebsiella', 'Pseudomonas', 'ESCAPPM'],
    'azithromycin': ['MSSA', 'streptococci', 'Neisseria meningitidis', 'Atypicals'],
    'doxycycline': ['streptococci', 'E. coli', 'Neisseria meningitidis', 'Atypicals'],
    'bactrim': ['MRSA', 'MSSA', 'streptococci', 'E. coli', 'Proteus mirabilis', 'Klebsiella', 'Neisseria meningitidis', 'ESCAPPM'],
    'metronidazole': ['Anaerobes']
};

let currentAntibiotic = null;
let correctBacteria = new Set();

function newRound() {
    let allAntibiotics = Object.keys(antibiotics);
    currentAntibiotic = allAntibiotics[Math.floor(Math.random() * allAntibiotics.length)];
    correctBacteria = new Set(antibiotics[currentAntibiotic]);
    document.getElementById('question').textContent = `Which bacteria does ${currentAntibiotic} cover?`;
    let btns = document.getElementsByClassName('option-btn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].disabled = false;
        btns[i].className = 'btn btn-primary option-btn';
    }
    document.getElementById('progress-bar').style.width = '0%';
    document.getElementById('progress-bar').className = 'progress-bar'; // Reset color of progress bar
}

function checkAnswer(bacteria) {
    let btn = document.getElementById(bacteria);
    if (correctBacteria.has(bacteria)) {
        btn.className = 'btn correct option-btn';
        btn.disabled = true;
        correctBacteria.delete(bacteria);
        document.getElementById('progress-bar').style.width = `${100 * (1 - correctBacteria.size / antibiotics[currentAntibiotic].length)}%`;
        if (!correctBacteria.size) {
            document.getElementById('progress-bar').className = 'progress-bar bg-success'; // Turn progress bar green
            setTimeout(newRound, 5000);
        }
    } else {
        btn.className = 'btn incorrect option-btn';
    }
}

window.onload = function() {
    let allBacteria = [...new Set([].concat(...Object.values(antibiotics)))];
    for (let bacteria of allBacteria) {
        let btn = document.createElement('button');
        btn.id = bacteria;
        btn.className = 'btn btn-primary option-btn';
        btn.textContent = bacteria;
        btn.onclick = function() { checkAnswer(bacteria); };
        document.getElementById('options').appendChild(btn);
    }
    newRound();
};