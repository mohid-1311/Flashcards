import React, { useState } from 'react';

function SchreibModus() {
    const [text, setText] = useState<string>('');
    const [submittedText, setSubmittedText] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value);
    };

    const handleSubmit = () => {
        setSubmittedText(text);
    };

    return (
        <div>
            <h2>Schreib Modus</h2>
            <input
                type = "text"
                value={text}
                onChange={handleChange}
                placeholder="..."
            />
            <button onClick={handleSubmit}>Überprüfen</button>
        </div>
    );
}

export default SchreibModus;
