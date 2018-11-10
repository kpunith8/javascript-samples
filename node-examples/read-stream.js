const { Readable } = require('stream');

const intStream = new Readable({
  read(size) {
    // delay this by 100ms to stream.
    setTimeout(() => {
      this.push(String.fromCharCode(this.currentCharCode++));

      if (this.currentCharCode > 90) { // char code for Z
        this.push(null);
        return;
      }
    }, 100);

  }
});

intStream.currentCharCode = 65; // Start from char A

//intStream.push('ABSSKSKSKS');
// signals the input stream to end
//intStream.push(null);

intStream.pipe(process.stdout);