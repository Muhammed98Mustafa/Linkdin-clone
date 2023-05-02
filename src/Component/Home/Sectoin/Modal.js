import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import ReactPlayer from "react-player";
import { useState } from "react";
import {SendPost} from '../../../Feature/UserSlice'
import { useDispatch } from "react-redux";
import { Timestamp } from "firebase/firestore";

function capitalizeName(name) {
  if (!name) {
    return "";
  }

  const nameParts = name.split(" ");
  const capitalizedParts = nameParts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1)
  );
  return capitalizedParts.join(" ");
}

function BasicUsage({ isOpen, onOpen, onClose, user }) {
  const [Textarea, setTextarea] = useState("");
  const [video, setVideo] = useState("");
  const [Selectmida, setSelectmida] = useState("");
  const [shareimage, setShareimage] = useState("");
  const dispatch = useDispatch();
  const handleclose = () => {
    onClose();
    setSelectmida(""); // Update to setSelectmida("")
    setVideo("");
    setShareimage("");
    setTextarea("");
  };
  const handlepost = (e) => {
    dispatch(SendPost({
     
        image: shareimage,
        video: video,
        user: user,
        description: Textarea,
        timestamp: Timestamp.now(),
      
    }))
  };
  const handlesetmedia = (e) => {
    setVideo("");
    setShareimage("");
    setSelectmida(e);
  };
  const handleUploadImage = (e) => {
    console.log(e.target.files[0]);
    const image = e.target.files[0];
    if (image === "" && image === undefined) {
      alert(`not an image , the fiel is ${typeof image}`);
      return;
    } else {
      setSelectmida("photo");
      setShareimage(image);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={handleclose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <hr />
            <div className="flex flex-row  items-center gap-2 p-4">
              <img
                className=" h-12 w-12 rounded-full"
                src={user?.photo}
                alt=""
              />
              <p className="font-bold"> {capitalizeName(user?.displayName)}</p>
            </div>
            <textarea
              value={Textarea}
              autoFocus={true}
              onChange={(e) => setTextarea(e.target.value)}
              placeholder="What You Want To Talk About"
              className="border-2 w-full h-32 p-2"
            />
            {Selectmida === "photo" ? (
              <div>
                <input
                  type="file"
                  id="file"
                  name="id"
                  className="hidden"
                  onChange={handleUploadImage}
                />
                <input
                  type="file"
                  id="file"
                  name="id"
                  className="hidden"
                  onChange={handleUploadImage}
                />
                <div>
                  <label
                    htmlFor="file"
                    className="w-100% block text-center mt-4"
                  >
                    Select an image to share
                  </label>
                  {shareimage && (
                    <img src={URL.createObjectURL(shareimage)} alt="img" />
                  )}
                </div>
              </div>
            ) : (
              Selectmida === "video" && (
                <div>
                  <input
                    type="text"
                    placeholder="Past Your video URL Here... "
                    onChange={(e) => setVideo(e.target.value)}
                    className="w-full border-2 p-2 mt-2"
                  />
                  {video && <ReactPlayer url={video} controls width="100%" />}
                </div>
              )
            )}
          </ModalBody>

          <ModalFooter className="custom-modal-footer">
            {/*   <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button> */}

            <div className="flex flex-row items-center gap-4">
              <button onClick={() => handlesetmedia("photo")}>
                {" "}
                <img src="/images/share-image.svg" alt="" />
              </button>
              <button onClick={() => handlesetmedia("video")}>
                {" "}
                <img src="/images/share-video.svg" alt="" />
              </button>
              <span className="decoration-slate-300	 "> | </span>
              <button>
                {" "}
                <img
                  className="inline-block"
                  src="/images/share-comment.svg"
                  alt=""
                />{" "}
                Anyone
              </button>
            </div>

            <button
              className={`border-2 py-1 px-4 rounded-full bg-[#4dabf7]  hover:bg-[#339af0] transition-all duration-300 text-white font-bold ${
                Textarea?.trim().length > 0
                  ? ""
                  : "bg-[#ced4da]  hover:bg-[#ced4da] cursor-no-drop "
              }`}
              onClick={handlepost}
              disabled={!Textarea || Textarea?.trim().length === 0}
            >
              Post
            </button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default BasicUsage;
