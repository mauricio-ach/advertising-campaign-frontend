const getPeopleRange = (budget) => {
    if (budget == 0) {
        return "0";
    } else if (budget <= 1000) {
        return "1k - 2k";
    } else if (budget <= 5000) {
        return "2k - 3k";
    } else if (budget <= 10000) {
        return "3k - 5k";
    } else if (budget > 10000) {
        return "5k - 10k";
    } else {
        return "10k+"
    }
}

const getInteractionRange = (budget) => {
    if (budget == 0) {
        return "0";
    } else if (budget <= 1000) {
        return "1k - 2k";
    } else if (budget <= 5000) {
        return "2k - 3k";
    } else if (budget <= 10000) {
        return "3k - 5k";
    } else if (budget > 10000) {
        return "5k - 10k";
    } else {
        return "10k+"
    }
}

export {
    getPeopleRange,
    getInteractionRange,
}