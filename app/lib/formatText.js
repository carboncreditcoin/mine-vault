export const formatText = (text) => {
    if (!text) {
        return "";
    }

    const camelCaseRegex = /([a-z])([A-Z])/g;
    const spacedText = text.replace(camelCaseRegex, "$1 $2");

    const otherCamelCaseRegex = /([A-Z]+)([A-Z][a-z])/g;
    const spacedText2 = spacedText.replace(otherCamelCaseRegex, "$1 $2");

    const words = spacedText2.split(/\s+/);
    const capitalizedWords = words.map(word => {
        if (word.length === 0) return "";
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return capitalizedWords.join(" ");
};
