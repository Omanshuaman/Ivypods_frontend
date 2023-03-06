import {
  Typography,
  Box,
  makeStyles,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { orange } from "@material-ui/core/colors";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Button,
  ModalFooter,
  Input,
  Select,
  FormControl,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalContent,
  ModalOverlay,
  Modal,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
const useStyles = makeStyles({
  stuListColor: {
    backgroundColor: orange[400],
    color: "white",
  },
  tableHeadCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const List = () => {
  const classes = useStyles();
  const [students, setStudents] = useState([]);
  const { details } = ChatState();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user, setUser } = ChatState();
  const [id, setId] = useState("");

  const handleEditClick = (id) => {
    // do something with the id, like fetch the data from API
    // and set it to state for an edit form, then navigate to the edit page
    // history.push(`/edit/${id}`);
  };
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const handleDelete = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.delete(
        "https://ivypodsbackend.up.railway.app/api/todo/delete",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          data: {
            chatId: id,
          },
        },
        config
      );
      //  document.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleRenameGroupLink = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        "https://ivypodsbackend.up.railway.app/api/todo/rename",
        {
          chatId: id,
          chatName: name,
          chatPhoneNumber: phoneNumber,
        },
        config
      );
      //  document.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  const onEditOpen1 = (id, name, phoneNumber) => {
    onEditOpen();
    setId(id);
    setName(name);
    setPhoneNumber(phoneNumber);
  };
  const onDeleteOpen1 = (id) => {
    onDeleteOpen();
    setId(id);
  };

  return (
    <>
      <Box textAlign="center" p={2} className={classes.stuListColor}>
        <Typography variant="h4">Contact List</Typography>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#616161" }}>
              <TableCell align="center" className={classes.tableHeadCell}>
                No
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Name
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Phone Number
              </TableCell>
              <TableCell align="center" className={classes.tableHeadCell}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {details.map((d, i) => {
              return (
                <TableRow key={i}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center">{d.Name}</TableCell>
                  <TableCell align="center">{d.PhoneNumber}</TableCell>
                  <TableCell align="center">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() =>
                          onEditOpen1(d._id, d.Name, d.PhoneNumber)
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => onDeleteOpen1(d._id)}>
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <>
        <Modal isOpen={isEditOpen} onClose={onEditClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
            >
              Update Group Link
            </ModalHeader>

            <ModalCloseButton />
            <ModalBody d="flex" flexDir="column" alignItems="center">
              <FormControl d="flex">
                <Input
                  placeholder="Name"
                  mb={3}
                  value={name}
                  onChange={handleNameChange}
                />
                <Input
                  placeholder="Phone Number"
                  mb={3}
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" onClick={handleRenameGroupLink}>
                Update
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      <>
        <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              fontSize="35px"
              fontFamily="Work sans"
              d="flex"
              justifyContent="center"
            >
              Delete Contact
            </ModalHeader>
            <ModalCloseButton />
            <ModalFooter>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default List;
