import React, { Component } from "react"
import API from "../utils/api"
import Search from "./Search"

class Table extends Component {
    state = {
        employees: [],
        filteredEmp: [],
        order: "descend"
    }

    componentDidMount() {
        API.getEmployees().then(employees => {
            this.setState({
                employees: employees.data.results,
                filteredEmp: employees.data.results
            })
        })
    }

    handleSearch = event => {
        const filteredEmployee = this.state.employees.filter(employee => {
            let empValues = Object.values(employee).join("").toLowerCase()
            return empValues.indexOf(event.target.value.toLowerCase())!== -1
        })
        this.setState({
            filteredEmp: filteredEmployee
        })
    }


    sortByName = () => {
        const sortEmployees = this.state.employees.sort((a,b) => {
            if(b.name.first > a.name.first) {
                return -1
            }
            else if(a.name.first > b.name.first) {
                return 1
            }
            return 0
        })
        if(this.state.order === "descend") {
            sortEmployees.reverse()
            this.setState({
                order: "ascend"
            })
        }
        else{
            this.setState({
                order: "descend"
            })
        }
        this.setState({
            filteredEmp: sortEmployees
        })
    }

    render(){
        return(
            <div>
                <Search handleSearch = {this.handleSearch}/>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                Name <span style = {{
                                    cursor: "pointer"
                                }} onClick = {
                                    this.sortByName
                                }></span>
                            </th>
                            <th>
                                Phone
                            </th>
                            <th>
                                Email
                            </th>
                            <th>
                                DOB
                            </th>
                        </tr>
                    </thead>
            {this.state.filteredEmp.map(data => {
                return(
                <tr key={data.login.uuid}>
                    <td>
                        <img src = {data.picture.thumbnail}/>
                    </td>
                    <td>
                        {data.name.first} {data.name.last}
                    </td>
                    <td>
                        {data.phone}
                    </td>
                    <td>
                        {data.email}
                    </td>
                    <td>
                        {data.dob.age}
                    </td>
                </tr>
            )})}</table></div>
        )
    }
}

export default Table