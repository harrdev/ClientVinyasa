const CreateRoutine = (props) => {
    // const { msgAlert, user } = props
    console.log('props in Create Routine', props)

    // Create drowpdown list to select beginner, intermediate, advanced

    // For loop to pull in poses based on selection from drop down.  Iterate through and attach to a card to display.  Assign an add button, or incorporate into the drag and drop.  Make clickable to open up detail page with description and other things
    const allPoses = props.pose.map((p, i) => {
        return (
        <li key={i}>
            <div id="allPoses">
                <div className="poseDiv" id="allPoses">
                    <div className="poseInfo" id="poseEngName">
                        English Name: {p.englishName}
                    </div>
                    <div className="poseInfo" id="poseSanName">
                        Sanskrit Name: {p.sanskritName}
                    </div>
                    <div className="poseInfo" id="poseImgUrl">
                        {p.imageUrl}
                    </div>
                </div>
            </div>
        </li>
        )
    })

    // Create drag and drop list for selected poses.  Add in remove functionality as well.  Also, a timer in the selected poses section.  If overall timer is longer than cumulitive pose timer, adjust pose timers to equal overall timer
    return (
        <>
            <div>
                <h2>Create Routine Page</h2>
                <ul>
                    {allPoses}
                </ul>
            </div>

        </>
    )
}

export default CreateRoutine