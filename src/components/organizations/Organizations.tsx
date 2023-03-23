import React, { useState, useEffect, useCallback } from "react";
import OrganizationTable from "./OrganizationTable";
import { Form, Modal, Container, Col, Row } from "react-bootstrap";
import api from "../../api";
import OrganizationForm from "./OrganizationForm";
import { PlusOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

type Props = {};

type IList = {
  id: string;
  name: string;
  parent: string;
  type: string;
  status: string;
};

const Organizations = (props: Props) => {
  const [orgList, setOrgList] = useState<IList[]>([]);
  const [search, setSearch] = useState("");

  const [showCreate, setShowCreate] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [selected, setSelected] = useState(Object);
  const [updatedItem, setUpdatedItem] = useState();
  const [deletedItem, setDeletedItem] = useState();

  const getOrgs = async () => {
    const response = await api.get("organizations/");
    return response.data;
  };

  useEffect(() => {
    getOrgs()
      .then((res: any) => {
        setOrgList(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [updatedItem, deletedItem]);

  // const handleChangePage = useCallback((page: any) => {
  //   setPage(page);
  // }, []);

  const showCreateHandler = () => {
    setShowCreate(true);
  };

  const showEditHandler = (selected: any) => {
    setSelected(selected);
    setShowEdit(true);
  };

  const closeCreateHandler = () => {
    setShowCreate(false);
  };

  const closeEditHandler = () => {
    setShowEdit(false);
  };

  const orgHandler = async (org: any) => {
    const request = org;

    const response = await api
      .post("/organizations", request)
      .then((res: any) => {
        setOrgList([...orgList, res.data]);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  const updateHandler = async (org: any) => {
    let updatedItem = org;

    await api
      .put(`/organizations/${org.id}`, updatedItem)
      .then((res: any) => {
        setUpdatedItem(org.id);
      })
      .catch((error: any) => {
        console.log(error);
      });
  };

  const deleteHandler = async (selected: any) => {
    await api
      .delete(`/organizations/${selected.id}`)
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
          <Modal.Title>Create Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrganizationForm
            orgHandler={orgHandler}
            closeEditHandler={closeCreateHandler}
            closeCreateHandler={closeCreateHandler}
            updateHandler={updateHandler}
            formUpdate={false}
            orgList={""}
          />
        </Modal.Body>
      </Modal>
    </>
  );

  const editModal = (
    <>
      <Modal show={showEdit} onHide={closeEditHandler} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Edit Organization</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <OrganizationForm
            orgHandler={orgHandler}
            closeCreateHandler={closeCreateHandler}
            closeEditHandler={closeEditHandler}
            updateHandler={updateHandler}
            formUpdate={true}
            orgList={selected}
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
              placeholder="Search by organization name..."
              onSearch={(org) => {
                setSearch(org);
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
              Create Organization
            </Button>
            {createModal}
          </Col>
        </Row>

        {orgList.length > 0 ? (
          <OrganizationTable
            deleteHandler={deleteHandler}
            showEditHandler={showEditHandler}
            orgHandler={orgHandler}
            closeEditHandler={closeEditHandler}
            updateHandler={updateHandler}
            orgList={orgList}
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

export default Organizations;
