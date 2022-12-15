import { notification } from 'antd';
export const INDEXDBNEW = (function () {
    const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;
    return {
        createDb(dbname, collectionName) {
            const request = idb.open(dbname, 2);
            request.onerror = (event) => {
                console.log(event);
            }

            request.onupgradeneeded = (event) => {
                const db = request.result;
                if (!db.objectStoreNames.contains(collectionName)) {
                    db.createObjectStore(collectionName, {
                        keyPath: 'id'
                    })
                }
            }

            request.onsuccess = () => {
                console.log('db opened');
            }
        },
        addInDb(dbname, collectionName, data) {
            const checkDB = idb.open(dbname, 2);
            checkDB.onsuccess = () => {
                const db = checkDB.result;
                const tx = db.transaction(collectionName, 'readwrite');
                const userData = tx.objectStore(collectionName);
                const users = userData.put({
                    id: Math.random(),
                    petType: data.petName,
                    breed: data.breed,
                    fullname: data.fullname,
                    email: data.email,
                    phone: data.phone,
                    age: 10
                });
                users.onsuccess = () => {
                    tx.oncomplete = () => {
                        db.close();
                    }
                    Notify('Added Successfully');
                }
                users.onerror = (event) => {
                    console.log(event);
                    Notify('Error occured');
                }
            }
        },
        getData(dbname, collectionName, sendData) {
            const dbPromise = idb.open(dbname, 2);
            dbPromise.onsuccess = () => {
                const db = dbPromise.result;
                const tx = db.transaction(collectionName, 'readonly');
                const userData = tx.objectStore(collectionName);
                const users = userData.getAll();
                users.onsuccess = (query) => {
                    console.log(query.srcElement.result);
                    sendData(query.srcElement.result);
                }
                users.onerror = (event) => {
                    console.log(event);
                }
                tx.oncomplete = () => {
                    db.close();
                };
            }
        }

    }

})();

export function formValidationHandler(required, form) {
    let result = true;
    let unfilled = [];
    required.forEach((item) => {
        const formItem = form[item] || '';
        console.log(formItem)
        if (formItem.length === 0) {
            result = false;
            unfilled.push(item);
        }
    });
    if (form?.phone?.length !== 10 && form?.phone?.length > 0) {
        Notify('Please give 10 digits phone number');
        unfilled.push('phone');
        result = false;
    }
    if (!ValidateEmail(form?.email) && form?.email?.length > 0) {
        Notify('Please give valid email address');
        unfilled.push('email');
        result = false;
    }
    console.log(form, required, result, unfilled)
    return { validated: result, unfilled };
};

export function Notify(message) {
    notification.open({
        message: '',
        description: message,
    });
};
export function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    // alert("You have entered an invalid email address!")
    return (false)
};
