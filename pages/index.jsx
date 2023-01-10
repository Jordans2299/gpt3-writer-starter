import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';
import mattLevinePic from '../assets/matt_pic.jpeg';
import { useState } from 'react';

const Home = () => {

  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }


  const userInputChange = (event) => {
    console.log(event.target.value)
    setUserInput(event.target.value)
  }

  return (
    <div className="root">
      <Head>
        <title>GPT-3 Writer | buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Matt Levine Bot</h1>
          </div>
          <Image src={mattLevinePic} height={170} width={200} alt="buildspace logo" />
          <div className="header-subtitle">
            <h2>Give a boring finance topic and I'll give a comprehensive explanation with a hint of deadpan humor</h2>
          </div>
        </div>
      </div>
      <div className='prompt'>
        <textarea value={userInput} name="" id="" cols="50" rows="10" onChange={userInputChange} placeholder='type your prompt here...'></textarea>
      </div>
      <div className='prompt-btns'>
        <button onClick={callGenerateEndpoint}>Generate</button>
      </div>
      {apiOutput && (
  <div className="output">
    <div className="output-header-container">
      <div className="output-header">
        <h3>Output</h3>
      </div>
    </div>
    <div className="output-content">
      <p>{apiOutput}</p>
    </div>
  </div>
)}
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-writer"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
