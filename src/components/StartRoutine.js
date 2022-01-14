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
    const [slides, setSlides] = useState([])
    //******************** useEffect to call database and pull in selected routine from profile page *******************/
    useEffect(() => {
        getSelectedRoutine(user, routineId)
            .then(res => {
                let result = res.data.routine.routine
                setSelectedRoutine(result)
                return result
            })
            .then(routine => {
                let slideImages = []
                if (routine.length > 0) {
                    for (let i = 0; i < routine.length; i++) {
                        slideImages.push(routine[i].imageUrl)
                    }
                    setSlides(slideImages)
                }
            })
            .catch(error => {
                console.log("error resolve", error)
            })
    }, [])

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
                    <button>Start</button>
                    <h3>Slide Effect</h3>
                    <div className="slide-container">
                        <Slide ref={slideRef} {...properties}>
                            {slides.map((each, index) => (
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