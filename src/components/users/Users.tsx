import React, { useState, useEffect } from "react";
import UserForm from "./UserForm";
import UserTable from "./UserTable";
import { Modal, Container, Col, Row } from "react-bootstrap";
import api from "../../api";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

type Props = {};

type IList = {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  organization: string;
  role: string;
};

const Users = (props: Props) => {
  const [userList, setUserList] = useState<IList[]>([]);
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selected, setSelected] = useState(Object);
  const [updatedItem, setUpdatedItem] = useState();
  const [deletedItem, setDeletedItem] = useState();

  const getUsers = async () => {
    const response = await api.get("users/");
    return response.data;
  };

  useEffect(() => {
    getUsers()
      .then((res: any) => {
        setUserList(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [updatedItem, deletedItem]);

  // const handleChangePage = useCallback((page: any) => {
  //   setPage(page);
  // }, []);

  const showCreateHandler = () => setShowCreate(true);
  const showEditHandler = (selected: any) => {
    setSelected(selected);
    setShowEdit(true);
  };

  const closeCreateHandler = () => setShowCreate(false);
  const closeEditHandler = () => setShowEdit(false);

  const userHandler = async (user: any) => {
    const request = user;

    const response = await api
      .post("/users", request)
      .then((res: any) => {
        setUserList([...userList, res.data]);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  const updateHandler = async (user: any) => {
    let updatedItem = user;

    await api
      .put(`/users/${user.id}`, updatedItem)
      .then((res: any) => {
        setUpdatedItem(user.id);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const deleteHandler = async (selected: any) => {
    await api
      .delete(`/users/${selected.id}`)
      .then((res: any) => {
        setDeletedItem(selected.id);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const createModal = (
    <>
      <Modal show={showCreate} onHide={closeCreateHandler} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Create User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            userHandler={userHandler}
            closeEditHandler={closeEditHandler}
            closeCreateHandler={closeCreateHandler}
            updateHandler={updateHandler}
            userList={""}
          />
        </Modal.Body>
      </Modal>
    </>
  );

  const editModal = (
    <>
      <Modal show={showEdit} onHide={closeEditHandler} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            userHandler={userHandler}
            closeEditHandler={closeEditHandler}
            closeCreateHandler={closeCreateHandler}
            updateHandler={updateHandler}
            formUpdate={true}
            userList={selected}
          />
        </Modal.Body>
      </Modal>
    </>
  );

  return (
    <main>
      <Container>
        <Row className="tools">
          <Col>
            <Input.Search
              // prefix={<SearchOutlined />}
              className="search-bar"
              allowClear
              placeholder="Search by company name..."
              onSearch={(user) => {
                setSearch(user);
              }}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </Col>
          <Col>
            <Button
              className="btn-create"
              type="primary"
              danger
              onClick={showCreateHandler}
            >
              <PlusOutlined />
              Create User
            </Button>
            {createModal}
          </Col>
        </Row>

        {userList.length > 0 ? (
          <UserTable
            deleteHandler={deleteHandler}
            showEditHandler={showEditHandler}
            userHandler={userHandler}
            closeEditHandler={closeEditHandler}
            updateHandler={updateHandler}
            userList={userList}
            search={search}
          />
        ) : (
          ""
        )}
        {editModal}
      </Container>
    </main>
  );
};

export default Users;
