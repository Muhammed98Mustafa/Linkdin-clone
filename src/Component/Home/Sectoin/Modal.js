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
  const [Textarea, setTextarea] = useState();
  const [video, setVideo] = useState();
  const [Selectmida, setSelectmida] = useState();

  const handleclone=()=> {
    onClose();
    setSelectmida();
    setVideo();
    setTextarea();

  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleclone} size="xl">
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
                <input type="file" id="file" name="id" className="hidden" />
                <div>
                  <label
                    htmlFor="file"
                    className="w-100% block text-center mt-4"
                  >
                    Select an image to share
                  </label>
                  <img src="" alt="" />
                </div>
              </div>
            ) : (
              Selectmida === "video" && (
                <div>
                  <input
                    type="text"
                    onChange={(e) => setVideo(e.target.value)}
                    className="w-full border-2 p-2"
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
              <button onClick={() => setSelectmida("photo")}>
                {" "}
                <img src="/images/share-image.svg" alt="" />
              </button>
              <button onClick={() => setSelectmida("video")}>
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
              className="border-2 py-1 px-4 rounded-full"
              onClick={onClose}
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
