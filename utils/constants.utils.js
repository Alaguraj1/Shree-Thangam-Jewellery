import { Button, Checkbox } from "antd";
import dayjs from "dayjs";

export const columns = [
  {
    title: "Chit Group",
    dataIndex: "CHTGRUP",
    key: "CHTGRUP",
  },
  {
    title: "No Of Dues",
    dataIndex: "NOOFDUE",
    key: "NOOFDUE",
  },
  {
    title: "Group Amount",
    dataIndex: "CHTAMNT",
    key: "CHTAMNT",
  },
  {
    title: "Group Capacity",
    dataIndex: "GRPCAPY",
    key: "GRPCAPY",
  },
  {
    title: "Bonus Amount",
    dataIndex: "BONAMNT",
    key: "BONAMNT",
  },

  {
    title: "Gift Amount",
    dataIndex: "GFTAMNT",
    key: "GFTAMNT",
  },
  {
    title: "Chtsrno",
    dataIndex: "CHTSRNO",
    key: "CHTSRNO",
  },
  {
    title: "Lucky Draw",
    dataIndex: "LUKDRAW",
    key: "LUKDRAW",
    render: (text) => {
      return <Checkbox checked={text === "Y"} />;
    },
  },
];

// export const ClosedDue = [
//   {
//     title: "Group",
//     dataIndex: "CLSCHTGRUP",
//     key: "CLSCHTGRUP",
//   },
//   {
//     title: "Name",
//     dataIndex: "CHTNAME",
//     key: "CHTNAME",
//   },

//   {
//     title: "Amount",
//     dataIndex: "CLSDUEAMT",
//     key: "CLSDUEAMT",
//   },
//   {
//     title: "Details",
//     dataIndex: "details",
//     key: "details",
//     render: (text, record) => (
//       <Button type="primary">View</Button>
//     ),
//   },
// ];

// export const PayDueHeadings = [
//   {
//     title: "S. No",
//     dataIndex: "sNo",
//     key: "sNo",
//   },
//   {
//     title: "Group",
//     dataIndex: "CHTGRUP",
//     key: "CHTGRUP",
//   },
//   {
//     title: "Name",
//     dataIndex: "CHTNAME",
//     key: "CHTNAME",
//   },
//   {
//     title: "Current Due",
//     dataIndex: "DUENUMB",
//     key: "DUENUMB",
//   },
//   {
//     title: "Amount",
//     dataIndex: "DUEAMNT",
//     key: "DUEAMNT",
//   },
//   {
//     title: "Details",
//     dataIndex: "details",
//     key: "details",
//     render: (text, record) => (
//       <Button type="primary" >View</Button>
//     ),
//   },
// ];


export const LuckyWinnerHeading = [
  {
    title: "Date",
    dataIndex: "LDRDATE",
    key: "LDRDATE",
    render: (text, record) => (
      <span>{dayjs(text).format('DD-MM-YYYY')}</span>
    ),
  },
  {
    title: "Group",
    dataIndex: "CHTGRUP",
    key: "CHTGRUP",
  },
  {
    title: "No.of Due",
    dataIndex: "NOOFDUE",
    key: "NOOFDUE",
  },
  {
    title: "Customer Name",
    dataIndex: "CUSNAME",
    key: "CUSNAME",
  },

  {
    title: "City",
    dataIndex: "CTYNAME",
    key: "CTYNAME",
  },
];