import React, { useState, useEffect } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { addRoutine } from '../api/routine'

const CreateRoutine = (props) => {
    const { msgAlert, user } = props
    console.log('props in Create Routine', props)

    //********************* Define States *******************//
    const [difficulty, setDifficulty] = useState('')
    let [addPose, setAddPose] = useState([])
    const [formData, setFormData] = useState({ name: '', routine: [] })
    // FOR FORM SUBMISSION, WE WILL NEED TO ASSIGN formData.name AND formData.routine FROM THE SUBMIT

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

    //*************** Handler for form submit *****************/
    // NEEDS TO BE FINISHED - NOT FUNCTIONAL
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData()
        addRoutine(user, formData)
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
                <Card className="cards" style={{ width: '18rem' }}>
                    <Card.Img variant="top" className="cards" src={p.imageUrl} alt={p.englishName} />
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
                    <h2 className="pageTitle">Selected Difficulty Poses</h2>
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
                    <h2 className="pageTitle">Create your Routine</h2>
                    <form onSubmit={handleSubmit} className="routineForm">
                        <label for="name"></label>
                        <input type="text" id="name" name="name" value=""></input>
                        <input type="hidden" value={addPose}></input>
                        <input type="submit" value="Submit"></input>
                    </form>
                    <button onClick={() => clearRoutinePane()}>Clear</button>
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
                                                            <img src={imageUrl} className="addedCards" alt={`${englishName}} Thumb`} />
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
                </div>
            </div>
        </>
    )
}

export default CreateRoutine