import config from '../config/index.js';

class Logger {
  constructor() {
    this.isDebug = config.app.isDebug;
  }

  log(...args) {
    if (this.isDebug) {
      console.log(...args);
    }
  }

  info(...args) {
    if (this.isDebug) {
      console.info(...args);
    }
  }

  warn(...args) {
    if (this.isDebug) {
      console.warn(...args);
    }
  }

  error(...args) {
    // Error selalu ditampilkan, bahkan di production
    console.error(...args);
  }

  debug(...args) {
    if (this.isDebug) {
      console.debug(...args);
    }
  }
}

export default new Logger();
