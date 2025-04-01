import { useQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const Img = ({src, alt, ...props}) => {
    const {data: imgObject} = useQuery({
        queryKey: src,
        queryFn: () => new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = src;
        }),
        suspense: true
    });
    return <img src={imgObject.src} alt={alt} {...props}/>
};

const Avatar = ({src, alt, fallbackSrc, ...props}) => {
    return (
        <div className="user-avatar">
            <Suspense fallback={<img src={fallbackSrc} alt="Fallback Avatar"/>}>
                <Img src={src} alt={alt} {...props}/>
            </Suspense>
        </div>
    )
};

export default Avatar;