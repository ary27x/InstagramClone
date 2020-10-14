import React,{useEffect,useState} from 'react'
import {useParams,Link} from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios'
function Followers()
{ 
const [mainData,setMainData] = useState(null) 
    const {username} = useParams()

    useEffect(() => {
        const token = localStorage.getItem('TOKEN')
axios.post("/followers",{username},{headers:{
    authorization : token
}}).then(data => {
    console.log(data.data)
    setMainData(data.data)
}).catch(err => {
    console.warn("an error occured")
    console.log(err)
    
})
    },[])
    console.log('hello there')
    return(
        <React.Fragment>
            <Header/>

 
      <div class="card " style={{maxWidth:"600px",margin:"20px auto"}}>
        <div style={{display:"flex",justifyContent:'center',backgroundColor:"#039be5",height:"60px"} }>
          <span class="card-title" style={{textAlign:"center",color:'white',paddingTop:'10px'}}>Followers</span>
        </div>
        <div class="card-content" style={{marginBottom:"50px"}}>

        {mainData == null ? "" : mainData.map((item,i) =>(<><div
style={{display:"flex",alignItems:'center',paddingBottom:'10px'}}
onClick={() => {
    window.location = `/user/${item.username}`
}}
            >
                <img src={item.profilePic} alt ="" className="main-data"/>
                <p style={{marginLeft:'6px'}}>{item.username}</p>
            </div>
            {i == mainData.length-1 ? "" : <hr/>}
            
        </>
        ))}
         {mainData == null ? "" :mainData.length == 0 ? <><div
style={{display:"flex",alignItems:'center',paddingBottom:'10px'}}

            >
                <p style={{marginLeft:'6px'}}>No followers</p>
                </div></> : ""}
        </div>
      
      </div>
 
            
        </React.Fragment>
    )
}
export default Followers