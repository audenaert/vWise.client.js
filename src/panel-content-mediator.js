// @flow

/**
 * Encapsulates logic for saving, loading, and displaying panel content.
 */
class PanelContentMediator/*::<T>*/ {
  /*:: id: string;*/
  /*:: title: string;*/
  /*:: description: ?string;*/

  /**
   * @param {string} id
   * @param {string} [title='Untitled']
   * @param {string} [description]
   */
  constructor(id/*: string*/, title/*: ?string*/, description/*: ?string*/) {
    /**
     * A unique identifier representing this content mediator. This identifier will be persisted by
     * saved panel instances for reconstructing future panel instances.
     * @type {string}
     */
    this.id = id;

    /**
     * A short, user-friendly label for this mediator when the user is called upon to disambiguate
     * potentially multiple mediator strategies.
     * @type {string}
     */
    this.title = title || id;

    /**
     * A descriptive user-friendly summary of this mediator.
     * @type {?string}
     */
    this.description = description;
  }

  /**
   * Indicates whether this mediator is capable of handling and rendering the given object.
   * @param  {*} obj
   * @param  {Object} context
   * @return {boolean}
   */
  matches(/*:: obj: any, context: Object*/)/*: boolean*/ {
    return false;
  }

  /**
   * Loads the initial panel data type from an initial data blob
   * @param  {*} obj
   * @param  {Object} context
   * @return {Promise.<T>}
   */
  initPanelData(obj/*: any*//*:: , context: Object*/)/*: Promise<T>*/ {
    return Promise.resolve(obj);
  }

  /**
   * Rehydrates panel state data from a persisted data vehicle
   * @param  {*} dto
   * @return {Promise.<T>}
   */
  unmarshall(dto/*: any*/)/*: Promise<T>*/ {
    return Promise.resolve(dto);
  }

  /**
   * Converts a full panel data object into a simplified data vehicle that can be persisted.
   * @param  {T} obj
   * @return {*}
   */
  marshall(obj/*: T*/)/*: any*/ {
    return obj;
  }

  /**
   * Returns a template that will be rendered in the context of a panel for the purpose of
   * presenting data to the user.
   * @return {string}
   */
  getTemplate()/*: string*/ {
    return '<pre>{{content|json}}</pre>';
  }
}

export { PanelContentMediator };
