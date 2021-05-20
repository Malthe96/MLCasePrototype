import React from 'react'
import { Container, Card } from 'react-bootstrap'

export default function LearnMore() {
    return (
        <div>
            <Container className="mt-3">
                <Card className="d-flex align-items-center justify-content-center" style={{paddingRight: "50px", paddingLeft: "50px", textAlign: "justify"}}>
                    <h1 className="mt-2 pb-2">What is the Machine Learning Case Tool?</h1>
                    <p>Artificial intelligence is becoming an industry standard for many technologies in the modern timeage, which have far reaching societal impacts. Through these advances machine learning is becoming an increasing part of everyday life, where data is collected and analyzed forming dark patterns used by the industry. The increasingly intrusive use of ML in modern society, requires the modern individual to understand ML to avoid being exploited unknowingly. Being able to interact with transparent ML systems, could help users understand different aspects of ML and give them the tools to actively analyze systems used in their daily lives. Algorithms are rarely transparent enough to reveal true intentions and with modern models inhabiting inherent bias and hyper nudging, pinpointing that computational thinking is no longer a trait of computer scientists, but a fundamental skill everyone should inhabit to navigate in modern times.</p>
                    <p>The Machine Learning Case Tool was created to give teachers and students an outlet, where they can explore machine learning through realistic scenarios. The cases represented in the tool reflect both negative and positive sides of machine learning and setting them into realistic societal cases. The tool hopes to give students the ability to both analyze and be critical towards machine learning, so they can navigate an ever-increasing technological future, where society is integrated with machine learning technologies. </p>
                    <p>As a teacher we recommend teaching the students about fundamentals of machine learning before having them engage with the tool. Once the students have a basic building block for learning, they can engage with the tool and understand the aspects of the different cases better. The students are encouraged to work with the cases and reflect upon the cases both before and after using the tool. Ideally as a teacher, you can correlate the tool usage with a project/paper where students can reflect on their chosen case/cases or bring it up in a class discussion.</p>
                    <p>The tool has been built in React and funtions with a backend written in Flask / Python. Machine learning is supported through tensorflow and Keras API based on Google's facerecognition layers.</p>
                    <p>The project is written in correlation with a Bachelor project regarding the importance of teachine machine learning to young people because of the increase of machine learning in society, and the code is open source and can be found on: <a href="https://github.com/Malthe96/">Github/malthe96</a> </p> 
                </Card>
            </Container>
        </div>
    )
}
