import React, {useState,useEffect} from 'react'
import {useHistory} from 'react-router';

function CrudForm(props) {
    const history = useHistory();

    const [userDetail, setUserDetail] = useState({
        fName: "",
        lName: "",
        contact: "",
        email: "",
        gender: "",
        errors: {},
        currentIndex: -1
    });

    useEffect(()=>{
        if(props.match.params.id){
            fetchData()
        }
    },[]);

    const fetchData = () => {
        const data = props && props.location && props.location.state && props.location.state.userData
        setUserDetail(data)
    }

    const returnList=()=>{
            if(localStorage.getItem("userData") == null)
                localStorage.setItem("userData",JSON.stringify([]));
            return JSON.parse(localStorage.getItem("userData"))
        };

    const onAdd = (data)=>{
        let list = returnList();
        if(userDetail.currentIndex === -1)
            list.push(data);
        else
            list[userDetail.currentIndex]=data;
        localStorage.setItem("userData",JSON.stringify(list));
        setUserDetail({list,currentIndex : -1})
    };

    const onEdit = (data) => {
        const dataIndex = props.match.params.id
        const abc = JSON.parse(localStorage.getItem("userData"))
        const newArray = abc.map((item, index) => {
            if(index === dataIndex){
                return data
            }else {
                return item
            }
        })
        localStorage.setItem("userData",JSON.stringify(newArray));
    };

        const [errors, setValidation] = React.useState({});

// const{fName,lName,contact,email,gender,country} = userDetail

    const handleChange = e => {
        const {name, value} = e.target
        setUserDetail({ ...userDetail, [name]: value })
        // if (name === "gender") {
        //     setUserDetail({ ...userDetail, [name]: value })
        // } else {
        //     setUserDetail({ ...userDetail, [name]: value })
        // }
    };

    const validation = (name, value) => {
        const emailRegx = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/ig;
        switch (name) {
            case 'fName':
                if (!value) {
                    return 'Please input your first name!'
                } else {
                    return '';
                }
            case 'lName':
                if (!value) {
                    return 'Please input your last name!'
                } else {
                    return ''
                }
            case 'contact':
                if (!value) {
                    return 'Please input your phone number!'
                } else {
                    return ''
                }
            case 'email':
                if (!emailRegx.test(value)) {
                    return 'Please input your email!'
                } else {
                    return ''
                }

            case 'gender':
                if (!value) {
                    return 'Please select your gender!'
                } else {
                    return ''
                }

            default: {
                return null;
            }
        }
    };
    const resetForm = () => {
        setUserDetail({});
        setValidation({});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("button clicked");
        let allErrors = {};

        const userData = {
            fName: userDetail.fName,
            lName: userDetail.lName,
            contact: userDetail.contact,
            email: userDetail.email,
            gender: userDetail.gender
        };

        Object.keys(userData).forEach(key => {
            const error = validation(key,userData[key]);
            if(error && error.length){
                allErrors[key] = error
            }
        });
        if(Object.keys(allErrors).length){
            console.log("error part");
            return setValidation(allErrors)
        }else{
            if(props.match.params.id !== undefined){
                console.log("edit");
                onEdit(userDetail);
                resetForm();
                history.push('/login');
            }else {
                console.log("else part");
                onAdd(userDetail);
                resetForm();
                history.push('/login');
            }
        }
    };

    const handleView=()=>{
        console.log('view click');
        history.push('/login');
    };

    return (
        <div >
            <h2 style={{alignItems:'center'}}>Registration Form</h2>
            <hr/>
            <form>
                <div className="row mb-3">
                    <label className="col-sm-2 col-form-label"> First name:</label>
                    <div className="col-sm-10">
                        <input type="text"
                            className="form-control"
                            name='fName'
                            placeholder='Enter your first name'
                            value={userDetail && userDetail.fName}
                            onChange={handleChange} />
                    </div>
                    <div style={{color: 'red'}}>{errors.fName}</div>
                    <br/>
                    <label className="col-sm-2 col-form-label"> Last name:</label>
                    <div className="col-sm-10">
                        <input type="text"
                            className="form-control"
                            name='lName'
                            placeholder='Enter your last name'
                            value={userDetail && userDetail.lName}
                            onChange={handleChange} />
                    </div>
                <div style={{color: 'red'}}>{errors.lName}</div>
                <br/>
                    <label className="col-sm-2 col-form-label">  Contact:</label>
                    <div className="col-sm-10">
                        <input type="number"
                            className="form-control"
                            name='contact'
                            placeholder='Enter your contact'
                            value={userDetail && userDetail.contact}
                            onChange={handleChange} />
                    </div>
                <div style={{color: 'red'}}>{errors.contact}</div>
                <br/>
                    <label className="col-sm-2 col-form-label"> Email:</label>
                    <div className="col-sm-10">
                        <input type="email"
                            className="form-control"
                            name='email'
                            placeholder='Enter your email'
                            value={userDetail && userDetail.email}
                            onChange={handleChange} />
                    </div>
                <div style={{color: 'red'}}>{errors.email}</div>
                <br/>

                    <fieldset className="row mb-3">
                    <legend className="col-form-label col-sm-2 pt-0">Gender: </legend>
                    <div className="col-sm-10">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="male"
                                onChange={handleChange}/>
                                <label className="form-check-label">
                                    Male
                                </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="gender"
                                value="female"
                                onChange={handleChange}/>
                            <label className="form-check-label">
                                Female
                            </label>
                        </div>
                    </div>
                    </fieldset>
                </div>
                <div style={{color: 'red'}}>{errors.gender}</div>
                <br/>

                <button type="button" className='mx-3 btn btn-primary' onClick={handleSubmit}>Submit</button>
                <button type="button" className='mx-3 btn btn-primary' onClick={handleView}>View Users</button>

            </form>
        </div>
    )
}

export default CrudForm