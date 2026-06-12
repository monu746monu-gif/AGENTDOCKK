export function getLineCount(text: string) {
    if (!text) return 0;
    return text.split("\n").length;
  }
  
  export function getCharacterCount(text: string) {
    return text.length;
  }
  
  export function formatNumber(value: number) {
    return new Intl.NumberFormat("en").format(value);
  }