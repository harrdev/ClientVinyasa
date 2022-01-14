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
    const [name, setName] = useState([])
    let [slides, setSlides] = useState([])
    let [change, setChange] = useState(false)
    console.log("routineID is: ", routineId)
    
    
    //******************** useEffect to call database and pull in selected routine from profile page *******************/
    useEffect(() => {
        console.log("Slides are: ", slides)
        getSelectedRoutine(user, routineId)
            .then(res => {
                let result = res.data.routine.routine
                console.log("Get name to pull out: ", res.data.routine)
                setSelectedRoutine(result)
                return result
            })
            .then(routine => {
                let names = []
                let slideImages = []
                if (routine.length > 0) {
                    for (let i = 0; i < routine.length; i++) {
                        slideImages.push(routine[i].imageUrl)
                        names.push(routine[i].englishName)
                    }
                    setSlides(slideImages)
                    setName(names)
                }
            })
            .catch(error => {
                console.log("error resolve", error)
            })
    }, [])

    // useEffect(() => {
    //     console.log("2nd useEffect image check: ", slides)
    // }, [slides])

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
                    <h3>Slide Effect</h3>
                    <div className="slide-container">
                        <Slide ref={slideRef} {...properties}>
                            {slides.map((each, index) => (
                                <div key={index} className="each-slide">
                                    <h2>{name}</h2>
                                    <img className="lazy" src={each} alt="pose" />
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