import { getSelectedRoutine } from "../api/routine"
import { useEffect, useState, createRef } from 'react'
import { useParams } from "react-router";
import 'react-slideshow-image/dist/styles.css'
import { Slide } from "react-slideshow-image"

const StartRoutine = (props) => {
    const { user } = props
    const routineId = useParams()
    const slideRef = createRef()
    const [selectedRoutine, setSelectedRoutine] = useState([])
    let slideImages = []
    //******************** useEffect to call database and pull in selected routine from profile page *******************/
    useEffect(() => {
        getSelectedRoutine(user, routineId)
            .then(res => {
                console.log("Res from API call: ", res)
                res = Object.values(res.data.routine)
                setSelectedRoutine(res)
            })
            .then(res => {
                console.log("setSelectedRoutine has ran!")
                getImages()
                console.log("selectedRoutine is: ", selectedRoutine[2][1].imageUrl)
            //     for (let i = 0; i < selectedRoutine[2].length; i++) {
            //         slideImages.push(selectedRoutine[2][i].imageUrl)
            //     }
            })
            .catch(error => {
                console.log("error resolving", error)
            })
    }, [])

    console.log("Slide images: ", slideImages)
    // let timeleft = 10
    // let slideshowTimer = setInterval(function () {
    //     if (timeleft <= 0) {
    //         clearInterval(slideshowTimer)
    //     }
    //     document.getElementById("routineTimer").value = 10 - timeleft
    //     timeleft -= 1
    // }, 1000)

    const getImages = () => {
        for (let i = 0; i < selectedRoutine[2].length; i++) {
            slideImages.push(selectedRoutine[2][i].imageUrl)
        }
    }

    const properties = {
        duration: 5000,
        autoplay: false,
        transitionDuration: 500,
        arrows: false,
        infinite: true,
        easing: "ease",
        indicators: (i) => <div className="indicator">{i + 1}</div>
    }

    return (
        <>
            <div>
                <div className="App">
                    <h3>Slide Effect</h3>
                    <div className="slide-container">
                        <Slide ref={slideRef} {...properties}>
                            {slideImages.map((each, index) => (
                                <div key={index} className="each-slide">
                                    <img className="lazy" src={each} alt="sample" />
                                </div>
                            ))}
                        </Slide>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StartRoutine