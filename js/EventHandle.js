/**
 * A container of callbacks that can be fired when an event has occured.
 * Subscribe anything that wants to listen to it.
 * When instantiating, please mark the signature of the intended EventHandle in comments.
 * ```javascript
 * // signature: (damageDealt: number) => void
 * onPlayerHurt = new EventHandle();
 * ```
 * Some other object subscribes to it:
 * ```javascript
 * onPlayerHurt.subscribe(myCallback, this);
 *
 * function myCallback(damage) {
 *  console.log('Player lost ' + damage + ' health!');
 * }
 * ```
 * Call the event when it happens and pass the data.
 * Every subscribing callback will receive it.
 * ```javascript
 * onPlayerHurt.send(10);
 * ```
 * Unsubscribe when subscribing object needs to be dereferenced
 * ```javascript
 * onPlayerHurt.unsubscribe(myCallback);
 * ```
 */
function EventHandle() {
  /**
   * The handle that holds all of the callbacks.
   * It is an array of tuples with the pattern: [callback, context]
   * @type {[Function, any][]}
   */
  const _handle = [];

  /**
   * A list of callbacks to be removed if the EventHandle is currently busy sending
   * @type {Function[]}
   */
  const _removeQueue = [];

  /**
   * A list of handles to be added if the EventHandle is currently busy sending
   * @type {[Function, any][]}
   */
  const _addQueue = [];

  /**
   * Status of whether or not EventHandle is being sent via send
   */
  let _isSending = false;

  /**
   * Adds a callback to the event handle.
   * 'Subscribes' to the event to fire the callback function when it happens.
   * Throws an error if callback already exists on the EventHandle.
   * @param {Function} callback The callback function to fire when the event happens
   * @param {any} context (optional) an explicit 'this' binding to call the event by
   * @returns void
   */
  this.subscribe = function(callback, context) {
    // set context to 'null' if none specified
    const callbackToAdd = context ? [callback, context] : [callback, null];

    if (_isSending) { // If EventHandle is busy sending
      _addQueue.push(callbackToAdd); // queue to add after finished
    } else {
      const index = _handle.indexOf(callback);
      if (index === -1) { // If callback is not on this handle
        _handle.push(callbackToAdd); // push directly to handle
      } else {
        throw new Error('Callback already exists on this EventHandle, cancelling subscribe!');
      }
    }
  };
  
  /**
   * Removes a callback from the EventHandle.
   * @param {Function} callback The callback function to unsubscribe. Must be the same reference.
   */
  this.unsubscribe = function(callback) {
    const index = _handle.map(h => h[0]).indexOf(callback);
    if (_isSending) {
      _removeQueue.push(callback)
    } else {
      if (index === -1) {
        throw new Error('Cannot unsubscribe a function that does not exist on this EventHandle!');
      } else {
        _handle.splice(index, 1);
      }
    }
  };

  /**
   * Removes every subscription from this EventHandle
   */
  this.unsubscribeAll = function() {
    if (_isSending) {
      _handle.map(h => h[0]).forEach((callback) => {
        _removeQueue.push(callback);
      });
    } else {
      _handle = [];
    }
  };

  /**
   * Sends the event. The thing just happened, let everyone know!
   * Make sure that the passed parameters match the signature of the EventHandle
   * @param {any[]} params The parameters to send to every callback
   */
  this.send = function(...params) {
    // Send all callbacks
    _isSending = true;
    _sendCallbacks(_handle, ...params);
    _isSending = false;

    // Remove all callbacks queued to be removed during send
    const toRemove = _removeQueue;
    if (toRemove.length > 0) {
      while (toRemove.length > 0) {
        const callback = toRemove.shift();
        this.unsubscribe(callback);
      }
    }

    // Add all callbacks queued to be added during send
    const toAdd = _addQueue;
    if (toAdd.length > 0) {
      while (toAdd.length > 0) {
        const callback = toAdd.shift();
        this.subscribe(callback);
      }
    }
  };

  this.getLength = function() {
    return _handle.length;
  };
  /**
   * Gets the inner handle of the EventHandle for own use.
   * It is an array of tuples: [callbackFn, context][]
   */
  this._getHandle = function() {
    return _handle;
  };

  function _sendCallbacks(handleArray, ...params) {
    handleArray.forEach((tuple) => {
      const callback = tuple[0];
      const context = tuple[1];
      if (context) { // if there is a callack context, call with that context
        callback.call(context, ...params);
      } else {
        callback(...params);
      }
    });
  }
}
