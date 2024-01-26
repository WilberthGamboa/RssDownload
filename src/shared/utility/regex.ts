export default class Regex {
    constructor(
        private regexSpecialCharacters = /[a-zA-Z\d]/g,
        private regexSrc = /<img.*?src=["'](.*?)["']/
    ){

    }
    removeSpecialCharacters(text:string): string {
        const parsedText = text.match(this.regexSpecialCharacters);
        const filteredText = parsedText ? parsedText.join('') : '';
        return filteredText;
    }

    filterSrc(text:string):string | undefined {
        const match = text.match(this.regexSrc)
        if (match) return match[1];
    }

}