import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {Photo} from "../components/Photo.jsx";
import {axiosInstance} from "../middleware/jwt.js";

export const User = () => {

    const user = useSelector((state) => state.user)
    const [meInfo, setMeInfo] = useState({});
    const [photos, setPhotos] = useState([]);
    const [skip, setSkip] = useState(0);

    useEffect(()=>{
        axiosInstance.get(`http://localhost:3000/users/${user.user.id}`).then((response) =>
            setMeInfo(response.data)
        )
        console.log('User fetched');
    }, [])


    useEffect(()=>{
        axiosInstance.post(`http://localhost:3000/photo/filter`,{
            filter:{author: user.user.id},
            limit: 30,
            skip: skip
        }).then((response) => {
            setPhotos([...photos, ...response.data.images])
            setSkip(skip + response.data.length)
            console.log(photos)
        })
    }, [user.user])
    function fetchData (){
        axiosInstance.post(`http://localhost:3000/photo/filter`,{
            filter:{author: user.user.id},
            limit: 30,
            skip: skip
        }).then((response) => {
            setPhotos([...photos, ...response.data.images])
            setSkip(skip + response.data.length)
            console.log(photos)
        })
    }


    return (
        <div>
            <div>Some user information</div>
            <InfiniteScroll
                dataLength={photos.length} //This is important field to render the next data
                next={fetchData}
                hasMore={true}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>Yay! You have seen it all</b>
                    </p>
                }
            >
                {photos.map((i, index) => (
                    <Photo _id={i._id} base64String={i.data.data} author={i.author} title={i.title} key={number}/>
                ))}
            </InfiniteScroll>
        </div>

    )
}