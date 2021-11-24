import React, {useState} from 'react'
import {useHistory} from 'react-router';

function CrudForm() {
    const history = useHistory();

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

    const onAdd = (data)=>{
        let list = returnList()
        if(userDetail.currentIndex === -1)
            list.push(data)
        else
            list[userDetail.currentIndex]=data
        localStorage.setItem("userData",JSON.stringify(list))
        setUserDetail({list,currentIndex : -1})
    }

        const [errors, setValidation] = React.useState({});

// const{fName,lName,contact,email,gender,country} = userDetail

    const handleChange = e => {
        setUserDetail({
            ...userDetail, [e.target.name]: e.target.value
        })
    }

    const validation = (name, value) => {
        const emailRegx = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/ig
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
        setUserDetail({})
        setValidation({})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("button clicked")
        let allErrors = {};

        const userData = {
            fName: userDetail.fName,
            lName: userDetail.lName,
            contact: userDetail.contact,
            email: userDetail.email,
            gender: userDetail.gender
        }

        Object.keys(userData).forEach(key => {
            const error = validation(key,userData[key])
            if(error && error.length){
                allErrors[key] = error
            }
        })
        if(Object.keys(allErrors).length){
            console.log("error part");
            return setValidation(allErrors)
        }else{
            console.log("else part");
            onAdd(userDetail)
            resetForm()
            history.push('/login')
        }
    };

    return (
        <div className='App'>
            <form>
                First name:<input type='text'
                                  name='fName'
                                  placeholder='first name'
                                  value={userDetail.fName}
                                  onChange={handleChange}
            />
                <div style={{color: 'red'}}>{errors.fName}</div>
                <br/>
                Last name:<input type='text'
                                 name='lName'
                                 placeholder='last name'
                                 value={userDetail.lName}
                                 onChange={handleChange}
            />
                <div style={{color: 'red'}}>{errors.lName}</div>
                <br/>
                Contact:<input type='number'
                               name='contact'
                               placeholder='contact'
                               value={userDetail.contact}
                               onChange={handleChange}
            />
                <div style={{color: 'red'}}>{errors.contact}</div>
                <br/>
                Email:<input type='email'
                             name='email'
                             placeholder='email'
                             value={userDetail.email}
                             onChange={handleChange}
            />
                <div style={{color: 'red'}}>{errors.email}</div>
                <br/>
                Gender:
                male:<input type='radio'
                            name='gender'
                            value='male'
                            onChange={handleChange}
            />
                female:<input type='radio'
                              name='gender'
                              value='female'
                              onChange={handleChange}
            />
                <div style={{color: 'red'}}>{errors.gender}</div>
                <br/>

                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )
}

export default CrudForm