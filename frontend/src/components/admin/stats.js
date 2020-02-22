import React, { Component } from "react";
import FilterableTable from "react-filterable-table";
import request from "../../utils/request";

const fields = [
  {
    name: "name",
    displayName: "Name",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true
  },
  {
    name: "email",
    displayName: "Email",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true
  },
  {
    name: "school",
    displayName: "School",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true
  },
  {
    name: "score",
    displayName: "score",
    inputFilterable: true,
    exactFilterable: true,
    sortable: true
  }
];
export default class extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    request("get", "/users").then(r => {
      console.log(r.data);
      this.setState({ users: r.data });
    });
  }

  render() {
    return (
      <div>
        <FilterableTable
          namespace="People desc"
          initialSort="score"
          initialSortDir={false}
          data={this.state.users}
          fields={fields}
          noRecordsMessage="There are no people to display"
          noFilteredRecordsMessage="No people match your filters!"
        />
      </div>
    );
  }
}
