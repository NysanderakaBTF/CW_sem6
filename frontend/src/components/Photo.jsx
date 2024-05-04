import React, {useEffect, useState} from "react";
import {
    Card,
    CardFooter,
    Image,
    Button,
    Modal,
    ModalContent,
    ModalBody,
    ModalHeader,
    ModalFooter, Link
} from "@nextui-org/react";
import {Buffer} from "buffer/"
import {axiosInstance} from "../middleware/jwt.js";
import {useSelector} from "react-redux";
import {NavLink, useNavigate} from "react-router-dom";
export function Photo({isOpen, onOpen, onClose, id }) {

    const [photo, setPhoto] = useState({});
    const navigate = useNavigate()

    const author = useSelector((state)=> state.user.user.id)
    const urole = useSelector((state)=> state.user.user.role)

    useEffect(()=>{
        axiosInstance.post('http://45.61.149.220:3000/photo/filter', {
            filter:{_id: id},
            limit:1,
            skip:0
        }).then((response) =>{
            console.log(response.data.images)
            setPhoto(response.data?.images.pop())
        })

    }, [id])

    function deletePhoto(){
        axiosInstance.delete(`http://45.61.149.220:3000/photo/delete/${id}`).then(r => console.log(r))
    }

    return (
        <Modal
            size={"5xl"}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">{photo.title}</ModalHeader>
                        <ModalBody className="flex items-center justify-center">
                            <Image  src={"data:image/jpeg;base64," + photo.img?.data} style={{maxHeight:"80vh"}}/>
                        </ModalBody>
                        <ModalFooter>

                            <Link onClick={()=>{
                                onClose();
                                navigate(`/user/${photo.author}`)
                            }}>Author</Link>


                            { (author === photo.author || urole === 'ADMIN') &&  <Button color="danger" variant="light" onPress={()=>{
                                onClose();
                                deletePhoto();
                            }}>
                                Delete
                            </Button>}
                            <Button color="primary" onPress={onClose}>
                                Colse
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}
