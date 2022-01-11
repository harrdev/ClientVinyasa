import { useParams } from "react-router";
import { useState, useEffect } from 'react'
import { getAsanas } from "../api/asana";

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
            <h2>Pose Detail Page</h2>
            <h2>Pose Selected: {poseContent.englishName}</h2>

            </div>
        </>
    )
}


export default PoseDetail