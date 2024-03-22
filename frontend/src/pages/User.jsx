import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Photo} from "../components/Photo.jsx";
import {axiosInstance} from "../middleware/jwt.js";
import {Button, Modal, useDisclosure} from "@nextui-org/react";
import {ThumbnailImageProps} from "react-grid-gallery";
import {Gallery} from "react-grid-gallery";
import {ImageList, ImageListItem} from "@mui/material";
import {useParams} from "react-router-dom";

export const User = () => {
    const baseSkip = 1;
    const [meInfo, setMeInfo] = useState({});
    const [photos, setPhotos] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const {id} = useParams();
    const [iid, setiId] = useState('');


    useEffect(() => {
        axiosInstance.get(`http://localhost:3000/users/${id}`).then((response) =>
            setMeInfo(response.data?.user)
        )
        console.log('User fetched');
        console.log(meInfo);
    }, [])


    useEffect(() => {
        axiosInstance.post(`http://localhost:3000/photo/filter`, {
            filter: {author: id},
            limit: 1,
            skip: skip
        }).then((response) => {
            if (response.data.images.length == 0) {
                setHasMore(false);
            } else {
                setPhotos([...photos, ...response.data.images])
                console.log('++++++++++++')
                console.log(photos)

            }
        })
    }, [id, skip])


    const {isOpen, onOpen, onClose} = useDisclosure();

    return (
        <div>
            <div className="flex flex-row min-w-100 justify-between text-xl">
                <div className="">{meInfo.name}'s album</div>
                <div className="">{meInfo.email}</div>

            </div>
            <ImageList variant="masonry" cols={3} gap={8}>
                {photos.map((item) => (
                    <ImageListItem key={item._id} >
                        <div key={"photo-"+item._id} onClick={()=>{
                            setiId(item._id)
                            onOpen()}
                        }>
                            <img
                                src={"data:image/jpeg;base64," + item.img.data}
                                alt={item.title}
                                loading="lazy"
                            />
                        </div>
                    </ImageListItem>
                ))}
            </ImageList>
            <Photo id={iid} onOpen={onOpen} onClose={onClose} isOpen={isOpen}/>
            { hasMore && <Button onClick={() => setSkip(skip + baseSkip)}>Load more</Button>}
            { !hasMore && <Button disabled={true}>No more images</Button>}
        </div>

    )
}