const runs = [8, 12, 6, 20, 10];
const weeklyGoal = 50;
const header = (text) => {
    let output = [];
    let spaceOutput = [];
    let size = text.length * 2;
    let space = text.length / 2;
    if (text.length % 2 === 0) {
        for (let i = 0; i < size; i++) {
            output.push("=");
        }
    }
    else {
        for (let i = 0; i <= size; i++) {
            output.push("=");
        }
    }
    for (let i = 0; i < space; i++) {
        spaceOutput.push(" ");
    }
    console.log(`${output.join("")}
${spaceOutput.join("")}${text}
${output.join("")}`);
};
const displayList = (items) => {
    for (let i = 0; i < items.length; i++) {
        console.log(items[i]);
    }
};
const runList = () => {
    for (let i = 0; i < runs.length; i++) {
        console.log(`Run ${i + 1}: ${runs[i]} km`);
    }
};
const runCounter = () => {
    return runs.length;
};
const totalDistance = () => {
    return runs.reduce((x, y) => x + y, 0);
};
const longestRun = () => {
    if (runs.length === 0)
        return 0;
    let longest = runs[0];
    for (const run of runs) {
        if (run > longest) {
            longest = run;
        }
    }
    return longest;
};
const shortestRun = () => {
    let shortest = runs[0] ?? 0;
    for (const run of runs) {
        if (run < shortest) {
            shortest = run;
        }
    }
    return shortest;
};
const averageRun = () => {
    return totalDistance() / runs.length;
};
const compareGoal = () => {
    const total = totalDistance();
    if (weeklyGoal > total) {
        return "Goal not reached";
    }
    else {
        return "Great job! Goal reached.";
    }
};
const classifyRuns = () => {
    return runs.map((run) => {
        if (run < 10) {
            return `${run} km - Easy run`;
        }
        else if (run < 15) {
            return `${run} km - Medium run`;
        }
        else {
            return `${run} km - Hard run`;
        }
    });
};
header("Runs");
runList();
displayList(classifyRuns());
console.log(`Antal löppass: ${runCounter()} st`);
console.log(`Longest run: ${longestRun()} km`);
console.log(`Shortest run: ${shortestRun()} km`);
console.log(`Average run: ${averageRun()} km`);
console.log(`Total distance: ${totalDistance()} km`);
console.log(compareGoal());
export {};
//# sourceMappingURL=marathon.js.map