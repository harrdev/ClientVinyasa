import React, { useState, useEffect } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { addRoutine } from '../api/routine'
import StartRoutine from './StartRoutine'

const CreateRoutine = (props) => {
    const { msgAlert, user } = props
    console.log('props in Create Routine', props)

    //********************* Define States *******************//
    const [difficulty, setDifficulty] = useState('')
    let [addPose, setAddPose] = useState([])
    const [formData, setFormData] = useState({ name: '', routine: [] })
    // FOR FORM SUBMISSION, WE WILL NEED TO ASSIGN formData.name AND formData.routine

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
        console.log("Current form data: ", formData)
        setAddPose([])
    }

    //******************** Handler for Drag and Drop ******************/
    function handleOnDragEnd(result) {
        const poses = Array.from(addPose);
        const [reorderedItem] = poses.splice(result.source.index, 1);
        if (!result.destination) {
            poses.splice(result.source.index, 0)
        } else {
            poses.splice(result.destination.index, 0, reorderedItem);
        }
        console.log("Updated state of addedPoses: ", addPose)
        setAddPose(poses);
    }

    //*************** Handler for form submit *****************/
    // NEEDS TO BE FINISHED - NOT FUNCTIONAL
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormData({'name': addPose})
        setFormData({'routine': addPose})
        console.log("This is the submitted form data: ", formData)
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
                            <Button variant="success" onClick={() => addNewPose(p)}>Add to Routine</Button>
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
                            <Button variant="success" onClick={() => addNewPose(p)}>Add to Routine</Button>
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
                <div>
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
                            <Button variant="success" onClick={() => addNewPose(p)}>Add to Routine</Button>
                            <Link to={`/posedetail/${p._id}`}>
                                <Button variant="primary">Show Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    })

    return (
        <>
        <StartRoutine routine={addPose} />
            <div className="routinePage">
                <div className="asanaCards">
                    <h2 className="pageTitle">Selected Difficulty Poses</h2>
                    <div className="difficulty">
                        <DropdownButton id="dropdown-item-button" title={difficulty} onSelect={handleChange}>
                            <Dropdown.Item eventKey='beginner'>Beginner</Dropdown.Item>
                            <Dropdown.Item eventKey='intermediate'>Intermediate</Dropdown.Item>
                            <Dropdown.Item eventKey='advanced'>Advanced</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <ul>
                        <div className="flex-container">
                            {allPoses}
                        </div>
                    </ul>
                </div>
                <div className="practicePane">
                    <h2 className="pageTitle">Create your Routine</h2>
                    <form onSubmit={handleSubmit} className="routineForm">
                        <label for="name"></label>
                        <input type="text" id="name" name="name" value=""></input>
                        <input type="hidden" id="routine" name="routine" value={addPose}></input>
                        <input type="submit" value="Submit"></input>
                    </form>
                    <button onClick={() => clearRoutinePane()}>Clear</button>
                            <Link to={'/startroutine'}>
                                <Button variant="primary">Start Routine</Button>
                            </Link>
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