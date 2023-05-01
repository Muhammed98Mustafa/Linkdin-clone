import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure , 
    Button,
    Lorem
  } from '@chakra-ui/react'
  import { useState } from 'react';
  
  function capitalizeName(name) {
    if (!name) {
      return '';
    }
    
    const nameParts = name.split(' ');
    const capitalizedParts = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1));
    return capitalizedParts.join(' ');
  } 
  function BasicUsage({isOpen, onOpen, onClose ,user }) {
    
    const [ Textarea , setTextarea ] = useState();

    return (
      <>
        
  
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create Post</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
             <hr/>
             <div className='flex flex-row  items-center gap-2 p-4'> 
             <img className="h-12 w-12 rounded-full" src={user?.photo} />
             <p className="font-bold"> {capitalizeName(user?.displayName)}</p>
             </div>
             <textarea  value={Textarea} autoFocus={true} onChange={(e)=> setTextarea(e.target.value)} placeholder='What You Want To Talk About'  className='border-2 w-full h-32 p-2' /> 
            </ModalBody>

            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
  }

  export default BasicUsage;