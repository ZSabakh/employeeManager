//Working with specific data and need this.

exports.translitSpecial = (word) => {
  word = word.replace(/S/g, "შ");
  word = word.replace(/Z/g, "ძ");
  word = word.replace(/W/g, "წ");
  word = word.replace(/T/g, "თ");
  word = word.replace(/c/g, "ც");
  return word;
};
exports.translitSpecial2 = (word) => {
  word = word.replace(/ჭ/g, "W");
  word = word.replace(/შ/g, "S");
  word = word.replace(/ძ/g, "Z");
  word = word.replace(/თ/g, "t");
  word = word.replace(/ც/g, "c");
  return word;
};
exports.translitSpecial3 = (word) => {
  word = word.replace(/kh/g, "ხ");
  word = word.replace(/sh/g, "შ");
  word = word.replace(/ch'/g, "ჭ");
  word = word.replace(/ch/g, "ჭ");
  word = word.replace(/c/g, "ც");
  word = word.replace(/t/g, "თ");
  word = word.replace(/T/g, "ტ");
  word = word.replace(/q/g, "ქ");
  word = word.replace(/gh/g, "ღ");
  return word;
};
