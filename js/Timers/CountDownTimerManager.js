/**
 * 
 * Stretch optimization: temporary timer pooling
 * @param {Chronogram} chronogram 
 * @param {number} numTimers 
 * @param {bool} isDeltaTimerManager Determines the type of time units this CountDownTimerManager will instantiate timers in.
 * True: Counts in seconds. False: Counts in game frames.
 */
function CountDownTimerManager(numTimers, isDeltaTimerManager = true) {
  // Check parameter types
  Debug.isValid(numTimers, "number");
  Debug.isValid(isDeltaTimerManager, "boolean");

  // ====== Private Properties ====== //
  /** @type CountDownTimer[] */
  const _timers = [];
  /** @type CountDownTimer[] */
  const _tempTimers = [];
  /** @type CountDownTimer[] */
  const _toDestroy = [];

  /** @type EventHandle */
  const _onZero = new EventHandle();
  /**
   * Fires when an indexed (not made via fireAndForget) timer goes off.
   * Callback signature: (timerIndex: number) => void
   */
  this.onZero = _onZero;

  (function() {
    console.log("initializing timers: " + numTimers);
    for (let i = numTimers-1; i >= 0; i--) {
      const t = new CountDownTimer(isDeltaTimerManager);
      _timers[i] = t;
      _timers[i].onZero.subscribe((timer) => {
        _onZero.send(i);
      });
    }
  })();

  /**
   * Get a CountDownTimer from the manager (not one created via fireAndForget)
   * @param {number} index
   * @returns {CountDownTimer} CountDownTimer stored at the specified index
   */
  this.get = function(index) {
    if (index < _timers.length && index >= 0) {
      return _timers[index];
    } else {
      throw new Error("CountDownTimer index is out of range!");
    }
  }

  /**
   * Create a timer with callback onZero and onUpdate. Will destroy itself onZero.
   * Returns the CountDownTimer reference in case you want to stop it before it finishes.
   */
  this.fireAndForget = function(time, onZero, onUpdate, isDelta = true) {
    const faft = new CountDownTimer(isDelta);
    if (onZero) {
      faft.onZero.subscribe(onZero);
      faft.onZero.subscribe(() => {_toDestroy.push(faft)});
    }
    if (onUpdate) {
      faft.onUpdate.subscribe(onUpdate);
    }
    _tempTimers.push(faft);
    faft.start(time);

    return faft;
  }

  /**
   * Stop a timer created by fireAndForget... you actually remembered to stop this fireAndForget timer.
   * @param {CountDownTimer} timer The timer to cancel 
   */
  this.cancelFireAndForget = function(timer) {
    _toDestroy.push(timer);
  }

  /**
   * Updates all internal timers
   * @param {number} deltaTime Elapsed ms since last frame. Received from the game's timer chronogram
   */
  this.update = function(deltaTime) {
    // Update tracked timers
    for (let i = 0; i < _timers.length; i++) {
      _timers[i].update(deltaTime);
    }
    // Update fire and forget timers
    for (let i = 0; i < _tempTimers.length; i++) {
      _tempTimers[i].update(deltaTime);
    }
    // Destroy all finished fire and forget timers designated for unreferencing/removal
    while (_toDestroy.length > 0) {
      _destroyTempTimer(_toDestroy.shift());
    }
  }

  function _destroyTempTimer(timer) {
    console.log("Destroying temp timer,", timer);
    const index = _tempTimers.indexOf(timer);
    if (index != -1) {
      _tempTimers.splice(index, 1);
    }
    timer.finalize();
  }
}