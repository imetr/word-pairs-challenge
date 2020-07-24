/* 
1. Convert pairs to choices
2. Display choices
3.Speak current choice
4. Save current choice(dislay selected)
5. Check for match
6. Record selected choices
7. Get voices and split by language
8. Speak choice in voice
9. create reset function
10.Encourage and Discourage
*/
import React from "react";
import random from "../utils/random"

export default function Game ({pairs, langA, langB}) {
    const syntheticRef = React.useRef(window.speechSynthesis)
    const [choices, setChoices] = React.useState([]);
    const [current, setCurrent] = React.useState(null);
    const [selected, setSelected] = React.useState({});
    const [languageAVoices, setLanguageAVoices] = React.useState([]);
    const [languageBVoices, setLanguageBVoices] = React.useState([]);
    //keep track of the first and second word language selected
    const [langAVoiceSelected, setLangAVoiceSelected] = React.useState(null);
    const [langBVoiceSelected, setLangBVoiceSelected] = React.useState(null);


    React.useEffect(() => {
        setTimeout(() => {
            const voices = syntheticRef.current.getVoices()
            const voicesA = voices.filter ( voice => voice.lang.substr(0,2) === langA.code)
            setLanguageAVoices(voicesA)
            setLangAVoiceSelected(random(voicesA))


            const voicesB = voices.filter ( voice => voice.lang.substr(0,2) === langB.code)
            setLanguageBVoices(voicesB)
            setLangBVoiceSelected(random(voicesB))
        },100)
    }, [])

    React.useEffect(() => {
        const all = pairs.flatMap(([valueA, valueB]) =>{
            return [
                { lang:langA.code, value: valueA},
                { lang: langB.code, value: valueB}
            ]
        } )
        const sorted = all.sort(()=> Math.random() - 0.5)
        setChoices(sorted)
    }, [pairs])

    const isMatched = (choosedA, choosedB) => 
        pairs.some(([pairA, pairB]) =>
            (choosedA === pairA && choosedB === pairB) ||
            (choosedA === pairB && choosedB === pairA)
        )
    
    const correctCheer = () => {
      const encPhrases = [ "That's it", "Nice", "You the best"];
      const utterance = new SpeechSynthesisUtterance(random(encPhrases));
      syntheticRef.current.speak(utterance);
    }

    const uncorrectCheer = () => {
        const encPhrases = [ "Not this time", "Nope", "Ooops"];
        const utterance = new SpeechSynthesisUtterance(random(encPhrases));
        syntheticRef.current.speak(utterance);
      }

    const choose = ( choice ) => {
        //we need the computer to read out loud the value of the choice
        const utterance = new SpeechSynthesisUtterance(choice.value);
        utterance.voice = choice.lang === langA.code ? langAVoiceSelected : langBVoiceSelected;


        syntheticRef.current.speak(utterance);
        if (current){
            //second time word clicked
            if(isMatched(current.value, choice.value)){
                //match
                correctCheer()
                setSelected({...selected, [choice.value]: true })
            } else {
                //missmatch
                uncorrectCheer()
                setSelected({...selected, [current.value]: false })
            }
            setCurrent(null)
        } else {
            //first time a word is clicked
            setSelected({...selected, [choice.value]: true })
            setCurrent(choice)
        }
    }

    const reset = () => {
        setCurrent(null);
        setSelected({})
    }


    return (


        <>
        <h2> Choose your accent</h2>
        <div className="languages">
            <ul className="voices">
                <li>{langA.name}</li>
                {
                    languageAVoices.map( 
                        voice => <li key={voice.name}>
                            <button
                                onClick= {() => setLangAVoiceSelected( voice)}
                                className = {langAVoiceSelected && langAVoiceSelected.name === voice.name ? 'selected' : ''}
                            > {voice.name} </button>
                        </li>
                    )
                }
            </ul>
            <ul className="voices">

            <li>{langB.name}</li>
                {
                    languageBVoices.map( 
                        voice => <li key={voice.name}>
                            <button
                                onClick= {() => setLangBVoiceSelected( voice)}
                                className = {langBVoiceSelected && langBVoiceSelected.name === voice.name ? 'selected' : ''}
                            >{voice.name}</button>
                        </li>
                    )
                }

            </ul>
        </div>

        <h2> Choose the pairs</h2>
        <ul className="choices">
            {
                choices.map(choice => 
                    <li key={`${choice.lang} - ${choice.value}`}>
                        <button 
                            onClick={() => choose(choice)}
                            className = { current && current.value === choice.value ? "selected" : ""}
                            disabled = {!!selected[choice.value]}
                            >
                            {choice.value}
                        </button>
                    </li>
                    )
            }
        </ul>
        <button className="reset" onClick={() => reset()}>
            Reset Selection
        </button>

        </>
    )
}