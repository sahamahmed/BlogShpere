import { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";



export const Loadingbar = () => {
 const [progress, setProgress] = useState(0);

 useEffect(()=>{
    setProgress(40) 
    setTimeout(setProgress(75), 300);
    setTimeout((setProgress(100)), 300)
 }, [])

 return (
   <LoadingBar
   height={3}
     color="#00008B"
     progress={progress}
     onLoaderFinished={() => setProgress(0)}
   />
 );
}

