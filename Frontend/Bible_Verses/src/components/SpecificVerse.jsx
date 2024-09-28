import React, { useState } from 'react';

const typeWriter = (text, setVerse) => {
  let i = 0;
  const speed = 50; 
  let displayedText = '';
  const interval = setInterval(() => {
    if (i < text.length) {
      displayedText += text.charAt(i);
      setVerse(displayedText);
      i++;
    } else {
      clearInterval(interval); 
    }
  }, speed);
};

const SpecificVerse = () => {
  const [verse, setVerse] = useState('');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchSpecificVerse = async () => {
    setLoading(true); 
    setVerse(''); 
    try {
      const formattedInput = input.trim().replace(/\s+/g, '+'); 
      const response = await fetch(`https://labs.bible.org/api/?passage=${encodeURIComponent(formattedInput)}&type=json`);
      if (!response.ok) {
        throw new Error('Failed to fetch the specific verse');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        const fullVerse = `${data[0].bookname} ${data[0].chapter}:${data[0].verse} - ${data[0].text}`;
        typeWriter(fullVerse, setVerse); 
      } else {
        setVerse('Verse not found. Please check your input.');
      }
    } catch (error) {
      setVerse('Error fetching verse. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter verse (e.g., John 3:16)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="typed-verse">
        {verse}
      </div>
      {!loading && (
        <button onClick={fetchSpecificVerse} className={loading ? 'hidden' : ''}>
          Fetch Specific Verse
        </button>
      )}
    </div>
  );
};

export default SpecificVerse;
