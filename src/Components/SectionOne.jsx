import React, { useEffect, useState } from 'react';

const SectionOne = () => {
  const words = ["Borrow?", "Swap?","Recycle?","Share?","Rent?"]; // You can add more words here if needed.
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(true); // start fade in
      }, 500); // transition duration matches CSS fade time
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
<div className="row p-4 ">
    <div className="col-md-12 text center">
        
    <h2 className="text-4xl fw-100 section-one ">
          Why Buy while you can{' '}
          
          <span
            className={`transition-opacity duration-500 text-primary ${
              fade ? 'opacity-100' : 'opacity-0'
            } `} //
          >
            {words[index]}
          </span>
        </h2>
        <h3 className='name-style'>Fed up of buying stuff you don’t really need? Us too.</h3>

    </div>
    
</div>
  );
};

export default SectionOne;
