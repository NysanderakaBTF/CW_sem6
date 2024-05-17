import React, {useState} from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Checkbox,
    Input,
    Link,
    Textarea
} from "@nextui-org/react";
import {axiosInstance} from "../middleware/jwt.js";

export default function PhotoModal({isOpen, onOpen, onOpenChange}) {
    // const {isOpen, onOpen, onOpenChange} = useDisclosure();


    function makeAPost(){
        var bodyFormData = new FormData();
        console.log(formData)
        bodyFormData.append('title', formData.title);
        bodyFormData.append('portfolioNumber', formData.portfolioNumber);
        bodyFormData.append('price', formData.price);
        bodyFormData.append('photo', formData.photo, 'photo.jpg');
        bodyFormData.append('description', formData.description);
        axiosInstance.post('http://45.61.149.220:3000/photo/upload', bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(
            (r)=>{
                console.log(r);
            }
        ).catch(response => alert(response))
    }

    const [formData, setFormData] = useState({
        title: '',
        price: '1000',
        portfolioNumber: '0',
        photo: null,
        description:''
    });
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    function handleFileChange(event){
        setFormData({...formData, photo:event.target.files[0]})
    }

    return (
        <>
            <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Post photo</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Title"
                                    placeholder="Photo name"
                                    variant="bordered"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required={true}
                                />
                                <Input
                                    label="Price"
                                    placeholder="enter price"
                                    variant="bordered"
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required={true}
                                />
                                <Input
                                    label="Place in portfolio"
                                    placeholder="0"
                                    variant="bordered"
                                    type="number"
                                    defaultValue='0'
                                    name="portfolioNumber"
                                    value={formData.portfolioNumber}
                                    onChange={handleChange}
                                />
                                <Textarea
                                    label="Description"
                                    placeholder="Enter your description"
                                    className="max-w-xs"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                                <input
                                    type="file"
                                    name="photo"
                                    onChange={handleFileChange}
                                    required={true}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="flat" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={()=>{makeAPost(); onClose()}}>
                                    Post
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
