import React, {useState,useEffect} from 'react'
// import CrudForm from '../crudFrom'
import {useHistory} from 'react-router';

export default function FormList() {
    const history = useHistory();

    const [userDetail, setUserDetail] = useState([])

    useEffect(() => {
        fetchData()
    }, []);

    const fetchData = () => {
        setUserDetail(JSON.parse(localStorage.getItem('userData')))
    };

    const handleEdit = (index, item) => {
        console.log("index", index)
        console.log("edit Clicked");
        history.push({
            pathname: `/${index}`,
            state: {
                userData: item
            }
        })
    };

    const handleDelete=(index)=>{
        console.log("delete clicked");
        console.log("index",index)
        if(window.confirm("are you sure")){
            userDetail.splice(index,1);
            localStorage.setItem("userData",JSON.stringify(userDetail));
            const getData = JSON.parse(localStorage.getItem('userData'));
            setUserDetail(getData)
        }
    };

const handleBack=(e)=>{
    e.preventDefault();
    history.push('/');
};

    return (
        <div>
            <h2>User data</h2>
            <table className="app-container">
            <tbody>
                <thead>
                    <tr>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Contact</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                    
                {
                    userDetail && userDetail.map((item,index)=>{
                        return <tr key={index}>
                            <td>{item.fName}</td>
                            <td>{item.lName}</td>
                            <td>{item.contact}</td>
                            <td>{item.email}</td>
                            <td>{item.gender}</td>
                            <td><button className="btn btn-warning" onClick = {()=>handleEdit(index, item)}>Edit</button></td>
                            <td><button className="btn btn-danger" onClick={()=>handleDelete(index)}>Delete</button></td>
                        </tr>
                    })
                }
                </tbody>
            </table>

            <button onClick={handleBack} className='mx-3 btn btn-primary' style={{fontSize:"1.5rem",alignItems:"left"}}>Back</button>
        </div>
    )
}
