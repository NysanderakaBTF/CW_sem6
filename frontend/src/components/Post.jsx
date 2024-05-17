import {Button, useDisclosure} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {axiosInstance} from "../middleware/jwt.js";

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {NavLink} from "react-router-dom";
import {Chip} from "@nextui-org/react";
import Carousel from "nuka-carousel";


export const Post = ({post_info}) => {
    const author = useSelector((state)=> state.user.user.id)
    const urole = useSelector((state)=> state.user.user.role)


    function deletePost() {
        axiosInstance.delete(`http://45.61.149.220:3000/post/${post_info.id}`).then(
            value => console.log(value)
        ).catch(response => alert(response))
    }

    return (
        <Card className="lg:max-w-[600px] md:max-w-[400px] sm:max-w-[350px] min-w-[300px] flex m-2">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">{post_info.title}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody className="flex p-0"   style={{maxHeight: "min-content"}}>
                        { post_info.images.length > 0 &&
                <Carousel slidesToShow={1} className="max-w-fit"   style={{maxHeight: "min-content"}}>
                    {post_info.images.map((image, index) => (
                                    <img   src={"data:image/jpeg;base64," + image.img.data}
                                            alt={image.title}
                                            loading="lazy"
                                           style={{maxHeight: "min-content"}}
                                />
                    ))}
                </Carousel>}
                <p>
                    {post_info.text}
                </p>
                <div className="flex flex-row">
                    {post_info.tags.map((tag, index) => (
                        <Chip>{tag}</Chip>
                    ))}
                </div>

            </CardBody>
            <Divider/>
            <CardFooter>
                <Link>
                    <NavLink to={'/user/'+post_info.userId}>Author</NavLink>
                </Link>
                { (author === post_info.userId || urole === 'ADMIN') &&  <Button color="danger" variant="light" onPress={()=>{
                    onClose();
                    deletePost();
                }}>
                    Delete
                </Button>}
            </CardFooter>
        </Card>
    )
}


