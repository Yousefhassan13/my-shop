// Material UI
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function Cart({ cartItems, onRemove, onUpdateQuantity }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
     <List>
  {cartItems.map((item) => (
    <ListItem 
      key={item.id} 
      secondaryAction={
        <IconButton onClick={() => onRemove(item.id)} color="error">
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText 
        primary={`${item.name} × ${item.quantity}`} 
        secondary={`${item.price * item.quantity} EGP`} 
      />
      <IconButton onClick={() => onUpdateQuantity(item.id, 1)} color="success" size="small">
        <AddIcon />
      </IconButton>
      <IconButton onClick={() => onUpdateQuantity(item.id, -1)} color="warning" size="small">
        <RemoveIcon />
      </IconButton>
    </ListItem>
  ))}
</List>
<Typography variant="h6" style={{textAlign:"center", }}>Total: {total} EGP</Typography>
    </>
  );
}
