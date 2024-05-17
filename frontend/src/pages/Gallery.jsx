import {Button, Input, useDisclosure} from "@nextui-org/react";
import PhotoModal from "../components/PhotoModal.jsx";
import {ImageList, ImageListItem} from "@mui/material";
import {useEffect, useState} from "react";
import {axiosInstance} from "../middleware/jwt.js";
import {Photo} from "../components/Photo.jsx";
import {SearchIcon} from "../assets/SearchIcon.jsx";
import {useHasChanged} from "../hooks/useHasChanged.js";
import {useSelector} from "react-redux";

export const Gallery = () => {
    const m1 = useDisclosure({id:'1'});
    const m2 = useDisclosure({id:'2'});
    const [photos, setPhotos] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [skip, setSkip] = useState(0);
    const [iid, setiId] = useState('');

    const [searchTag, setSearchTag] = useState('')
    const [haha, setHaha] = useState(false)

    const user = useSelector((state)=>state.user.token)


    useEffect(() => {
        axiosInstance.post(`http://45.61.149.220:3000/photo/filter`, {
            filter: {$or:[{description: {$regex: searchTag}}, {title:{$regex:searchTag}}]},
            limit: 1,
            skip: skip
        }).then((response) => {
            if (response.data.images.length == 0) {
                setHasMore(false);
            } else {
                setPhotos([...photos, ...response.data.images])
                // console.log('++++++++++++')
                // console.log(photos)
            }
        }).catch(response => alert(response))
    }, [skip, haha])

    let baseSkip = 1 ;
    return (
        <>
            { user &&<Button onPress={m1.onOpen}>
                Post Photo
            </Button>}
            <PhotoModal isOpen={m1.isOpen} onOpen={m1.onOpen} onOpenChange={m1.onOpenChange}/>
            <div className="flex flex-row">
            <Input
                label="Search"
                isClearable
                radius="lg"
                classNames={{
                    label: "text-black/50 dark:text-white/90",
                    input: [
                        "bg-transparent",
                        "text-black/90 dark:text-white/90",
                        "placeholder:text-default-700/50 dark:placeholder:text-white/60",
                    ],
                    innerWrapper: "bg-transparent",
                    inputWrapper: [
                        "shadow-xl",
                        "bg-default-200/50",
                        "dark:bg-default/60",
                        "backdrop-blur-xl",
                        "backdrop-saturate-200",
                        "hover:bg-default-200/70",
                        "dark:hover:bg-default/70",
                        "group-data-[focused=true]:bg-default-200/50",
                        "dark:group-data-[focused=true]:bg-default/60",
                        "!cursor-text",
                    ],
                }}
                placeholder="Type to search..."
                startContent={
                    <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                }
                value={searchTag}
                onChange={(e)=>{setSearchTag(e.target.value)}}
            />
            <Button onPress={()=>{
                setSkip(0);
                setPhotos([]);
                setHaha(!haha);
                setHasMore(true);
            }}>
               Search
            </Button>
            </div>

            <ImageList variant="masonry" cols={3} gap={8}>
                {photos.map((item) => (
                    <ImageListItem key={item._id} >
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
                    </ImageListItem>
                ))}
            </ImageList>
            <Photo id={iid} onOpen={m2.onOpen} isOpen={m2.isOpen} onClose={m2.onClose}/>
            { hasMore && <Button onClick={() => setSkip(skip + baseSkip)}>Load more</Button>}
            { !hasMore && <Button disabled={true}>No more images</Button>}

        </>
    )
}