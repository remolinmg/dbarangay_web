import styled from 'styled-components';
import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';


// AYAW GUMANA DIWAG
const StyledChatBot = styled(ChatBot)`
  position: relative;
  top: -80px; 
`;


// DESIGN HMPN
const theme = {
  background: '#8FC9FF',
  headerBgColor: '#3375ff',
  headerFontSize: '20px',
  botBubbleColor: '#0F3789',
  headerFontColor: 'white',
  botFontColor: 'white',
  userBubbleColor: '#ffbd33',
  userFontColor: 'white',
};

const config = {
    botAvatar: require('../user-components/assets/img/bot2.png').default,
    floating: true,
};


function Bot() {
  const steps = [
    {
      id: "GREET",
      message: "Hello! Welcome to our Website!",
      trigger: "Ask Name"
    },
    {
      id: "Ask Name",
      message: "Please write your username",
      trigger: "waiting1"
    },
    {
      id: "waiting1",
      user: true,
      trigger: "Name"
    },
    {
      id: "Name",
      message: "Hi {previousValue}, how can I help you?",
      trigger: "options"
    },
    {
      id: "options",
      options: [
        { value: "Apply Clearance", label: "How can I apply for a barangay clearance?", trigger: "Apply Clearance" },
        { value: "Event Requirements", label: "What are the requirements for conducting an event in the barangay?", trigger: "Event Requirements" },
        { value: "Report", label: "How can I report a noise complaint in the barangay?", trigger: "Report" },
      ],
    },
      {
        id: "Apply Clearance",
        message: "To apply for a barangay clearance, you need to visit the barangay hall and bring the necessary documents such as valid identification, proof of residence, and any other supporting documents required by your barangay.",
        trigger: "AnotherQuestion"
      },
      {
        id: "Event Requirements",
        message: "To conduct an event in the barangay, you need to secure a permit from the barangay office. The specific requirements may vary depending on the nature and scale of the event.",
        trigger: "AnotherQuestion"
      },
      {
        id: "Report",
        message: "If you have a noise complaint within the barangay, you can report it to the barangay office. Contact the barangay hall or visit in person to file a complaint. Provide specific details such as the location, time, and nature of the noise disturbance.",
        trigger: "AnotherQuestion"
      },
      {
        id: "AnotherQuestion",
        message: "Do you have another question?",
        trigger: "NextOptions"
      },
      {
        id: "NextOptions",
        options: [
          { value: "yes", label: "Yes", trigger: "options" },
          { value: "none", label: "None", trigger: "ThankYou" },
        ],
      },
      {
        id: "ThankYou",
        message: "Okay! We hope we answered all the questions you needed. Thank you so much!",
        end: true,
      },
    ];
   

    return (
      <div className="Bot container-fluid">
        <ThemeProvider theme={theme}>
          <StyledChatBot
            headerTitle='FAQ BOT'
            steps={steps}
            {...config}
          />
        </ThemeProvider>
      </div>
    );
  }


  export default Bot;