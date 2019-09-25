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
   * The handle that holds all of the callback data
   * @type {{callback: Function, context: any, isOnce: boolean}[]}
   */
  const _handle = [];

  /**
   * A list of callbacks to be removed if the EventHandle is currently busy sending
   * @type {Function[]}
   */
  const _removeQueue = [];

  /**
   * A list of handles to be added if the EventHandle is currently busy sending
   * @type {{callback: Function, context: any, isOnce: boolean}[]}
   */
  const _addQueue = [];

  /**
   * Status of whether or not EventHandle is busy sending
   */
  let _isSending = false;

  /**
   * Checks if the EventHandle contains the callback
   * @param callbackFn The callback function to check
   */
  this.has = function(callbackFn) {
    const index = _handle.map(h => h.callback).indexOf(callbackFn);
    return index >= 0;
  }

  /**
   * Subscribes a callback to the event to fire it when it occurs.
   * It is best to pass a function reference instead of an anonymous one to keep track of it.
   * Will modify callback data if it already exists in case user wants to change 'isOnce' or 'context'
   * @param {Function} callback The callback function to fire when the event happens
   * @param {boolean} isOnce (default: false) Will set callback to auto-unsubscribe itself 
   * @param {any} context (optional) an explicit 'this' binding to call the event by
   * after event is called one time.
   */
  this.subscribe = function(callbackFn, isOnce = false, context = null) {
    const callbackToAdd = {
      callback: callbackFn,
      context: context,
      isOnce: isOnce
    };

    if (_isSending) { 
    // If EventHandle is busy sending
      // queue to add subscription after it's finished sending
      _addQueue.push(callbackToAdd); 
    } else {
    // EventHandle is free to receive subscriptions
      const index = _handle.map(h => h.callback).indexOf(callbackFn);
      if (index === -1) { 
      // If callback is NOT on this handle
        // add it to the handle
        _handle.push(callbackToAdd);
      } else {
      // If callback IS on this handle
        // modify callback data in case user wants to change 'isOnce' or 'context'
        const existing = _handle[index]; 
        existing.context = callbackToAdd.context;
        existing.isOnce = callbackToAdd.isOnce;
      }
    }
  };

  /**
   * Helper to subscribe callback to the handle to receive a callback once and be automatically unsubscribed thereafter.
   * @param {Function} callback The callback function to fire when the event happens
   * @param {any} context (optional) an explicit 'this' binding to call the event by
   */
  this.once = function(callback, context) {
    this.subscribe(callback, true, context);
  }
  
  /**
   * Removes a callback from the EventHandle.
   * @param {Function} callback The callback function to unsubscribe. Must be the same reference.
   */
  this.unsubscribe = function(callback) {
    const index = _handle.map(h => h.callback).indexOf(callback);
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
      _handle.map(h => h.callback).forEach((callback) => {
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
    _sendCallbacks(this, _handle, ...params);
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
   */
  this._getHandle = function() {
    return _handle;
  };

  /**
   * 
   * @param _this The 'this' context
   * @param {{callback: Function, context: any, isOnce: boolean}[]} handleArray 
   * @param  {...any} params 
   */
  function _sendCallbacks(_this, handleArray, ...params) {
    handleArray.forEach((callbackData) => {
      const callback = callbackData.callback;
      const context = callbackData.context;
      const isOnce = callbackData.isOnce;
      if (context) { // if there is a callack context, call with that context
        callback.call(context, ...params);
      } else {
        callback(...params);
      }
      if (isOnce) {
        _this.unsubscribe(callback);
      }
    });
  }
}
