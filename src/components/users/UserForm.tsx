import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

type Props = {
  userHandler: (user: object) => void;
  userList: any;
  updateHandler: (user: object) => void;
  formUpdate?: boolean;

  closeEditHandler: () => void;
  closeCreateHandler: () => void;
};

type State = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  organization: string;
  role: string;
};

class UserForm extends Component<Props, State> {
  state = {
    id: this.props.userList.id || uuidv4(),
    email: this.props.userList.email || "",
    firstname: this.props.userList.firstname || "",
    lastname: this.props.userList.lastname || "",
    organization: this.props.userList.organization || "",
    role: this.props.userList.role || "",
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  addUser = (e: any) => {
    this.setState({
      id: uuidv4(),
    });
    e.preventDefault();
    this.props.userHandler(this.state);
    this.props.closeCreateHandler();
  };

  update = () => {
    this.props.updateHandler(this.state);
    this.props.closeEditHandler();
  };

  render() {
    return (
      <div>
        <Form onSubmit={this.addUser}>
          <Form.Group className="mb" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={this.state.email}
              onChange={(e) => this.setState({ email: e.target.value })}
              placeholder="Email"
              required
            />
          </Form.Group>
          <Form.Group className="mb" controlId="formBasicEmail">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.firstname}
              onChange={(e) => this.setState({ firstname: e.target.value })}
              placeholder="First Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb" controlId="formBasicEmail">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={this.state.lastname}
              onChange={(e) => this.setState({ lastname: e.target.value })}
              placeholder="Last Name"
              required
            />
          </Form.Group>

          <Form.Group className="mb" controlId="formBasicEmail">
            <Form.Label>Organization</Form.Label>
            <Form.Select
              aria-label="Select"
              value={this.state.organization}
              onChange={(e) => this.setState({ organization: e.target.value })}
              required
            >
              <option defaultValue="Select">Select</option>
              <option value="Company">Company</option>
              <option value="Branch">Branch</option>
              <option value="Department">Department</option>
              <option value="BYOx Fed">BYOx Fed</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb" controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Select
              aria-label="Select"
              value={this.state.role}
              onChange={(e) => this.setState({ role: e.target.value })}
              required
            >
              <option defaultValue="Select">Select</option>
              <option value="Admin">Admin</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Editor">Editor</option>
              <option value="User">User</option>
            </Form.Select>
          </Form.Group>

          <Modal.Footer>
            {this.props.formUpdate ? (
              <>
                <Button
                  variant="outline-secondary"
                  className="modal-btn"
                  onClick={this.props.closeEditHandler}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  className="modal-btn"
                  type="button"
                  onClick={this.update}
                  // onSubmit={this.update}
                >
                  Edit User
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline-secondary"
                  className="modal-btn"
                  onClick={this.props.closeCreateHandler}
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  className="modal-btn"
                  type="submit"
                  // onClick={this.addUser}
                  onSubmit={this.addUser}
                >
                  Create User
                </Button>
              </>
            )}
          </Modal.Footer>
        </Form>
      </div>
    );
  }
}

export default UserForm;
