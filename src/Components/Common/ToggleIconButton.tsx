import React from 'react';

interface ToggleIconButtonProps {
  on: boolean;
  onIcon: React.ReactElement;
  offIcon: React.ReactElement;
}

/**
 * Simple toggle icon component to replace material-ui-toggle-icon
 * which is not compatible with MUI v5
 */
const ToggleIconButton: React.FC<ToggleIconButtonProps> = ({
  on,
  onIcon,
  offIcon,
}) => {
  return <>{on ? onIcon : offIcon}</>;
};

export default ToggleIconButton;

