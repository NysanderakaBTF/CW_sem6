import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {Photo} from "../components/Photo.jsx";
import {axiosInstance} from "../middleware/jwt.js";
import {Button, Input, Modal, Tab, Tabs, useDisclosure} from "@nextui-org/react";
import {ThumbnailImageProps} from "react-grid-gallery";
import {Gallery} from "react-grid-gallery";
import {ImageList, ImageListItem} from "@mui/material";
import {NavLink, useParams} from "react-router-dom";
import {Post} from "../components/Post.jsx";

export const User = () => {
    const baseSkip = 1;
    const [meInfo, setMeInfo] = useState({});
    const [photos, setPhotos] = useState([]);
    const [skip, setSkip] = useState(0);
    const [hasMore, setHasMore] = useState(true);

    const [skip_posts, setSkipPosts] = useState(0);
    const [hasMorePosts, setHasMorePosts] = useState(true);

    const [searchTag, setSearchTag] = useState('');
    const [searchTagPhotos, setSearchTagPhotos] = useState('');

    const {id} = useParams();
    const [iid, setiId] = useState('');

    const [haha1, setHaha1] = useState(false)


    useEffect(() => {
        axiosInstance.get(`http://45.61.149.220:3000/users/${id}`).then((response) =>
            setMeInfo(response.data?.user)
        )
        console.log('User fetched');
        console.log(meInfo);
    }, [])


    useEffect(() => {
        axiosInstance.post(`http://45.61.149.220:3000/photo/filter`, {
            filter: {author: id, $or:[{description: {$regex: searchTagPhotos}}, {title:{$regex:searchTagPhotos}}]},
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
    }, [id, skip, haha1])
    const [posts, setPosts] = useState([]);
    const [haha, setHaha] = useState(false)



    useEffect(() => {
        axiosInstance.post(`http://45.61.149.220:3000/post/find`, {
            filter: {userId: id, $or:[{text: {$regex: searchTag}}, {title:{$regex:searchTag}},{tags:{$in:searchTag.split(' ')}}]},
            limit: 1,
            skip: skip_posts
        }).then((response) => {
            console.log(response.data)
            if (response.data.length == 0) {
                setHasMore(false);
            } else {
                setPosts([...posts, ...response.data])
                console.log('+++++esfwerwe+++++++')

            }
        })
    }, [id, skip_posts, haha])


    const {isOpen, onOpen, onClose} = useDisclosure();


    return (
        <div>
            <div className="flex flex-row min-w-100 justify-between text-xl">
                <div className="">{meInfo.name}'s album</div>
                <div className="">{meInfo.email}</div>
            </div>

            <Tabs variant="underlined">
                <Tab key="photos" title="Photos">
                    <Input
                        placeholder={"Search"}
                        value={searchTagPhotos}
                        onChange={(event) => setSearchTagPhotos(event.target.value)}
                    />
                    <Button onPress={()=>{
                        setSkip(0);
                        setPhotos([]);
                        setHaha1(!haha1);
                        setHasMore(true);
                    }}>
                        Search
                    </Button>


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
                </Tab>
                <Tab key="music" title="Posts">
                    <Input
                        placeholder={"Search"}
                        value={searchTag}
                        onChange={(event) => setSearchTag(event.target.value)}
                    />
                    <Button onPress={()=>{
                        setSkipPosts(0);
                        setPosts([]);
                        setHaha(!haha);
                        setHasMorePosts(true);
                    }}>
                        Search
                    </Button>
                    <div className="flex flex-col w-full justify-center align-baseline content-center flex-wrap">
                        {posts.map(value => (
                            <Post post_info={value} key={value._id}/>
                        ))}
                    </div>
                    { hasMorePosts && <Button onClick={() => setSkipPosts(skip_posts + baseSkip)}>Load more</Button>}
                    { !hasMorePosts && <Button disabled={true}>No more images</Button>}
                </Tab>
            </Tabs>


        </div>

    )
}