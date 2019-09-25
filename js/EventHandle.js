
/**
 * A container of callbacks that can be fired when an event has occured.
 * Subscribe anything that wants to listen to this event.
 * Please mark the signature of the EventHandle in comments.
 */
function EventHandle() {
  /**
   * An array of tuples with the pattern: [callback, context]
   * Managed by the EventHandle itself, and not to be referenced directly.
   */
  this._handle = [];

  /**
   * Adds a callback to the event handle.
   * 'Subscribes' to the event to fire the callback function when it happens.
   * Throws an error if callback already exists on the EventHandle.
   * @param callback The callback function to fire when the event happens
   * @param context (optional) an explicit 'this' binding to call the event by
   * @returns void
   */
  this.subscribe = function(callback, context) {
    const index = this._handle.indexOf(callback);
    if (index === -1) { // If callback is not on this handle, push it onto the handle.
      if (context) {
        this._handle.push([callback, context]);
      } else {
        this._handle.push([callback, null]); // set 'null' if no context specified
      }
    } else {
      throw new Error('Callback already exists on this EventHandle, cancelling subscribe!');
    }
  };
  

  /**
   * Removes a callback from the EventHandle.
   * @param callback The callback function to unsubscribe. Must be the same reference.
   */
  this.unsubscribe = function(callback) {
    const index = this._handle.map(h => h[0]).indexOf(callback);
    if (index === -1) {
      throw new Error('Cannot unsubscribe a function that does not exist on this Delegate handle!');
    } else {
      this._handle.splice(index, 1);
    }
  };

  /**
   * Sends the event. The thing just happened, let everyone know!
   * Make sure that the passed parameters match the signature of the EventHandle
   * @param params The parameters to send to every callback
   */
  this.send = function(...params) {
    this._handle.forEach((tuple) => {
      const callback = tuple[0];
      const context = tuple[1];
      if (context) {
        callback.call(context, ...params);
      } else {
        callback(...params);
      }
    });
  };

  /**
   * Removes every subscription from this EventHandle
   */
  this.unsubscribeAll = function() {
    this._handle = [];
  };
}