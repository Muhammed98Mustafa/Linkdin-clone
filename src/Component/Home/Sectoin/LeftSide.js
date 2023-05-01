import { useSelector } from "react-redux"

const LeftSide=()=> {
    function capitalizeName(name) {
        if (!name) {
          return '';
        }
        
        const nameParts = name.split(' ');
        const capitalizedParts = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
        return capitalizedParts.join(' ');
      } 
    const {user} = useSelector(state => state.users)
    return (
        <div>
               <div className="border-2 bg-white rounded-md relative ml-2" >

                <div > 
                    <img src="/images/card-bg.svg"  alt=""/> 
                </div>
                <div className="rounded-full  inline-block  translate-x-28 -translate-y-8 bg-white p-2"> 
                <button type="button"> 
                    <img className="" src="/images/photo.svg" alt=""/>
                    </button>
                </div>
                <p className="text-center">Welcome {capitalizeName(user?.displayName)}</p>
                <hr/>
                <div> 
                    <p className="text-[#868e96] mt-4 ml-2 text-sm"> Connections</p>
                    <div className="flex flex-row justify-between ml-2 mr-2 text-sm font-bold mb-4 "> <span> Grow your network</span>  <button> <img src="/images/widget-icon.svg" alt="" /></button>  </div>
                    <hr/>
                    <div className="ml-2 py-2"> 
                    <span>
                     <img className="inline" src="/images/item-icon.svg" alt="" />
                     My Items
                 </span>
                    </div>
                    
                </div>
                
               
               

            </div>
            
            <div className="border-2 bg-white rounded-md relative ml-2 mt-2"> 
            <div className="flex flex-col items-start gap-1	mt-2 ml-2 font-bold">
            <button   type="button"> 
          <span>Groups</span>
        </button>
        <button className=" self-stretch " type="button">
            <div className="flex flex-row justify-between">
          <span>
            Events
          </span>
            <img className="inline mr-2" src="images/plus-icon.svg" alt="" />
            </div>
        </button>
        <button type="button">
          <span>Follows Hashtags</span>
        </button>
      
        </div>
        <hr />
        <button className="	my-2 ml-2 text-[#868e96]">
          <span>Discover more</span>
        </button>
                    </div>
   </div>
    )
}
export default LeftSide