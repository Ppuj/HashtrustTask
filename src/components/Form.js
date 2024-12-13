import React, { useState ,useEffect} from 'react'
import { SaveDataToLocalStorage } from '../utils/LocalStorageUtils'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom';
const Form = () => {
    const [name, setName] = useState('')
    const [contact, setContact] = useState('')
    const [age, setAge] = useState('')
    const [birthday, setBirthday] = useState('')
    const [hobbies, setHobbies] = useState('')
    const [error, setError] = useState('')
    const [editIndex, setEditIndex] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.itemToEdit) {
            const { itemToEdit, filteredIndex } = location.state;
            setName(itemToEdit.name);
            setContact(itemToEdit.contact);
            setAge(itemToEdit.age);
            setBirthday(itemToEdit.birthday);
            setHobbies(itemToEdit.hobbies);
            setEditIndex(filteredIndex); // Store the index of the item being edited
        }
    }, [location.state]);

    function validation() {
        if (!name || !contact || !age || !birthday || !hobbies) {
            setError('All fields are required!');
            return false;
        }
        if (!/^\d+$/.test(contact) || contact.length < 10 || contact.length > 10) {
            setError('Contact must be a valid number!');
            return false;
        }
        if (parseInt(age) <= 0||age>150) {
            setError('Age must be a positive number!');
            return false;
        }
        if (new Date(birthday) > new Date()) {
            setError('Birthday cannot be in the future!');
            return false;
        }
        setError('');
        return true;
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (validation()) {
            const formData = { name, contact, age, birthday, hobbies , pinned:editIndex!==null?undefined: false,isfavourite:editIndex!==null?undefined:false }
            SaveDataToLocalStorage(formData,editIndex);
            navigate('/show-data'); 
        }
    }
    return (
        <div className='formcontainer'>
            <div className='formdiv'>
                <h1>{editIndex !== null ? 'Edit Data' : 'Add Data'}</h1>
                <form onSubmit={handleSubmit}>
                    {error && <div style={{ color: 'red' }}>{error}</div>}
                    <div className='formfield'>
                        <label>Name:</label><input type='text' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='formfield'>
                        <label>Contact:</label><input type='number' value={contact} onChange={(e) => setContact(e.target.value)} />
                    </div>
                    <div className='formfield'>
                        <label>Age:</label><input type='number' value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className='formfield'>
                        <label>Birthday:</label><input type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                    </div>
                    <div className='formfield'>
                        <label>Hobbies:</label><input type='text' value={hobbies} onChange={(e) => setHobbies(e.target.value)} />
                    </div>
                    <div><button type='submit' className='formbtn'>{editIndex !== null ? 'Update Data' : 'Add Data'}</button>
                        <Link to="/show-data" className='formbtn'> Show Data </Link>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Form
