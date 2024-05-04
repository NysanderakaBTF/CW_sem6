import {Button, Input, useDisclosure} from "@nextui-org/react";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {axiosInstance} from "../middleware/jwt.js";
import {NavLink, useNavigate} from "react-router-dom";
import {Post} from "../components/Post.jsx";

export const Posts = () => {

    let baseSkip = 1 ;
    const m1 = useDisclosure({id:'1'});
    const m2 = useDisclosure({id:'2'});
    const [photos, setPhotos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const [iid, setiId] = useState('');

    const [searchTag, setSearchTag] = useState('')
    const [tagArray, setTagArray] = useState([])
    const [haha, setHaha] = useState(false)
    const navigate = useNavigate()

    const user = useSelector((state)=>state.user.token)


    useEffect(() => {
        axiosInstance.post(`http://localhost:3000/post/find`, {
            filter: {$or:[{description: {$regex: searchTag}}, {title:{$regex:searchTag}},{tags:{$in:tagArray}}]},
            limit: 1,
            skip: skip
        }).then((response) => {
            if (response.data.length == 0) {
                setHasMore(false);
            } else {
                setPhotos([...photos, ...response.data])

                console.log(photos)

            }
        })
    }, [skip, haha])


    return (
        <>
            <Input
                placeholder={"Search"}
                value={searchTag}
                onChange={(event) => setSearchTag(event.target.value)}
            />
            <Button onPress={()=>{
                setSkip(0);
                setPhotos([]);
                setHaha(!haha);
                setHasMore(true);
            }}>
                Search
            </Button>
            <div className="flex flex-col w-full justify-center align-baseline content-center flex-wrap">
                {photos.map(value => (
                    <Post post_info={value} key={value._id}/>
                ))}
            </div>
            <Button >
                <NavLink to='/posts/create'>Post</NavLink>
            </Button>

            { hasMore && <Button onClick={() => setSkip(skip + baseSkip)}>Load more</Button>}
            { !hasMore && <Button disabled={true}>No more images</Button>}

        </>
    )
}