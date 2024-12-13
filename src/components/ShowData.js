import React, { useEffect } from 'react'
import { useState } from 'react'
import { GetLocalStorageData } from '../utils/LocalStorageUtils'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const ShowData = () => {
    const [userdata, setUserData] = useState([])
    const [filter, setfilter] = useState('All')
    const navigate = useNavigate();
    
    useEffect(() => {
        let data = GetLocalStorageData()
        console.log(data)
        setUserData(data)
    }, [])

    function handleAction(index, action) {
        const currentArrData = GetLocalStorageData();
        const filteredIndex = userdata.findIndex(item => item === filteredData[index]);
        if (action === 'Delete') {
            const isConfirmed = window.confirm('Are you sure you want to delete this item?');
            if (isConfirmed) {
                const updatedArrData = currentArrData.filter((_, i) => i !== filteredIndex)
                localStorage.setItem('UserData', JSON.stringify(updatedArrData))           //Delete functionality
                setUserData(updatedArrData);
            }
            else {
                console.log('deletion canceled')
            }
        }
        if (action === 'Edit') {
            const itemToEdit = userdata[filteredIndex];
            navigate('/', { state: { itemToEdit, filteredIndex } });                           //Edit functionality
        }

        if (action === 'Pin') {
            currentArrData[filteredIndex].pinned = !currentArrData[filteredIndex].pinned;
            localStorage.setItem('UserData', JSON.stringify(currentArrData));
            setUserData(currentArrData);                                                     //Pin functionality
        }
        if (action === 'Fav') {
            currentArrData[filteredIndex].isfavourite = !currentArrData[filteredIndex].isfavourite;
            localStorage.setItem('UserData', JSON.stringify(currentArrData));
            setUserData(currentArrData);                                                        //Favourite FUnctionality
        }
    }

    const filteredData = userdata.filter((item) => {
        if (filter === 'All') return true;
        if (filter === 'Favourite') return item.isfavourite;
        if (filter === 'UnFavourite') return !item.isfavourite;
        return true;
    });
    return (
        <div className='showDataContainer'>
            <div style={{ display: 'flex', justifyContent: 'end' }}><Link to="/" className='showaddbtn'>Go to Add Data </Link></div>
            <h1 className='showh1'>List of Data</h1>

            <div className='showdiv'>
                <button className={`showbtn ${filter === 'All' ? 'active' : ''}`} onClick={() => setfilter('All')}>All Data</button>
                <button className={`showbtn ${filter === 'Favourite' ? 'active' : ''}`} onClick={() => setfilter('Favourite')}>Favourite</button>
                <button className={`showbtn ${filter === 'UnFavourite' ? 'active' : ''}`} onClick={() => setfilter('UnFavourite')}>UnFavourite</button>
            </div>
            
            {filteredData === null || filteredData.length === 0 ? (<div>No Data Available</div>) :
                (<div className="dataList">
                    {
                        filteredData.map((item, index) => <div className={`dataItem ${item.pinned ? 'pinned' : ''}`} key={index}>
                            <div className="dataField">
                                <strong>Name:</strong> {item.name}
                            </div>
                            <div className="dataField">
                                <strong>Contact:</strong> {item.contact}
                            </div>
                            <div className="dataField">
                                <strong>Age:</strong> {item.age}
                            </div>
                            <div className="dataField">
                                <strong>Birthday:</strong> {item.birthday}
                            </div>
                            <div className="dataField">
                                <strong>Hobbies:</strong> {item.hobbies}
                            </div>
                            <div>
                                <button className={`btn ${item.isfavourite ? 'fav' : ''}`} value='Fav' onClick={(e) => handleAction(index, e.target.value)}>{item.isfavourite ? 'UnFavourite' : 'Favourite'}</button>
                                <select className='showselect' onChange={(e) => handleAction(index, e.target.value)}>
                                    <option value='Select'>Select</option>
                                    <option value='Pin'>{item.pinned ? 'UnPin' : 'Pin'}</option>
                                    <option value='Edit'>Edit</option>
                                    <option value='Delete'>Delete</option>
                                </select>
                            </div>
                        </div>)
                    }
                </div>)}

        </div>
    )
}

export default ShowData
