// Demonstartes the creating modules and exporting them

export function Greeter(lang) {
  this.language = lang;

  this.greet = function () {
    switch (this.language) {
      case 'en': return 'Hello!';
      case 'fr': return 'Bonjour!';
      case 'it': return 'Ciao!';
      default: return 'Don\'t speak that language';
    }
  }
}

function print(content) {
  return `${content}`
}

// exports.createGreeter = function (lang) {
//   return new Greeter(lang);
// }
// CommonJS modules
// module.exports = Greeter;

// export default Greeter;

// module.exports = {
//   print
// }