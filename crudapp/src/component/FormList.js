import React, {useState,useEffect} from 'react'
// import CrudForm from '../crudFrom'

export default function FormList() {
    const returnList=()=>{
        if(localStorage.getItem("userData") == null)
            localStorage.setItem("userData",JSON.stringify([]))
        return JSON.parse(localStorage.getItem("userData"))
    }
    const [userDetail, setUserDetail] = useState({
        fName: '',
        lName: '',
        contact: '',
        email: '',
        gender: '',
        errors: {},
        currentIndex:-1,
        list:returnList()
    })
    // const userData =()=> {
    //     if (userDetail.currentIndex === -1)
    //         return {
    //             Fname: "",
    //             lName: "",
    //             Contact: "",
    //             email: "",
    //             gender: "male",
    //             errors: {},
    //             currentIndex:-1,
    //             list:returnList()
    //         }
    //     else
    //         return userDetail.list[userDetail.currentIndex]
    // }
    //
    // useEffect((prevProps) => {
    //     if (prevProps.currentIndex !== userDetail.currentIndex || prevProps.list.length !== userDetail.list.length)
    //         setUserDetail({ ...userData()})
    // });

    // const onAdd = (data)=>{
    //     let list = returnList()
    //     if(userDetail.currentIndex === -1)
    //         list.push(data)
    //     else
    //         list[userDetail.currentIndex]=data
    //     localStorage.setItem("userData",JSON.stringify(list))
    //     setUserDetail({list,currentIndex : -1})
    // }

    const handleEdit=(index)=>{
        console.log("edit Clicked");
        // setUserDetail({
        //     currentIndex:index
        // })
    }

    const handleDelete=(index)=>{
        console.log("delete clicked");
        if(window.confirm("are you sure")){
            let list=returnList()
            list.splice(index,1)
            localStorage.setItem("userData",JSON.stringify(list))
            setUserDetail({list,currentIndex : -1})
        }
    }

    return (
        <div>
            <h2>User data</h2>
            <table>
                <tbody>
                    <tr>
                        <td>First Name</td>
                        <td>Last Name</td>
                        <td>Contact</td>
                        <td>Email</td>
                        <td>Gender</td>
                        <td>Edit</td>
                        <td>Delete</td>
                    </tr>
                </tbody>
                <tbody>
                {
                    userDetail.list.map((item,index)=>{
                        return <tr key={index}>
                            <td>{item.fName}</td>
                            <td>{item.lName}</td>
                            <td>{item.contact}</td>
                            <td>{item.email}</td>
                            <td>{item.gender}</td>
                            <td><button onClick = {()=>handleEdit(index)}>Edit</button></td>
                            <td><button onClick = {()=>handleDelete(index)}>Delete</button></td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    )
}
