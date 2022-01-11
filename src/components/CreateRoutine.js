import React, { useState } from 'react'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { addAsana } from '../api/asana'

const CreateRoutine = (props) => {
    const { msgAlert, user } = props
    console.log('props in Create Routine', props)

    // Define States
    const [difficulty, setDifficulty] = useState('')
    const [savedPose, setSavedPose] = useState([])

    //***************** Change Handler Function for drop-down difficulty level *****************/
    const handleChange = (e) => {
        console.log('this is e', e)
        setDifficulty(e)
    }

    //**************** Add pose to Routine *******************/
    const addPose = (e) => {
        // Need to add to state
    }
    //*************** Map loop to iterate through selected difficulty level and display poses ******************/
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
                            <Button variant="primary" onClick={() => addPose(p)}>Add to Routine</Button>
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
                            <Button variant="primary" onClick={() => addPose(p)}>Add to Routine</Button>
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
                        <Button variant="primary" onClick={() => addPose(p)}>Add to Routine</Button>
                    </Card.Body>
                </Card>
            )
        }
    })

    // Create drag and drop list for selected poses.  Add in remove functionality as well.  Also, a timer in the selected poses section.  If overall timer is longer than cumulitive pose timer, adjust pose timers to equal overall timer

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
                <div className="buildRoutine">
                    
                </div>
            </div>
        </>
    )
}

export default CreateRoutine