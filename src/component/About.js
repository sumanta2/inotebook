import { useEffect } from 'react';
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import lottie from 'lottie-web'
import styled from 'styled-components'
import AboutImg from '../animation/89683-user-reviews.json'
const About = () => {
    useEffect(() => {
        lottie.loadAnimation({
            container: document.querySelector("#useLottie"),
            animationData: AboutImg
        });
    }, []);

    const InnerDiv = styled.div`
        display:flex;
        justify-content:center;
        align-item:center;
        flex-direction:column;
        { /* border:2px solid red; */}
        width:35vw;
        margin:7px;
        height:55vh;
    `
    const LogoDiv = styled.div`
        display:flex;
    `

    return (
        <>
            <div className=' d-flex flex-column justify-content-center align-items-center' style={{ 'backgroundColor': 'rgb(153 233 255)', 'width': '80vw', 'height': '76vh' }}>
                <h1>Welcome</h1>
                <div style={{ 'display': "flex", 'flexDirection': 'row' }}>
                    <InnerDiv>
                        <LogoDiv><IoCheckmarkCircleOutline style={{ 'margin': '6px' }} /><p>after log-in you can store your note </p></LogoDiv>
                        <LogoDiv><IoCheckmarkCircleOutline style={{ 'margin': '6px' }} /><p>All notes are secure by userId and Password</p></LogoDiv>
                        <LogoDiv><IoCheckmarkCircleOutline style={{ 'margin': '6px' }} /><p>It is created by MERN stack technology</p></LogoDiv>
                    </InnerDiv>
                    <InnerDiv id="useLottie"></InnerDiv>
                </div>


            </div>
        </>
    )
}

export default About;