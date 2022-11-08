type TEvent = string;

export class EventBus {
  listeners: { [key: TEvent]: CallableFunction[] };

  constructor() {
    this.listeners = {};
  }

  on(event: TEvent, callback: CallableFunction) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: TEvent, callback: CallableFunction) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback
    );
  }

  emit(event: TEvent, ...args: unknown[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}
