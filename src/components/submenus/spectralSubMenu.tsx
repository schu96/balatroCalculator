import React from "react";

interface smProps {
  handleSpecClick : (e : React.MouseEvent) => void
}

export default function SpectralSubMenu (props : smProps) {
  const { handleSpecClick } = props;
  return (
    <ul className = "z-30 -top-0.5 bg-purple-500 divide-y border absolute rounded-lg specDropDown" >
    <li className = {`rouneded-lg NoSpectral`}>
      <div className="w-24 text-start pl-1" onMouseDown={handleSpecClick}>No Spectral</div>
    </li>
    <li className = {`rouneded-lg Holographic`}>
      <div className="w-24 text-start pl-1" onMouseDown={handleSpecClick}>Holographic</div>
    </li>
    <li className = {`rouneded-lg Foil`}>
      <div className="w-24 text-start pl-1" onMouseDown={handleSpecClick}>Foil</div>
    </li>
    <li className = {`rouneded-lg Polychrome`}>
      <div className="w-24 text-start pl-1" onMouseDown={handleSpecClick}>Polychrome</div>
    </li>
  </ul>
  )
}

/*
  {specOpen ? (
    <ul className = "z-30 -top-0.5 bg-purple-500 divide-y border absolute rounded-lg specDropDown" >
      <li className = {`rouneded-lg NoSpectral`}>
        <div className="w-24 text-start pl-1" onMouseDown={handleSpecClick}>No Spectral</div>
      </li>
      <li className = {`rouneded-lg Holographic`}>
        <div className="w-24 text-start pl-1" onMouseDown={handleSpecClick}>Holographic</div>
      </li>
      <li className = {`rouneded-lg Foil`}>
        <div className="w-24 text-start pl-1" onMouseDown={handleSpecClick}>Foil</div>
      </li>
      <li className = {`rouneded-lg Polychrome`}>
        <div className="w-24 text-start pl-1" onMouseDown={handleSpecClick}>Polychrome</div>
      </li>
    </ul>
  ) : null}
*/