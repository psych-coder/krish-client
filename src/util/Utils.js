
export function getHashTags(inputText) {  
    var regex = /(?:#)([a-zA-Z\d\_]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
        matches.push(match[1]);
    }

    return matches;
}