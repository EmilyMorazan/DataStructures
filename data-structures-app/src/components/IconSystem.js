import React from 'react';
import { 
  FaHome,
  FaBook,
  FaCog,
  FaLightbulb,
  FaCheck,
  FaTimes,
  FaChevronRight,
  FaChevronDown,
  FaPlus,
  FaMinus,
  FaTrash,
  FaRedo,
  FaUndo,
  FaSave,
  FaMoon,
  FaSun
} from 'react-icons/fa';
import './IconSystem.css';

const iconMap = {
  home: FaHome,
  book: FaBook,
  cog: FaCog,
  bulb: FaLightbulb,
  check: FaCheck,
  times: FaTimes,
  chevronRight: FaChevronRight,
  chevronDown: FaChevronDown,
  plus: FaPlus,
  minus: FaMinus,
  trash: FaTrash,
  redo: FaRedo,
  undo: FaUndo,
  save: FaSave,
  moon: FaMoon,
  sun: FaSun
};

const Icon = ({ name, size = 'md', className = '', animated = false, onClick }) => {
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  const classes = [
    'icon',
    `icon-${size}`,
    animated ? 'icon-animated' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} onClick={onClick}>
      <IconComponent />
    </div>
  );
};

export default Icon;