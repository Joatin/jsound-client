

declare namespace Chai {
  export interface Assertion {
    eventually: Assertion,
    notify: Notify
  }
  export interface Notify {
    (callback: any): Assertion;
  }
}
