import fs from 'fs';
import EventEmitter from 'events';

// Synchronous events
export class WithLog extends EventEmitter {
  // Implement execute() method
  execute(taskFunc) {
    console.log('Before executing...');
    this.emit('begin');
    taskFunc();
    this.emit('end');
    console.log('After executing...');
  }
}

// Async event emitters
export class WithTime extends EventEmitter {
  execute(asyncFunc, ...args) {
    console.time('execute');
    asyncFunc(...args, (err, data) => {
      if (err) {
        return this.emit('error', err);
      }

      this.emit('data', data)
      console.timeEnd('execute');
    });
  }
}

const withLog = new WithLog();

withLog.on('begin', () => console.log('About to begin'));
withLog.on('end', () => console.log('Done with exection'));

withLog.execute(() => console.log('*** Executing task ***'));

const withTime = new WithTime();

withTime.execute(fs.readFile, './test.txt');

withTime.on('data', data => {
  console.log('length:', data.length);
});

// withTime.execute(fs.readFile, '');

// error function can be emitted to report the error or make use of default process's uncaugtException as follows
process.once('uncaughtException', err => { // once can be used to avoid process to emit multiple errors on each error
  console.log(err);

  process.exit(1); // cleanup to exit the process once the error is caught
});

// withTime.on('error', console.error); // It can also be used, if process's uncaughtException is not caught

// if the same event is needed and wanted to be executed first, use prependListener('event', callback), to call it first
// To remove a event listener call removeListener('eventName')

