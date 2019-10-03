const EVENT = {
	EnemySpawn:"lastEnemySpawn",
	LevelStart:"levelStart"
};

/**
 * @class Chronogram
 * @description Manages time 'events' in ms.
 * Each 'event' can be thought of as a stopwatch that can be checked or reset at any time. 
 * Core features:
 * - registerEvent(eventName) - Registers an event with Chronogram for time tracking
 * - updateEvent(eventName) - Once an event is registered, this resets the event's time counter to 0 ms
 * - timeSinceUpdateForEvent(eventName) Returns the time passed (in ms) since updateLast 
 *  or since registerEvent if updateLast has not yet been called.
 */
function Chronogram() {
	/**
	 * Internally tracks the time of the last update
	 */
	let lastUpdate = Date.now();

	/**
	 * Object that internally stores events registered to the Chronogram
	 */
	const events = {};
	
	/**
	 * Gets the current number of milliseconds since January 1, 1970 00:00:00 UTC
	 */
	this.getCurrentTime = function() {
		return Date.now();
	};
	
	this.update = function() {
		const previousLastUpdate = lastUpdate;
		lastUpdate = Date.now();
		return (lastUpdate - previousLastUpdate);
	};
	
	this.timeSinceUpdate = function() {
		let now = Date.now();
		return (now - lastUpdate);
	};

	/**
	 * Registers an event to track time with the Chronogram.
	 * Once and event is registered:
	 *  - Use updateEvent(eventName) to reset the timer's counter to 0
	 *  - Use timeSinceUpdateForEvent(eventName) to inquire the number of ms 
	 *  since last updateEvent or since registered if updateEvent has not been called yet
	 * @param {string} eventName The key of the Chronogram event to register 
	 * @returns {number} The current time (number of ms since January 1, 1970 00:00:00 UTC)
	 */
	this.registerEvent = function(eventName) {
		const thisTime = Date.now();
		events[eventName] = {time:thisTime, lastUpdate:thisTime};
		return thisTime;
	};
	
	/**
	 * Resets an event's timer count to 0. Returns the time (ms) since last updated.
	 * @param {string} eventName The key of the Chronogram event to update
	 * @returns {number} The time in milliseconds since lastUpdate or registration if lastUpdate has not yet been called.
	 */
	this.updateEvent = function(eventName) {
		const thisTime = Date.now();
		const deltaTime = thisTime - events[eventName].lastUpdate;
		events[eventName].lastUpdate = thisTime;
		return deltaTime;
	};
	
	/**
	 * Returns the number of milliseconds since lastUpdate or since
	 * registerEvent if lastUpdate has not yet been called.
	 */
	this.timeSinceUpdateForEvent = function(eventName) {
		if(events[eventName] === undefined) {return null;}
		
		return (Date.now() - events[eventName].lastUpdate);
	};

	return this;
}