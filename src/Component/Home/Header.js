     import "./Header.css";
import { useRef } from "react";
import { useEffect , useState} from "react";
import {Singoutuser} from "../../Feature/UserSlice"
import { useDispatch   } from "react-redux";

const Header = () => {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const [isHovered, setIsHovered] = useState(false);
 // const {userLogin} = useSelector(state => state.users)
  const dispatch = useDispatch();
 // const navigate = useNavigate();
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handlesingout=()=>{
    dispatch(Singoutuser())
  }


  return (
    <div className="lg:flex lg:flex-row lg:justify-between  bg-white items-center">
      <div className="lg:flex lg:flex-row flex flex-row justify-center items-center lg:ml-20 md:ml-12 ml-4 lg:gap-2 gap-2  ">
        <div>
          <img ref={inputRef} src="/images/home-logo.svg" alt="linkdin" />
        </div>
        <div className="flex items-center relative">
          <input
            type="text"
            placeholder="Search"
            className="py-1 pl-8 border-2 bg-[#eef3f8] lg:px-8 px-4 "
          />
          <img
            src="/images/search-icon.svg"
            alt="searchicon"
            className="absolute left-2"
          />
          <img src="/images/chaticon.svg" className="w-[20px]  lg:hidden" alt="" />
        </div>
      </div>
      <div className=" lg:w-fit w-full lg:mx-0  lg:flex  lg:flex-row flex flex-row justify-center items-center gap-8 lg:items-center lg:mr-12 md:mr-4 lg:static fixed bottom-0 bg-white	 ">
        <div className="border-b-2	py-2 border-black ">
          <button className="link" >
            <img src="/images/nav-home.svg" alt="" />
            <span> Home</span>
          </button>
        </div>
        <div>
          <button className="link"> 
            <img src="/images/nav-network.svg" alt="" />
            <span className="whitespace-nowrap"> My Network</span>
          </button>
        </div>
        <div >
          <button className="link " type="button">
            <img src="/images/nav-jobs.svg" alt="" />
            <span> Jobs</span>
          </button>
        </div>
        <div className="lg:block hidden">
          <button className="link" type="button">
            <img src="/images/nav-messaging.svg" alt="" />
            <span> Messaging</span>
          </button>
        </div>
        <div>
          <button className="link" type="button">
            <img src="/images/nav-notifications.svg" alt="" />
            <span> Notifications</span>
          </button>
        </div>
        <div className="relative flex flex-col items-center " onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="link" type="button"  >
        <img src="/images/user.svg" alt="" className="w-[40px] rounded-full" />
        <span>My<img className="inline" src="/images/down-icon.svg" alt="" /></span>
      </button>
      {isHovered && (
        <button onClick={handlesingout} className="absolute lg:right-[-40px] lg:top-16 top-[-30px] bg-white px-8 py-1 whitespace-nowrap hide ">Sign Out</button>
      )}
    </div>

        <div className="lg:block hidden">
          <button className="link lg:block hidden" type="button">
            <img src="/images/nav-work.svg" alt="" />
            <span>
              {" "}
              Work
              <img className="inline" src="/images/down-icon.svg" alt="" />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
