import { useParams } from "react-router";

const PoseDetail = (props) => {
    // UseParams pulling in URL ID to match to pose props to match up pose data
    const poseId = useParams()
    console.log("Props: ", props.pose)
    let poseContent = props.pose.filter(name => name._id === poseId.id)
    poseContent = poseContent[0]
    console.log("poseContent =: ", poseContent)
    return (
        <>
            <div>
                <h2>{poseContent.englishName}</h2>
                <h2>{poseContent.sanskritName}</h2>
                <p>{poseContent.description}</p>
                <img className="poseDetail" src={poseContent.imageUrl} alt="Pose"></img>
            </div>
        </>
    )
}

export default PoseDetail