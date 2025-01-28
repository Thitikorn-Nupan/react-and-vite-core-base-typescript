import {createRef, useEffect, useRef, useState} from "react";
import * as React from "react";

function Counter() {

    const hasClickedButton = useRef(false); // The thing about setting the React ref to a new value is that it doesn't trigger

    const [count, setCount] = useState(0);

    function onClick() { // work after clicked

        const newCount = count + 1;

        setCount(newCount);

        hasClickedButton.current = !hasClickedButton.current;
    }

    console.log('Has clicked button ? ' + hasClickedButton.current);

    return (
        <div className={"text-center"}>
            <p>{count}</p>
            <button className={"btn btn-success"} type="button" onClick={onClick}>
                Increase
            </button>
        </div>
    );
}

function Counter2() {
    const [count, setCount] = useState(0);

    function onClick() {
        setCount(count + 1);
    }

    const isFirstRender = useRef(true); // Rule of thumb: Whenever you need to track state in your React component which shouldn't trigger a re-render of your component, you can use React's useRef Hooks to create an instance variable for it.

    useEffect(() => { // do first
        if (isFirstRender.current) {
            isFirstRender.current = false;
        } else {
            console.log(`
                  I am a useEffect hook's logic
                  which runs for a component's
                  re-render.
                `);
        }

    });
    console.log('Has clicked button ? ' + isFirstRender.current); // first case will be true
    return (
        <div className={"text-center"}>
            <p>{count}</p>
            <button className={"btn btn-success"} type="button" onClick={onClick}>
                Increase
            </button>

            {/*
                Only works because setCount triggers a re-render.
                Just changing the ref's current value doesn't trigger a re-render.
            */}
            <p>{isFirstRender.current ? 'First render.' : 'Re-render.'}</p>
        </div>
    );
}


function Input() {
    return (
        <ComponentWithDomApi
            label="Input "
            value="Value"
            isFocus
        />
    );
}

interface ComponentWithDomApiProps {
    label: string;
    value: string;
    isFocus: boolean;
}

function ComponentWithDomApi({ label, value, isFocus }: ComponentWithDomApiProps) {
    const ref = useRef<HTMLInputElement>(); // (1) we are using React's useRef Hook to create a ref object (1)

    useEffect(() => {
        if (isFocus) {
            ref.current?.focus(); // (3) we can use the DOM node, which is now assigned to the ref's current property, to interact with its API.
        }
    }, [isFocus]);

    return (
        <label>
            {
                /* (2)  In this case, we don't assign any initial value to it, because that will be done in the next step  */
            }
            {label}: <input className={"form-control"} type="text" value={value}/>
        </label>
    );
}

function Input2() {

    const [text, setText] = useState('Input some text...');

    function handleOnChange(event : React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }

    const ref : React.MutableRefObject<any> = useRef();


    useEffect(() => {
        // optional
        const { width } = ref.current.getBoundingClientRect();
        document.title = `Width:${width}`; // show on browser tap <title>Width:126.28125</title>
    }, []);
    return (
        <div>
            Input2 : <input className={"form-control"} type="text" value={text} onChange={handleOnChange} />
            <div>
                <span ref={ref}>{text}</span> {/* When a ref is passed to an element in render, a reference to the node becomes accessible at the current attribute of the ref. */}
            </div>
        </div>
    );
}

// new way
function Input3() {

    const [text, setText] = useState('Input some text...');

    function handleOnChange(event : React.ChangeEvent<HTMLInputElement>) {
        setText(event.target.value);
    }
    // ** You may not use the ref attribute on function components because they don’t have instances
    const ref = createRef<HTMLInputElement>();

    return (
        <div>
            Input3 : <input className={"form-control"} type="text" value={text} onChange={handleOnChange} />
            <div>
                <span ref={ref}>{text}</span> {/* When a ref is passed to an element in render, a reference to the node becomes accessible at the current attribute of the ref. */}
            </div>
        </div>
    );
}

const RefOfHook = () => {
    return (
        <>
            <div className={"container"}>
                {Counter()}
                {Counter2()}
                {Input()} {/* can't edit */}
                {Input2()}
                {Input3()}
            </div>
        </>
    )
}

export {
    RefOfHook
}