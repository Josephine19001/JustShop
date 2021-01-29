import React, {useState, FC} from "react";

const PolicyQuestContainer:FC <{name: string, description: string}> = ({name,description}) => {

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="container ">
      <div className="policyContainer">
        <h2>{name}</h2>
        <span>
          <button onClick={handleOpen}>{">"}</button>
        </span>
      </div>
      {isOpen && (
        <div className="policySlider">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default PolicyQuestContainer;
