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
    let [slides, setSlides] = useState([])


    //******************** useEffect to call database and pull in selected routine from profile page *******************/
    useEffect(() => {
        console.log("Slides are: ", slides)
        getSelectedRoutine(user, routineId.id)
            .then(res => {
                let result = res.data.routine.routine
                setSelectedRoutine(result)
                return result
            })
            .then(routine => {
                let slideInfo = []
                if (routine.length > 0) {
                    for (let i = 0; i < routine.length; i++) {
                        slideInfo.push(routine[i])
                    }
                    setSlides(slideInfo)
                }
            })
            .catch(error => {
                console.log("error resolve", error)
            })
    }, [])

    // ***************************** Properties for slideshow ***********************//
    const properties = {
        duration: 5000,
        autoplay: true,
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
                    <div className="slide-container">
                        <Slide ref={slideRef} {...properties}>
                            {slides.map((e, index) => (
                                <div key={index} className="each-slide">
                                    <h2>{e.englishName}</h2>
                                    <img className="images" src={e.imageUrl} alt={e.englishName} />
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