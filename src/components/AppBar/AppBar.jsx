import { Navigation } from 'components/Navigation/Navigation';
import { UserMenu } from 'components/UserMenu/UserMenu';
import Filter from 'components/Filter/Filter';
import { useAuth } from 'hooks/useAuth';
import AppBarMui from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import { ContactAddBtn } from '../ContactAddBtn/ContactAddBtn';
export const AppBar = () => {
  const { isLoggedIn } = useAuth();
  return (
    <AppBarMui position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        {isLoggedIn ? (
          <>
            <UserMenu />
            <ContactAddBtn />
            <Box sx={{ flexGrow: 1 }} />
            <Filter />
          </>
        ) : (
          <Navigation />
        )}
      </Toolbar>
    </AppBarMui>
    // <Bar>
    //   <Link to="/">PhoneBook</Link>
    //   {isLoggedIn ? <UserMenu /> : <Navigation />}
    // </Bar>
  );
};
