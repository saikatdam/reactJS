import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Homepage from './homepage'
import './assets/search.css'
import Pills from './components/pills'

function App() {
//   const [count, setCount] = useState(0)
//   const [search,setSearch] = useState("")
//   const [suggestions,setSuggestions] = useState([])
//   const [selectUser , setSelectUser] = useState([])
//   const [selectedUser,setSelectedUser] = useState(new Set())

//   useEffect(()=>{
//     const fetchUsers = () =>{
//       if(search.trim()== ""){
//         setSuggestions([]);
//         return;
//       }
  
//       fetch(`https://dummyjson.com/users/search?q=${search}`)
//       .then(res => res.json())
//       .then((data)=>setSuggestions(data))
//       .catch((err)=>console.log(err))
//     };
//     fetchUsers();
//   },[search])

//   const handleSelectedUser = (user) =>{
//     setSelectUser([...selectUser,user]);
//     setSelectedUser(new Set([...selectedUser,user.email]))
//     setSearch ("");
//     setSuggestions([]);
//   }

//  const handleRemover = (user)=>{

//  }
//   return (
//     <>
//       <div className='user-search-input'>

//         <div className='pill-data'>
//           {selectUser.map((user)=>{
//          return(    <Pills key={user.email} image={user.image} text={`${user.firstName} ${user.lastName}`} 
//             onClick={()=>handleRemover(user)} />
//          ) })}
//         </div>
//         <div>
//           <input type="text" value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search Something" />

//         </div>

//       <div className='displayData'>
//         <ul className='suggestions-list'>
//           {suggestions?.users?.map((user,index)=>{
            
//           return !selectedUser.has(user.email)?( <li key={user.email} onClick={()=>handleSelectedUser(user)}>
//               <img src={user.image} alt={`${user.firstName} ${user.lastName}`}/>
//               <span>{`${user.firstName} ${user.lastName}`}</span>
//             </li>
//           ):(<></>)} )}
//         </ul>
//       </div>
//        </div>
        
//     </>
//   )
// }

return(
<>
<Homepage/>
</>
)
}
export default App;