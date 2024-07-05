import React, { useEffect } from 'react';

interface SliderDescriptionProps {
  title: string;
  description: string;
  active: boolean;
}

const SliderDescription = ({
  title,
  description,
  active = false,
}: SliderDescriptionProps) => {
  useEffect(() => {}, [active]);
  return (
    <div
      className={
        active ? 'list_content' : 'list_content list-content-inactive'
      }
    >
      <div className="list_title">{title}</div>
      <div className="list_description">{description}</div>
    </div>
  );
};

export default SliderDescription;
