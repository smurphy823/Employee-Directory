import React, { Component } from "react"
import API from "../utils/api"

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

    render(){
        return(
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Image
                            </th>
                            <th>
                                Name
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