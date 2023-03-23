import React, { useState, useEffect } from "react";
import { Container, Row, Col, ListGroup, Card, Image } from "react-bootstrap";
import { SendOutlined } from "@ant-design/icons";
// import { Divider, List, Typography, Avatar } from "antd";
import api from "../../api";

type Props = {
  // userList: any;
};

type IList = {
  firstname: string;
  lastname: string;
  role: string;

  name: string;
  type: string;
};

// const organizations = [
//   {
//     avatar: "https://joeschmoe.io/api/v1/random",
//     company: "Virtusa",
//     type: "Company",
//   },
//   {
//     avatar: "https://joeschmoe.io/api/v1/random",
//     company: "Apple",
//     type: "Company",
//   },
// ];

// const users = [
//   {
//     firstname: "Rangana",
//     lastname: "Cruise",
//     avatar: "https://joeschmoe.io/api/v1/random",
//     role: "Admin",
//   },
//   {
//     firstname: "Kasun",
//     lastname: "Damian",
//     avatar: "https://joeschmoe.io/api/v1/random",
//     role: "Admin",
//   },
//   {
//     firstname: "Ravi",
//     lastname: "Damian",
//     avatar: "https://joeschmoe.io/api/v1/random",
//     role: "Admin",
//   },
// ];

const Overview = (props: Props) => {
  const [userList, setUserList] = useState<IList[]>([]);
  const [orgList, setOrgList] = useState<IList[]>([]);

  const getUsers = async () => {
    const response = await api.get("/users");
    return response.data;
  };

  const getOrganizations = async () => {
    const response = await api.get("/organizations");
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

    getOrganizations()
      .then((res: any) => {
        setOrgList(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  // const userList = props.userList;

  const userListGroup = userList
    .slice(-5)
    .reverse()
    .map((user: any, index: number) => {
      return (
        <ListGroup.Item className="list-group-item" key={index}>
          <Col xs={2} sm={1} md={1} lg={2}>
            <Image
              fluid
              roundedCircle
              src="https://i.pravatar.cc/"
              alt="user image"
              className="avatar"
            />
          </Col>
          <Col xs={10} className="user-details">
            <span className="list-item-name">
              {user.firstname} {user.lastname}
            </span>
            <br />
            <span className="list-item-type">{user.role}</span>
          </Col>
        </ListGroup.Item>
      );
    });

  const orgListGroup = orgList
    .slice(-5)
    .reverse()
    .map((org: any, index: number) => {
      return (
        <ListGroup.Item className="list-group-item" key={index}>
          <Col xs={2} md={1} lg={2}>
            <Image
              fluid
              roundedCircle
              src="https://i.pravatar.cc/"
              alt="org image"
              className="avatar"
            />
          </Col>
          <Col xs={10} className="user-details">
            <span className="list-item-name">{org.name}</span>
            <br />
            <span className="list-item-type">{org.type}</span>
          </Col>
        </ListGroup.Item>
      );
    });

  {
    /* <div
        style={{
          height: 365,
          overflow: "hidden",
          padding: "0 16px",
          border: "1px solid rgba(140, 140, 140, 0.35)",
        }}
      >
        <List
          dataSource={users}
          renderItem={(item) => (
            <List.Item key={item.email}>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description={item.email}
              />
            </List.Item>
          )}
        />
      </div> */
  }

  return (
    <main>
      <Container>
        <Card className="welcome-card">
          <Card.Body className="welcome-msg-content">
            <h1>Welcome, Leo Blair</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </p>
          </Card.Body>
        </Card>

        <Row className="overview">
          <Col xs={12} sm={12} lg={5}>
            <div className="list-group-title">
              <h3>Organizations({orgList.length})</h3>
              <h6>Overview of Organizations</h6>
            </div>
            <ListGroup>
              {orgListGroup}
              <ListGroup.Item>
                <a className="btn-view" href="./organizations">
                  <SendOutlined className="btn-view-icon" />
                  View All
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col xs={12} sm={12} lg={5}>
            <div className="list-group-title">
              <h3>Users({userList.length})</h3>
              <h6>Overview of Users</h6>
            </div>
            <ListGroup>
              {userListGroup}
              <ListGroup.Item>
                <a className="btn-view" href="./users">
                  <SendOutlined className="btn-view-icon" />
                  View All
                </a>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Overview;
