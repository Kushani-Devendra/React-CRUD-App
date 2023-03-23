import React from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";

type Props = {
  orgList: any;
  search: any;
  orgHandler: (org: object) => void;
  updateHandler: (org: object) => void;
  deleteHandler: (org: object) => void;
  showEditHandler: (org: object) => void;
  closeEditHandler: () => void;
};

type DataType = {
  id: string;
  name: string;
  parent: string;
  type: string;
  status: string;
};

const OrganizationTable = (props: Props) => {
  const orgList = props.orgList;
  const search = props.search;

  const columns: ColumnsType<DataType> = [
    {
      title: "Organization Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      filteredValue: [search],
      onFilter: (value: any, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },

      className: "rows",
    },
    {
      title: "Parent Organization Name",
      dataIndex: "parent",
      key: "parent",
      className: "rows",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      className: "rows",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      className: "rows",
    },
    {
      title: "",
      key: "action",
      className: "rows",

      render: (org, record) => (
        <Space size="middle">
          <a onClick={() => props.showEditHandler(org)}>
            <EditOutlined />
          </a>
          <a onClick={() => props.deleteHandler(org)}>
            <DeleteOutlined />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table
        className="table"
        rowKey="id"
        columns={columns}
        dataSource={orgList}
      />
      ;
    </>
  );
};

export default OrganizationTable;
