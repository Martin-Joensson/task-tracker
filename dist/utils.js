export const procentTracker = (num1, num2) => {
    if (num1 && num2) {
        return ((num1 / num2) * 100).toFixed(2);
    }
    if (!num1 || !num2) {
        return 0;
    }
};
export const capitalize = (text) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
};
export function validateTaskName(name) {
    if (name === "") {
        return "Task name is required.";
    }
    if (name.length < 3) {
        return "Task name needs to be larger than 3 characters.";
    }
    if (name.length > 40) {
        return "Task can't be longer than 40 characters";
    }
    return "";
}
//# sourceMappingURL=utils.js.map