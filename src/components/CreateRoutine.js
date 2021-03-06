import React, { useState } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { addRoutine } from '../api/routine'
import apiUrl from '../apiConfig'

const CreateRoutine = (props) => {
    const { user } = props
    //********************* Define States *******************//
    const [difficulty, setDifficulty] = useState('')
    let [addPose, setAddPose] = useState([])
    const [formName, setFormName] = useState('')

    //***************** Handler to change drop-down difficulty level *****************/
    const handleChange = (e) => {
        setDifficulty(e)
    }

    //**************** Handler to add pose to Routine *******************/
    const addNewPose = (e) => {
        setAddPose([...addPose, e])
    }

    //******************* Handler Clear User Routine Panel ******************/
    function clearRoutinePane() {
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
        setAddPose(poses);
    }

    //*************** Handler for form submit *****************/
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormName(e.target.value)
        const formData = {
            name: formName,
            routine: addPose
        }
        addRoutine(formData, user)
    }

    const handleName = (e) => {
        e.preventDefault()
        setFormName(e.target.value)
    }

	

    //*************** Loop to iterate through selected difficulty and display ******************/
    const allPoses = props.pose.map((p, i) => {
        if (difficulty === 'beginner') {
            while (p.difficulty === 'beginner') {
                return (
                    <Card className="cards" style={{ width: '18rem' }}>
                        <Card.Img variant="top" className="cardImages" src={p.imageUrl} alt={p.englishName} />
                        <Card.Body>
                            <Card.Title>{p.englishName}</Card.Title>
                            <Card.Text>
                                {p.sanskritName}
                            </Card.Text>
                            <Card.Text>
                                Difficulty: {p.difficulty}
                            </Card.Text>
                            <Button className='button' variant="success" onClick={() => addNewPose(p)}>Add to Routine</Button>
                            <Link to={`/posedetail/${p._id}`}>
                                <Button className='button' variant="primary">Show Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                )
            }
        }
        else if (difficulty === 'intermediate') {
            while (p.difficulty === 'intermediate' || p.difficulty === 'beginner') {
                return (
                    <Card className="cards" style={{ width: '18rem' }}>
                        <Card.Img variant="top" className="cardImages" src={p.imageUrl} alt={p.englishName} />
                        <Card.Body>
                            <Card.Title>{p.englishName}</Card.Title>
                            <Card.Text>
                                {p.sanskritName}
                            </Card.Text>
                            <Card.Text>
                                Difficulty: {p.difficulty}
                            </Card.Text>
                            <Button className='button' variant="success" onClick={() => addNewPose(p)}>Add to Routine</Button>
                            <Link to={`/posedetail/${p._id}`}>
                                <Button className='button' variant="primary">Show Details</Button>
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
                        <Card.Img variant="top" className="cardImages" src={p.imageUrl} alt={p.englishName} />
                        <Card.Body>
                            <Card.Title>{p.englishName}</Card.Title>
                            <Card.Text>
                                {p.sanskritName}
                            </Card.Text>
                            <Card.Text>
                                Difficulty: {p.difficulty}
                            </Card.Text>
                            <Button className='button' variant="success" onClick={() => addNewPose(p)}>Add to Routine</Button>
                            <Link to={`/posedetail/${p._id}`}>
                                <Button className='button' variant="primary">Show Details</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                </div>
            )
        }
    })

    return (
        <>
            <div className="routinePage">
                <div className="asanaCards">
                    <h2 className="pageTitle">Build Your Practice</h2>
                    <div className="difficulty">
						<label htmlFor="dropdown-item-buttom">Select Difficulty</label>
                        <DropdownButton id="dropdown-item-button" className='button' title={difficulty} onSelect={handleChange}>
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
                    <h2 className="pageTitle">My Routine</h2>
					<p>Drag and drop to reorder and remove poses. Enter a name to save your practice.</p>
                    <form onSubmit={handleSubmit} action="/profile" className="routineForm">
                        <label for="name"></label>
                        <input type="text" id="name" name="name" value={formName} onChange={handleName}></input>
                        <input type="hidden" id="routine" name="routine" value={addPose}></input>
                        <input type="submit" className='button' value="Save"></input>
                    </form>
                    <button className='button' onClick={() => clearRoutinePane()}>Clear</button>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        <Droppable droppableId="addToPractice">
                            {(provided) => (
                                <ul className="practice" {...provided.droppableProps} ref={provided.innerRef}>
                                    {addPose.map(({ englishName, sanskritName, imageUrl }, index) => {
                                        return (
                                            <Draggable key={englishName} draggableId={englishName} index={index}>
											{/* <Draggable key={englishName} draggableId={englishName} index={index}> */}
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