import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import { styled, withTheme } from "@material-ui/core/styles";
import { ROUTE_REGISTER, SERVER_HOST } from "../constants";

const StyledLinkButton = styled(withTheme(Link))(props => ({
  margin: props.theme.spacing(1),
  textDecoration: "none",
  color: "inherit"
}));

const StyledButton = styled(withTheme(Button))(props => ({
  margin: props.theme.spacing(1),
  width: 200
}));

const StyledRoot = styled("div")({
  display: "flex",
  flexDirection: "column"
});

const StyledPaper = styled(Paper)({
  width: "100%",
  overflowX: "auto"
});

const StyledTable = styled(Table)({
  minWidth: 500
});

const Loading = styled(withTheme(CircularProgress))(props => ({
  margin: props.theme.spacing(2)
}));

export class Users extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      users: [],
      error: null
    };
  }

  componentDidMount() {
    axios
      .get(`${SERVER_HOST}/users`)
      .then(res =>
        this.setState({
          isLoading: false,
          users: res.data
        })
      )
      .catch(err =>
        this.setState({
          isLoading: false,
          error: err.message
        })
      );
  }

  render() {
    const { isLoading, users, error } = this.state;

    const UserTable = (
      <>
        <StyledPaper>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell>Mongo ID</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>TBD</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </StyledPaper>
      </>
    );

    return (
      <StyledRoot>
        <Typography variant="h3">User Management</Typography>
        <StyledLinkButton to={ROUTE_REGISTER}>
          <StyledButton variant="contained">Register a new user</StyledButton>
        </StyledLinkButton>
        {isLoading ? <Loading /> : null}
        {error ? <>{error}</> : null}
        {!isLoading && !error ? UserTable : null}
      </StyledRoot>
    );
  }
}
