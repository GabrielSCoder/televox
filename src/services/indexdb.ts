export const openDb = () : Promise<IDBDatabase> => {
    return new Promise ((resolve, reject) => {
        const request = indexedDB.open("AvatarDb", 1)

        request.onupgradeneeded = (event) => {
            const db = (event.target as IDBRequest).result
            if (!db.objectStoreNames.contains("avatars")) {
                db.createObjectStore("avatars")
            }
        }

        request.onsuccess = () => {
            resolve(request.result)
        }

        request.onerror = () => {
            reject(request.error)
        }
    })
}

export const saveImgToDb = async (key : string, imageData : string) => {
    const db = await openDb()
    const transaction = db.transaction("avatars", "readwrite")
    const store = transaction.objectStore("avatars")
    store.put(imageData, key)
}

export const getImageFromDb = async (key : string): Promise<string | null> => {
    const db = await openDb()
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("avatars", "readonly")
        const store = transaction.objectStore("avatars")
        const request = store.get(key)

        request.onsuccess = () => {
            resolve(request.result || null)
        }

        request.onerror = () => {
            reject(request.error)
        }

    })
}

export const fetchImage = async (url : string, key : string, setimage : (image : string) => void ) => {
    if (!url) return;

    try {
        const response = await fetch(url);
        const blob = await response.blob();
        const reader = new FileReader();

        reader.onloadend = async () => {
            const base64Image = reader.result as string;
            await saveImgToDb(key, base64Image);
            setimage(base64Image);
        };
        reader.readAsDataURL(blob);
        
    } catch (error) {
        console.error(`Erro ao carregar a imagem (${key}):`, error);
    }
}

