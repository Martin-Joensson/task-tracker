const questions = [
    {
        q: "Skiter björnar i skogen?",
        a: true,
    },
    {
        q: "Är det här svårt?",
        a: false,
    },
    {
        q: "Ja eller nej?",
        a: true,
    },
    {
        q: "Eeeeh?",
        a: false,
    },
    {
        q: "Japp!",
        a: true,
    },
];
let answers = [true, false, false, false, true];
console.log(`
    QUIZ SHOW
  ----------------------------  
    `);
let points = 0;
let correctAnswers = [];
for (let i = 0; i < questions.length; i++) {
    if (questions[i].a === answers[i]) {
        points = points + 1;
        correctAnswers.push("Correct");
    }
    else {
        correctAnswers.push("Wrong");
    }
    console.log(`${i + 1}: ${questions[i].q} `);
    console.log(`Ditt svar: ${answers[i]} `);
    console.log(`Rätt svar: ${questions[i].a} `);
    console.log(`${correctAnswers[i]}`);
}
let passed = "Failed...";
if (points >= 3) {
    passed = "Passed!";
}
console.log(`
    
Score: ${points}/5`);
console.log(`${passed}`);
export {};
//# sourceMappingURL=quiz.js.map