import React, { ReactElement, useState } from 'react';

export default function SuitContainer (
  {suitName, cards} : {suitName :string, cards : Array<ReactElement>}
)  {
  const [suit, setSuit] = useState<string> (suitName);
  const [toggleCollapse, setToggleCollapse] = useState<Boolean> (false);

  const handleCollapse = () => {
    setToggleCollapse(!toggleCollapse);
  }

  return (
    <div key={`${suitName}-suitContainer`} className = {`${toggleCollapse ? "h-3" : "h-min"} p-3 border-2 mb-5 rounded-lg suitContainer`}
      >
      <div className="-mt-7 ml-4 px-3 pb-3 bg-black w-min suitName">
        {suit}
      </div>
      <button className="float-right -mt-9 bg-black px-3 pb-3 content-end arrow"
      onClick={handleCollapse}>
      v
      </button>
      <div className={`relative grid grid-cols-[repeat(auto-fill,minmax(80px,0.5fr))] gap-4 ${toggleCollapse ? "collapse" : ""} cardContainer`} key={`${suitName}-cardContainer`}
      >
        {cards.map((card, index) => { // suppresses React unique key warning 🙄
          return (
            <React.Fragment key={`${index}-card`}>
              {card}
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}