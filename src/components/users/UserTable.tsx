import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

type Props = {
  userList: any;
  search: any;

  userHandler: (user: object) => void;
  updateHandler: (user: object) => void;
  deleteHandler: (user: object) => void;
  showEditHandler: (user: object) => void;
  closeEditHandler: () => void;
};

type DataType = {
  id: string;
  firstname: string;
  lastname: string;
  organization: string;
  role: string;
};

const UserTable = (props: Props) => {
  const userList = props.userList;
  const search = props.search;

  const columns: ColumnsType<DataType> = [
    {
      title: "First Name",
      dataIndex: "firstname",
      key: "firstname",
      render: (text) => <a>{text}</a>,
      filteredValue: [search],
      onFilter: (value: any, record) => {
        return String(record.firstname)
          .toLowerCase()
          .includes(value.toLowerCase());
      },

      className: "rows",
    },
    {
      title: "Last Name",
      dataIndex: "lastname",
      key: "lastname",
      className: "rows",
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      className: "rows",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      className: "rows",
    },
    {
      title: "",
      key: "action",
      className: "rows",

      render: (user, record) => (
        <Space size="middle">
          <a onClick={() => props.showEditHandler(user)}>
            <EditOutlined />
          </a>
          <a onClick={() => props.deleteHandler(user)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  // let items = [];

  // if (current > 1) {
  //   items.push(
  //     <Pagination.Prev key="prev" onClick={() => onChangePage(current - 1)} />
  //   );
  // }

  // for (let page = 1; page <= total; page++) {
  //   items.push(
  //     <Pagination.Item
  //       key={page}
  //       data-page={page}
  //       active={page === current}
  //       onClick={() => onChangePage(page)}
  //     >
  //       {page}
  //     </Pagination.Item>
  //   );
  // }

  // if (current < total) {
  //   items.push(
  //     <Pagination.Next key="next" onClick={() => onChangePage(current + 1)} />
  //   );
  // }

  // const tableHeader = (
  //   <thead>
  //     <tr>
  //       <th></th>
  //       <th>Last Name</th>
  //       <th>Organization</th>
  //       <th>Role</th>
  //       <th></th>
  //     </tr>
  //   </thead>
  // );

  // const tableBody = userList.map((user: any, index: number) => {
  //   return (
  //     <tr key={index}>
  //       <td>{user.firstname}</td>
  //       <td>{user.lastname}</td>
  //       <td>{user.organization}</td>
  //       <td>{user.role}</td>
  //       <td className="">
  //         <Button variant="default" onClick={() => props.showEditHandler(user)}>
  //           <EditOutlined />
  //         </Button>

  //         <Button variant="default" onClick={() => props.deleteHandler(user)}>
  //           <DeleteOutlined />
  //         </Button>
  //       </td>
  //     </tr>
  //   );
  // });

  return (
    <>
      <Table
        className="table"
        rowKey="id"
        columns={columns}
        dataSource={userList}
      />
      ;
      {/* <Table className="mt-3" striped bordered hover>
        {tableHeader}
        <tbody>{tableBody}</tbody>
      </Table>
      {userList.totalPage > 1 && <Pagination>{items}</Pagination>} */}
    </>
  );
};

export default UserTable;
