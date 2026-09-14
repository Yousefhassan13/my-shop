import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Badge,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

export default function Header({ cartItemCount, currentUser, onLogout }) {
  return (
    <AppBar position="static">
      <Toolbar
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 16px',
        }}
      >
        <Typography
          variant="h6"
          component={Link}
          to="/"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          My Shop
        </Typography>

        {/* icon cart + icon login + icon signup*/}
        <div
          className="right-side"
          style={{ display: 'flex', alignItems: 'center', gap: '30px' }}
        >
          <IconButton component={Link} to="/cart" color="inherit">
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Typography>{currentUser.name}</Typography>
              <Button
                onClick={onLogout}
                color="inherit"
                style={{ textDecoration: 'none' }}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link
                to="/login"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Login
              </Link>
              <Link
                to="/signup"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
