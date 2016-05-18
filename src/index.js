// @flow

/**
 * Formats personalized greetings.
 */
class Greeter {
  /*:: name: string;*/

  /**
   * @param  {string} name
   */
  constructor(name/*: string*/ = 'World') {
    this.name = name;
  }

  /**
   * Formats a personalized greeting for a particular individual.
   * @return {string} The formatted greeting
   */
  greet()/*: string*/ {
    return `Hello, ${this.name}!`;
  }
}

export { Greeter };
