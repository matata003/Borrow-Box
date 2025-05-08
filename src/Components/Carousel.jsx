import React from 'react';

const Carousel = () => {
  const items = [
    { id: 1, image: '/images/item1.jpg' },
    { id: 2, image: '/images/item2.jpg' },
    { id: 3, image: '/images/item3.jpg' },
    { id: 4, image: '/images/item4.jpg' },
    { id: 5, image: '/images/item5.jpg' },
    { id: 6, image: '/images/item7.jpg' },

  ];

  // duplicates the array in a loo of items
  const duplicatedItems = [...items, ...items]; 

  return (
    <div className='p-4' style={{
      width: '100%',
      //overflow: 'hidden',
      //background: '#f9f9f9',
    }}>
      {/* moving strip */}

      <div style={{
        display: 'flex', //in a row
        animation: 'scroll 40s linear infinite', 
        width: 'fit-content',
      }}>

        {/*loop every item  */}
        {duplicatedItems.map((item, index) => (
          <div
            key={index} 
            style={{
              flex: '0 0 auto', //fixed size no streching
              width: '200px',
              height: '150px',
              marginRight: '20px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
            }}
          >
            <img
              src={item.image}
              alt={`carousel-item-${index}`}
              style={{
                width: '100%',
                height: '100%',
                //objectFit: 'cover',
              }}
            />
          </div>
        ))}
      </div>

      {/* Inline style tag for animation */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </div>
  );
};

export default Carousel;
