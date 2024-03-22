import {Button, useDisclosure} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {axiosInstance} from "../middleware/jwt.js";

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import {ButtonBack, ButtonNext, CarouselProvider, Slide, Slider} from "pure-react-carousel";
import {NavLink} from "react-router-dom";
import {Chip} from "@nextui-org/react";


export const Post = ({post_info}) => {

    return (
        <Card className="lg:max-w-[600px] md:max-w-[400px] sm:max-w-[350px] min-w-[300px] flex m-2">
            <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                    <p className="text-md">{post_info.title}</p>
                </div>
            </CardHeader>
            <Divider/>
            <CardBody className="flex p-0">
                {post_info.images.length > 0 && <CarouselProvider
                    visibleSlides={1}
                    hasMasterSpinner
                    naturalSlideWidth={100}
                    naturalSlideHeight={125}
                    totalSlides={post_info.images.length}
                    step={1}
                    lockOnWindowScroll
                >
                    <Slider className="" style={{paddingBottom:0, overflow:"hidden"}}>
                        {post_info.images.map((image, index) => (
                            <Slide index={index} key={image.img.data} style={{paddingBottom:0, overflow:"hidden"}}>
                                <p>{index}</p>
                                <img   src={"data:image/jpeg;base64," + image.img.data}
                                        alt={image.title}
                                        loading="lazy"
                                       style={{maxHeight: "min-content"}}
                            />
                            </Slide>
                        ))}

                    </Slider>
                    { post_info.images.length > 0 &&
                    <div className="flex justify-evenly">
                        <ButtonBack><Chip>Back</Chip></ButtonBack>
                        <ButtonNext><Chip>Next</Chip></ButtonNext>
                    </div>
                    }
                </CarouselProvider> }

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
            </CardFooter>
        </Card>
    )
}


