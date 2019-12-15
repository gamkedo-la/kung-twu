/**
 * Safe wrappers for localStorage methods.
 */
function LocalStorageHelper() {

	/**@type {boolean} */
	let isAllowed = true;
	// Typeless values
  
	/**
	 * A safe wrapper around the localStorage.getItem() function. According to the MDN documentation:
	 * `The getItem() method of the Storage interface, when passed a key name, will return that key's value or null if the key does not exist.`
	 * @param {string} keyName A DOMString containing the name of the key you want to retrieve the value of.
	 * @return {string} A DOMString containing the value of the key. If the key does not exist, null is returned.
	 */
	this.getItem = function(keyName) {
		if(isAllowed) {
			try {
				let value = window.localStorage.getItem(keyName);
				if((value === undefined) || (value === null) || (value === "undefined")) {
					value = valueForKeyName(keyName);
					this.setItem(keyName, value);
				}

				return value;
			}
			catch(e) {
				isAllowed = false;
				return this.getItem(keyName);
			}	
		} else {
			return valueForKeyName(keyName); 
		}
	};
  
	/**
	 * A safe wrapper around the Storage.setItem() function. According to the MDN documentation:
	 * `The setItem() method of the Storage interface, when passed a key name and value, will add that key to the storage, or update that key's value if it already exists.`
	 * @param {string} keyName A DOMString containing the name of the key you want to create/update.
	 * @param {string} keyValue A DOMString containing the value you want to give the key you are creating/updating.
	 */
	this.setItem = function(keyName, keyValue) {
		if(isAllowed) {
			try {
				let valueToStore = keyValue
				if(typeof valueToStore !== "string") {
					valueToStore = JSON.stringify(keyValue);
				}

				window.localStorage.setItem(keyName, valueToStore);
				setValueForKeyName(keyName, keyValue);
			}
			catch(e) {
				isAllowed = false;
				this.setItem(keyName, keyValue);
			}
		} else {
			setValueForKeyName(keyName, keyValue);
		}
	};

	/**
	 * A safe wrapper around the Storage.removeItem() function. According to the MDN documentation:
	 * `The removeItem() method of the Storage interface, when passed a key name, will remove that key from the given Storage object if it exists. If there is no item associated with the given key, this method will do nothing.`
	 * @param {string} keyName A DOMString containing the name of the key you want to create/update.
	 */
	this.removeItem = function(keyName) {
		try {
			return window.localStorage.removeItem(keyName);
		}
		catch(e) {
			return null;
		}
	};

	this.resetDefaults = function() {
		const keyNames = Object.keys();
		for(let keyName of keyNames) {
			this.setItem(keyName, valueForKeyName(keyName));
		}
	};
  
	// Boolean values
  
	/**
	 * Retrieves a Boolean value from localStorage.
	 * @param {string} keyName A DOMString containing the name of the key you want to retrieve the value of.
	 * @return {boolean}
	 */
	this.getBoolean = function(keyName) {
		if(isAllowed) {
			let storedValue = this.getItem(keyName);
			if(storedValue === null) {return storedValue;}
			return storedValue === "true";	
		} else {
			return valueForKeyName(keyName);
		}
	};
  
	this.setBoolean = this.setItem;
  
	// Integer values
  
	/**
	 * Retrieves an integer value from localStorage.
	 * @param {string} keyName A DOMString containing the name of the key you want to retrieve the value of.
	 * @return {number}
	 */
	this.getInt = function(keyName) {
		if(isAllowed) {
			let storedValue = this.getItem(keyName);
			if(storedValue === null) {return storedValue;}
			return parseInt(storedValue);	
		} else {
			return valueForKeyName(keyName);
		}
	};
  
	this.setInt = this.setItem;
  
	// Float values
  
	/**
	 * Retrieves a floating point number from localStorage.
	 * @param {string} keyName A DOMString containing the name of the key you want to retrieve the value of.
	 * @return {number}
	 */
	this.getFloat = function(keyName) {
		if(isAllowed) {
			let storedValue = this.getItem(keyName);
			if(storedValue === null) {return storedValue;}
			return parseFloat(storedValue);	
		} else {
			return valueForKeyName(keyName);
		}
	};
  
	this.setFloat = this.setItem;
  
	// Object values
  
	/**
	 * Retrieves a JavaScript object from localStorage.
	 * @param {string} keyName A DOMString containing the name of the key you want to retrieve the value of.
	 * @return {Object}
	 */
	this.getObject = function(keyName) {
		if(isAllowed) {
			let storedValue = this.getItem(keyName);
			if (typeof storedValue !== "string") {
				return null;
			}
			return JSON.parse(storedValue);	
		} else {
			return valueForKeyName(keyName);
		}
	};
  
	/**
	 * Retrieves a Boolean value from localStorage.
	 * @param {string} keyName A DOMString containing the name of the key you want to create/update.
	 * @param {Object} keyValue A JavaScript object containing the value you want to give the key you are creating/updating.
	 */
	this.setObject = function(keyName, keyValue) {
		if(isAllowed) {
			this.setItem(keyName, keyValue);
		} else {
			setValueForKeyName(keyName, keyValue);
		}
	};
}