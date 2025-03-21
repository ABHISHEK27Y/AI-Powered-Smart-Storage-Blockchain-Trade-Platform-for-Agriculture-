import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Languages } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    handleClose();
  };

  return (
    <>
      <Button
        startIcon={<Languages />}
        onClick={handleClick}
        color="inherit"
      >
        {i18n.language === 'hi' ? 'हिंदी' : 'English'}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => changeLanguage('en')}>English</MenuItem>
        <MenuItem onClick={() => changeLanguage('hi')}>हिंदी</MenuItem>
      </Menu>
    </>
  );
}