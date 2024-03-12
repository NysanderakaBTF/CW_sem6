import React, {useState} from "react";
import {Card, CardFooter, Image, Button} from "@nextui-org/react";

export function Photo({_id, base64String,author, title  }) {

    let [imgSrc,setImgSrc] = useState('')
//
    let base64_to_imgsrc = Buffer.from(base64String, "base64").toString()
//add the string to the state
    setImgSrc(base64_to_imgsrc)

    return (
        <Card
            isFooterBlurred
            radius="lg"
            className="border-none"
        >
            <Image
                alt={title}
                className="object-cover"
                height={200}
                src={"data:image/jpeg;base64," + imgSrc}
                width={200}
            />
            <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                <p className="text-tiny text-white/80">{title} - {author}</p>
            </CardFooter>
        </Card>
    );
}
