import { useState } from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { db } from "../../firebase";
import { Button } from "@material-ui/core";

function ViewData({title,desc,images,d_id}) {
    const [show, setShow] = useState(false)
    console.log(images)

    function handleDelete(){
        db.collection('userManual').doc(d_id).delete()
    }
    return (
        <div className="bg-white w-full xl:w-11/12 mt-5 px-6 py-8 xl:px-16 lg:py-16 shadow-lg">
        <div className="flex w-full justify-between lg:justify-start items-center">
            <h1 className="text-color font-black text-3xl lg:text-5xl  lg:mr-8">{title}</h1>
            <button className="w-10 h-10 bg-gray-100 focus:outline-none  flex items-center justify-center rounded-full" onClick={() => setShow(!show)}>
                {show ? (
                    <svg id="andicators1" xmlns="http://www.w3.org/2000/svg" width={18} height={12} viewBox="0 0 18 12" fill="none">
                        <path d="M9.00002 4.73399L2.40001 11.334L0.514683 9.44865L9.00002 0.963319L17.4854 9.44865L15.6 11.334L9.00002 4.73399Z" fill="#4A5568" />
                    </svg>
                ) : (
                    <svg id="andicators" className xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 32 32" fill="none">
                        <path d="M16 17.5626L22.6 10.9626L24.4853 12.848L16 21.3333L7.51465 12.848L9.39998 10.9626L16 17.5626Z" fill="#4A5568" />
                    </svg>
                )}
            </button>
        </div>
        <div className="pt-3">
            <p className="text-2xl f-f-r lg:w-10/12">{desc}</p>
        </div>
        {show && (
            <div>
               <Carousel>
                   {
                       images.map((data) => (
                             <div>
                    <img src={data} />
                   
                </div>
                       ))
                   }
               
               
            </Carousel>
            </div>
        )}
        <div>
            <Button onClick={handleDelete}>delete</Button>
        </div>
    </div>
    )
}

export default ViewData
