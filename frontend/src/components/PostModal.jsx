import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Textarea,
    useDisclosure
} from "@nextui-org/react";
import React, {useState} from "react";
import {axiosInstance} from "../middleware/jwt.js";
import {ImageListItem} from "@mui/material";
import {Photo} from "./Photo.jsx";

export const PostModal = () => {

    const [formData, setFormData] = useState({
        title: '',
        text:'',
        tags:''
    });
    const [postedPost, setPostedPost] = useState({});

    function makeAPost(){
        var bodyFormData = new FormData();
        console.log(formData)
        bodyFormData.append('title', formData.title);
        bodyFormData.append('text', formData.description);
        bodyFormData.append('tags', formData.tags.split(' '));
        axiosInstance.post('http://localhost:3000/post/create', bodyFormData).then(
            (r)=>{
                console.log(r);
                setPostedPost(r.data.post);
            }
        )
    }

    const m1 = useDisclosure({id:'1'});
    const m2 = useDisclosure({id:'2'});
    const [iid, setiId] = useState('');


    const [photos, setPhtos] = useState([]);



    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const [formData1, setFormData1] = useState({
        title: '',
        price: '1000',
        portfolioNumber: '0',
        photo: null,
        description:''
    });

    function makeAPostPhoto(){
        var bodyFormData = new FormData();
        console.log(formData1)
        bodyFormData.append('title', formData1.title);
        bodyFormData.append('portfolioNumber', formData1.portfolioNumber);
        bodyFormData.append('price', formData1.price);
        bodyFormData.append('photo', formData1.photo, 'photo.jpg');
        bodyFormData.append('description', formData1.description);
        bodyFormData.append('post_id', postedPost._id.toString());
        axiosInstance.post('http://localhost:3000/photo/upload', bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(
            (r)=>{
                console.log(r);
                setPhtos([...photos, r.data.img])
            }
        )
    }


    const handleChange1 = (e) => {
        setFormData1({
            ...formData1,
            [e.target.name]: e.target.value,
        });
    };
    function handleFileChange(event){
        setFormData1({...formData1, photo:event.target.files[0]})
    }


    return (
        <>
            <Input
                label="Title"
                placeholder="Post name"
                variant="bordered"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required={true}
            />
            <Textarea
                label="Description"
                placeholder="Enter your description"
                className="max-w-xs"
                name="text"
                value={formData.text}
                onChange={handleChange}
            />
            <Input
                label="Tags"
                placeholder="Enter tags"
                variant="bordered"
                type="text"
                name="tags"
                value={formData.price}
                onChange={handleChange}
                required={true}
            />
            <Button onClick={makeAPost} >Next</Button>
            <Button onPress={m1.onOpen} > Add Photo</Button>


            {photos.map((item) => (
                    <div key={"photo-"+item._id} onClick={()=>{
                        setiId(item._id)
                        m2.onOpen()
                    }
                    }>
                        <img
                            src={"data:image/jpeg;base64," + item.img.data}
                            alt={item.title}
                            loading="lazy"
                        />
                    </div>
            ))}
            <Photo id={iid} onOpen={m2.onOpen} isOpen={m2.isOpen} onClose={m2.onClose}/>




            <Button>Cancel</Button>




            <Modal
                isOpen={m1.isOpen}
                onOpenChange={m1.onOpenChange}
                placement="top-center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                            <ModalBody>
                                <Input
                                    label="Title"
                                    placeholder="Photo name"
                                    variant="bordered"
                                    name="title"
                                    value={formData1.title}
                                    onChange={handleChange1}
                                    required={true}
                                />
                                <Input
                                    label="Price"
                                    placeholder="enter price"
                                    variant="bordered"
                                    type="number"
                                    name="price"
                                    value={formData1.price}
                                    onChange={handleChange1}
                                    required={true}
                                />
                                <Input
                                    label="Place in portfolio"
                                    placeholder="0"
                                    variant="bordered"
                                    type="number"
                                    defaultValue='0'
                                    name="portfolioNumber"
                                    value={formData1.portfolioNumber}
                                    onChange={handleChange1}
                                />
                                <Textarea
                                    label="Description"
                                    placeholder="Enter your description"
                                    className="max-w-xs"
                                    name="description"
                                    value={formData1.description}
                                    onChange={handleChange1}
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
                                <Button color="primary" onPress={()=>{makeAPostPhoto(); onClose()}}>
                                    Post
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>

        </>
    )
}