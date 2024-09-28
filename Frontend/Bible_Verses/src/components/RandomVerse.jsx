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

const RandomVerse = () => {
  const [verse, setVerse] = useState('');
  const [loading, setLoading] = useState(false);

  const generateVerse = async () => {
    setLoading(true); 
    setVerse(''); 
    try {
      const response = await fetch('https://labs.bible.org/api/?passage=random&type=json');
      if (!response.ok) {
        throw new Error('Failed to fetch the random verse');
      }
      const data = await response.json();
      if (data && data.length > 0) {
        const fullVerse = `${data[0].bookname} ${data[0].chapter}:${data[0].verse} - ${data[0].text}`;
        typeWriter(fullVerse, setVerse);
      } else {
        setVerse('No verse found. Please try again.');
      }
    } catch (error) {
      setVerse('Error fetching verse. Please try again.');
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div>
      <div className="typed-verse">
        {verse}
      </div>
      {!loading && (
        <button onClick={generateVerse} className={loading ? 'hidden' : ''}>
          Generate Random Verse
        </button>
      )}
    </div>
  );
};

export default RandomVerse;
 