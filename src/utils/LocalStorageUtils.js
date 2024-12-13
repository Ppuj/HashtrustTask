export const SaveDataToLocalStorage = (data, editIndex = null) => {
    try {
        let currentData = JSON.parse(localStorage.getItem('UserData')) || [];
        if (editIndex !== null) {
            currentData[editIndex].isfavourite === true ? data.isfavourite = true : data.isfavourite = false;
            currentData[editIndex].pinned === true ? data.pinned = true : data.pinned = false;
            currentData[editIndex] = data;                //edit data
        } else {
            currentData.push(data);                        //new data
        }
        localStorage.setItem('UserData', JSON.stringify(currentData))
    } catch (e) {
        console.log(e)
    }
}

export const GetLocalStorageData = () => {
    try {
        let storedData = localStorage.getItem('UserData')
        return storedData ? JSON.parse(storedData) : null;
    } catch (e) {
        console.log(e)
    }
}