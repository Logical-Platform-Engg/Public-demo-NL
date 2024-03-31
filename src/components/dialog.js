import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";

const companies = ["Google", "Amazon", "Microsoft"];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open} >
      {/* <DialogTitle>Set backup account</DialogTitle> */}
      <List sx={{ pt: 0 }}>
        {companies.map((company, index) => (
          <ListItem disableGutters key={company} sx={{minWidth:170}}>
            <ListItemButton onClick={() => handleListItemClick(company)}>
              {/* <ListItemAvatar>
                <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                  <img src={gc_logo} alt="Google Cloud Logo" />
                </Avatar>
              </ListItemAvatar> */}
              <ListItemText primary={company} sx={{textAlign:"center"}}/>
            </ListItemButton>
          </ListItem>
        ))}
        {/*  <ListItem disableGutters>
          <ListItemButton
            autoFocus
            onClick={() => handleListItemClick("addAccount")}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItemButton>
        </ListItem> */}
      </List>
    </Dialog>
  );
}
export default SimpleDialog;
