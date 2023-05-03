import { useSelector } from "react-redux";
import Model from "./Modal";
import { useDisclosure, Button } from "@chakra-ui/react";
import "../Header.css";
import Mainarticles from "./mainarticles";

const Main = () => {
  const { user , articles } = useSelector((state) => state.users);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <div className="border-2 bg-white rounded-md relative ml-2 ">
        <div className="flex flex-row mx-2 py-4 gap-1">
        <img className="h-12 w-12 rounded-full" src={user?.photo}  alt=""/>
          
          <Button
            onClick={onOpen}
            type="button"
            className="cancel-default-button-style "
            style={{
              width: "100%",
              justifyContent: "flex-start",
              textAlign: "left",
            }}
          >
            Start A Post
          </Button>
        </div>
        <div className="flex flex-row flex gap-8 ">
          <button className=" flex flex-row items-center justify-center flex-1 hover:bg-slate-100 py-4 lg:ml-2">
            <img src="/images/photo-icon.svg" alt="" />
            <span>Photo</span>
          </button>
          <button className="flex flex-row items-center justify-center flex-1 hover:bg-slate-100 py-4">
            <img src="/images/video-icon.svg" alt="" />
            <span>Video</span>
          </button>
          <button className="flex flex-row items-center justify-center flex-1 hover:bg-slate-100 py-4">
            <img src="/images/event-icon.svg" alt="" />
            <span>Event</span>
          </button>
          <button className="flex flex-row items-center justify-center flex-1 hover:bg-slate-100 py-4 lg:mr-2">
            <img src="/images/article-icon.svg" alt="" />
            <span>Write article</span>
          </button>
        </div>
      </div>
      <Model isOpen={isOpen} onOpen={onOpen} onClose={onClose} user={user} />
      <Mainarticles articles = {articles} /> 
    </div>
  );
};
export default Main;
