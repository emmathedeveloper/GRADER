

export default class WebBase{

    constructor({
        name,
        version = 1,
        stores = []
     }){
        this.stores = stores

        this.version = version

        this.name = name

        this.tracked = {}

        /**
         * @type {IDBOpenDBRequest}
         */
        this.bridge = indexedDB.open(name , version)

        this.bridge.onupgradeneeded = e => {

            const db = e.target.result

            for (const store of stores) {
                
                db.createObjectStore(store.name , { keyPath: store.key })
            }
        }

    }

    /**
     * @param storename {string} - name of the store to inject the value
     * 
     * @param value {Object} - value to inject
     */
    add(storename , value){

        const connection = indexedDB.open(this.name , this.version)

        connection.onsuccess = e => {
            
            /**
             * @type {IDBDatabase}
             */
            const db = e.target.result

            const handshake = db.transaction([storename] , "readwrite")

            const store = handshake.objectStore(storename)

            store.put(value)

            const request = store.getAll()

            request.onsuccess = e => {
                this.#emit(storename , e.target.result)
            }
        }
    }

    /**
     * @param storename {string} - name of the store to access
     * 
     * @param key {Object} - key of the value to remove
     */
    remove(storename , key){

        const connection = indexedDB.open(this.name , this.version)

        connection.onsuccess = e => {
            
            /**
             * @type {IDBDatabase}
             */
            const db = e.target.result

            const handshake = db.transaction([storename] , "readwrite")

            const store = handshake.objectStore(storename)

            store.delete(key)

            const request = store.getAll()

            request.onsuccess = e => {
                this.#emit(storename , e.target.result)
            }
        }
    }

    /**
     * 
     * @param {string} storename name of the store to retrieve data from
     * @param {CallableFunction} callback function to call when data has been retrieved.The retrieved data is passed to the function
     */
    getAll(storename , callback){

        const connection = indexedDB.open(this.name , this.version)

        connection.onsuccess = e => {
            
            /**
             * @type {IDBDatabase}
             */
            const db = e.target.result

            const handshake = db.transaction([storename] , "readwrite")

            let transaction = handshake.objectStore(storename)

            transaction = transaction.getAll()

            transaction.onsuccess = e => {
                callback(e.target.result)
            }
        }
    }

    /**
     * 
     * @param {string} storename name of the store to retrieve data from
     * @param {string | number} the key of the particular data to retrieve.
     * @param {CallableFunction} callback function to call when data has been retrieved.The retrieved data is passed to the function
     */
    get(storename , key , callback){

        const connection = indexedDB.open(this.name , this.version)

        connection.onsuccess = e => {
            
            /**
             * @type {IDBDatabase}
             */
            const db = e.target.result

            const handshake = db.transaction([storename] , "readwrite")

            let store = handshake.objectStore(storename)

            transaction = store.get(key)

            transaction.onsuccess = e => {
                callback(e.target.result)
            }
        }
    }

    /**
     * 
     * @param {string} storename name of the store to monitor for updates 
     * @param {CallableFunction} callback function to call when update occurs
     */
    trackStore(storename , callback){
        this.tracked[storename] = callback
    }

    #emit(event , data){
        if(!this.tracked[event]) return

        this.tracked[event](data)
    }
}