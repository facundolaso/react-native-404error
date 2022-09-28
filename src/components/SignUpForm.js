// import '../styles/SignUp.css'
// import { useSignUpMutation } from '../features/usersSlice'
// import SignUpGoogle from '../components/SignUpGoogle'
// import Alerts from './Alerts'
// import { useNavigate } from "react-router-dom"


// const newUserForm = [
//     {
//         name: "name",
//     },
//     {
//         name: "lastName",
//     },
//     {
//         name: "mail",
//         type: "email"
//     },
//     {
//         name: "password",
//         type: "password"
//     },
//     {
//         name: "photo",
//     },
//     {
//         name: "country",
//     }
// ]

// const inputForm = (inputData) => <div className="signUp-inputContainer"><input type={inputData.type} className="signUp-input" name={inputData.name} disabled={inputData.disabled} /><label className="signUp-label">{inputData.name.toUpperCase()}</label></div>


// export default function SignUp({loggedUser}) {
//     const navigate = useNavigate()

//     let [addUser, result] = useSignUpMutation()
//     let role
//     if (localStorage.getItem('loggedUser')) {
//         role = loggedUser.role
//     } else {
//         role = "user"
//     }

//     const handleAddTask = async (form) => {
//         form.preventDefault()
//         const newUser = 
//         {
//             name: form.target.name.value,
//             lastName: form.target.lastName.value,
//             mail: form.target.mail.value,
//             password: form.target.password.value,
//             photo: form.target.photo.value,
//             country : form.target.country.value,
//             from: "form",
//             role: role
//         };
//         await addUser(newUser);
//         form.target.reset()
//     }
//     if (result.isSuccess) {
//         setTimeout(myFunction, 5000)
//     }
//     function myFunction(){
//         navigate('/signin');
//         window.location.reload()
//         }



//     return (
//         <>
//         <div className="signupFrm">
//     <form className="signUp-form" onSubmit={handleAddTask}>
//       {loggedUser?<h1 className="signUp-title">Sign up new admin</h1>:<h1 className="signUp-title">Sign up</h1>}

//       {newUserForm.map(inputForm)}

//       <input type="submit" className="signUp-submitBtn" value="Sign up"/>
//       {/* <SignUpGoogle/> */}
//     </form>
//   </div>
//         </>
//     )
// }