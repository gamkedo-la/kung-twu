/**
 * A timer that counts down to zero, and sends notification when that happens.
 * @param {Chronogram} chronogram The game's Chronogram instance. Used in CountDownTimer for counting deltaTime.
 * @param {boolean} isDeltaTimer Whether or not this timer will count in seconds (true) or game frames (false). Default: true
 */
function CountDownTimer(chronogram, isDeltaTimer = true) {
  // Validate parameters
  Debug.isValid(isDeltaTimer, "boolean");
  Debug.isValid(chronogram, Chronogram);

  // ======= Class Properties + Setters/Getters ====== //
  // Reference to game Chronogram instance
  const _chronogram = chronogram;
  let _isDeltaTimer = isDeltaTimer;
  /**
   * Determines time units this CountDownTimer counts by. Is either seconds (true) or game frames (false) depending on value of isDeltaTimer.
   * Default: true.
   * @type boolean
   */
  this.getIsDeltaTimer = function() {
    return _isDeltaTimer;
  }

  let _time = 0;
  /**
   * Gets the remaining time on this timer
   */
  this.getTime = function() {
    return _time;
  }

  let _isActive = false;
  /**
   * Whether or not the timer is actively counting down (can return true even if paused)
   * Once a timer has buzzed isActive is set to false until start is called again.
   */
  this.getActive = function() {
    return _isActive;
  }

  let _isPaused = false;
  /**
   * Set this CountDownTimer's paused status. 
   * If true, prevents this timer from counting down until pause is set back to false 
   * @param {boolean} pause Sets pause to true or false
   */
  this.setPause = function(pause) {
    _isPaused = pause;
  }
  /**
   * Gets this timer's paused status
   */
  this.getPause = function() {
    return _isPaused;
  }

  // =========== Event Handles ============ //
  const _onUpdate = new EventHandle();
  /**
   * Event that fires on every update tick.
   * Callback Signature: (timeLeft: number, deltaTime: number) => void
   */
  this.onUpdate = _onUpdate;

  const _onZero = new EventHandle();
  /**
   * Event that fires when the timer 'goes off'.
   * Callback Signature: (CountDownTimer) => void
   * @type EventHandle
   */
  this.onZero = _onZero;

  // ============ Timer Core Functionality =========== //
  /**
   * Starts the timer with a specified time. Can also be used to set the timer to a specific value mid-countdown
   * @param {number} time The time to countdown. Units are either in seconds (isDeltaTimer === true), or game frames (isDeltaTimer === false)
   */
  this.start = function(time) {
    _time = time;
    _isActive = true;
  }

  /**
   * Add time to the counter (or subtract if negative number).
   * Time unit depend on isDeltaTime: seconds (true), or game frames (false)
   * @param {number} amount The time to add
   */
  this.addTime = function(amount) {
    _time += amount;
  }

  /**
   * Call every frame to keep this timer functioning properly.
   * Or stop calling when timer is no longer needed.
   */
  this.update = function() {
    if (_isActive && !_isPaused) {
      // Timer is active and unpaused
      
      // Convert to seconds
      const _deltaSeconds = _chronogram.timeSinceUpdate() * 0.001;
      // Count down timer
      if (_isDeltaTimer) {
        // Timer is delta timer, count down seconds elapsed
        _time -= _deltaSeconds;
      } else {
        // Timer is a game frame timer, count down one frame
        _time -= 1;
      }

      // Send callbacks
      _onUpdate.send(_time, _deltaSeconds);

      if (_time <= 0) {
        // Timer has reached zero
        _time = 0;
        _isActive = false;
        _onZero.send(this);
      }
    }
  }

  /**
   * Call this when 'destroying' this object and needing to remove all references from within it
   */
  this.finalize = function() {
    _onUpdate.unsubscribeAll();
    _onZero.unsubscribeAll();
    delete _onUpdate;
    delete _onZero;
    _chronogram = null;
  }

   
}