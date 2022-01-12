import React, { useState, useEffect } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const CreateRoutine = (props) => {
    const { msgAlert, user } = props
    console.log('props in Create Routine', props)

    //********************* Define States *******************//
    const [difficulty, setDifficulty] = useState('')
    let [addPose, setAddPose] = useState([])

    //***************** Handler to change drop-down difficulty level *****************/
    const handleChange = (e) => {
        // console.log('this is e', e)
        setDifficulty(e)
    }

    //**************** Handler to add pose to Routine *******************/
    const addNewPose = (e) => {
        console.log("This is what's being saved to pose: ", e)
        setAddPose([...addPose, e])
        console.log('Spread Operator', addPose)
    }

    //******************* Handler Clear User Routine Panel ******************/
    function clearRoutinePane() {
        setAddPose([])
    }

    //******************** Handler for Drag and Drop ******************/
    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const poses = Array.from(addPose);
        const [reorderedItem] = poses.splice(result.source.index, 1);
        poses.splice(result.destination.index, 0, reorderedItem);
        console.log("Updated state of addedPoses: ", addPose)
        setAddPose(poses);
    }

    //*************** Loop to iterate through selected difficulty and display ******************/
    const allPoses = props.pose.map((p, i) => {
        if (difficulty === 'beginner') {
            while (p.difficulty === 'beginner') {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={p.imageUrl} alt={p.englishName} />
                        <Card.Body>
                            <Card.Title>{p.englishName}</Card.Title>
                            <Card.Text>
                                {p.sanskritName}
                            </Card.Text>
                            <Card.Text>
                                Difficulty: {p.difficulty}
                            </Card.Text>
                            <Button variant="primary" onClick={() => addNewPose(p)}>Add to Routine</Button>
                            <Link to={`/posedetail/${p._id}`}>
                                <Button variant="primary">Show Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                )
            }
        }
        else if (difficulty === 'intermediate') {
            while (p.difficulty === 'intermediate' || p.difficulty === 'beginner') {
                return (
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={p.imageUrl} alt={p.englishName} />
                        <Card.Body>
                            <Card.Title>{p.englishName}</Card.Title>
                            <Card.Text>
                                {p.sanskritName}
                            </Card.Text>
                            <Card.Text>
                                Difficulty: {p.difficulty}
                            </Card.Text>
                            <Button variant="primary" onClick={() => addNewPose(p)}>Add to Routine</Button>
                            <Link to={`/posedetail/${p._id}`}>
                                <Button variant="primary">Show Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                )
            }
        }
        else {
            return (
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={p.imageUrl} alt={p.englishName} />
                    <Card.Body>
                        <Card.Title>{p.englishName}</Card.Title>
                        <Card.Text>
                            {p.sanskritName}
                        </Card.Text>
                        <Card.Text>
                            Difficulty: {p.difficulty}
                        </Card.Text>
                        <Button variant="primary" onClick={() => addNewPose(p)}>Add to Routine</Button>
                        <Link to={`/posedetail/${p._id}`}>
                            <Button variant="primary">Show Details</Button>
                        </Link>
                    </Card.Body>
                </Card>
            )
        }
    })

    return (
        <>
            <div className="routinePage">
                <div className="asanaCards">
                    <h2>Create Routine Page</h2>
                    <DropdownButton id="dropdown-basic-button" title={difficulty} onSelect={handleChange}>
                        <Dropdown.Item eventKey='beginner'>Beginner</Dropdown.Item>
                        <Dropdown.Item eventKey='intermediate'>Intermediate</Dropdown.Item>
                        <Dropdown.Item eventKey='advanced'>Advanced</Dropdown.Item>
                    </DropdownButton>
                    <ul>
                        {allPoses}
                    </ul>
                </div>
                <div className="practicePane">
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="addToPractice">
                            {(provided) => (
                                <ul className="practice" {...provided.droppableProps} ref={provided.innerRef}>
                                    {addPose.map(({ englishName, sanskritName, imageUrl }, index) => {
                                        return (
                                            <Draggable key={englishName} draggableId={englishName} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <div className="practiceCard">
                                                            <img src={imageUrl} alt={`${englishName}} Thumb`} height="70px" width="70px" />
                                                            <p>
                                                                {englishName}
                                                            </p>
                                                            <p>
                                                                {sanskritName}
                                                            </p>
                                                        </div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </ul>
                            )}
                        </Droppable>
                    </DragDropContext>
                    <button onClick={() => clearRoutinePane()}>Clear</button>
                </div>
                {/* <div className="buildRoutine">
                    <ul className="buildPractice">
                        {displayPose}
                    </ul>
                </div> */}
            </div>
        </>
    )
}

export default CreateRoutine