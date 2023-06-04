export default class EventBus {
  listeners: { [index: string]: any };

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: (args: any) => void) {
    if (event === "validate") {
      console.log(this.listeners);
    }
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  off(event: string, callback: (args: any) => void) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener: () => Record<string, unknown>) => listener !== callback
    );
  }

  emit(event: string, ...args: any[]) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event].forEach((listener: any) => {
      listener(...args);
    });
  }
}
